"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { MyContext } from "@/context/ThemeProvider";

export default function ProtectedLayout({ children }) {
  const context = useContext(MyContext);
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    const isAuthenticated = token && context?.isLogin;

    console.log(
      "ProtectedLayout check:",
      "token:",
      !!token,
      "isLogin:",
      context?.isLogin,
      "pathname:",
      pathname
    );

    if (!isAuthenticated) {
      console.log("Unauthorized, redirecting to /login from:", pathname);
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setIsLoading(false);
    }
  }, [context?.isLogin, router, pathname]);

  // Prevent rendering until auth check is complete
  if (isLoading || !context) {
    return null; // Or a loading spinner
  }

  return children;
}