"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormLabel,
  Radio,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { MyContext } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";
import { postData } from "@/utils/api";
import AccountSidebar from "../../../components/AccountSidebar";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { useTranslation } from "@/utils/useTranslation";

const WithdrawalRequest = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(0);
  const [selectedBank, setSelectedBank] = useState("");
  const [userData, setUserData] = useState(null);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  const context = useContext(MyContext);
  const router = useRouter();

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!selectedBank) {
      context.alertBox("error", t("withdrawalRequestPage.validation.selectBank") );
      setIsLoading(false);
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      context.alertBox("error", t("withdrawalRequestPage.validation.validAmount"));
      setIsLoading(false);
      return;
    }

    const withdrawalData = {
      vendorId: userData?._id,
      withdrawal_amt: parseFloat(amount),
      bank_details: selectedBank,
    };

    try {
      const res = await postData("/api/withdrawal/create", withdrawalData); // ⬅ adjust endpoint if needed

      if (!res?.error) {
        toast.success(t("withdrawalRequestPage.successMessage"));
        await context.getUserDetails();
        router.push("/withdrawal");
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(t("withdrawalRequestPage.errorMessage"));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const editBank = (id) => {
    context?.setOpenBankPanel(true);
    context?.setBankMode("edit");
    context?.setBankId(id);
  };

  const handleChangebank = (e, index) => {
    if (e.target.checked) {
      setIsChecked(index);
      setSelectedBank(e.target.value);
    }
  };

  useEffect(() => {
    if (context?.userData?._id) {
      setBalance(context?.userData?.availableBalance);
      setUserData(context?.userData);
      setSelectedBank(context?.userData?.bank_details[0]?._id);
    }
  }, [context?.userData]);

  return (
    <section className="py-3 lg:py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-[20%]">
          <AccountSidebar />
        </div>

        <div className="w-full lg:w-[80%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <div className="flex items-center pb-3">
              <h2 className="pb-0">{t("withdrawalRequestPage.requestWithdrawal")}</h2>
            </div>
            <hr />
            {/* 🔽 Balance Card Start */}
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-gray-700 text-sm font-medium mb-1">
                {t("withdrawalRequestPage.availableBalance")}
              </h3>
              <p className="text-2xl font-bold text-green-600">
                ${Number(balance).toLocaleString("en-IN")}
              </p>
            </div>
            {/* 🔼 Balance Card End */}

            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-center justify-between">
                  <h2>{t("withdrawalRequestPage.selectBankAccount")}</h2>
                  {userData?.bank_details?.length !== 0 && (
                    <Button
                      variant="outlined"
                      className="btn !font-bold"
                      onClick={() => {
                        context?.setOpenBankPanel(true);
                        context?.setBankMode("add");
                      }}
                    >
                      <FaPlus />
                      ADD {context?.windowWidth < 767 ? "" : "NEW BANK"}
                    </Button>
                  )}
                </div>
                <br />

                <div className="flex flex-col gap-4">
                  {userData?.bank_details?.length !== 0 ? (
                    userData?.bank_details?.map((bank, index) => {
                      return (
                        <label
                          className={`flex gap-3 p-4 border border-[rgba(0,0,0,0.1)] rounded-md relative ${
                            isChecked === index && "bg-[#fff2f2]"
                          }`}
                          key={index}
                        >
                          <div>
                            <Radio
                              size="small"
                              onChange={(e) => handleChangebank(e, index)}
                              checked={isChecked === index}
                              value={bank?._id}
                            />
                          </div>
                          <div className="info">
                            <span className="inline-block text-[13px] font-[500] p-1 bg-[#f1f1f1] rounded-md">
                              {bank?.bankname}
                            </span>
                            <h3>{userData?.name}</h3>
                            <p className="mt-0 mb-0">
                              {bank?.fullName +
                                " " +
                                bank?.accountNo +
                                " " +
                                bank?.IFSC +
                                " " +
                                bank?.Branch}
                            </p>
                          </div>

                          <Button
                            variant="text"
                            className="!absolute top-[15px] right-[15px]  !font-bold"
                            size="small"
                            onClick={() => editBank(bank?._id)}
                          >
                            {t("withdrawalRequestPage.edit")}
                          </Button>
                        </label>
                      );
                    })
                  ) : (
                    <>
                      <div className="flex items-center mt-5 justify-between flex-col p-5">
                        <img src="/map.png" width="100" />
                        <h2 className="text-center">
                            {t("withdrawalRequestPage.noBankDetailsFound")}
                        </h2>
                          <p className="mt-0">{t("withdrawalRequestPage.addYourBankDetails")}</p>
                        <Button
                          className="btn-org"
                          onClick={() => {
                            context?.setOpenBankPanel(true);
                            context?.setBankMode("add");
                          }}
                        >
                            {t("withdrawalRequestPage.addBank")}
                        </Button>
                      </div>
                    </>
                  )}
                </div>

                <div className="col">
                  <FormLabel>{t("withdrawalRequestPage.amount")}</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    className="w-full"
                    name="amount"
                    value={amount}
                    onChange={onChangeAmount}
                    disabled={isLoading}
                    placeholder={t("withdrawalRequestPage.enterAmount")}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-5">
                <Button
                  type="submit"
                  className="btn-org btn-sm w-[200px]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                      t("withdrawalRequestPage.submitRequest") 
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WithdrawalRequest;
