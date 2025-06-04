"use client";
import React, { useContext, useEffect, useState } from "react";
import AccountSidebar from "../../components/AccountSidebar";
import { MyContext } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { fetchDataFromApi } from "@/utils/api";
import { useTranslation } from "@/utils/useTranslation";

const MyReports = () => {
  const { t } = useTranslation();
  const context = useContext(MyContext);
  const router = useRouter();

  const [totalOrders, setTotalOrders] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);
  const vendorId =
    typeof window !== "undefined" ? localStorage.getItem("vendorId") : null;

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/");
    }
  }, [context?.isLogin]);

  useEffect(() => {
    if (!vendorId) return;

    fetchDataFromApi(`/api/order/count-vendor?vendorId=${vendorId}`).then(
      (data) => {
        if (!data.error) setTotalOrders(data.count);
      }
    );

    fetchDataFromApi(`/api/order/sales-vendor?vendorId=${vendorId}`).then(
      (data) => {
        if (!data.error) setMonthlySales(data.monthlySales);
      }
    );
  }, [vendorId]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 shadow-md rounded border text-sm">
          <p className="font-semibold">{label}</p>
          <p>
            {t("reportsPage.tooltip.totalSales")}: ${data.TotalSales}
          </p>
          <p>
            {t("reportsPage.tooltip.totalOrders")}: {data.TotalOrders}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="py-3 lg:py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-[20%]">
          <AccountSidebar />
        </div>

        <div className="col2 w-full lg:w-[80%]">
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <div className="flex items-center pb-3 justify-between">
              <h2 className="text-lg font-semibold">
                {t("reportsPage.myReports")}
              </h2>
              <div className="text-sm text-gray-500">
                {t("reportsPage.totalOrders")}: {totalOrders}
              </div>
            </div>
            <hr className="mb-5" />
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlySales}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="TotalSales"
                    fill="#8884d8"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyReports;

// "use client";
// import React, {
//   useContext,
//   useEffect,
//   useState,
//   useCallback,
//   useMemo,
// } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Bar,
// } from "recharts";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";

// import AccountSidebar from "../../components/AccountSidebar";
// import { MyContext } from "@/context/ThemeProvider";
// import { fetchDataFromApi } from "@/utils/api";
// import { useTranslation } from "@/utils/useTranslation";

// /* ------------------------------------------------------------------ */
// /* Stand-alone tooltip (stable ref)                                   */
// /* ------------------------------------------------------------------ */
// const TooltipBox = ({ active, payload, label, t }) =>
//   active && payload?.length ? (
//     <div className="bg-white p-2 shadow-md rounded border text-sm">
//       <p className="font-semibold">{label}</p>
//       <p>
//         {t("reportsPage.tooltip.totalSales")}: ${payload[0].payload.TotalSales}
//       </p>
//       <p>
//         {t("reportsPage.tooltip.totalOrders")}: {payload[0].payload.TotalOrders}
//       </p>
//     </div>
//   ) : null;

// /* ------------------------------------------------------------------ */
// /* Page component                                                     */
// /* ------------------------------------------------------------------ */
// const MyReports = () => {
//   const { t } = useTranslation();
//   const router = useRouter();
//   const { isLogin } = useContext(MyContext);

//   /* auth-gated render flag ---------------------------------------- */
//   const [canRender, setCanRender] = useState(false);

//   /* reports data --------------------------------------------------- */
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [monthlySales, setMonthlySales] = useState([]);

//   /* on first client tick decide whether to redirect or render ------ */
//   useEffect(() => {
//     if (typeof window === "undefined") return; // SSR safeguard

//     if (!Cookies.get("accessToken")) {
//       router.replace("/");
//     } else {
//       setCanRender(true);
//     }
//   }, [router, isLogin]);

//   /* fetch helper --------------------------------------------------- */
//   const fetchReports = useCallback(async (vendorId) => {
//     if (!vendorId) return;

//     try {
//       const [ordRes, salesRes] = await Promise.all([
//         fetchDataFromApi(`/api/order/count-vendor?vendorId=${vendorId}`),
//         fetchDataFromApi(`/api/order/sales-vendor?vendorId=${vendorId}`),
//       ]);

//       if (!ordRes.error) setTotalOrders(ordRes.count);
//       if (!salesRes.error) setMonthlySales(salesRes.monthlySales);
//     } catch (err) {
//       console.error("Report fetch error:", err);
//     }
//   }, []);

//   /* trigger fetch once vendorId is ready --------------------------- */
//   useEffect(() => {
//     if (!canRender) return;
//     const id = localStorage.getItem("vendorId");
//     fetchReports(id);
//   }, [canRender, fetchReports]);

//   /* stable tooltip instance --------------------------------------- */
//   const tooltipContent = useMemo(
//     () => (props) => <TooltipBox {...props} t={t} />,
//     [t]
//   );

//   /* early return while deciding auth ------------------------------ */
//   if (!canRender) return null;

//   /* JSX ----------------------------------------------------------- */
//   return (
//     <section className="py-3 lg:py-10 w-full">
//       <div className="container flex flex-col lg:flex-row gap-5">
//         <div className="w-full lg:w-[20%]">
//           <AccountSidebar />
//         </div>

//         <div className="w-full lg:w-[80%]">
//           <div className="card bg-white p-5 shadow-md rounded-md mb-5">
//             <div className="flex items-center justify-between pb-3">
//               <h2 className="text-lg font-semibold">
//                 {t("reportsPage.myReports")}
//               </h2>
//               <span className="text-sm text-gray-500">
//                 {t("reportsPage.totalOrders")}: {totalOrders}
//               </span>
//             </div>
//             <hr className="mb-5" />

//             <div className="w-full h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart
//                   data={monthlySales}
//                   margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip content={tooltipContent} />
//                   <Bar
//                     dataKey="TotalSales"
//                     fill="#8884d8"
//                     radius={[10, 10, 0, 0]}
//                   />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MyReports;
