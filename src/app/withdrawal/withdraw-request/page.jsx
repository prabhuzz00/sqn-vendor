"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, TextField, Select, MenuItem, FormLabel } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";
import { postData } from "@/utils/api";
import AccountSidebar from "../../../components/AccountSidebar";
import { toast } from "react-toastify";

const WithdrawalRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [amount, setAmount] = useState("");

  const context = useContext(MyContext);
  const router = useRouter();

  // Example bank data (replace with actual data from your context or API)
  const banks = context?.bankData || [
    { _id: "1", name: "State Bank of India" },
    { _id: "2", name: "HDFC Bank" },
    { _id: "3", name: "ICICI Bank" },
    { _id: "4", name: "Axis Bank" },
  ];

  const handleChangeBank = (e) => {
    setSelectedBank(e.target.value);
  };

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!selectedBank) {
      context.alertBox("error", "Please select a bank");
      setIsLoading(false);
      return;
    }
    if (!amount || amount <= 0) {
      context.alertBox("error", "Please enter a valid amount");
      setIsLoading(false);
      return;
    }

    const withdrawalData = {
      bankId: selectedBank,
      amount: parseFloat(amount),
      vendorId: localStorage.getItem('vendorId'),
    };

    try {
      const res = await postData("/api/withdrawal/request", withdrawalData, { withCredentials: true });
      if (!res?.error) {
        toast.success("Withdrawal request submitted successfully!");
        router.push('/withdrawal');
      } else {
        toast.error(res?.message || "There was an error");
      }
    } catch (error) {
      toast.error("Failed to submit withdrawal request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-3 lg:py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-[20%]">
          <AccountSidebar />
        </div>

        <div className="w-full lg:w-[80%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <div className="flex items-center pb-3">
              <h2 className="pb-0">Request Withdrawal</h2>
            </div>
            <hr />

            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="col">
                  <FormLabel>Select Bank</FormLabel>
                  <Select
                    size="small"
                    className="w-full"
                    value={selectedBank}
                    onChange={handleChangeBank}
                    disabled={isLoading}
                  >
                    <MenuItem value="" disabled>
                      Select a bank
                    </MenuItem>
                    {banks.map((bank) => (
                      <MenuItem key={bank._id} value={bank._id}>
                        {bank.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div className="col">
                  <FormLabel>Amount</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    className="w-full"
                    name="amount"
                    value={amount}
                    onChange={onChangeAmount}
                    disabled={isLoading}
                    placeholder="Enter amount"
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
                    "Submit Request"
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