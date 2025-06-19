"use client";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { Button, FormControl, Select } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { MyContext } from "@/context/ThemeProvider";
import { useLanguage } from "@/context/LanguageContext";
import { fetchDataFromApi } from "@/utils/api";
import { useTranslation } from "@/utils/useTranslation";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoMenu } from "react-icons/io5";

/* -------------------------------------------------------------- */
/* Component                                                      */
/* -------------------------------------------------------------- */
const Header = ({ logo = "/sooqna.svg" }) => {
  const [lang, setlang] = useState(null);
  const openLang = Boolean(lang);

  const [selectedlang, setSelectedlang] = useState({
    img: "",
    lang: "",
  });

  const [isOpenNav, setIsOpenNav] = useState(false);

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

  const handleClickLang = (event) => {
    setlang(event.currentTarget);
  };
  const handleCloseLang = () => {
    setlang(null);
  };

  const selectedlangFun = (lang) => {
    setSelectedlang({
      img: lang.img,
      lang: lang.lang,
    });
    setlang(null);
    changeLanguage(lang.lang);
  };

  useEffect(() => {
    const lang = localStorage.getItem("locale");
    setSelectedlang({
      img: lang === "en" ? "/flags/en.png" : "/flags/ar.png",
      lang: lang === "en" ? "en" : "ar",
    });
  }, []);

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

  const toggleNav = () => {
    setIsOpenNav(true);
  };

  /* don’t render on pages that hide header ---------------------- */
  if (!context.isHeaderFooterShow) return null;

  return (
    <>
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
            <nav
              className={`flex items-center justify-center m-auto w-[60%] gap-4 transition-all ${
                isOpenNav === true && "open"
              }`}
            >
              <Link
                href="https://soouqna.com/"
                className="w-[140px] block lg:hidden mb-5"
                onClick={() => setIsOpenNav(false)}
              >
                <Image
                  src={logo}
                  alt="Soouqna Seller"
                  width={140}
                  height={40}
                  priority
                  style={{ objectFit: "contain" }}
                />
              </Link>

              <Link
                href="/"
                className="font-[600] text-[14px] hover:text-primary tab_"
                onClick={() => setIsOpenNav(false)}
              >
                {t("header.sellOnline")}
              </Link>
              <Link
                href="/how-works"
                className="font-[600] text-[14px] hover:text-primary tab_"
                onClick={() => setIsOpenNav(false)}
              >
                {t("header.howItWorks")}
              </Link>
              <Link
                href="/pricing"
                className="font-[600] text-[14px] hover:text-primary tab_"
                onClick={() => setIsOpenNav(false)}
              >
                {t("header.pricing")}
              </Link>
              <Link
                href="/shipping"
                className="font-[600] text-[14px] hover:text-primary tab_"
                onClick={() => setIsOpenNav(false)}
              >
                {t("header.shipping")}
              </Link>
              <Link
                href="/grow-business"
                className="font-[600] text-[14px] hover:text-primary tab_"
                onClick={() => setIsOpenNav(false)}
              >
                {t("header.growBusiness")}
              </Link>

              {mounted && !context.isLogin && (
                <div className="flex lg:hidden items-center gap-2 mt-3">
                  <Link href="/login">
                    <Button
                      className="btn-org btn-border btn-sm h-[36px]"
                      onClick={() => setIsOpenNav(false)}
                      size="small"
                    >
                      {t("header.login")}
                    </Button>
                  </Link>
                  <Link href="/become-vendor">
                    <Button
                      className="btn-org btn-sm h-[36px]"
                      size="small"
                      onClick={() => setIsOpenNav(false)}
                    >
                      {t("header.startSelling")}
                    </Button>
                  </Link>
                </div>
              )}
            </nav>

            <div
              className={`nav-overlay w-full h-full fixed top-0 left-0 z-[100] bg-[rgba(0,0,0,0.6)]  ${
                isOpenNav === true ? "show" : "hidden"
              }`}
              onClick={() => setIsOpenNav(false)}
            ></div>

            <div className="relative mr-0 lg:mr-5 flex items-center gap-5">
              <Button
                className="flex items-center gap-1"
                onClick={handleClickLang}
              >
                <Image
                  src={selectedlang.img}
                  alt="lang"
                  width={25}
                  height={25}
                />
                <span className="text-gray-800">{selectedlang.lang}</span>
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={lang}
                open={openLang}
                onClose={handleCloseLang}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
              >
                <MenuItem
                  onClick={() =>
                    selectedlangFun({
                      img: "/flags/en.png",
                      lang: "en",
                    })
                  }
                  className="flex items-center gap-1"
                >
                  <Image
                    src="/flags/en.png"
                    alt="English"
                    width={25}
                    height={25}
                  />
                  <span className="text-gray-800 text-[15px]">EN</span>
                </MenuItem>

                <MenuItem
                  onClick={() =>
                    selectedlangFun({
                      img: "/flags/ar.png",
                      lang: "ar",
                    })
                  }
                  className="flex items-center gap-1"
                >
                  <Image
                    src="/flags/ar.png"
                    alt="Arabic"
                    width={25}
                    height={25}
                  />
                  <span className="text-gray-800  text-[15px]">AR</span>
                </MenuItem>
              </Menu>

              {context?.windowWidth < 992 && (
                <IoMenu size={35} onClick={toggleNav} />
              )}
            </div>

            {/* auth buttons / account ------------------------------- */}
            {showAuthLinks && context?.windowWidth > 992 && (
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

      <div className="afterHeader"></div>
    </>
  );
};

export default Header;
