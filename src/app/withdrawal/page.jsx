"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import AccountSidebar from "@/components/AccountSidebar";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import Badge from "@/components/Badge";
import { FaAngleUp } from "react-icons/fa6";
import { deleteData, fetchDataFromApi } from "@/utils/api";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MyContext } from "@/context/ThemeProvider";
import { useTranslation } from "@/utils/useTranslation";

const Withdrawal = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [balance, setBalance] = useState(0);
  const [withdrawals, setWithdrawals] = useState([]);

  const router = useRouter();

  const context = useContext(MyContext);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setBalance(context?.userData?.availableBalance);
    }
  }, [context?.userData]);

  useEffect(() => {
    fetchDataFromApi("/api/withdrawal/vendor-withdrawals").then((res) => {
      if (res?.success) {
        setWithdrawals(res.data);
      } else {
        toast.error(t("withdrawalPage.fetchError") );
      }
    });
  }, []);

  return (
    <section className="py-5 lg:py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="col1 w-[20%] hidden lg:block">
          <AccountSidebar />
        </div>

        <div className="col2 w-full lg:w-[80%]">
          <div className="bg-white p-6 rounded-2xl shadow-md mb-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {t("withdrawalPage.availableBalance")}
            </h3>
            <p className="text-3xl font-bold text-green-600">
              ${Number(balance).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="shadow-md rounded-md bg-white">
            <div className="py-5 px-5 border-b border-[rgba(0,0,0,0.1)]">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">{t("withdrawalPage.withdrawals")}</h2>
                <Button
                  className="!ml-auto !font-bold"
                  onClick={() => router.push("/withdrawal/withdraw-request")}
                >
                  {t("withdrawalPage.withdrawRequest")}
                </Button>
              </div>
              <p className="mt-0 mb-0">
                There are{" "}
                <span className="font-bold text-primary">
                  {/* {products?.length} */}
                </span>{" "}
                {t("withdrawalPage.withdrawRequest")}
              </p>

              <div className="relative overflow-x-auto mt-5">
                <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        {t("withdrawalPage.tableHeaders.slno")}
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        {t("withdrawalPage.tableHeaders.transactionId")}
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        {t("withdrawalPage.tableHeaders.amount")}
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        {t("withdrawalPage.tableHeaders.accountNumber")}
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        {t("withdrawalPage.tableHeaders.bankName")}
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        {t("withdrawalPage.tableHeaders.ifscCode")}
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        {t("withdrawalPage.tableHeaders.dateOfWithdrawal")}
                      </th>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        {t("withdrawalPage.tableHeaders.status")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals?.length > 0 ? (
                      withdrawals.map((withdrawal, index) => (
                        <tr
                          key={withdrawal._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-6 py-4 font-[500]">{index + 1}</td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            {withdrawal._id}
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            {withdrawal.withdrawal_amt.toLocaleString("en-IN", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            {withdrawal.bank_details.accountNo}
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            {withdrawal.bank_details.bankname}
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            {withdrawal.bank_details.IFSC}
                          </td>
                          <td className="px-6 py-4 font-[500] whitespace-nowrap">
                            {new Date(withdrawal.createdAt).toLocaleDateString(
                              "en-IN"
                            )}
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <Badge status={withdrawal.withdrawal_status} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-4 font-semibold text-gray-600"
                        >
                            {t("withdrawalPage.withdrawalRequestsFound")}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* {products?.totalPages > 1 && (
                <div className="flex items-center justify-center mt-10">
                  <Pagination
                    showFirstButton
                    showLastButton
                    count={products?.totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                  />
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Withdrawal;
