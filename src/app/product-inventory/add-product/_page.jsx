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

        <div className="w-full lg:w-[80%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <div className="flex items-center pb-3">
              <h2 className="pb-0">Add New Product</h2>
            </div>
            <hr />

            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="col">
                  <FormLabel>Product Name</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="name"
                    value={formFields.name}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Description</FormLabel>
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
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Brand</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="brand"
                    value={formFields.brand}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Price</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    className="w-full"
                    name="price"
                    value={formFields.price}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Old Price</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    className="w-full"
                    name="oldPrice"
                    value={formFields.oldPrice}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Category</FormLabel>
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

                <div className="col">
                  <FormLabel>Product Sub Category</FormLabel>
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

                <div className="col">
                  <FormLabel>Product Third Level Category</FormLabel>
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

                <div className="col">
                  <FormLabel>Product Stock</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    className="w-full"
                    name="countInStock"
                    value={formFields.countInStock}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Discount</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    className="w-full"
                    name="discount"
                    value={formFields.discount}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product RAMs</FormLabel>
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

                <div className="col">
                  <FormLabel>Product Size</FormLabel>
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

                <div className="col">
                  <FormLabel>Product Weight</FormLabel>
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

                <div className="col">
                  <FormLabel>Is Featured?</FormLabel>
                  <Select
                    size="small"
                    className="w-full"
                    value={productFeatured}
                    onChange={handleChangeProductFeatured}
                    disabled={isLoading}
                  >
                    <MenuItem value={true}>True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
                  </Select>
                </div>

                <div className="col">
                  <FormLabel>Product Rating</FormLabel>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={onChangeRating}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="mt-5">
                <FormLabel>Media & Images</FormLabel>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {previews?.map((image, index) => (
                    <div className="uploadBoxWrapper relative" key={index}>
                      <span
                        className="absolute w-[20px] h-[20px] rounded-full bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                        onClick={() => removeImg(image, index)}
                      >
                        <IoMdClose className="text-white text-[17px]" />
                      </span>
                      <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100">
                        <img src={image} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  ))}
                  {/* <UploadBox
                    multiple={true}
                    name="images"
                    url="/api/product/uploadImages"
                    setPreviewsFun={setPreviewsFun}
                    disabled={isLoading}
                  /> */}
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center gap-8 mb-3">
                  <FormLabel>Banner Images</FormLabel>
                  <Switch checked={checkedSwitch} onChange={handleChangeSwitch} disabled={isLoading} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {bannerPreviews?.map((image, index) => (
                    <div className="uploadBoxWrapper relative" key={index}>
                      <span
                        className="absolute w-[20px] h-[20px] rounded-full bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                        onClick={() => removeBannerImg(image, index)}
                      >
                        <IoMdClose className="text-white text-[17px]" />
                      </span>
                      <div className="uploadBox p-0 rounded-md overflow-hidden borderendali border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100">
                        <img src={image} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  ))}
                  {/* <UploadBox
                    multiple={true}
                    name="bannerimages"
                    url="/api/product/uploadBannerImages"
                    setPreviewsFun={setBannerImagesFun}
                    disabled={isLoading}
                  /> */}
                </div>
                <FormLabel>Banner Title</FormLabel>
                <TextField
                  variant="outlined"
                  size="small"
                  className="w-full mt-3"
                  name="bannerTitleName"
                  value={formFields.bannerTitleName}
                  onChange={onChangeInput}
                  disabled={isLoading}
                />
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
                    "Publish and View"
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

export default AddProduct;