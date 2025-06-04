"use client";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { MyContext } from "@/context/ThemeProvider";
import { useLanguage } from "@/context/LanguageContext";
import { fetchDataFromApi } from "@/utils/api";
import { useTranslation } from "@/utils/useTranslation";

/* -------------------------------------------------------------- */
/* Component                                                      */
/* -------------------------------------------------------------- */
const Header = ({ logo = "/sooqna.svg" }) => {
  const context = useContext(MyContext);
  const { locale, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const router = useRouter();

  /* track “hasMounted” to avoid SSR mismatches                     */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* memo helpers                                                   */
  const windowWidth = context.windowWidth ?? 0;
  const isDesktop = windowWidth > 992;
  const showAuthLinks = mounted && !context.isLogin && isDesktop;
  const showAccount = mounted && context.isLogin && isDesktop;

  /* logout ------------------------------------------------------- */
  const logout = async () => {
    const res = await fetchDataFromApi(
      `/api/vendor/logout?token=${localStorage.getItem("accessToken")}`,
      { withCredentials: true }
    );
    if (!res?.error) {
      context.setIsLogin(false);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      router.push("/");
    }
  };

  /* don’t render on pages that hide header ---------------------- */
  if (!context.isHeaderFooterShow) return null;

  return (
    <header className="fixed bg-white lg:sticky left-0 w-full top-0 z-[101] py-3">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* logo -------------------------------------------------- */}
          <Link href="/" className="w-[140px] block">
            <Image
              src={logo}
              alt="Soouqna Seller"
              width={140}
              height={40}
              priority
              style={{ objectFit: "contain" }}
            />
          </Link>

          {/* nav items -------------------------------------------- */}
          <nav className="flex items-center justify-center m-auto w-[60%] gap-4">
            <Link
              href="/"
              className="font-[600] text-[14px] hover:text-primary"
            >
              {t("header.sellOnline")}
            </Link>
            <Link
              href="/how-works"
              className="font-[600] text-[14px] hover:text-primary"
            >
              {t("header.howItWorks")}
            </Link>
            <Link
              href="/pricing"
              className="font-[600] text-[14px] hover:text-primary"
            >
              {t("header.pricing")}
            </Link>
            <Link
              href="/shipping"
              className="font-[600] text-[14px] hover:text-primary"
            >
              {t("header.shipping")}
            </Link>
            <Link
              href="/grow-business"
              className="font-[600] text-[14px] hover:text-primary"
            >
              {t("header.growBusiness")}
            </Link>
          </nav>

          {/* language switcher ------------------------------------ */}
          <FormControl sx={{ m: 1, minWidth: 120, zoom: 0.8 }}>
            <Select
              size="small"
              value={locale}
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ar">العربية</MenuItem>
            </Select>
          </FormControl>

          {/* auth buttons / account ------------------------------- */}
          {showAuthLinks && (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  className="btn-org btn-border btn-sm h-[36px]"
                  size="small"
                >
                  {t("header.login")}
                </Button>
              </Link>
              <Link href="/become-vendor">
                <Button className="btn-org btn-sm h-[36px]" size="small">
                  {t("header.startSelling")}
                </Button>
              </Link>
            </div>
          )}

          {showAccount && (
            <div className="flex items-center gap-2">
              <Link href="/my-account">
                <Button className="btn-org btn-sm h-[36px]" size="small">
                  {t("header.myAccount")}
                </Button>
              </Link>
              <Button
                className="btn-org btn-border btn-sm h-[36px]"
                size="small"
                onClick={logout}
              >
                {t("header.logout")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
