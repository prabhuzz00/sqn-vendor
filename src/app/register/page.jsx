"use client"
import React, { useContext, useEffect, useState,useCallback } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "@/context/ThemeProvider";
import { postData } from "@/utils/api";
import CircularProgress from '@mui/material/CircularProgress';

import { useSession, signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

const Register = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
   const [isProcessing, setIsProcessing] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: ""
  })

  const context = useContext(MyContext);
  const router = useRouter();

   const { data: session, status } = useSession();
  

    useEffect(()=>{
        if (typeof window !== "undefined") { // Ensure this runs only on client
            window.scrollTo(0, 0)
        }
    },[])
  

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value
      }
    })
  }

  const valideValue = Object.values(formFields).every(el => el)

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("error", "Please enter full name");
      return false
    }

    if (formFields.email === "") {
      context.alertBox("error", "Please enter email id");
      return false
    }


    if (formFields.password === "") {
      context.alertBox("error", "Please enter password");
      return false
    }


    postData("/api/user/register", formFields).then((res) => {

      if (res?.error !== true) {
        setIsLoading(false);
        context.alertBox("success", res?.message);
        Cookies.set('userEmail',formFields.email);
        setFormFields({
          name: "",
          email: "",
          password: ""
        })

        router.push("/login")
      } else {
        context.alertBox("error", res?.message);
        setIsLoading(false);
      }

    })


  }



    const handleAuthenticatedSession = useCallback(async (sessionData) => {
        if (isProcessing) return;
        setIsProcessing(true);

        const fields = {
            name: sessionData.user.name,
            email: sessionData.user.email,
            password: null,
            avatar: sessionData.user.image,
            phone: "",
        };

        try {
            const res = await postData("/api/user/authWithGoogle", fields);


            Cookies.set("token", res.token, { expires: 30 });

            Cookies.set('userEmail', fields.email)
            Cookies.set('accessToken', res?.data?.accesstoken)
            Cookies.set('refreshToken', res?.data?.refreshToken)

            context.setIsLogin(true);
            context.alertBox("success", "Login Successfully.");
            
            setTimeout(() => {
                router.push("/")
            }, 2000);

        } catch (error) {
            console.error("Error posting data to backend:", error);

            context.alertBox("error", "An error occurred during sign-in.");

        } finally {
            setIsProcessing(false);
        }
    }, [context, router, isProcessing]);

    useEffect(() => {
        if (status === "authenticated" && session && !isProcessing) {
            handleAuthenticatedSession(session);
        }
    }, [status, session, handleAuthenticatedSession, isProcessing]);

    const authWithGoogle = () => {
        signIn("google");
    }

  return (
    <section className="section py-5 sm:py-10">
      <div className="container">
        <div className="card shadow-md w-full sm:w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[18px] text-black">
            Register with a new account
          </h3>

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="form-group w-full mb-5">
              <TextField
                type="text"
                id="name"
                name="name"
                value={formFields.name}
                disabled={isLoading === true ? true : false}
                label="Full Name"
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>


            <div className="form-group w-full mb-5">
              <TextField
                type="emai"
                id="email"
                name="email"
                label="Email Id"
                value={formFields.email}
                disabled={isLoading === true ? true : false}
                variant="outlined"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="form-group w-full mb-5 relative">
              <TextField
                type={isPasswordShow === false ? 'password' : 'text'}
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                className="w-full"
                value={formFields.password}
                disabled={isLoading === true ? true : false}
                onChange={onChangeInput}
              />
              <Button className="!absolute top-[10px] right-[10px] z-50 !w-[35px] !h-[35px] !min-w-[35px] !rounded-full !text-black" onClick={() => {
                setIsPasswordShow(!isPasswordShow)
              }}>
                {
                  isPasswordShow === false ? <IoMdEye className="text-[20px] opacity-75" /> :
                    <IoMdEyeOff className="text-[20px] opacity-75" />
                }
              </Button>
            </div>

            <div className="flex items-center w-full mt-3 mb-3">
              <Button type="submit" disabled={!valideValue} className="btn-org btn-lg w-full flex gap-3">
                {
                  isLoading === true ? <CircularProgress color="inherit" />
                    :
                    'Register'
                }

              </Button>
            </div>

            <p className="text-center">Already have an account? <Link className="link text-[14px] font-[600] text-primary" href="/login"> Login</Link></p>


            <p className="text-center font-[500]">Or continue with social account</p>

            <Button className="flex gap-3 w-full !bg-[#f1f1f1] btn-lg !text-black"
              onClick={authWithGoogle}>
              <FcGoogle className="text-[20px]" /> Sign Up with Google</Button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
