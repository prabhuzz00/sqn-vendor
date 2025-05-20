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
  FormLabel,
} from "@mui/material"; // Consolidated imports
import { MyContext } from "@/context/ThemeProvider";
import { vendorPostData, deleteImages } from "@/utils/api";
import { useRouter } from "next/navigation";
import PasswordField from "../../components/PasswordField";
import { toast } from "react-toastify";
import UploadBox from "../../components/UploadBox";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { useTranslation } from "@/utils/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

const BecomeVendor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);
  const [productCat, setProductCat] = useState("");
  const [formFields, setFormFields] = useState({
    storeName: "",
    storeDescription: "",
    ownerName: "",
    emailAddress: "",
    password: "",
    phoneNumber: "",
    storeAddress: "",
    images: [],
    bannerImages: [],
    // productCategoriesId: [],
    productCategories: [],
    commissionRate: "",
    paymentDetails: "",
    taxIdentificationNumber: "",
    termsAgreement: false,
    isVerified: false,
    status: true,
  });

  const context = useContext(MyContext);
  const { locale } = useLanguage();
  const { t } = useTranslation();
  const router = useRouter();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeCategories = (e) => {
    setFormFields((prev) => ({
      ...prev,
      productCategories: e.target.value,
    }));
  };

  const handleChangeProductCat = (e) => {
    const selectedCat = context?.catData?.find(
      (cat) => cat._id === e.target.value
    );
    setProductCat(e.target.value);
    setFormFields((prev) => ({
      ...prev,
      // productCategoriesId: e.target.value,
      productCategories: selectedCat?.name || "",
    }));
  };

  const onChangeTerms = (e) => {
    setFormFields((prev) => ({
      ...prev,
      termsAgreement: e.target.checked,
    }));
  };

  const setPreviewsFun = (previewsArr) => {
    const imgArr = [...previews];
    for (let i = 0; i < previewsArr.length; i++) {
      imgArr.push(previewsArr[i]);
    }
    setPreviews([]);
    setTimeout(() => {
      setPreviews(imgArr);
      setFormFields((prev) => ({
        ...prev,
        images: imgArr,
      }));
    }, 10);
  };

  const setBannerImagesFun = (previewsArr) => {
    const imgArr = [...bannerPreviews];
    for (let i = 0; i < previewsArr.length; i++) {
      imgArr.push(previewsArr[i]);
    }
    setBannerPreviews([]);
    setTimeout(() => {
      setBannerPreviews(imgArr);
      setFormFields((prev) => ({
        ...prev,
        bannerimages: imgArr,
      }));
    }, 10);
  };

  const removeImg = (image, index) => {
    const imageArr = [...previews];
    deleteImages(`/api/category/deleteVendorImage?img=${image}`).then((res) => {
      imageArr.splice(index, 1);
      setPreviews([]);
      setTimeout(() => {
        setPreviews(imageArr);
        setFormFields((prev) => ({
          ...prev,
          images: imageArr,
        }));
      }, 100);
    });
  };

  const removeBannerImg = (image, index) => {
    const imageArr = [...bannerPreviews];
    deleteImages(`/api/category/deleteVendorImage?img=${image}`).then((res) => {
      imageArr.splice(index, 1);
      setBannerPreviews([]);
      setTimeout(() => {
        setBannerPreviews(imageArr);
        setFormFields((prev) => ({
          ...prev,
          bannerImages: imageArr,
        }));
      }, 100);
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "storeName",
      "storeDescription",
      "ownerName",
      "emailAddress",
      "password",
      "phoneNumber",
      "storeAddress",
      "paymentDetails",
      "termsAgreement",
      "images",
    ];
    return requiredFields.every((field) => {
      if (field === "termsAgreement") return formFields[field] === true;
      if (field === "password") return formFields[field].length >= 6;
      if (field === "images") return formFields[field].length > 0;
      return formFields[field] !== "";
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      toast.error(
        "Please fill all required fields, agree to terms, ensure password is at least 6 characters, and upload at least one store logo."
      );
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    Object.keys(formFields).forEach((key) => {
      if (
        key === "productCategories" ||
        key === "images" ||
        key === "bannerImages"
      ) {
        formData.append(key, JSON.stringify(formFields[key] || []));
      } else {
        formData.append(key, formFields[key]);
      }
    });

    try {
      const res = await vendorPostData("/api/vendor", formData);
      if (res?.error) {
        context.alertBox("error", res?.message || "There was an error");
      } else {
        context.alertBox(
          "success",
          "Vendor application submitted successfully."
        );
        setFormFields({
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
          paymentDetails: "",
          taxIdentificationNumber: "",
          termsAgreement: false,
          isVerified: false,
          status: true,
        });
        setPreviews([]);
        setBannerPreviews([]);
        // router.push("/vendor-confirmation");
      }
    } catch (error) {
      context.alertBox("error", "An error occurred during submission.");
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="section py-5 sm:py-10 bg-white">
        <div className="container max-w-[80%]">
          <div className="flex items-center justify-between">
            <img src="/logo.jpg" alt="logo" />
            <div className="flex items-center gap-4">
              <span className="text-[16px] text-gray-700">
                {t("bvendor.alreadyUser")}
              </span>
              <Link href="/login">
                <Button className="btn-org">{t("bvendor.login")}</Button>
              </Link>
            </div>
          </div>

          <div className="flex">
            <div className="card w-[40%]">
              <h3 className="text-[20px] text-black mt-4">
                {t("bvendor.welcome")}
              </h3>
              <p className="text-gray-700 text-[16px] mt-1">
                {t("bvendor.createAccount")}
              </p>

              <form className="w-full mt-5" onSubmit={handleSubmit}>
                <div className="form-group w-full mb-5">
                  <TextField
                    type="text"
                    id="storeName"
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

                <div className="form-group w-full mb-5">
                  <TextField
                    type="text"
                    id="storeDescription"
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

                <div className="form-group w-full mb-5">
                  <TextField
                    type="text"
                    id="ownerName"
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

                <div className="form-group w-full mb-5">
                  <TextField
                    type="email"
                    id="emailAddress"
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

                <div className="form-group w-full mb-5">
                  <PasswordField
                    id="password"
                    name="password"
                    value={formFields.password}
                    onChange={onChangeInput}
                    disabled={isLoading}
                    variant="standard"
                    label={t("bvendor.password")}
                    required
                  />
                </div>

                <div className="form-group w-full mb-5">
                  <TextField
                    type="tel"
                    id="phoneNumber"
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

                <div className="form-group w-full mb-5">
                  <TextField
                    type="text"
                    id="storeAddress"
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

                <div className="form-group w-full mb-5">
                  <p className="text-[17px]">{t("bvendor.storeLogo")}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {previews?.map((image, index) => (
                      <div className="uploadBoxWrapper relative" key={index}>
                        <span
                          className="absolute w-[20px] h-[20px] rounded-full bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                          onClick={() => removeImg(image, index)}
                        >
                          <IoMdClose className="text-white text-[17px]" />
                        </span>
                        <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100">
                          <img
                            src={image}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                    <UploadBox
                      multiple={true}
                      name="images"
                      url="/api/vendor/uploadImages"
                      setPreviewsFun={setPreviewsFun}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="form-group w-full mb-5">
                  <p className="text-[17px]">
                    {t("bvendor.storeBannerImages")}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {bannerPreviews?.map((image, index) => (
                      <div className="uploadBoxWrapper relative" key={index}>
                        <span
                          className="absolute w-[20px] h-[20px] rounded-full bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                          onClick={() => removeBannerImg(image, index)}
                        >
                          <IoMdClose className="text-white text-[17px]" />
                        </span>
                        <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100">
                          <img
                            src={image}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                    <UploadBox
                      multiple={true}
                      name="bannerImages"
                      url="/api/vendor/uploadBannerImages"
                      setPreviewsFun={setBannerImagesFun}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="form-group w-full mb-5">
                  <FormControl fullWidth variant="standard">
                    <InputLabel id="product-categories-label">
                      {t("bvendor.productCategories")}
                    </InputLabel>
                    {context?.catData?.length > 0 && (
                      <Select
                        size="small"
                        className="w-full"
                        value={productCat}
                        onChange={handleChangeProductCat}
                        disabled={isLoading}
                      >
                        {context?.catData?.map((cat) => (
                          <MenuItem key={cat?._id} value={cat?._id}>
                            {cat?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </FormControl>
                </div>

                <div className="form-group w-full mb-5">
                  <TextField
                    type="text"
                    id="paymentDetails"
                    name="paymentDetails"
                    value={formFields.paymentDetails}
                    disabled={isLoading}
                    label={t("bvendor.paymentDetails")}
                    variant="standard"
                    className="w-full"
                    onChange={onChangeInput}
                    required
                  />
                </div>

                <div className="form-group w-full mb-5">
                  <TextField
                    type="text"
                    id="taxIdentificationNumber"
                    name="taxIdentificationNumber"
                    value={formFields.taxIdentificationNumber}
                    disabled={isLoading}
                    label={t("bvendor.taxId")}
                    variant="standard"
                    className="w-full"
                    onChange={onChangeInput}
                  />
                </div>

                <div className="form-group w-full mb-5">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formFields.termsAgreement}
                        onChange={onChangeTerms}
                        name="termsAgreement"
                        disabled={isLoading}
                      />
                    }
                    label={t("bvendor.agreeTerms")}
                  />
                </div>

                <div className="flex items-center w-full mt-3 mb-3">
                  <Button
                    type="submit"
                    disabled={isLoading || !validateForm()}
                    className="btn-org btn-lg w-full flex gap-3"
                  >
                    {isLoading ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      t("bvendor.submit")
                    )}
                  </Button>
                </div>
              </form>
            </div>

            <div className="pl-44 w-[60%] pt-3">
              <div className="box p-5 bg-gray-200 rounded-md w-full sticky top-10">
                <h2>{t("bvendor.growFaster")}</h2>
                <div className="grid grid-cols-1 mt-5 gap-5">
                  <div className="box flex items-center gap-3">
                    <img
                      src="https://images.meeshosupplyassets.com/supplier_community.svg"
                      alt="img"
                    />

                    <div className="info flex flex-col gap-0">
                      <h4>{t("bvendor.sellersCount")}</h4>
                      <p className="mt-0 mb-0 text-[13px]">
                        {t("bvendor.sellersNote")}{" "}
                      </p>
                    </div>
                  </div>

                  <div className="box flex items-center gap-3">
                    <img
                      src="https://images.meeshosupplyassets.com/pincode.svg"
                      alt="img"
                    />

                    <div className="info flex flex-col gap-0">
                      <h4>{t("bvendor.pincodes")}</h4>
                      <p className="mt-0 mb-0 text-[13px]">
                        {t("bvendor.pincodesNote")}
                      </p>
                    </div>
                  </div>

                  <div className="box flex items-center gap-3">
                    <img
                      src="https://images.meeshosupplyassets.com/reach_india.svg"
                      alt="img"
                    />

                    <div className="info flex flex-col gap-0">
                      <h4>{t("bvendor.buyersCount")}</h4>
                      <p className="mt-0 mb-0 text-[13px]">
                        {t("bvendor.buyersNote")}
                      </p>
                    </div>
                  </div>

                  <div className="box flex items-center gap-3">
                    <img
                      src="https://images.meeshosupplyassets.com/categories.svg"
                      alt="img"
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
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default BecomeVendor;
