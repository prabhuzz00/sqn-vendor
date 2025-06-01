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
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Paper,
  IconButton,
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
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import UploadBox from "../UploadBox";
import { FaBox, FaCloudUploadAlt, FaImage, FaStar, FaTag } from "react-icons/fa";
import { MdBrandingWatermark, MdCategory, MdInventory } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";

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

    <Box sx={{ py: { xs: 2, lg: 5 }, px:{xs:2, lg:3},  bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Grid container spacing={3} sx={{ maxWidth: '1400px', mx: 'auto', px: 2 }}>
        {/* Sidebar */}
        <Grid item xs={12} lg={3}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Account Dashboard
              </Typography>
              {/* AccountSidebar component would be here */}
              <AccountSidebar />
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} lg={9}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <MdInventory size={24} color="#1976d2" />
                <Typography variant="h5" fontWeight="600">
                  {isEditMode ? "Edit Product" : "Add New Product"}
                </Typography>
              </Box>
              <Divider />

              <Box component="form" sx={{ mt: 3 }}>
                {/* Basic Information Card */}
                <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <FaBox color="#1976d2" />
                      <Typography variant="h6" color="primary">Basic Information</Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Product Name *
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder="Enter product name"
                          name="name"
                          value={formFields.name}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        // Add props here
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Arabic Name *
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder="Enter Arabic name"
                          name="arbName"
                          value={formFields.arbName}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Description *
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          multiline
                          rows={3}
                          placeholder="Enter product description"
                          name="description"
                          value={formFields.description}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        // multiline
                        // rows={4}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Arabic Description *
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          multiline
                          rows={3}
                          placeholder="Enter Arabic description"
                          name="arbDescription"
                          value={formFields.arbDescription}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        // multiline
                        // rows={4}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Brand *
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder="Enter brand name"
                          InputProps={{
                            startAdornment: <MdBrandingWatermark style={{ marginRight: 8, color: '#666' }} />
                          }}
                          name="brand"
                          value={formFields.brand}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Tags
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder="Enter tags separated by commas"
                          InputProps={{
                            startAdornment: <FaTag style={{ marginRight: 8, color: '#666' }} />
                          }}
                          name="tags"
                          value={formFields.tags.join(", ")}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        // Add props here

                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Pricing & Inventory Card */}
                <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <MdInventory color="#1976d2" />
                      <Typography variant="h6" color="primary">Pricing & Inventory</Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Price *
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="number"
                          fullWidth
                          placeholder="0.00"
                          InputProps={{ startAdornment: <span style={{ marginRight: 4 }}>$</span> }}
                          name="price"
                          value={formFields.price}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Old Price *
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="number"
                          fullWidth
                          placeholder="0.00"
                          InputProps={{ startAdornment: <span style={{ marginRight: 4 }}>$</span> }}
                          name="oldPrice"
                          value={formFields.oldPrice}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Discount %
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="number"
                          fullWidth
                          InputProps={{

                            endAdornment: <span>%</span>
                          }}
                          sx={{ '& .MuiInputBase-input': { bgcolor: '#f5f5f5' } }}
                          name="discount"
                          value={formFields.discount}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Stock Quantity *
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="number"
                          fullWidth
                          placeholder="0"
                          name="countInStock"
                          value={formFields.countInStock}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Rating
                        </FormLabel>
                        <Box display="flex" alignItems="center" gap={1}>

                          <Rating
                            size="medium"
                            name="rating"
                            value={parseFloat(formFields.rating) || 0}
                            onChange={onChangeRating}
                            disabled={isLoading}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Categories Card */}
                <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <MdCategory color="#1976d2" />
                      <Typography variant="h6" color="primary">Categories</Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Main Category *
                        </FormLabel>
                        <Select
                          size="small"
                          fullWidth
                          displayEmpty
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
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Sub Category
                        </FormLabel>
                        <Select
                          size="small"
                          fullWidth
                          displayEmpty
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
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Third Level Category
                        </FormLabel>
                        <Select
                          size="small"
                          fullWidth
                          displayEmpty
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
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Featured Product
                        </FormLabel>
                        <Select
                          size="small"
                          fullWidth
                          value={productFeatured}
                          onChange={handleChangeProductFeatured}
                          disabled={isLoading}
                        >
                          <MenuItem value={true}>Yes</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Product Variations Card */}
                <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <BsCardImage color="#1976d2" />
                        <Typography variant="h6" color="primary">Product Variations</Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<IoMdAdd />}
                        onClick={handleAddVariation}
                        disabled={isLoading}
                      >
                        Add Variation
                      </Button>
                    </Box>

                    {/* Variation items mapped here */}
                    {variations.map((variation, index) => (
                      <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: '#fafafa', border: '1px solid #e0e0e0' }}>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                          <Typography variant="subtitle1" fontWeight="500">Variation #{index + 1}</Typography>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveVariation(index)}
                            disabled={isLoading}
                          >
                            <IoMdClose />
                          </IconButton>
                        </Box>

                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                              Color
                            </FormLabel>
                            <Select
                              size="small"
                              fullWidth
                              displayEmpty
                              value={variation.color.label}
                              onChange={(e) =>
                                handleVariationChange(index, "label", e.target.value)
                              }
                              disabled={isLoading}
                            >
                              <MenuItem value="">Select Color</MenuItem>
                              {productRamsData.map((colorOption) => (
                                <MenuItem
                                  key={colorOption._id}
                                  value={colorOption.name}
                                >
                                  {colorOption.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                          <Grid item xs={12}>
                            <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                              Color Images
                            </FormLabel>
                            <Box display="flex" gap={1} flexWrap="wrap">
                              <Grid item xs={6} sm={3}>
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
                              </Grid>
                              {/* Uploaded images mapped here */}
                              {variation.color.images?.map((img, imgIndex) => (
                                <Box key={imgIndex} sx={{ position: 'relative', width: 80, height: 80 }}>
                                  <img
                                    src={img}
                                    alt={`variation-${index}-img-${imgIndex}`}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                      borderRadius: '4px'
                                    }}
                                  />
                                  <IconButton
                                    size="small"
                                    sx={{
                                      position: 'absolute',
                                      top: -8,
                                      right: -8,
                                      bgcolor: 'error.main',
                                      color: 'white',
                                      width: 20,
                                      height: 20,
                                      '&:hover': { bgcolor: 'error.dark' }
                                    }}
                                    onClick={() => removeColorImage(index, img)}
                                    disabled={isLoading}
                                  >
                                    <IoMdClose fontSize="small" />
                                  </IconButton>
                                </Box>
                              ))}
                            </Box>
                          </Grid>
                        </Grid>

                        <Box mt={2}>
                          <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                            <FormLabel sx={{ fontWeight: 500 }}>Sizes</FormLabel>
                            <Button
                              variant="text"
                              size="small"
                              startIcon={<IoMdAdd />}
                              onClick={() => handleAddSize(index)}
                              disabled={isLoading}
                            >
                              Add Size
                            </Button>
                          </Box>

                          {/* Size items mapped here */}
                          {variation.sizes.map((size, sizeIndex) => (
                            <Grid container spacing={1} alignItems="center" sx={{ mb: 1 }} key={sizeIndex}>
                              <Grid item xs={3}>
                                <Select
                                  size="small"
                                  fullWidth
                                  displayEmpty
                                  value={size.label}
                                  onChange={(e) =>
                                    handleSizeChange(index, sizeIndex, "label", e.target.value)
                                  }
                                  disabled={isLoading}
                                >
                                  <MenuItem value="">Size</MenuItem>
                                  {productSizeData.map((sizeOption) => (
                                    <MenuItem
                                      key={sizeOption._id}
                                      value={sizeOption.name}
                                    >
                                      {sizeOption.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </Grid>
                              <Grid item xs={3}>
                                <TextField
                                  size="small"
                                  type="number"
                                  placeholder="Price"
                                  fullWidth
                                  value={size.price}
                                  onChange={(e) =>
                                    handleSizeChange(index, sizeIndex, "price", e.target.value)
                                  }
                                  disabled={isLoading}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextField
                                  size="small"
                                  type="number"
                                  placeholder="Stock"
                                  fullWidth
                                  value={size.countInStock}
                                  onChange={(e) =>
                                    handleSizeChange(index, sizeIndex, "countInStock", e.target.value)
                                  }
                                  disabled={isLoading}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleRemoveSize(index, sizeIndex)}
                                  disabled={isLoading}
                                >
                                  <IoMdClose />
                                </IconButton>
                              </Grid>
                            </Grid>
                          ))}
                        </Box>
                      </Paper>
                    ))}
                  </CardContent>
                </Card>

                {/* Product Images Card */}
                <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <FaImage color="#1976d2" />
                      <Typography variant="h6" color="primary">Product Images</Typography>
                    </Box>
                    <Grid container spacing={2}>
                      {/* Existing images mapped here */}
                      {previews?.map((image, index) => (
                        <Grid item xs={6} sm={3} key={index}>
                          <Paper sx={{ position: 'relative', height: 150 }}>
                            <IconButton
                              size="small"
                              sx={{
                                position: 'absolute',
                                top: -8,
                                right: -8,
                                bgcolor: 'error.main',
                                color: 'white',
                                width: 20,
                                height: 20,
                                zIndex: 10,
                                '&:hover': { bgcolor: 'error.dark' }
                              }}
                              onClick={() => removeImg(image, index)}
                              disabled={isLoading}
                            >
                              <IoMdClose fontSize="small" />
                            </IconButton>
                            <img
                              src={image}
                              alt={`product-${index}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '4px'
                              }}
                            />
                          </Paper>
                        </Grid>
                      ))}
                      <Grid item xs={6} sm={3}>
                        <UploadBox
                          multiple={true}
                          name="images"
                          url="/api/product/vendorProductImagesUpload"
                          setPreviewsFun={setPreviewsFun}
                          disabled={isLoading}
                        />
                        
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Banner Settings Card */}
                <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <BsCardImage color="#1976d2" />
                        <Typography variant="h6" color="primary">Banner Settings</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">Display on Banner</Typography>
                        <Switch
                          checked={checkedSwitch}
                          onChange={handleChangeSwitch}
                          disabled={isLoading}
                        />
                      </Box>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Banner Title
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder="Enter banner title"
                          name="bannerTitleName"
                          value={formFields.bannerTitleName}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                          Banner Images
                        </FormLabel>
                        <Grid container spacing={2}>
                          {/* Banner images mapped here */}
                          {bannerPreviews?.map((image, index) => (
                            <Grid item xs={6} sm={3} key={index}>
                              <Paper sx={{ position: 'relative', height: 150 }}>
                                <IconButton
                                  size="small"
                                  sx={{
                                    position: 'absolute',
                                    top: -8,
                                    right: -8,
                                    bgcolor: 'error.main',
                                    color: 'white',
                                    width: 20,
                                    height: 20,
                                    zIndex: 10,
                                    '&:hover': { bgcolor: 'error.dark' }
                                  }}
                                  onClick={() => removeBannerImg(image, index)}
                                  disabled={isLoading}
                                >
                                  <IoMdClose fontSize="small" />
                                </IconButton>
                                <img
                                  src={image}
                                  alt={`banner-${index}`}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    borderRadius: '4px'
                                  }}
                                />
                              </Paper>
                            </Grid>
                          ))}
                          <Grid item xs={6} sm={3}>
                              <UploadBox
                                multiple={true}
                                name="bannerimages"
                                url="/api/product/uploadBannerImages"
                                setPreviewsFun={setBannerImagesFun}
                                disabled={isLoading}
                              />
                              
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{ minWidth: 120 }}
                        disabled={isLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={
                          isLoading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <FaCloudUploadAlt />
                          )
                        }
                        sx={{ minWidth: 200 }}
                        disabled={isLoading}
                      >
                        {isEditMode ? "Update Product" : "Publish Product"}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductForm;
