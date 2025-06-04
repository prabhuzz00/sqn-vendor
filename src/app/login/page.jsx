"use client";

import React, { Suspense, useContext, useEffect, useState } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image"; // ← NEW
import { MyContext } from "@/context/ThemeProvider";
import { fetchDataFromApi, postData } from "@/utils/api";
import { toast } from "react-toastify";
import { useTranslation } from "@/utils/useTranslation";

const LoginPageContent = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [formFields, setFormFields] = useState({
    phoneNumber: "",
    password: "",
  });

  const context = useContext(MyContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  /* Redirect if already logged in ----------------------------------- */
  useEffect(() => {
    if (context.isLogin) {
      router.push(searchParams.get("redirect") || "/my-account");
    }
  }, [context.isLogin, router, searchParams]);

  /* Scroll to top on mount ------------------------------------------ */
  useEffect(() => window?.scrollTo(0, 0), []);

  /* ---------------------------------------------------------------- */
  /* Helpers                                                          */
  /* ---------------------------------------------------------------- */
  const onChangeInput = ({ target: { name, value } }) =>
    setFormFields((prev) => ({ ...prev, [name]: value }));

  const forgotPassword = () => {
    if (!formFields.phoneNumber) {
      context.alertBox("error", t("login.enterPhoneNumber"));
      return;
    }

    Cookies.set("userEmail", formFields.phoneNumber);
    Cookies.set("actionType", "forgot-password");

    postData("/api/user/forgot-password", {
      phoneNumber: formFields.phoneNumber,
    }).then((res) => {
      if (!res?.error) {
        context.alertBox("success", res.message);
        router.push("/verifyAccount");
      } else {
        context.alertBox("error", res.message);
      }
    });
  };

  const valid = formFields.phoneNumber && formFields.password;

  const getVendorDetails = () =>
    fetchDataFromApi("/api/vendor/vendor-details")
      .then((res) => context.setUserData(res.data))
      .catch(console.error);

  /* ---------------------------------------------------------------- */
  /* Submit                                                            */
  /* ---------------------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid) return;

    setIsLoading(true);

    const isEmail = formFields.phoneNumber.includes("@");
    const payload = {
      password: formFields.password,
      ...(isEmail
        ? { email: formFields.phoneNumber }
        : { phoneNumber: formFields.phoneNumber }),
    };

    try {
      const res = await postData("/api/vendor/login", payload, {
        withCredentials: true,
      });

      if (!res?.error && res?.data?.accesstoken) {
        context.alertBox("success", res.message || t("login.loginSuccessful"));
        setFormFields({ phoneNumber: "", password: "" });

        Cookies.set("accessToken", res.data.accesstoken, { path: "/" });
        Cookies.set("refreshToken", res.data.refreshToken, { path: "/" });
        localStorage.setItem("accessToken", res.data.accesstoken);
        localStorage.setItem("vendorId", res.data.vendorId);
        context.setIsLogin(true);
        getVendorDetails();

        router.push(searchParams.get("redirect") || "/");
      } else {
        toast.error(t("login.loginFailed"));
      }
    } catch (err) {
      console.error(err);
      toast.error(t("login.error"));
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */
  return (
    <section className="section py-5 sm:py-10 relative signInPage">
      {/* decorative wave ------------------------------------------------ */}
      <div className="shape-bottom">
        <svg
          fill="#fff"
          viewBox="0 0 1921 819.8"
          style={{ enableBackground: "new 0 0 1921 819.8" }}
        >
          <path
            className="st0"
            d="M1921,413.1v406.7H0V0.5h0.4l228.1,598.3c30,74.4,80.8,130.6,152.5,168.6
               c107.6,57,212.1,40.7,245.7,34.4c22.4-4.2,54.9-13.1,97.5-26.6L1921,400.5V413.1z"
          />
        </svg>
      </div>

      {/* card ----------------------------------------------------------- */}
      <div className="container z-[100] relative flex items-center justify-center">
        <div className="card shadow-lg w-full sm:w-[400px] bg-white rounded-md p-5 px-10">
          <div className="flex justify-center mb-3">
            <Image /* ← optimised image */
              src="/logo.jpg"
              alt="Surprise King logo"
              width={150}
              height={50}
            />
          </div>

          <h3 className="text-center text-[22px] font-semibold text-black">
            {t("login.welcomeBack")}
            <br />
            {t("login.signInWithCredentials")}
          </h3>

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            {/* phone / email -------------------------------------------- */}
            <div className="form-group w-full mb-5">
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                value={formFields.phoneNumber}
                disabled={isLoading}
                label={t("login.phoneOrEmail")}
                variant="standard"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            {/* password -------------------------------------------------- */}
            <div className="form-group w-full mb-5 relative">
              <TextField
                id="password"
                name="password"
                type={isPasswordShow ? "text" : "password"}
                value={formFields.password}
                disabled={isLoading}
                label={t("login.password")}
                variant="standard"
                className="w-full"
                onChange={onChangeInput}
              />
              <Button
                className="!absolute top-[10px] right-[10px] !w-[35px] !h-[35px] !min-w-[35px] !rounded-full"
                onClick={() => setIsPasswordShow((s) => !s)}
              >
                {isPasswordShow ? (
                  <IoMdEyeOff className="text-[20px] opacity-75" />
                ) : (
                  <IoMdEye className="text-[20px] opacity-75" />
                )}
              </Button>
            </div>

            {/* forgot ---------------------------------------------------- */}
            <a
              className="link cursor-pointer text-[14px] font-[600]"
              onClick={forgotPassword}
            >
              {t("login.forgotPassword")}
            </a>

            {/* submit ---------------------------------------------------- */}
            <div className="flex items-center w-full mt-3 mb-3">
              <Button
                type="submit"
                disabled={!valid || isLoading}
                className="btn-org btn-lg w-full flex gap-3"
              >
                {isLoading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  t("login.login")
                )}
              </Button>
            </div>

            {/* footer ---------------------------------------------------- */}
            <p className="text-center">
              {t("login.notRegistered")}{" "}
              <Link
                href="/become-vendor"
                className="link text-[14px] font-[600] text-primary"
              >
                {t("login.becomeVendor")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------- */
/* Suspense wrapper                                                     */
/* -------------------------------------------------------------------- */
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <section className="section py-5 sm:py-10">
          <div className="container">
            <div className="card shadow-md w-full sm:w-[400px] m-auto bg-white rounded-md p-5 px-10">
              <h3 className="text-center text-[18px] text-black">Loading…</h3>
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
