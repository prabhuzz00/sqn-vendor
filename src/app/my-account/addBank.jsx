"use client";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { MyContext } from "@/context/ThemeProvider";
import { editData, fetchDataFromApi, postData } from "@/utils/api";
import { useTranslation } from "@/utils/useTranslation";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const getInitialForm = (vendorId = "") => ({
  fullName: "",
  accountNo: "",
  IFSC: "",
  Branch: "",
  bankname: "",
  vendorId,
});

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */
const AddBank = () => {
  const { t } = useTranslation();
  const context = useContext(MyContext);

  /* user ID may arrive asynchronously */
  const userId = context?.userData?._id ?? "";

  const [formFields, setFormsFields] = useState(getInitialForm(userId));
  const [isLoading, setIsLoading] = useState(false);

  /* keep vendorId in sync once it arrives */
  useEffect(() => {
    if (userId) {
      setFormsFields((prev) => ({ ...prev, vendorId: userId }));
    }
  }, [userId]);

  /* ---------------------------------------------------------------- */
  /* Controlled inputs                                                 */
  /* ---------------------------------------------------------------- */
  const onChangeInput = ({ target: { name, value } }) =>
    setFormsFields((prev) => ({ ...prev, [name]: value }));

  /* ---------------------------------------------------------------- */
  /* Fetch existing bank when editing                                  */
  /* ---------------------------------------------------------------- */
  const fetchBank = useCallback(
    (id) => {
      if (!id) return;
      fetchDataFromApi(`/api/bank/${id}`).then((res) => {
        const b = res?.bank ?? {};
        setFormsFields({
          fullName: b.fullName ?? "",
          accountNo: b.accountNo ?? "",
          IFSC: b.IFSC ?? "",
          Branch: b.Branch ?? "",
          bankname: b.bankname ?? "",
          vendorId: b.vendorId ?? userId,
        });
      });
    },
    [userId]
  );

  useEffect(() => {
    if (context?.bankMode === "edit") {
      fetchBank(context?.bankId);
    } else {
      setFormsFields(getInitialForm(userId)); // fresh blank form
    }
  }, [context?.bankMode, context?.bankId, fetchBank, userId]);

  /* ---------------------------------------------------------------- */
  /* Submit                                                            */
  /* ---------------------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...formFields, vendorId: formFields.vendorId || userId };

    const required = [
      ["fullName", "bankForm.errors.fullName"],
      ["accountNo", "bankForm.errors.accountNumber"],
      ["IFSC", "bankForm.errors.ifsc"],
      ["Branch", "bankForm.errors.branchName"],
      ["bankname", "bankForm.errors.bankName"],
      ["vendorId", "bankForm.errors.vendorId"],
    ];

    for (const [field, key] of required) {
      if (!payload[field]) {
        context.alertBox("error", t(key));
        return;
      }
    }

    setIsLoading(true);
    try {
      if (context.bankMode === "add") {
        await postData("/api/bank/add", payload, { withCredentials: true });
      } else {
        await editData(`/api/bank/${context.bankId}`, payload, {
          withCredentials: true,
        });
      }

      context.alertBox("success", t("bankForm.saved"));
      await context.getUserDetails();
      context.setOpenBankPanel(false);
      setFormsFields(getInitialForm(userId));
    } catch (err) {
      context.alertBox("error", err.message ?? "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */
  return (
    <form className="p-8 py-3 pb-8 px-4" onSubmit={handleSubmit}>
      {[
        ["fullName", t("bankForm.fullName")],
        ["accountNo", t("bankForm.accountNumber")],
        ["IFSC", t("bankForm.ifsc")],
        ["Branch", t("bankForm.branchName")],
        ["bankname", t("bankForm.bankName")],
      ].map(([name, label]) => (
        <div key={name} className="col w-full mb-4">
          <TextField
            name={name}
            label={label}
            value={formFields[name]}
            onChange={onChangeInput}
            variant="outlined"
            size="small"
            className="w-full"
          />
        </div>
      ))}

      <div className="flex items-center gap-5">
        <Button
          type="submit"
          disabled={isLoading}
          className="btn-org btn-lg w-full flex gap-2 items-center"
        >
          {isLoading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            t("bankForm.save")
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddBank;
