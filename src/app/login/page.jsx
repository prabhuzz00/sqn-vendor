"use client";
import { MyContext } from "@/context/ThemeProvider";
import React, { Suspense, useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchDataFromApi, postData } from "@/utils/api";
import { toast } from "react-toastify";
// import { useSession, signIn } from "next-auth/react";

const LoginPageContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormFields] = useState({
    phoneNumber: "",
    password: "",
  });

  const context = useContext(MyContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect authenticated users
  useEffect(() => {
    console.log(
      "useEffect: context.isLogin:",
      context.isLogin,
      "Cookies:",
      Cookies.get("accessToken")
    );
    if (context.isLogin) {
      const redirectUrl = searchParams.get("redirect") || "/my-account";
      console.log("Attempting redirect to:", redirectUrl);
      router.push(redirectUrl);
    }
  }, [context.isLogin, router, searchParams]);

  // Scroll to top on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  const forgotPassword = () => {
    if (formFields.phoneNumber === "") {
      context.alertBox("error", "Please enter phoneNumber id");
      return;
    }

    context.alertBox("success", `OTP sent to ${formFields.email}`);
    Cookies.set("userEmail", formFields.phoneNumber);
    Cookies.set("actionType", "forgot-password");

    postData("/api/user/forgot-password", {
      phoneNumber: formFields.phoneNumber,
    }).then((res) => {
      if (res?.error === false) {
        context.alertBox("success", res?.message);
        router.push("/verifyAccount");
      } else {
        context.alertBox("error", res?.message);
      }
    });
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const valideValue = Object.values(formFields).every((el) => el);

  const getVendorDetails = () => {
    fetchDataFromApi(`/api/vendor/vendor-details`)
      .then((res) => {
        context?.setUserData(res.data);
      })
      .catch((err) => console.log("error : ", err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.phoneNumber === "") {
      context.alertBox("error", "Please enter phoneNumber id");
      setIsLoading(false);
      return;
    }

    if (formFields.password === "") {
      context.alertBox("error", "Please enter password");
      setIsLoading(false);
      return;
    }

    try {
      const res = await postData("/api/vendor/login", formFields, {
        withCredentials: true,
      });
      console.log("Login API response:", res);

      if (res?.error !== true && res?.data?.accesstoken) {
        setIsLoading(false);
        context.alertBox("success", res?.message || "Login successful");
        setFormFields({
          phoneNumber: "",
          password: "",
        });

        Cookies.set("accessToken", res.data.accesstoken, { path: "/" });
        Cookies.set("refreshToken", res.data.refreshToken, { path: "/" });
        localStorage.setItem("accessToken", res.data.accesstoken);
        localStorage.setItem("vendorId", res.data.vendorId);
        context.setIsLogin(true);
        // context.setUserData({
        //   name: res.data.name || formFields.phoneNumber.split("@")[0],
        //   phoneNumber: formFields.phoneNumber,
        // });
        getVendorDetails();

        const redirectUrl = searchParams.get("redirect") || "/";
        console.log("handleSubmit: Redirecting to:", redirectUrl);
        router.push(redirectUrl);
      } else {
        toast.error("Login failed");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
      setIsLoading(false);
    }
  };

  return (
    <section className="section py-5 sm:py-10 relative signInPage">
      <div className="shape-bottom">
        {" "}
        <svg
          fill="#fff"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 1921 819.8"
          style={{ enableBackground: "new 0 0 1921 819.8" }}
        >
          {" "}
          <path
            class="st0"
            d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6c107.6,57,212.1,40.7,245.7,34.4 c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
          ></path>{" "}
        </svg>
      </div>
      <div className="container relative z-[100] h-full flex items-center justify-center">
        <div className="card shadow-lg w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <div className="text-center w-full flex items-center justify-center mb-3">
            <img src="/logo.jpg" alt="logo"/>
          </div>
          <h3 className="text-center text-[22px] font-semibold text-black">
            Welcome Back!<br />
            Sign in with your credentials.
          </h3>

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="phone"
                id="phoneNumber"
                name="phoneNumber"
                value={formFields.phoneNumber}
                disabled={isLoading}
                label="Phone Number"
                variant="standard"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow ? "text" : "password"}
                id="password"
                label="Password"
                variant="standard"
                className="w-full"
                name="password"
                value={formFields.password}
                disabled={isLoading}
                onChange={onChangeInput}
              />
              <Button
                className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black"
                onClick={() => setIsPasswordShow(!isPasswordShow)}
              >
                {isPasswordShow ? (
                  <IoMdEyeOff className="text-[20px] opacity-75" />
                ) : (
                  <IoMdEye className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            <a
              className="link cursor-pointer text-[14px] font-[600]"
              onClick={forgotPassword}
            >
              Forgot Password?
            </a>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={!valideValue || isLoading}
                className="btn-org btn-lg w-full flex gap-3"
              >
                {isLoading ? <CircularProgress color="inherit" /> : "Login"}
              </Button>
            </div>

            <p className="text-center">
              Not Registered?{" "}
              <Link
                className="link text-[14px] font-[600] text-primary"
                href="/become-vendor"
              >
                Become Vendor
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <section className="section py-5 sm:py-10">
          <div className="container">
            <div className="card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10">
              <h3 className="text-center text-[18px] text-black">Loading...</h3>
              <div className="flex justify-center my-5">
                <CircularProgress />
              </div>
            </div>
          </div>
        </section>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}
