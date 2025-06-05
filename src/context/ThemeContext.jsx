// "use client";
// import React from "react";
// import { useState, useEffect } from "react";
// import { MyContext } from "./ThemeProvider";
// import Cookies from "js-cookie";
// import { fetchDataFromApi, postData } from "@/utils/api";
// import toast, { Toaster } from "react-hot-toast";

// import { usePathname } from "next/navigation";

// const ThemeProvider = ({ children }) => {
//   const [openProductDetailsModal, setOpenProductDetailsModal] = useState({
//     open: false,
//     item: {},
//   });
//   const [isLogin, setIsLogin] = useState(true);
//   const [userData, setUserData] = useState(null);
//   const [catData, setCatData] = useState([]);
//   const [myListData, setMyListData] = useState([]);

//   const [openCartPanel, setOpenCartPanel] = useState(false);
//   const [openAddressPanel, setOpenAddressPanel] = useState(false);

//   const [addressMode, setAddressMode] = useState("add");
//   const [addressId, setAddressId] = useState("");

//   const [openBankPanel, setOpenBankPanel] = useState(false);
//   const [bankMode, setBankMode] = useState("add");
//   const [bankId, setBankId] = useState("");

//   const [searchData, setSearchData] = useState([]);
//   const [windowWidth, setWindowWidth] = useState(null);

//   const [openFilter, setOpenFilter] = useState(false);
//   const [isFilterBtnShow, setisFilterBtnShow] = useState(false);

//   const [openSearchPanel, setOpenSearchPanel] = useState(false);
//   const [isHeaderFooterShow, setIsHeaderFooterShow] = useState(true);
//   const [url, setUrl] = useState("");

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Ensure this runs only on client
//       // Function to update width
//       const updateWidth = () => setWindowWidth(window.innerWidth);

//       setWindowWidth(window.innerWidth); // Set initial width
//       window.addEventListener("resize", updateWidth); // Listen for resize events

//       // Cleanup function to remove event listener when component unmounts
//       return () => window.removeEventListener("resize", updateWidth);
//     }
//   }, []);

//   const handleOpenProductDetailsModal = (status, item) => {
//     setOpenProductDetailsModal({
//       open: status,
//       item: item,
//     });
//   };

//   const handleCloseProductDetailsModal = () => {
//     setOpenProductDetailsModal({
//       open: false,
//       item: {},
//     });
//   };

//   const toggleCartPanel = (newOpen) => () => {
//     setOpenCartPanel(newOpen);
//   };

//   const toggleAddressPanel = (newOpen) => () => {
//     if (newOpen == false) {
//       setAddressMode("add");
//     }

//     setOpenAddressPanel(newOpen);
//   };

//   const toggleBankPanel = (newOpen) => () => {
//     if (newOpen == false) {
//       setBankMode("add");
//     }

//     setOpenBankPanel(newOpen);
//   };

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(() => {
//     const token = Cookies.get("accessToken");

//     if (token !== undefined && token !== null && token !== "") {
//       setIsLogin(true);

//       getMyListData();
//       getUserDetails();
//     } else {
//       setIsLogin(false);
//     }
//   }, [isLogin]);

//   const getUserDetails = () => {
//     fetchDataFromApi(`/api/vendor/vendor-details`).then((res) => {
//       setUserData(res.data);
//       if (res?.response?.data?.error === true) {
//         if (res?.response?.data?.message === "You have not login") {
//           Cookies.remove("accessToken");
//           Cookies.remove("refreshToken");
//           alertBox("error", "Your session is closed please login again");
//           setIsLogin(false);
//         }
//       }
//     });
//   };

//   useEffect(() => {
//     fetchDataFromApi("/api/category").then((res) => {
//       if (res?.error === false) {
//         setCatData(res?.data);
//       }
//     });
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Ensure this runs only on client
//       // Function to update width
//       const handleResize = () => {
//         setWindowWidth(window.innerWidth);
//       };

//       window.addEventListener("resize", handleResize);

//       return () => {
//         window.removeEventListener("resize", handleResize);
//       };
//     }
//   }, []);

//   const alertBox = (type, msg) => {
//     if (type === "success") {
//       toast.success(msg);
//     }
//     if (type === "error") {
//       toast.error(msg);
//     }
//   };

//   const addToCart = (product, userId, quantity) => {
//     if (userId === undefined) {
//       alertBox("error", "you are not login please login first");
//       return false;
//     }

//     const data = {
//       productTitle: product?.name,
//       image: product?.image,
//       rating: product?.rating,
//       price: product?.price,
//       oldPrice: product?.oldPrice,
//       discount: product?.discount,
//       quantity: quantity,
//       subTotal: parseInt(product?.price * quantity),
//       productId: product?._id,
//       countInStock: product?.countInStock,
//       brand: product?.brand,
//       size: product?.size,
//       weight: product?.weight,
//       ram: product?.ram,
//     };

//     postData("/api/cart/add", data).then((res) => {
//       if (res?.error === false) {
//         alertBox("success", res?.message);

//         getCartItems();
//       } else {
//         alertBox("error", res?.message);
//       }
//     });
//   };

//   const getMyListData = () => {
//     fetchDataFromApi("/api/myList").then((res) => {
//       if (res?.error === false) {
//         setMyListData(res?.data);
//       }
//     });
//   };

//   const values = {
//     openProductDetailsModal,
//     setOpenProductDetailsModal,
//     handleOpenProductDetailsModal,
//     handleCloseProductDetailsModal,
//     setOpenCartPanel,
//     toggleCartPanel,
//     openCartPanel,
//     setOpenAddressPanel,
//     toggleAddressPanel,
//     openAddressPanel,
//     setOpenBankPanel,
//     toggleBankPanel,
//     openBankPanel,
//     isLogin,
//     setIsLogin,
//     alertBox,
//     setUserData,
//     userData,
//     catData,

//     getUserDetails,
//     setAddressMode,
//     addressMode,
//     addressId,
//     setAddressId,
//     setBankMode,
//     bankMode,
//     bankId,
//     setBankId,
//     setSearchData,
//     searchData,
//     windowWidth,
//     setOpenFilter,
//     openFilter,
//     setisFilterBtnShow,
//     isFilterBtnShow,
//     setOpenSearchPanel,
//     openSearchPanel,
//     isHeaderFooterShow,
//   };

//   return (
//     <MyContext.Provider value={values}>
//       {children}
//       <Toaster />
//     </MyContext.Provider>
//   );
// };

// export default ThemeProvider;

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
