"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Rating,
  Switch,
  FormLabel,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { MyContext } from "@/context/ThemeProvider";
import { useRouter, useParams } from "next/navigation";
import {
  postData,
  fetchDataFromApi,
  editData,
  deleteImages,
} from "@/utils/api";
import AccountSidebar from "../AccountSidebar";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import UploadBox from "../UploadBox";
import { FaCloudUploadAlt } from "react-icons/fa";

const ProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [productFeatured, setProductFeatured] = useState(false);
  const [productRamsData, setProductRamsData] = useState([]);
  const [productSizeData, setProductSizeData] = useState([]);
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);

  const [formFields, setFormFields] = useState({
    name: "",
    arbName: "",
    description: "",
    arbDescription: "",
    brand: "",
    price: "",
    oldPrice: "",
    countInStock: "",
    discount: "",
    bannerTitleName: "",
    catId: "",
    catName: "",
    subCatId: "",
    subCat: "",
    thirdsubCatId: "",
    thirdsubCat: "",
    isFeatured: false,
    rating: 1,
    isDisplayOnHomeBanner: false,
    images: [],
    bannerimages: [],
    barcode: "",
    tags: [],
  });

  const [variations, setVariations] = useState([
    {
      color: { label: "", images: [] },
      sizes: [{ label: "", price: "", countInStock: "" }],
    },
  ]);

  const context = useContext(MyContext);
  const router = useRouter();
  const { id } = useParams();
  const isEditMode = !!id;

  // Fetch product data if in edit mode, and fetch dropdown data
  useEffect(() => {
    // Fetch RAMs and Sizes for variations
    fetchDataFromApi("/api/product/productRAMS/get").then((res) => {
      if (res?.error === false) {
        setProductRamsData(res?.data);
      }
    });

    fetchDataFromApi("/api/product/productSize/get").then((res) => {
      if (res?.error === false) {
        setProductSizeData(res?.data);
      }
    });

    if (isEditMode) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const res = await fetchDataFromApi(`/api/product/${id}`);
          if (!res?.error) {
            const product = res?.product;
            const price = parseFloat(product?.price);
            const oldPrice = parseFloat(product?.oldPrice);
            let discount = "";
            if (!isNaN(price) && !isNaN(oldPrice) && oldPrice > 0) {
              discount = Math.round(((oldPrice - price) / oldPrice) * 100);
            }

            setFormFields({
              name: product.name || "",
              arbName: product.arbName || "",
              description: product.description || "",
              arbDescription: product.arbDescription || "",
              brand: product.brand || "",
              price: product.price || "",
              oldPrice: product.oldPrice || "",
              countInStock: product.countInStock || "",
              discount: discount || product.discount || "",
              bannerTitleName: product.bannerTitleName || "",
              catId: product.catId || "",
              catName: product.catName || "",
              subCatId: product.subCatId || "",
              subCat: product.subCat || "",
              thirdsubCatId: product.thirdsubCatId || "",
              thirdsubCat: product.thirdsubCat || "",
              isFeatured: product.isFeatured || false,
              rating: product.rating || 1,
              isDisplayOnHomeBanner: product.isDisplayOnHomeBanner || false,
              images: product.images || [],
              bannerimages: product.bannerimages || [],
              barcode: product.barcode || "",
              tags: product.tags || [],
            });

            setProductCat(product.catId || "");
            setProductSubCat(product.subCatId || "");
            setProductThirdLavelCat(product.thirdsubCatId || "");
            setProductFeatured(product.isFeatured || false);
            setCheckedSwitch(product.isDisplayOnHomeBanner || false);
            setPreviews(product.images || []);
            setBannerPreviews(product.bannerimages || []);
            setVariations(
              product.variation || [
                {
                  color: { label: "", images: [] },
                  sizes: [{ label: "", price: "", countInStock: "" }],
                },
              ]
            );
          } else {
            context.alertBox("error", res?.message);
            toast.error("There was an error!");
          }
        } catch (error) {
          context.alertBox("error", "Failed to fetch product data");
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    } else {
      // Generate barcode for new product
      const generateBarcode = () => {
        const timestamp = Date.now().toString();
        const randomPart = Math.floor(
          100000000 + Math.random() * 900000000
        ).toString();
        const barcode = (timestamp + randomPart).slice(0, 20);

        setFormFields((prev) => ({
          ...prev,
          barcode: barcode,
        }));
      };
      generateBarcode();
    }
  }, [id, isEditMode, context]);

  // Recalculate discount when price or oldPrice changes
  useEffect(() => {
    const price = parseFloat(formFields.price);
    const oldPrice = parseFloat(formFields.oldPrice);

    if (!isNaN(price) && !isNaN(oldPrice) && oldPrice > 0) {
      const discount = ((oldPrice - price) / oldPrice) * 100;
      setFormFields((prev) => ({
        ...prev,
        discount: Math.round(discount),
      }));
    }
  }, [formFields.price, formFields.oldPrice]);

  // Variation handlers
  const handleAddVariation = () => {
    setVariations([
      ...variations,
      {
        color: { label: "", images: [] },
        sizes: [{ label: "", price: "", countInStock: "" }],
      },
    ]);
  };

  const handleRemoveVariation = (index) => {
    setVariations(variations.filter((_, i) => i !== index));
  };

  const handleVariationChange = (index, field, value) => {
    const updated = [...variations];
    updated[index].color[field] = value;
    setVariations(updated);
  };

  const handleSizeChange = (vIndex, sIndex, field, value) => {
    const updated = [...variations];
    updated[vIndex].sizes[sIndex][field] = value;
    setVariations(updated);
  };

  const handleAddSize = (vIndex) => {
    const updated = [...variations];
    updated[vIndex].sizes.push({ label: "", price: "", countInStock: "" });
    setVariations(updated);
  };

  const handleRemoveSize = (vIndex, sIndex) => {
    const updated = [...variations];
    updated[vIndex].sizes.splice(sIndex, 1);
    setVariations(updated);
  };

  const removeColorImage = (variationIndex, imageToRemove) => {
    const updatedVariations = [...variations];
    deleteImages(`/api/category/deleteVendorImage?img=${imageToRemove}`).then(
      () => {
        updatedVariations[variationIndex].color.images = updatedVariations[
          variationIndex
        ].color.images.filter((img) => img !== imageToRemove);
        setVariations([]);
        setTimeout(() => {
          setVariations(updatedVariations);
        }, 100);
      }
    );
  };

  // Form input handlers
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setFormFields((prev) => ({
        ...prev,
        tags: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      setFormFields((prev) => {
        const updatedFields = {
          ...prev,
          [name]: value,
        };

        const price = name === "price" ? value : prev.price;
        const oldPrice = name === "oldPrice" ? value : prev.oldPrice;

        if (price && oldPrice) {
          const discount = calculateDiscount(price, oldPrice);
          updatedFields.discount = discount;
        }

        return updatedFields;
      });
    }
  };

  const calculateDiscount = (price, oldPrice) => {
    const newPrice = parseFloat(price);
    const originalPrice = parseFloat(oldPrice);

    if (!isNaN(newPrice) && !isNaN(originalPrice) && originalPrice > 0) {
      const discount = ((originalPrice - newPrice) / originalPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };

  const handleChangeProductCat = (e) => {
    const selectedCat = context?.catData?.find(
      (cat) => cat._id === e.target.value
    );
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

  const onChangeRating = (e, newValue) => {
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

  const setPreviewsFun = (previewsArr) => {
    const imgArr = [...previews, ...previewsArr];
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
    const imgArr = [...bannerPreviews, ...previewsArr];
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
    deleteImages(`/api/category/deleteVendorImage?img=${image}`).then(() => {
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
    deleteImages(`/api/category/deleteVendorImage?img=${image}`).then(() => {
      imageArr.splice(index, 1);
      setBannerPreviews([]);
      setTimeout(() => {
        setBannerPreviews(imageArr);
        setFormFields((prev) => ({
          ...prev,
          bannerimages: imageArr,
        }));
      }, 100);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formFields.name === "") {
      context.alertBox("error", "Please enter product name");
      setIsLoading(false);
      return;
    }

    if (formFields.arbName === "") {
      context.alertBox("error", "Please enter product Arabic Name");
      setIsLoading(false);
      return;
    }

    if (formFields.description === "") {
      context.alertBox("error", "Please enter product description");
      setIsLoading(false);
      return;
    }

    if (formFields.arbDescription === "") {
      context.alertBox("error", "Please enter product Arabic Description");
      setIsLoading(false);
      return;
    }

    if (formFields.catId === "") {
      context.alertBox("error", "Please select product category");
      setIsLoading(false);
      return;
    }

    if (formFields.price === "") {
      context.alertBox("error", "Please enter product price");
      setIsLoading(false);
      return;
    }

    if (formFields.oldPrice === "") {
      context.alertBox("error", "Please enter product old price");
      setIsLoading(false);
      return;
    }

    if (formFields.countInStock === "") {
      context.alertBox("error", "Please enter product stock");
      setIsLoading(false);
      return;
    }

    if (formFields.brand === "") {
      context.alertBox("error", "Please enter product brand");
      setIsLoading(false);
      return;
    }

    if (formFields.discount === "") {
      context.alertBox("error", "Please enter product discount");
      setIsLoading(false);
      return;
    }

    if (formFields.rating === "") {
      context.alertBox("error", "Please enter product rating");
      setIsLoading(false);
      return;
    }

    if (previews.length === 0) {
      context.alertBox("error", "Please select product images");
      setIsLoading(false);
      return;
    }

    const productData = {
      ...formFields,
      category: productCat,
      isVerified: false,
      vendorId: localStorage.getItem("vendorId"),
      variation: variations,
    };

    try {
      const url = isEditMode
        ? `/api/product/updateProduct/${id}`
        : "/api/product/create";
      const method = isEditMode ? "PUT" : "POST";
      const res = isEditMode
        ? await editData(url, productData, { withCredentials: true })
        : await postData(url, productData, { withCredentials: true });
      if (!res?.error) {
        toast.success(
          `Product ${isEditMode ? "updated" : "added"} successfully!`
        );
        router.push("/product-inventory");
      } else {
        toast.error(res?.message || "There was an error");
      }
    } catch (error) {
      toast.error(
        isEditMode ? "Failed to update product" : "Failed to add product"
      );
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
              <h2 className="pb-0">
                {isEditMode ? "Edit Product" : "Add New Product"}
              </h2>
            </div>
            <hr />

            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  <FormLabel>Product Arabic Name</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="arbName"
                    value={formFields.arbName}
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
                  <FormLabel>Product Arabic Description</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="arbDescription"
                    value={formFields.arbDescription}
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
                      {context?.catData
                        ?.flatMap((cat) => cat?.children)
                        ?.map((subCat) => (
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
                          <MenuItem
                            key={thirdLavelCat?._id}
                            value={thirdLavelCat?._id}
                          >
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
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Tags</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="tags"
                    value={formFields.tags.join(", ")}
                    onChange={onChangeInput}
                    disabled={isLoading}
                    placeholder="Enter tags separated by commas"
                  />
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
                    value={parseFloat(formFields.rating) || 0}
                    onChange={onChangeRating}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-bold text-lg mb-2">Product Variations</h3>
                {variations.map((variation, index) => (
                  <div
                    key={index}
                    className="border p-4 mb-4 bg-gray-50 rounded-md"
                  >
                    <div className="grid grid-cols-1 gap-2 mb-2">
                      <FormLabel>Color Label</FormLabel>
                      <select
                        value={variation.color.label}
                        onChange={(e) =>
                          handleVariationChange(index, "label", e.target.value)
                        }
                        className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-2 text-sm"
                        disabled={isLoading}
                      >
                        <option value="">Select Color</option>
                        {productRamsData.map((colorOption) => (
                          <option
                            key={colorOption._id}
                            value={colorOption.name}
                          >
                            {colorOption.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-2">
                      <FormLabel>Color Images</FormLabel>
                      <div className="grid grid-cols-6 gap-2 mb-2">
                        <UploadBox
                          multiple={true}
                          name="colorImages"
                          url="/api/product/uploadColorImages"
                          setPreviewsFun={(uploadedImages) => {
                            setVariations((prevVariations) =>
                              prevVariations.map((variation, i) =>
                                i === index
                                  ? {
                                      ...variation,
                                      color: {
                                        ...variation.color,
                                        images: [
                                          ...(variation.color.images || []),
                                          ...uploadedImages,
                                        ],
                                      },
                                    }
                                  : variation
                              )
                            );
                          }}
                          disabled={isLoading}
                        />
                        <div className="flex flex-wrap mt-2">
                          {variations[index]?.color?.images?.map((img, i) => (
                            <div
                              key={i}
                              className="relative mr-2 mb-2"
                              style={{ width: "80px", height: "80px" }}
                            >
                              <img
                                src={img}
                                alt={`variation-${index}-img-${i}`}
                                className="w-full h-full object-cover rounded-md"
                              />
                              <button
                                onClick={() => removeColorImage(index, img)}
                                className="absolute -top-2 -right-2 bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm z-10"
                                disabled={isLoading}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <FormLabel>Sizes</FormLabel>
                      {variation.sizes.map((size, sIndex) => (
                        <div
                          key={sIndex}
                          className="grid grid-cols-4 gap-2 mb-2"
                        >
                          <select
                            value={size.label}
                            onChange={(e) =>
                              handleSizeChange(
                                index,
                                sIndex,
                                "label",
                                e.target.value
                              )
                            }
                            className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-2 text-sm"
                            disabled={isLoading}
                          >
                            <option value="">Select size</option>
                            {productSizeData.map((sizeOption) => (
                              <option
                                key={sizeOption._id}
                                value={sizeOption.name}
                              >
                                {sizeOption.name}
                              </option>
                            ))}
                          </select>
                          <TextField
                            type="number"
                            placeholder="Price"
                            value={size.price}
                            onChange={(e) =>
                              handleSizeChange(
                                index,
                                sIndex,
                                "price",
                                e.target.value
                              )
                            }
                            variant="outlined"
                            size="small"
                            disabled={isLoading}
                          />
                          <TextField
                            type="number"
                            placeholder="Stock"
                            value={size.countInStock}
                            onChange={(e) =>
                              handleSizeChange(
                                index,
                                sIndex,
                                "countInStock",
                                e.target.value
                              )
                            }
                            variant="outlined"
                            size="small"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSize(index, sIndex)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            disabled={isLoading}
                          >
                            - Remove size
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddSize(index)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        disabled={isLoading}
                      >
                        + Add Size
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveVariation(index)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      disabled={isLoading}
                    >
                      Remove Variation
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddVariation}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  disabled={isLoading}
                >
                  + Add Variation
                </button>
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
                    url="/api/product/vendorProductImagesUpload"
                    setPreviewsFun={setPreviewsFun}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="bg-gray-100 p-4 w-full">
                  <div className="flex items-center gap-8">
                    <FormLabel>Banner Images</FormLabel>
                    <Switch
                      onChange={handleChangeSwitch}
                      checked={checkedSwitch}
                      disabled={isLoading}
                    />
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
                      name="bannerimages"
                      url="/api/product/uploadBannerImages"
                      setPreviewsFun={setBannerImagesFun}
                      disabled={isLoading}
                    />
                  </div>
                  <br />
                  <FormLabel>Banner Title</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="bannerTitleName"
                    value={formFields.bannerTitleName}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-5">
                <Button
                  type="submit"
                  className="btn-org btn-sm w-[200px] flex gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <>
                      <FaCloudUploadAlt className="text-[25px] text-white" />
                      {isEditMode ? "Update Product" : "Publish and View"}
                    </>
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

export default ProductForm;
