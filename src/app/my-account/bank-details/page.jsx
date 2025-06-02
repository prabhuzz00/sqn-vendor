"use client";
import React from "react";
import AccountSidebar from "@/components/AccountSidebar";
import { useContext } from "react";
import { MyContext } from "@/context/ThemeProvider";

import { useState } from "react";

import { useEffect } from "react";
import BankBox from "./bankBox";
import { deleteData, fetchDataFromApi } from "@/utils/api";
import { useTranslation } from "@/utils/useTranslation";

const label = { inputProps: { "aria-label": "Radio demo" } };

const Bank = () => {
  const { t } = useTranslation();
  const [bank, setBank] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    if (context?.windowWidth < 992) {
      window.scrollTo(0, 450);
    } else {
      window.scrollTo(0, 0);
    }

    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setBank(context?.userData?.bank_details);
    }
  }, [context?.userData]);

  const removeBank = (id) => {
    deleteData(`/api/bank/${id}`).then((res) => {
      fetchDataFromApi(`/api/bank/get?vendorId=${context?.userData?._id}`).then(
        (res) => {
          setBank(res.data);
          context?.getUserDetails();
        }
      );
    });
  };

  return (
    <>
      <section className="py-5 lg:py-10 w-full">
        <div className="container flex flex-col md:flex-row gap-5">
          <div className="col1 w-full  md:w-[30%] lg:w-[20%]">
            <AccountSidebar />
          </div>

          <div className="col2 w-full md:w-[70%] lg:w-[50%]">
            <div className="card bg-white p-5 shadow-md rounded-md mb-5">
              <div className="flex items-center pb-3">
                <h2 className="pb-0">{t("bankPage.bankDetails")}</h2>
              </div>
              <hr />

              <div
                className="flex items-center justify-center p-5 rounded-md border border-dashed border-[rgba(0,0,0,0.2)] bg-[#f1faff] hover:bg-[#e7f3f9] cursor-pointer"
                onClick={() => {
                  context?.setOpenBankPanel(true);
                  context?.setBankMode("add");
                }}
              >
                <span className="text-[14px] font-[500]">{t("bankPage.addBankDetails")}</span>
              </div>

              <div className="flex gap-2 flex-col mt-4">
                {bank?.length > 0 &&
                  bank?.map((bank, index) => {
                    return (
                      <BankBox
                        bank={bank}
                        key={index}
                        removeBank={removeBank}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Bank;
