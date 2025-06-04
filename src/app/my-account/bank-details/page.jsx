"use client";
import React, { useContext, useEffect, useState } from "react";
import AccountSidebar from "@/components/AccountSidebar";
import { MyContext } from "@/context/ThemeProvider";
import BankBox from "./bankBox";
import { deleteData, fetchDataFromApi } from "@/utils/api";
import { useTranslation } from "@/utils/useTranslation";

const Bank = () => {
  const { t } = useTranslation();
  const context = useContext(MyContext);

  const [bank, setBank] = useState([]);

  /* --------------------------------------------------------------- */
  /* 1) Scroll position – depends only on window width               */
  /* --------------------------------------------------------------- */
  useEffect(() => {
    const y = context?.windowWidth < 992 ? 450 : 0;
    window.scrollTo(0, y);
  }, [context?.windowWidth]);

  /* --------------------------------------------------------------- */
  /* 2) Sync bank list when user data arrives/changes                */
  /* --------------------------------------------------------------- */
  useEffect(() => {
    if (context?.userData?._id) {
      setBank(context.userData.bank_details);
    }
  }, [context?.userData]);

  /* --------------------------------------------------------------- */
  /* 3) Delete bank record & refresh list                            */
  /* --------------------------------------------------------------- */
  const removeBank = (id) => {
    deleteData(`/api/bank/${id}`).then(() =>
      fetchDataFromApi(`/api/bank/get?vendorId=${context.userData._id}`).then(
        (res) => {
          setBank(res.data);
          context.getUserDetails();
        }
      )
    );
  };

  /* --------------------------------------------------------------- */
  /* Render                                                          */
  /* --------------------------------------------------------------- */
  return (
    <section className="py-5 lg:py-10 w-full">
      <div className="container flex flex-col md:flex-row gap-5">
        {/* sidebar */}
        <div className="w-full md:w-[30%] lg:w-[20%]">
          <AccountSidebar />
        </div>

        {/* main */}
        <div className="w-full md:w-[70%] lg:w-[50%]">
          <div className="card bg-white p-5 shadow-md rounded-md mb-5">
            <h2 className="pb-3">{t("bankPage.bankDetails")}</h2>
            <hr />

            {/* add new */}
            <div
              className="flex items-center justify-center p-5 rounded-md border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
              onClick={() => {
                context.setOpenBankPanel(true);
                context.setBankMode("add");
              }}
            >
              <span className="text-[14px] font-[500]">
                {t("bankPage.addBankDetails")}
              </span>
            </div>

            {/* list */}
            <div className="flex flex-col gap-2 mt-4">
              {bank.map((item) => (
                <BankBox key={item._id} bank={item} removeBank={removeBank} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bank;
