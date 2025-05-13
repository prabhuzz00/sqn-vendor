"use client";
import React, { useContext, useState, useEffect } from "react";

import { Button, FormControl, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import { MyContext } from "@/context/ThemeProvider";
import { useLanguage } from "@/context/LanguageContext";
import { fetchDataFromApi } from "@/utils/api";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useTranslation } from "@/utils/useTranslation";

const Header = ({ logo = "/sooqna.svg" }) => {
  const [isClient, setIsClient] = useState(false);
  const [clientWindowWidth, setClientWindowWidth] = useState(undefined);

  const context = useContext(MyContext);
  const router = useRouter();
  const { locale, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
    setClientWindowWidth(context?.windowWidth);
  }, [context?.windowWidth]);

  useEffect(() => {
    if (isClient && context?.isLogin) {
      // allowLocation();
    }
  }, [isClient, context?.isLogin]);

  const logout = () => {
    fetchDataFromApi(
      `/api/vendor/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true }
    ).then((res) => {
      if (res?.error === false) {
        context.setIsLogin(false);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        router.push("/");
      }
    });
  };

  return (
    <>
      {context?.isHeaderFooterShow === true && (
        <header className="fixed bg-white lg:sticky left-0 w-full top-0 z-[101] py-3">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="logo w-[140px]">
                <Link href="/">
                  <img src={logo} className="logo" alt="logo" />
                </Link>
              </div>

              <nav className="flex items-center justify-center m-auto w-[60%] gap-4">
                <Link
                  href={"/"}
                  className="font-[600] text-[14px] hover:text-primary"
                >
                  {t("header.sellOnline")}
                </Link>
                <Link
                  href={"/"}
                  className="font-[600] text-[14px] hover:text-primary"
                >
                  {t("header.howItWorks")}
                </Link>
                <Link
                  href={"/"}
                  className="font-[600] text-[14px] hover:text-primary"
                >
                  {t("header.pricing")}
                </Link>
                <Link
                  href={"/"}
                  className="font-[600] text-[14px] hover:text-primary"
                >
                  {t("header.shipping")}
                </Link>
                <Link
                  href={"/"}
                  className="font-[600] text-[14px] hover:text-primary"
                >
                  {t("header.growBusiness")}
                </Link>
                <Link
                  href={"/"}
                  className="font-[600] text-[14px] hover:text-primary"
                >
                  {t("header.noGST")}
                </Link>
              </nav>

              <div className="list-none relative" style={{ zoom: "80%" }}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    size="small"
                    value={locale}
                    onChange={(e) => changeLanguage(e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={"en"}>English</MenuItem>
                    <MenuItem value={"ar"}>العربية</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {context.isLogin === false &&
              isClient &&
              clientWindowWidth !== undefined &&
              clientWindowWidth > 992 ? (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    {" "}
                    <Button
                      className="btn-org btn-border btn-sm h-[36px]"
                      size="small"
                    >
                      {t("header.login")}
                    </Button>
                  </Link>
                  <Link href="/become-vendor">
                    {" "}
                    <Button className="btn-org btn-sm  h-[36px]" size="small">
                      {t("header.startSelling")}
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  {isClient &&
                    clientWindowWidth !== undefined &&
                    clientWindowWidth > 992 && (
                      <Link href="/my-account">
                        {" "}
                        <Button
                          className="btn-org btn-sm  h-[36px]"
                          size="small"
                        >
                          {t("header.myAccount")}
                        </Button>
                      </Link>
                    )}
                </>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
