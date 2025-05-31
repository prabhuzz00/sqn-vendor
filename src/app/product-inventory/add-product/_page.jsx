"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, TextField, Select, MenuItem, Rating, Switch, FormLabel } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";
// import Cookies from "js-cookies";
import { postData } from "@/utils/api";
import AccountSidebar from "../../../components/AccountSidebar";
// import UploadBox from "../../components/UploadBox";
import { IoMdClose } from "react-icons/io";
import {AccountTree, add, AddBox, AspectRatio, AttachMoney, BrandingWatermark, Category, Description, FeaturedPlayList, Image, Inventory, LocalOffer, Memory, MoneyOff, PhotoLibrary, PriceChange, Publish, StarRate, SubdirectoryArrowRight, Title } from "@mui/icons-material"
import { Folder, Info, Scale, Settings, Star } from "lucide-react";
import { PiFlagBanner } from "react-icons/pi";

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [productFeatured, setProductFeatured] = useState(false);
  const [productRams, setProductRams] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [rating, setRating] = useState(1);
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    oldPrice: "",
    countInStock: "",
    discount: "",
    bannerTitleName: "",
  });

  const context = useContext(MyContext);
  const router = useRouter();

  // useEffect(() => {
  //   const token = Cookies.get("accessToken");
  //   if (!token) {
  //     router.push("/");
  //   }
  // }, [context?.isLogin]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeProductCat = (e) => {
    const selectedCat = context?.catData?.find((cat) => cat._id === e.target.value);
    setProductCat(e.target.value);
    setFormFields((prev) => ({
      ...prev,
      catId: e.target.value,
      catName: selectedCat?.name || "",
    }));
  };

  const handleChangeProductSubCat = (e) => {
    const selectedSubCat = context?.catData
      ?.flatMap((cat) => cat.children)
      .find((subCat) => subCat._id === e.target.value);
    setProductSubCat(e.target.value);
    setFormFields((prev) => ({
      ...prev,
      subCatId: e.target.value,
      subCat: selectedSubCat?.name || "",
    }));
  };

  const handleChangeProductThirdLavelCat = (e) => {
    const selectedThirdCat = context?.catData
      ?.flatMap((cat) => cat.children)
      .flatMap((subCat) => subCat.children)
      .find((thirdCat) => thirdCat._id === e.target.value);
    setProductThirdLavelCat(e.target.value);
    setFormFields((prev) => ({
      ...prev,
      thirdsubCatId: e.target.value,
      thirdsubCat: selectedThirdCat?.name || "",
    }));
  };

  const handleChangeProductFeatured = (e) => {
    setProductFeatured(e.target.value);
    setFormFields((prev) => ({
      ...prev,
      isFeatured: e.target.value,
    }));
  };

  const handleChangeProductRams = (e) => {
    setProductRams(e.target.value);
    setFormFields((prev) => ({
      ...prev,
      productRam: e.target.value,
    }));
  };

  const handleChangeProductWeight = (e) => {
    setProductWeight(e.target.value);
    setFormFields((prev) => ({
      ...prev,
      productWeight: e.target.value,
    }));
  };

  const handleChangeProductSize = (e) => {
    setProductSize(e.target.value);
    setFormFields((prev) => ({
      ...prev,
      size: e.target.value,
    }));
  };

  const onChangeRating = (e, newValue) => {
    setRating(newValue);
    setFormFields((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleChangeSwitch = (e) => {
    setCheckedSwitch(e.target.checked);
    setFormFields((prev) => ({
      ...prev,
      isDisplayOnHomeBanner: e.target.checked,
    }));
  };

  const setPreviewsFun = (images) => {
    setPreviews(images);
    setFormFields((prev) => ({
      ...prev,
      images,
    }));
  };

  const setBannerImagesFun = (images) => {
    setBannerPreviews(images);
    setFormFields((prev) => ({
      ...prev,
      bannerimages: images,
    }));
  };

  const removeImg = (image, index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFormFields((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeBannerImg = (image, index) => {
    setBannerPreviews((prev) => prev.filter((_, i) => i !== index));
    setFormFields((prev) => ({
      ...prev,
      bannerimages: prev.bannerimages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const requiredFields = ["name", "description", "brand", "price", "countInStock"];
    for (const field of requiredFields) {
      if (!formFields[field]) {
        context.alertBox("error", `Please enter ${field}`);
        setIsLoading(false);
        return;
      }
    }

    const productData = {
      ...formFields,
      category: productCat,
      isVerified: false,      
      vendorId: localStorage.getItem('vendorId'),
    };

    try {
      const res = await postData("/api/product/create", productData, { withCredentials: true });
      if (!res?.error) {
        context.alertBox("success", res?.message);
        router.push('/my-products')
      } else {
        context.alertBox("error", res?.message);
      }
    } catch (error) {
      context.alertBox("error", "Failed to add product");
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

        <div className="w-full lg:w-[85%] mx-auto">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <AddBox className="text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-0">Add New Product</h2>
              </div>
            </div>

            <form className="p-8" onSubmit={handleSubmit}>
              {/* Basic Information Card */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <Inventory className="text-sm text-gray-500" />
                        Product Name
                      </FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        className="w-full"
                        name="name"
                        value={formFields.name}
                        onChange={onChangeInput}
                        disabled={isLoading}
                        placeholder="Enter product name"
                      />
                    </div>

                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <BrandingWatermark className="text-sm text-gray-500" />
                        Product Brand
                      </FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        className="w-full"
                        name="brand"
                        value={formFields.brand}
                        onChange={onChangeInput}
                        disabled={isLoading}
                        placeholder="Enter brand name"
                      />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <Description className="text-sm text-gray-500" />
                        Product Description
                      </FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        className="w-full"
                        name="description"
                        value={formFields.description}
                        onChange={onChangeInput}
                        disabled={isLoading}
                        multiline
                        rows={4}
                        placeholder="Enter detailed product description"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing & Stock Card */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <AttachMoney className="text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Pricing & Stock</h3>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <PriceChange className="text-sm text-green-500" />
                        Current Price
                      </FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        className="w-full"
                        name="price"
                        value={formFields.price}
                        onChange={onChangeInput}
                        disabled={isLoading}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <MoneyOff className="text-sm text-gray-500" />
                        Old Price
                      </FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        className="w-full"
                        name="oldPrice"
                        value={formFields.oldPrice}
                        onChange={onChangeInput}
                        disabled={isLoading}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <Inventory className="text-sm text-blue-500" />
                        Stock Quantity
                      </FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        className="w-full"
                        name="countInStock"
                        value={formFields.countInStock}
                        onChange={onChangeInput}
                        disabled={isLoading}
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <LocalOffer className="text-sm text-red-500" />
                        Discount (%)
                      </FormLabel>
                      <TextField
                        variant="outlined"
                        size="small"
                        type="number"
                        className="w-full"
                        name="discount"
                        value={formFields.discount}
                        onChange={onChangeInput}
                        disabled={isLoading}
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Categories Card */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Category className="text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <Folder className="text-sm text-purple-500" />
                        Main Category
                      </FormLabel>
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
                    </div>

                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <SubdirectoryArrowRight className="text-sm text-purple-500" />
                        Sub Category
                      </FormLabel>
                      {context?.catData?.length > 0 && (
                        <Select
                          size="small"
                          className="w-full"
                          value={productSubCat}
                          onChange={handleChangeProductSubCat}
                          disabled={isLoading}
                        >
                          {context?.catData?.flatMap((cat) => cat?.children)?.map((subCat) => (
                            <MenuItem key={subCat?._id} value={subCat?._id}>
                              {subCat?.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </div>

                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <AccountTree className="text-sm text-purple-500" />
                        Third Level Category
                      </FormLabel>
                      {context?.catData?.length > 0 && (
                        <Select
                          size="small"
                          className="w-full"
                          value={productThirdLavelCat}
                          onChange={handleChangeProductThirdLavelCat}
                          disabled={isLoading}
                        >
                          {context?.catData
                            ?.flatMap((cat) => cat?.children)
                            ?.flatMap((subCat) => subCat?.children)
                            ?.map((thirdLavelCat) => (
                              <MenuItem key={thirdLavelCat?._id} value={thirdLavelCat?._id}>
                                {thirdLavelCat?.name}
                              </MenuItem>
                            ))}
                        </Select>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Specifications Card */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Product Specifications</h3>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <Memory className="text-sm text-orange-500" />
                        RAM Options
                      </FormLabel>
                      <Select
                        size="small"
                        className="w-full"
                        multiple
                        value={productRams}
                        onChange={handleChangeProductRams}
                        disabled={isLoading}
                      >
                        {context?.productRamsData?.map((item) => (
                          <MenuItem key={item?.name} value={item?.name}>
                            {item?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <AspectRatio className="text-sm text-orange-500" />
                        Size Options
                      </FormLabel>
                      <Select
                        size="small"
                        className="w-full"
                        multiple
                        value={productSize}
                        onChange={handleChangeProductSize}
                        disabled={isLoading}
                      >
                        {context?.productSizeData?.map((item) => (
                          <MenuItem key={item?.name} value={item?.name}>
                            {item?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <Scale className="text-sm text-orange-500" />
                        Weight Options
                      </FormLabel>
                      <Select
                        size="small"
                        className="w-full"
                        multiple
                        value={productWeight}
                        onChange={handleChangeProductWeight}
                        disabled={isLoading}
                      >
                        {context?.productWeightData?.map((item) => (
                          <MenuItem key={item?.name} value={item?.name}>
                            {item?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Features Card */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Product Features</h3>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <FeaturedPlayList className="text-sm text-yellow-500" />
                        Featured Product
                      </FormLabel>
                      <Select
                        size="small"
                        className="w-full"
                        value={productFeatured}
                        onChange={handleChangeProductFeatured}
                        disabled={isLoading}
                      >
                        <MenuItem value={true}>Featured</MenuItem>
                        <MenuItem value={false}>Not Featured</MenuItem>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                        <StarRate className="text-sm text-yellow-500" />
                        Product Rating
                      </FormLabel>
                      <div className="flex items-center pt-2">
                        <Rating
                          name="rating"
                          value={rating}
                          onChange={onChangeRating}
                          disabled={isLoading}
                          size="large"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Media Upload Card */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <PhotoLibrary className="text-pink-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Media & Images</h3>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="space-y-6">
                    <div>
                      <FormLabel className="flex items-center gap-2 font-medium text-gray-700 mb-3">
                        <Image className="text-sm text-pink-500" />
                        Product Images
                      </FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {previews?.map((image, index) => (
                          <div className="uploadBoxWrapper relative group" key={index}>
                            <span
                              className="absolute w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 -top-2 -right-2 flex items-center justify-center z-50 cursor-pointer transition-colors shadow-lg"
                              onClick={() => removeImg(image, index)}
                            >
                              <IoMdClose className="text-white text-sm" />
                            </span>
                            <div className="uploadBox p-0 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-pink-400 h-32 w-full bg-gray-50 transition-colors">
                              <img src={image} className="w-full h-full object-cover" alt="Product" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                          <PiFlagBanner className="text-sm text-pink-500" />
                          Banner Images
                        </FormLabel>
                        <Switch
                          checked={checkedSwitch}
                          onChange={handleChangeSwitch}
                          disabled={isLoading}
                          color="primary"
                        />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        {bannerPreviews?.map((image, index) => (
                          <div className="uploadBoxWrapper relative group" key={index}>
                            <span
                              className="absolute w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 -top-2 -right-2 flex items-center justify-center z-50 cursor-pointer transition-colors shadow-lg"
                              onClick={() => removeBannerImg(image, index)}
                            >
                              <IoMdClose className="text-white text-sm" />
                            </span>
                            <div className="uploadBox p-0 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-pink-400 h-32 w-full bg-gray-50 transition-colors">
                              <img src={image} className="w-full h-full object-cover" alt="Banner" />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <FormLabel className="flex items-center gap-2 font-medium text-gray-700">
                          <Title className="text-sm text-pink-500" />
                          Banner Title
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          className="w-full"
                          name="bannerTitleName"
                          value={formFields.bannerTitleName}
                          onChange={onChangeInput}
                          disabled={isLoading}
                          placeholder="Enter banner title"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="contained"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Publish />}
                >
                  {isLoading ? "Publishing..." : "Publish and View"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;