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

const ProductForm = () => {
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
    productRam: [],
    productWeight: [],
    size: [],
    rating: 1,
    isDisplayOnHomeBanner: false,
    images: [],
    bannerimages: [],
    barcode: "",
  });

  const context = useContext(MyContext);
  const router = useRouter();
  const { id } = useParams(); // Get the product ID from the route

  const isEditMode = !!id; // Determine if in edit mode based on presence of ID

  // Fetch product data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const res = await fetchDataFromApi(`/api/product/${id}`);
          if (!res?.error) {
            const product = res?.product;
            // Pre-populate form fields
            setFormFields({
              name: product.name || "",
              arbName: product.arbName || "",
              description: product.description || "",
              arbDescription: product.arbDescription || "",
              brand: product.brand || "",
              price: product.price || "",
              oldPrice: product.oldPrice || "",
              countInStock: product.countInStock || "",
              discount: product.discount || "",
              bannerTitleName: product.bannerTitleName || "",
              catId: product.category || "",
              catName: product.catName || "",
              subCatId: product.subCatId || "",
              subCat: product.subCat || "",
              thirdsubCatId: product.thirdsubCatId || "",
              thirdsubCat: product.thirdsubCat || "",
              isFeatured: product.isFeatured || false,
              productRam: product.productRam || [],
              productWeight: product.productWeight || [],
              size: product.size || [],
              rating: product.rating || 1,
              isDisplayOnHomeBanner: product.isDisplayOnHomeBanner || false,
              images: product.images || [],
              bannerimages: product.bannerimages || [],
            });
            // Pre-populate other states
            setProductCat(product.category || "");
            setProductSubCat(product.subCatId || "");
            setProductThirdLavelCat(product.thirdsubCatId || "");
            setProductFeatured(product.isFeatured || false);
            setProductRams(product.productRam || []);
            setProductWeight(product.productWeight || []);
            setProductSize(product.size || []);
            setRating(product.rating || 1);
            setCheckedSwitch(product.isDisplayOnHomeBanner || false);
            setPreviews(product.images || []);
            setBannerPreviews(product.bannerimages || []);
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
    }
  }, [id, isEditMode, context]);

  // const onChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   setFormFields((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormFields((prev) => {
      const updatedFields = {
        ...prev,
        [name]: value,
      };

      // Automatically calculate discount if price or oldPrice changes
      const price = name === "price" ? value : prev.price;
      const oldPrice = name === "oldPrice" ? value : prev.oldPrice;

      if (price && oldPrice) {
        const discount = calculateDiscount(price, oldPrice);
        updatedFields.discount = discount;
      }

      return updatedFields;
    });
  };

  const calculateDiscount = (price, oldPrice) => {
    const newPrice = parseFloat(price);
    const originalPrice = parseFloat(oldPrice);

    if (!isNaN(newPrice) && !isNaN(originalPrice) && originalPrice > 0) {
      const discount = ((originalPrice - newPrice) / originalPrice) * 100;
      return Math.round(discount); // Round off to whole number
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

  //generate barcode
  useEffect(() => {
    const generateBarcode = () => {
      const timestamp = Date.now().toString(); // 13 digits
      const randomPart = Math.floor(
        100000000 + Math.random() * 900000000
      ).toString(); // 9 digits
      const barcode = (timestamp + randomPart).slice(0, 20); // Make sure it’s exactly 20 digits

      setFormFields((prev) => ({
        ...prev,
        barcode: barcode,
      }));
    };

    generateBarcode();
  }, []);

  const handleChangeProductRams = (e) => {
    const { value } = e.target;
    setProductRams(typeof value === "string" ? value.split(",") : value);
    setFormFields((prev) => ({
      ...prev,
      productRam: value,
    }));
  };

  const handleChangeProductWeight = (e) => {
    const { value } = e.target;
    setProductWeight(typeof value === "string" ? value.split(",") : value);
    setFormFields((prev) => ({
      ...prev,
      productWeight: value,
    }));
  };

  const handleChangeProductSize = (e) => {
    const { value } = e.target;
    setProductSize(typeof value === "string" ? value.split(",") : value);
    setFormFields((prev) => ({
      ...prev,
      size: value,
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

  // Adapted from AddProduct: Handle product image previews
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

  // Adapted from AddProduct: Handle banner image previews
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

  // Adapted from AddProduct: Remove product image
  const removeImg = (image, index) => {
    const imageArr = [...previews];
    deleteImages(`/api/category/deteleImage?img=${image}`).then((res) => {
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

  // Adapted from AddProduct: Remove banner image
  const removeBannerImg = (image, index) => {
    const imageArr = [...bannerPreviews];
    deleteImages(`/api/category/deleteVendorImage?img=${image}`).then((res) => {
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

    const requiredFields = [
      "name",
      "description",
      "brand",
      "price",
      "countInStock",
    ];
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
      vendorId: localStorage.getItem("vendorId"),
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
        toast.error("There was an error");
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
                  />
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

              <div className="flex items-center gap-4 mt-5">
                <Button
                  type="submit"
                  className="btn-org btn-sm w-[200px]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : isEditMode ? (
                    "Update Product"
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

export default ProductForm;
