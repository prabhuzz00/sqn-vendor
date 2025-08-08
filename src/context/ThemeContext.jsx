"use client";
import React, { useState, useEffect, useCallback } from "react";
import { MyContext } from "./ThemeProvider";
import Cookies from "js-cookie";
import { fetchDataFromApi, postData } from "@/utils/api";
import toast, { Toaster } from "react-hot-toast";

const ThemeProvider = ({ children }) => {
  /* ------------------------------------------------------------------ */
  /* State                                                               */
  /* ------------------------------------------------------------------ */
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
    open: false,
    item: {},
  });
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState(null);
  const [catData, setCatData] = useState([]);

  const [openBankPanel, setOpenBankPanel] = useState(false);
  const [bankMode, setBankMode] = useState("add");
  const [bankId, setBankId] = useState("");
  const [windowWidth, setWindowWidth] = useState(null);
  const [isHeaderFooterShow, setIsHeaderFooterShow] = useState(true);
  const [siteSettings, setSiteSettings] = useState({});

  /* ------------------------------------------------------------------ */
  /* Window width helper                                                 */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  /* ------------------------------------------------------------------ */
  /* Toast helper                                                        */
  /* ------------------------------------------------------------------ */
  const alertBox = (type, msg) =>
    type === "success" ? toast.success(msg) : toast.error(msg);

  /* ------------------------------------------------------------------ */
  /* Data-fetch helpers (memoised)                                       */
  /* ------------------------------------------------------------------ */
  const getUserDetails = useCallback(() => {
    fetchDataFromApi("/api/vendor/vendor-details").then((res) => {
      setUserData(res.data);
      if (
        res?.response?.data?.error &&
        res.response.data.message === "You have not login"
      ) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        alertBox("error", "Your session is closed, please log in again");
        setIsLogin(false);
      }
    });
  }, []);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const res = await fetchDataFromApi("/api/site-settings");
        const settings = res?.data || {};

        Cookies.set("siteSettings", JSON.stringify(settings), { expires: 1 });
        setSiteSettings(settings);
      } catch (err) {
        console.error("Error fetching site settings:", err);

        // Fallback to cookie if available
        const cookieData = Cookies.get("siteSettings");
        if (cookieData) {
          setSiteSettings(JSON.parse(cookieData));
        }
      }
    };

    fetchSiteSettings();
  }, []);

  /* ------------------------------------------------------------------ */
  /* On mount: fetch categories                                          */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    fetchDataFromApi("/api/category/getVendorCategories").then((res) => {
      if (!res?.error) setCatData(res.data);
    });
  }, []);

  /* ------------------------------------------------------------------ */
  /* Auth token check                                                    */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const token = Cookies.get("accessToken");

    if (token) {
      setIsLogin(true);
      getUserDetails();
    } else {
      setIsLogin(false);
    }
  }, [isLogin, getUserDetails]);

  /* ------------------------------------------------------------------ */
  /* Product-details modal helpers                                       */
  /* ------------------------------------------------------------------ */
  const handleOpenProductDetailsModal = (open, item) =>
    setOpenProductDetailsModal({ open, item });

  const handleCloseProductDetailsModal = () =>
    setOpenProductDetailsModal({ open: false, item: {} });

  /* ------------------------------------------------------------------ */
  /* Panel togglers                                                      */
  /* ------------------------------------------------------------------ */

  const toggleBankPanel = (state) => () => {
    if (!state) setBankMode("add");
    setOpenBankPanel(state);
  };

  /* ------------------------------------------------------------------ */
  /* Context value                                                       */
  /* ------------------------------------------------------------------ */
  const values = {
    /* modals & panels */
    openProductDetailsModal,
    handleOpenProductDetailsModal,
    handleCloseProductDetailsModal,
    setOpenBankPanel,
    openBankPanel,
    toggleBankPanel,

    /* auth & user */
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    alertBox,
    getUserDetails,

    /* address / bank modes */
    bankMode,
    setBankMode,

    bankId,
    setBankId,

    /* misc */
    windowWidth,
    isHeaderFooterShow,
    catData,

    siteSettings,
    setSiteSettings,
  };

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */
  return (
    <MyContext.Provider value={values}>
      {children}
      <Toaster />
    </MyContext.Provider>
  );
};

export default ThemeProvider;
