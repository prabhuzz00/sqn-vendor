"use client";

import React, { useState, useContext, Suspense } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { MyContext } from "@/context/ThemeProvider";
import { vendorPostData, deleteImages } from "@/utils/api";
import { useRouter } from "next/navigation";
import PasswordField from "../../components/PasswordField";
import UploadBox from "../../components/UploadBox";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { useTranslation } from "@/utils/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image"; // ← NEW

/* ------------------------------------------------------------------ */
/* Helper data                                                        */
/* ------------------------------------------------------------------ */
const INITIAL_STATE = {
  storeName: "",
  storeDescription: "",
  ownerName: "",
  emailAddress: "",
  password: "",
  phoneNumber: "",
  storeAddress: "",
  images: [],
  bannerImages: [],
  productCategories: [],
  commissionRate: "",
  taxIdentificationNumber: "",
  termsAgreement: false,
  isVerified: false,
  status: true,
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
const BecomeVendor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [productCat, setProductCat] = useState("");
  const [formFields, setFormFields] = useState(INITIAL_STATE);

  const context = useContext(MyContext);
  const { locale } = useLanguage();
  const { t } = useTranslation();
  const router = useRouter();

  /* ------------------------------------------------------------------ */
  /* Field handlers                                                     */
  /* ------------------------------------------------------------------ */
  const onChangeInput = ({ target: { name, value } }) =>
    setFormFields((prev) => ({ ...prev, [name]: value }));

  const onChangeTerms = ({ target: { checked } }) =>
    setFormFields((prev) => ({ ...prev, termsAgreement: checked }));

  const handleChangeProductCat = ({ target: { value } }) => {
    const selectedCat = context?.catData?.find((cat) => cat._id === value);
    setProductCat(value);
    setFormFields((prev) => ({
      ...prev,
      productCategories: selectedCat?.name ?? "",
    }));
  };

  /* ------------------------------------------------------------------ */
  /* Image helpers                                                      */
  /* ------------------------------------------------------------------ */
  const mergeAndSet = (incoming, prev, setter, key) => {
    const merged = [...prev, ...incoming];
    setter(merged);
    setFormFields((old) => ({ ...old, [key]: merged }));
  };

  const setPreviewsFun = (arr) =>
    mergeAndSet(arr, previews, setPreviews, "images");
  const setBannerImagesFun = (arr) =>
    mergeAndSet(arr, bannerPreviews, setBannerPreviews, "bannerImages");

  const removeImg = (image, index, isBanner = false) => {
    deleteImages(`/api/category/deleteVendorImage?img=${image}`).then(() => {
      const list = isBanner ? bannerPreviews : previews;
      const updateList = [...list];
      updateList.splice(index, 1);
      isBanner ? setBannerPreviews(updateList) : setPreviews(updateList);
      setFormFields((prev) => ({
        ...prev,
        [isBanner ? "bannerImages" : "images"]: updateList,
      }));
    });
  };

  /* ------------------------------------------------------------------ */
  /* Validation & submit                                                */
  /* ------------------------------------------------------------------ */
  const validateForm = () => {
    const required = [
      "storeName",
      "storeDescription",
      "ownerName",
      "emailAddress",
      "password",
      "phoneNumber",
      "storeAddress",
      "termsAgreement",
      "images",
    ];

    return required.every((field) => {
      if (field === "termsAgreement") return formFields[field] === true;
      if (field === "password") return formFields[field].length >= 6;
      if (field === "images") return formFields[field].length > 0;
      return formFields[field] !== "";
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      context.alertBox("error", t("bvendor.validationError"));
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    Object.entries(formFields).forEach(([key, val]) => {
      const asString =
        key === "productCategories" ||
        key === "images" ||
        key === "bannerImages"
          ? JSON.stringify(val ?? [])
          : val;
      formData.append(key, asString);
    });

    try {
      const res = await vendorPostData("/api/vendor", formData);
      if (res?.error) {
        context.alertBox("error", res.message ?? "There was an error");
      } else {
        context.alertBox("success", t("bvendor.success"));
        setFormFields(INITIAL_STATE);
        setPreviews([]);
        setBannerPreviews([]);
        // router.push("/vendor-confirmation");
      }
    } catch (err) {
      console.error(err);
      context.alertBox("error", t("bvendor.submissionError"));
    } finally {
      setIsLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="section py-5 sm:py-10 bg-white">
        <div className="container max-w-[80%]">
          <div className="flex">
            {/* ---------------------------------------------------------- */}
            {/* LEFT – form                                               */}
            {/* ---------------------------------------------------------- */}
            <div className="card w-[40%]">
              <h3 className="text-[20px] text-black mt-4">
                {t("bvendor.welcome")}
              </h3>
              <p className="text-gray-700 text-[16px] mt-1">
                {t("bvendor.createAccount")}
              </p>

              <form className="w-full mt-5" onSubmit={handleSubmit}>
                {/* store name ------------------------------------------------ */}
                <div className="form-group w-full mb-5">
                  <TextField
                    name="storeName"
                    value={formFields.storeName}
                    disabled={isLoading}
                    label={t("bvendor.storeName")}
                    variant="standard"
                    className="w-full"
                    onChange={onChangeInput}
                    required
                  />
                </div>

                {/* store description --------------------------------------- */}
                <div className="form-group w-full mb-5">
                  <TextField
                    name="storeDescription"
                    value={formFields.storeDescription}
                    disabled={isLoading}
                    label={t("bvendor.storeDescription")}
                    variant="standard"
                    multiline
                    rows={4}
                    className="w-full"
                    onChange={onChangeInput}
                    required
                  />
                </div>

                {/* owner name ---------------------------------------------- */}
                <div className="form-group w-full mb-5">
                  <TextField
                    name="ownerName"
                    value={formFields.ownerName}
                    disabled={isLoading}
                    label={t("bvendor.ownerName")}
                    variant="standard"
                    className="w-full"
                    onChange={onChangeInput}
                    required
                  />
                </div>

                {/* email ---------------------------------------------------- */}
                <div className="form-group w-full mb-5">
                  <TextField
                    type="email"
                    name="emailAddress"
                    value={formFields.emailAddress}
                    disabled={isLoading}
                    label={t("bvendor.emailAddress")}
                    variant="standard"
                    className="w-full"
                    onChange={onChangeInput}
                    required
                  />
                </div>

                {/* password ------------------------------------------------- */}
                <div className="form-group w-full mb-5">
                  <PasswordField
                    name="password"
                    value={formFields.password}
                    onChange={onChangeInput}
                    disabled={isLoading}
                    variant="standard"
                    label={t("bvendor.password")}
                    required
                  />
                </div>

                {/* phone number -------------------------------------------- */}
                <div className="form-group w-full mb-5">
                  <TextField
                    type="tel"
                    name="phoneNumber"
                    value={formFields.phoneNumber}
                    disabled={isLoading}
                    label={t("bvendor.phoneNumber")}
                    variant="standard"
                    className="w-full"
                    onChange={onChangeInput}
                    required
                  />
                </div>

                {/* address -------------------------------------------------- */}
                <div className="form-group w-full mb-5">
                  <TextField
                    name="storeAddress"
                    value={formFields.storeAddress}
                    disabled={isLoading}
                    label={t("bvendor.storeAddress")}
                    variant="standard"
                    className="w-full"
                    onChange={onChangeInput}
                    required
                  />
                </div>

                {/* store logo upload --------------------------------------- */}
                <div className="form-group w-full mb-5">
                  <p className="text-[17px]">{t("bvendor.storeLogo")}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {previews.map((img, idx) => (
                      <div key={idx} className="uploadBoxWrapper relative">
                        <span
                          className="absolute w-[20px] h-[20px] rounded-full bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                          onClick={() => removeImg(img, idx)}
                        >
                          <IoMdClose className="text-white text-[17px]" />
                        </span>
                        <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100">
                          <img
                            src={img}
                            alt={`upload ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}

                    <UploadBox
                      multiple
                      name="images"
                      url="/api/vendor/uploadImages"
                      setPreviewsFun={setPreviewsFun}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* banner images upload ------------------------------------ */}
                <div className="form-group w-full mb-5">
                  <p className="text-[17px]">
                    {t("bvendor.storeBannerImages")}{" "}
                    <span className="text-gray-500 text-[14px]">
                      (Optional)
                    </span>
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {bannerPreviews.map((img, idx) => (
                      <div key={idx} className="uploadBoxWrapper relative">
                        <span
                          className="absolute w-[20px] h-[20px] rounded-full bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                          onClick={() => removeImg(img, idx, true)}
                        >
                          <IoMdClose className="text-white text-[17px]" />
                        </span>
                        <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100">
                          <img
                            src={img}
                            alt={`banner ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}

                    <UploadBox
                      multiple
                      name="bannerImages"
                      url="/api/vendor/uploadBannerImages"
                      setPreviewsFun={setBannerImagesFun}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* category select ----------------------------------------- */}
                <div className="form-group w-full mb-5">
                  <FormControl fullWidth variant="standard">
                    <InputLabel id="product-categories-label">
                      {t("bvendor.productCategories")}
                    </InputLabel>
                    {context?.catData?.length > 0 && (
                      <Select
                        size="small"
                        value={productCat}
                        onChange={handleChangeProductCat}
                        disabled={isLoading}
                      >
                        {context.catData.map((cat) => (
                          <MenuItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </FormControl>
                </div>

                {/* tax ID --------------------------------------------------- */}
                <div className="form-group w-full mb-5">
                  <TextField
                    name="taxIdentificationNumber"
                    value={formFields.taxIdentificationNumber}
                    disabled={isLoading}
                    label={t("bvendor.taxId")}
                    variant="standard"
                    className="w-full"
                    onChange={onChangeInput}
                  />
                </div>

                {/* terms ---------------------------------------------------- */}
                <div className="form-group w-full mb-5">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formFields.termsAgreement}
                        onChange={onChangeTerms}
                        disabled={isLoading}
                      />
                    }
                    label={t("bvendor.agreeTerms")}
                  />
                </div>

                {/* submit --------------------------------------------------- */}
                <div className="flex items-center w-full mt-3 mb-3">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="btn-org btn-lg w-full flex gap-3"
                  >
                    {isLoading ? (
                      <CircularProgress color="inherit" size={22} />
                    ) : (
                      t("bvendor.submit")
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* RIGHT – promo stats                                        */}
            {/* ---------------------------------------------------------- */}
            <div className="pl-44 w-[60%] pt-3">
              <div className="box p-5 bg-gray-200 rounded-md w-full sticky top-10">
                <h2>{t("bvendor.growFaster")}</h2>
                <div className="grid grid-cols-1 mt-5 gap-5">
                  {/* 1 ---------------------------------------------------- */}
                  <div className="box flex items-center gap-3">
                    <Image
                      src="https://images.meeshosupplyassets.com/supplier_community.svg"
                      alt="Supplier community"
                      width={40}
                      height={40}
                    />
                    <div className="info flex flex-col gap-0">
                      <h4>{t("bvendor.sellersCount")}</h4>
                      <p className="mt-0 mb-0 text-[13px]">
                        {t("bvendor.sellersNote")}
                      </p>
                    </div>
                  </div>

                  {/* 2 ---------------------------------------------------- */}
                  <div className="box flex items-center gap-3">
                    <Image
                      src="https://images.meeshosupplyassets.com/pincode.svg"
                      alt="Serviceable pincodes"
                      width={40}
                      height={40}
                    />
                    <div className="info flex flex-col gap-0">
                      <h4>{t("bvendor.pincodes")}</h4>
                      <p className="mt-0 mb-0 text-[13px]">
                        {t("bvendor.pincodesNote")}
                      </p>
                    </div>
                  </div>

                  {/* 3 ---------------------------------------------------- */}
                  <div className="box flex items-center gap-3">
                    <Image
                      src="https://images.meeshosupplyassets.com/reach_india.svg"
                      alt="Reach across India"
                      width={40}
                      height={40}
                    />
                    <div className="info flex flex-col gap-0">
                      <h4>{t("bvendor.buyersCount")}</h4>
                      <p className="mt-0 mb-0 text-[13px]">
                        {t("bvendor.buyersNote")}
                      </p>
                    </div>
                  </div>

                  {/* 4 ---------------------------------------------------- */}
                  <div className="box flex items-center gap-3">
                    <Image
                      src="https://images.meeshosupplyassets.com/categories.svg"
                      alt="Product categories"
                      width={40}
                      height={40}
                    />
                    <div className="info flex flex-col gap-0">
                      <h4>{t("bvendor.categoriesCount")}</h4>
                      <p className="mt-0 mb-0 text-[13px]">
                        {t("bvendor.categoriesNote")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ---------------------------------------------------------- */}
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default BecomeVendor;
