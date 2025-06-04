"use client";

import React, { useEffect, useState } from "react";
import AccountSidebar from "@/components/AccountSidebar";
import { Button } from "@mui/material";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Badge from "@/components/Badge";
import { fetchDataFromApi } from "@/utils/api";
import Pagination from "@mui/material/Pagination";
import { useTranslation } from "@/utils/useTranslation";
import Image from "next/image"; // ← NEW

const Orders = () => {
  const { t } = useTranslation();

  const [openRow, setOpenRow] = useState(null); // which order is expanded
  const [orders, setOrders] = useState({ data: [], totalPages: 0 });
  const [page, setPage] = useState(1);

  /* -------------------------------------------------------------- */
  /* Helpers                                                        */
  /* -------------------------------------------------------------- */
  const toggleRow = (idx) => setOpenRow((cur) => (cur === idx ? null : idx));

  /* Scroll to top on mount --------------------------------------- */
  useEffect(() => window.scrollTo(0, 0), []);

  /* Fetch orders whenever page changes --------------------------- */
  useEffect(() => {
    const vendorId = localStorage.getItem("vendorId");
    if (!vendorId) return;

    fetchDataFromApi(
      `/api/order/vendor-order-list?vendorId=${vendorId}&page=${page}&limit=5`
    ).then((res) => {
      if (!res?.error) setOrders(res);
    });
  }, [page]);

  /* -------------------------------------------------------------- */
  /* Render                                                         */
  /* -------------------------------------------------------------- */
  return (
    <section className="py-5 lg:py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        {/* side bar --------------------------------------------------- */}
        <aside className="w-[20%] hidden lg:block">
          <AccountSidebar />
        </aside>

        {/* main area -------------------------------------------------- */}
        <main className="w-full lg:w-[80%]">
          <div className="shadow-md rounded-md bg-white">
            {/* header ------------------------------------------------ */}
            <header className="py-5 px-5 border-b border-[rgba(0,0,0,0.1)]">
              <h2>{t("ordersPage.myOrders")}</h2>
              <p className="mt-0 mb-0">
                {t("ordersPage.thereAreOrders")}{" "}
                <span className="font-bold text-primary">
                  {orders?.data?.length}
                </span>{" "}
                {t("ordersPage.orders")}
              </p>
            </header>

            {/* table ------------------------------------------------- */}
            <div className="relative overflow-x-auto mt-5 px-5 pb-5">
              <table className="w-full text-sm text-center text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">&nbsp;</th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      {t("ordersPage.tableHeaders.orderId")}
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      {t("ordersPage.tableHeaders.paymentId")}
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      {t("ordersPage.tableHeaders.name")}
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      {t("ordersPage.tableHeaders.phoneNumber")}
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      {t("ordersPage.tableHeaders.address")}
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      {t("ordersPage.tableHeaders.pincode")}
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      {t("ordersPage.tableHeaders.totalAmount")}
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      {t("ordersPage.tableHeaders.userId")}
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      {t("ordersPage.tableHeaders.phoneNumber")}
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      {t("ordersPage.tableHeaders.date")}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.data.map((order, idx) => (
                    <React.Fragment key={order._id}>
                      {/* parent row ---------------------------------- */}
                      <tr className="bg-white border-b">
                        <td className="px-6 py-4">
                          <Button
                            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                            onClick={() => toggleRow(idx)}
                          >
                            {openRow === idx ? (
                              <FaAngleUp className="text-[16px] text-gray-700" />
                            ) : (
                              <FaAngleDown className="text-[16px] text-gray-700" />
                            )}
                          </Button>
                        </td>

                        <td className="px-6 py-4 font-[500] text-primary">
                          {order._id}
                        </td>

                        <td className="px-6 py-4 font-[500] whitespace-nowrap text-primary text-[13px]">
                          {order.paymentId || t("ordersPage.cashOnDelivery")}
                        </td>

                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          {order.userId?.name}
                        </td>

                        <td className="px-6 py-4 font-[500]">
                          {order.delivery_address?.mobile}
                        </td>

                        <td className="px-6 py-4 font-[500]">
                          <span className="inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md mr-1">
                            {order.delivery_address?.addressType}
                          </span>
                          <span className="block w-[400px]">
                            {[
                              order.delivery_address?.address_line1,
                              order.delivery_address?.city,
                              order.delivery_address?.landmark,
                              order.delivery_address?.state,
                              order.delivery_address?.country,
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          </span>
                        </td>

                        <td className="px-6 py-4 font-[500]">
                          {order.delivery_address?.pincode}
                        </td>

                        <td className="px-6 py-4 font-[500]">
                          {order.totalAmt}
                        </td>

                        <td className="px-6 py-4 font-[500] text-primary">
                          {order.userId?._id}
                        </td>

                        <td className="px-6 py-4 font-[500]">
                          <Badge status={order.order_status} />
                        </td>

                        <td className="px-6 py-4 font-[500] whitespace-nowrap">
                          {order.createdAt.split("T")[0]}
                        </td>
                      </tr>

                      {/* expanded row -------------------------------- */}
                      {openRow === idx && (
                        <tr>
                          <td className="pl-20" colSpan={11}>
                            <div className="relative overflow-x-auto">
                              <table className="w-full text-sm text-left">
                                <thead className="text-xs bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 whitespace-nowrap">
                                      {t("ordersPage.tableHeaders.productId")}
                                    </th>
                                    <th className="px-6 py-3 whitespace-nowrap">
                                      {t(
                                        "ordersPage.tableHeaders.productTitle"
                                      )}
                                    </th>
                                    <th className="px-6 py-3 whitespace-nowrap">
                                      {t("ordersPage.tableHeaders.image")}
                                    </th>
                                    <th className="px-6 py-3 whitespace-nowrap">
                                      {t("ordersPage.tableHeaders.quantity")}
                                    </th>
                                    <th className="px-6 py-3 whitespace-nowrap">
                                      {t("ordersPage.tableHeaders.price")}
                                    </th>
                                    <th className="px-6 py-3 whitespace-nowrap">
                                      {t("ordersPage.tableHeaders.subTotal")}
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {order.products.map((item) => (
                                    <tr
                                      key={item._id}
                                      className="bg-white border-b"
                                    >
                                      <td className="px-6 py-4 text-gray-600">
                                        {item._id}
                                      </td>

                                      <td className="px-6 py-4 w-[200px]">
                                        {item.name}
                                      </td>

                                      {/* thumbnail (now next/image) */}
                                      <td className="px-6 py-4">
                                        <Image
                                          src={item.image}
                                          alt={item.name}
                                          width={40}
                                          height={40}
                                          className="rounded-md object-cover"
                                        />
                                      </td>

                                      <td className="px-6 py-4 whitespace-nowrap">
                                        {item.quantity}
                                      </td>

                                      <td className="px-6 py-4">
                                        {item.price.toLocaleString("en-US", {
                                          style: "currency",
                                          currency: "INR",
                                        })}
                                      </td>

                                      <td className="px-6 py-4">
                                        {(
                                          item.price * item.quantity
                                        ).toLocaleString("en-US", {
                                          style: "currency",
                                          currency: "INR",
                                        })}
                                      </td>
                                    </tr>
                                  ))}

                                  {/* grey separator row */}
                                  <tr>
                                    <td colSpan={12} className="bg-[#f1f1f1]" />
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* pagination ------------------------------------------- */}
            {orders.totalPages > 1 && (
              <div className="flex justify-center my-10">
                <Pagination
                  showFirstButton
                  showLastButton
                  count={orders.totalPages}
                  page={page}
                  onChange={(_, val) => setPage(val)}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
};

export default Orders;
