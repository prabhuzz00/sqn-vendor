"use client";
import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
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
import Image from "next/image";
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
import { FaBox, FaCloudUploadAlt, FaImage, FaTag } from "react-icons/fa";
import { MdBrandingWatermark, MdCategory, MdInventory } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import { useTranslation } from "@/utils/useTranslation";

/* ------------------------------------------------------------------ */
/* Helper: discount calc                                              */
/* ------------------------------------------------------------------ */
const calcDiscount = (price, oldPrice) => {
  const p = parseFloat(price);
  const o = parseFloat(oldPrice);
  return !isNaN(p) && !isNaN(o) && o > 0 ? Math.round(((o - p) / o) * 100) : 0;
};

const ProductForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useParams();
  const isEditMode = !!id;

  /* ------------------------------ state --------------------------- */
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);

  const generateRandomBarcode = () => {
    const timestamp = Date.now().toString();
    const randomPart = Math.floor(
      100000000 + Math.random() * 900000000
    ).toString();
    return (timestamp + randomPart).slice(0, 20);
  };
  const [variations, setVariations] = useState([
    {
      color: { label: "", images: [] },
      sizes: [
        {
          label: "",
          price: "",
          countInStock: "",
          vbarcode: generateRandomBarcode(),
        },
      ],
    },
  ]);
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLavelCat, setProductThirdLavelCat] = useState("");
  const [productFeatured, setProductFeatured] = useState(false);
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [productRamsData, setProductRamsData] = useState([]);
  const [productSizeData, setProductSizeData] = useState([]);
  const [serviceZone, setServiceZone] = useState("");

  const context = useContext(MyContext);

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
    isDisplayOnHomeBanner: false,
    images: [],
    bannerimages: [],
    barcode: "",
    tags: [],
    serviceZone: "",
  });

  /* ------------------------------ fetch helpers ------------------ */
  useEffect(() => {
    Promise.all([
      fetchDataFromApi("/api/product/productRAMS/get"),
      fetchDataFromApi("/api/product/productSize/get"),
    ]).then(([ramsRes, sizeRes]) => {
      if (!ramsRes?.error) setProductRamsData(ramsRes.data);
      if (!sizeRes?.error) setProductSizeData(sizeRes.data);
    });
  }, []);

  /* fetch product in edit mode */
  useEffect(() => {
    if (!isEditMode) {
      // generate barcode for new product
      const barcode = `${Date.now()}${Math.floor(Math.random() * 1e9)}`.slice(
        0,
        20
      );
      setFormFields((p) => ({ ...p, barcode }));
      return;
    }

    const loadProduct = async () => {
      setIsLoading(true);
      const res = await fetchDataFromApi(`/api/product/${id}`);
      setIsLoading(false);

      if (res?.error) {
        context.alertBox("error", res.message);
        return;
      }

      const p = res.product;
      setFormFields({
        name: p.name ?? "",
        arbName: p.arbName ?? "",
        description: p.description ?? "",
        arbDescription: p.arbDescription ?? "",
        brand: p.brand ?? "",
        price: p.price ?? "",
        oldPrice: p.oldPrice ?? "",
        countInStock: p.countInStock ?? "",
        discount: calcDiscount(p.price, p.oldPrice) || p.discount || "",
        bannerTitleName: p.bannerTitleName ?? "",
        catId: p.catId ?? "",
        catName: p.catName ?? "",
        subCatId: p.subCatId ?? "",
        subCat: p.subCat ?? "",
        thirdsubCatId: p.thirdsubCatId ?? "",
        thirdsubCat: p.thirdsubCat ?? "",
        isFeatured: p.isFeatured ?? false,
        isDisplayOnHomeBanner: p.isDisplayOnHomeBanner ?? false,
        images: p.images ?? [],
        bannerimages: p.bannerimages ?? [],
        barcode: p.barcode ?? "",
        tags: p.tags ?? [],
        serviceZone: p.serviceZone ?? "",
      });

      setProductCat(p.catId || "");
      setProductSubCat(p.subCatId || "");
      setProductThirdLavelCat(p.thirdsubCatId || "");
      setProductFeatured(p.isFeatured || false);
      setCheckedSwitch(p.isDisplayOnHomeBanner || false);
      setPreviews(p.images || []);
      setBannerPreviews(p.bannerimages || []);
      // setVariations(
      //   p.variation?.length
      //     ? p.variation
      //     : [
      //         {
      //           color: { label: "", images: [] },
      //           sizes: [{ label: "", price: "", countInStock: "",  }],
      //         },
      //       ]
      // );

      setVariations(
        p.variation?.length
          ? p.variation.map((variation) => ({
              ...variation,
              sizes: variation.sizes.map((size) => ({
                ...size,
                vbarcode: size.vbarcode || generateRandomBarcode(),
              })),
            }))
          : [
              {
                color: { label: "", images: [] },
                sizes: [
                  {
                    label: "",
                    price: "",
                    countInStock: "",
                    vbarcode: generateRandomBarcode(),
                  },
                ],
              },
            ]
      );
    };

    loadProduct();
  }, [id, isEditMode, context]);

  /* recalc discount on price change */
  useEffect(() => {
    setFormFields((prev) => ({
      ...prev,
      discount: calcDiscount(prev.price, prev.oldPrice),
    }));
  }, [formFields.price, formFields.oldPrice]);

  useEffect(() => {
    const totalStock = variations.reduce((total, variation) => {
      return (
        total +
        variation.sizes.reduce((sum, size) => {
          const stock = parseInt(size.countInStock);
          return sum + (isNaN(stock) ? 0 : stock);
        }, 0)
      );
    }, 0);

    setFormFields((prev) => ({
      ...prev,
      countInStock: totalStock,
    }));
  }, [variations]);

  /* ------------------------------ memoised category lookups ------ */
  const catOptions = context.catData || [];
  const subCatOptions = useMemo(
    () => catOptions.flatMap((c) => c.children || []),
    [catOptions]
  );
  const thirdCatOptions = useMemo(
    () => subCatOptions.flatMap((sc) => sc.children || []),
    [subCatOptions]
  );

  /* ------------------------------ handlers ----------------------- */
  const onChangeInput = ({ target: { name, value } }) => {
    setFormFields((prev) => {
      const next = { ...prev, [name]: value };
      if (name === "price" || name === "oldPrice") {
        next.discount = calcDiscount(
          name === "price" ? value : prev.price,
          name === "oldPrice" ? value : prev.oldPrice
        );
      }
      if (name === "tags") next.tags = value.split(",").map((t) => t.trim());
      return next;
    });
  };

  const handleChangeProductCat = ({ target: { value } }) => {
    const cat = catOptions.find((c) => c._id === value);
    setProductCat(value);
    setFormFields((p) => ({ ...p, catId: value, catName: cat?.name ?? "" }));
  };
  const handleChangeProductSubCat = ({ target: { value } }) => {
    const sub = subCatOptions.find((s) => s._id === value);
    setProductSubCat(value);
    setFormFields((p) => ({ ...p, subCatId: value, subCat: sub?.name ?? "" }));
  };
  const handleChangeProductThirdLavelCat = ({ target: { value } }) => {
    const third = thirdCatOptions.find((t) => t._id === value);
    setProductThirdLavelCat(value);
    setFormFields((p) => ({
      ...p,
      thirdsubCatId: value,
      thirdsubCat: third?.name ?? "",
    }));
  };

  // const handleChangeProductFeatured = ({ target: { value } }) => {
  //   setProductFeatured(value);
  //   setFormFields((p) => ({ ...p, isFeatured: value }));
  // };

  const handleChangeSwitch = ({ target: { checked } }) => {
    setCheckedSwitch(checked);
    setFormFields((p) => ({ ...p, isDisplayOnHomeBanner: checked }));
  };

  /* image helpers -------------------------------------------------- */
  const setPreviewsFun = (arr) => {
    const imgs = [...previews, ...arr];
    setPreviews(imgs);
    setFormFields((p) => ({ ...p, images: imgs }));
  };
  const setBannerImagesFun = (arr) => {
    const imgs = [...bannerPreviews, ...arr];
    setBannerPreviews(imgs);
    setFormFields((p) => ({ ...p, bannerimages: imgs }));
  };

  const removeImg = (image, idx, banner = false) => {
    deleteImages(`/api/category/deleteVendorImage?img=${image}`).then(() => {
      const list = banner ? bannerPreviews : previews;
      const next = [...list];
      next.splice(idx, 1);
      banner ? setBannerPreviews(next) : setPreviews(next);
      setFormFields((p) => ({
        ...p,
        [banner ? "bannerimages" : "images"]: next,
      }));
    });
  };

  const removeColorImage = (vIdx, img) => {
    deleteImages(`/api/category/deleteVendorImage?img=${img}`).then(() =>
      setVariations((prev) =>
        prev.map((v, i) =>
          i === vIdx
            ? {
                ...v,
                color: {
                  ...v.color,
                  images: v.color.images.filter((m) => m !== img),
                },
              }
            : v
        )
      )
    );
  };

  /* variation helpers --------------------------------------------- */
  const handleAddVariation = () =>
    setVariations((v) => [
      ...v,
      {
        color: { label: "", images: [] },
        sizes: [{ label: "", price: "", countInStock: "" }],
      },
    ]);

  const handleRemoveVariation = (i) =>
    setVariations((v) => v.filter((_, idx) => idx !== i));

  const handleVariationChange = (idx, field, val) =>
    setVariations((v) =>
      v.map((vr, i) =>
        i === idx ? { ...vr, color: { ...vr.color, [field]: val } } : vr
      )
    );

  const handleAddSize = (vIdx) =>
    setVariations((v) =>
      v.map((vr, i) =>
        i === vIdx
          ? {
              ...vr,
              sizes: [
                ...vr.sizes,
                {
                  label: "",
                  price: "",
                  countInStock: "",
                  vbarcode: generateRandomBarcode(),
                },
              ],
            }
          : vr
      )
    );

  const handleRemoveSize = (vIdx, sIdx) =>
    setVariations((v) =>
      v.map((vr, i) =>
        i === vIdx
          ? { ...vr, sizes: vr.sizes.filter((_, idx) => idx !== sIdx) }
          : vr
      )
    );

  const handleSizeChange = (vIdx, sIdx, field, val) =>
    setVariations((v) =>
      v.map((vr, i) =>
        i === vIdx
          ? {
              ...vr,
              sizes: vr.sizes.map((s, j) =>
                j === sIdx ? { ...s, [field]: val } : s
              ),
            }
          : vr
      )
    );

  /* submit --------------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    /* simple validation */
    const required = [
      ["name", "Please enter product name"],
      ["arbName", "Please enter Arabic name"],
      ["description", "Please enter description"],
      ["arbDescription", "Please enter Arabic description"],
      ["catId", "Select category"],
      ["price", "Enter price"],
      ["oldPrice", "Enter old price"],
      ["countInStock", "Enter stock"],
      ["brand", "Enter brand"],
      ["discount", "Enter discount"],
    ];
    for (const [f, msg] of required) {
      if (!formFields[f]) {
        context.alertBox("error", msg);
        setIsLoading(false);
        return;
      }
    }
    if (!previews.length) {
      context.alertBox("error", "Select product images");
      setIsLoading(false);
      return;
    }

    const data = {
      ...formFields,
      category: productCat,
      isVerified: false,
      verifyStatus: "underReview",
      vendorId: localStorage.getItem("vendorId"),
      variation: variations,
    };

    try {
      const res = isEditMode
        ? await editData(`/api/product/updateProduct/${id}`, data, {
            withCredentials: true,
          })
        : await postData("/api/product/create", data, {
            withCredentials: true,
          });

      if (res?.error) throw new Error(res.message);
      toast.success(`Product ${isEditMode ? "updated" : "added"} successfully`);
      router.push("/product-inventory");
    } catch (err) {
      toast.error(err.message || "Server error");
    } finally {
      setIsLoading(false);
    }
  };

  /* ------------------------------------------------------------------ */
  /* JSX                                                                */
  /* ------------------------------------------------------------------ */
  return (
    <Box
      sx={{
        py: { xs: 2, lg: 5 },
        px: { xs: 2, lg: 3 },
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{ maxWidth: "1400px", mx: "auto", px: 2 }}
      >
        {/* sidebar */}
        <Grid item xs={12} lg={3}>
          <Card sx={{ position: "sticky", top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                {t("productForm.dashboardTitle")}
              </Typography>
              <AccountSidebar />
            </CardContent>
          </Card>
        </Grid>

        {/* main */}
        <Grid item xs={12} lg={9}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <MdInventory size={24} color="#1976d2" />
                <Typography variant="h5" fontWeight="600">
                  {isEditMode
                    ? t("productForm.titleEdit")
                    : t("productForm.titleAdd")}
                </Typography>
              </Box>
              <Divider />

              <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
                {/* === BASIC INFO ===================================== */}
                <Card sx={{ mb: 3, border: "1px solid #e0e0e0" }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <FaBox color="#1976d2" />
                      <Typography variant="h6" color="primary">
                        {t("productForm.basicInfo")}
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      {/* product name */}
                      <Grid item xs={12} md={6}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.productName")}
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder={t("productForm.placeholderProductName")}
                          name="name"
                          value={formFields.name}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                      {/* arabic name */}
                      <Grid item xs={12} md={6}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.arabicName")}
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder={t("productForm.placeholderArabicName")}
                          name="arbName"
                          value={formFields.arbName}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                      {/* desc */}
                      <Grid item xs={12} md={6}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.description")}
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          multiline
                          rows={3}
                          placeholder={t("productForm.placeholderDescription")}
                          name="description"
                          value={formFields.description}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                      {/* arabic desc */}
                      <Grid item xs={12} md={6}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.arabicDescription")}
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          multiline
                          rows={3}
                          placeholder={t(
                            "productForm.placeholderArabicDescription"
                          )}
                          name="arbDescription"
                          value={formFields.arbDescription}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                      {/* brand */}
                      <Grid item xs={12} md={6}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.brand")}
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder={t("productForm.placeholderBrand")}
                          InputProps={{
                            startAdornment: (
                              <MdBrandingWatermark
                                style={{ marginRight: 8, color: "#666" }}
                              />
                            ),
                          }}
                          name="brand"
                          value={formFields.brand}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                      {/* tags */}
                      <Grid item xs={12} md={6}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.tags")}
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder={t("productForm.placeholderTags")}
                          InputProps={{
                            startAdornment: (
                              <FaTag
                                style={{ marginRight: 8, color: "#666" }}
                              />
                            ),
                          }}
                          name="tags"
                          value={formFields.tags.join(", ")}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* === PRICING / INVENTORY ============================ */}
                <Card sx={{ mb: 3, border: "1px solid #e0e0e0" }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <MdInventory color="#1976d2" />
                      <Typography variant="h6" color="primary">
                        {t("productForm.pricingInventory")}
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      {/* price */}
                      <Grid item xs={12} md={4}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.price")}
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="number"
                          fullWidth
                          placeholder={t("productForm.placeholderPrice")}
                          name="price"
                          value={formFields.price}
                          onChange={onChangeInput}
                          disabled={isLoading}
                          InputProps={{
                            startAdornment: (
                              <span style={{ marginRight: 4 }}>$</span>
                            ),
                          }}
                        />
                      </Grid>
                      {/* old price */}
                      <Grid item xs={12} md={4}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.oldPrice")}
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="number"
                          fullWidth
                          placeholder={t("productForm.placeholderOldPrice")}
                          name="oldPrice"
                          value={formFields.oldPrice}
                          onChange={onChangeInput}
                          disabled={isLoading}
                          InputProps={{
                            startAdornment: (
                              <span style={{ marginRight: 4 }}>$</span>
                            ),
                          }}
                        />
                      </Grid>
                      {/* discount */}
                      <Grid item xs={12} md={4}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.discount")}
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="number"
                          fullWidth
                          name="discount"
                          value={formFields.discount}
                          onChange={onChangeInput}
                          disabled={isLoading}
                          InputProps={{ endAdornment: <span>%</span> }}
                          sx={{
                            "& .MuiInputBase-input": { bgcolor: "#f5f5f5" },
                          }}
                        />
                      </Grid>
                      {/* stock */}
                      <Grid item xs={12} md={6}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.stockQuantity")}
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          type="number"
                          fullWidth
                          name="countInStock"
                          value={formFields.countInStock}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* === CATEGORIES ==================================== */}
                <Card sx={{ mb: 3, border: "1px solid #e0e0e0" }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <MdCategory color="#1976d2" />
                      <Typography variant="h6" color="primary">
                        {t("productForm.categories")}
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      {/* main cat */}
                      <Grid item xs={12} md={4}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.mainCategory")}
                        </FormLabel>
                        <Select
                          size="small"
                          fullWidth
                          value={productCat}
                          onChange={handleChangeProductCat}
                          disabled={isLoading}
                        >
                          {catOptions.map((c) => (
                            <MenuItem key={c._id} value={c._id}>
                              {c.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      {/* sub cat */}
                      <Grid item xs={12} md={4}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.subCategory")}
                        </FormLabel>
                        <Select
                          size="small"
                          fullWidth
                          value={productSubCat}
                          onChange={handleChangeProductSubCat}
                          disabled={isLoading}
                        >
                          {subCatOptions.map((s) => (
                            <MenuItem key={s._id} value={s._id}>
                              {s.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      {/* third level */}
                      <Grid item xs={12} md={4}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.thirdLevelCategory")}
                        </FormLabel>
                        <Select
                          size="small"
                          fullWidth
                          value={productThirdLavelCat}
                          onChange={handleChangeProductThirdLavelCat}
                          disabled={isLoading}
                        >
                          {thirdCatOptions.map((th) => (
                            <MenuItem key={th._id} value={th._id}>
                              {th.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      {/* featured */}
                      {/* <Grid item xs={12} md={6}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.featuredProduct")}
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
                      </Grid> */}
                    </Grid>
                  </CardContent>
                </Card>

                {/* === VARIATIONS ==================================== */}
                <Card sx={{ mb: 3, border: "1px solid #e0e0e0" }}>
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      mb={2}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <BsCardImage color="#1976d2" />
                        <Typography variant="h6" color="primary">
                          {t("productForm.productVariations")}
                        </Typography>
                      </Box>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<IoMdAdd />}
                        onClick={handleAddVariation}
                        disabled={isLoading}
                      >
                        {t("productForm.addVariation")}
                      </Button>
                    </Box>

                    {variations.map((variation, idx) => (
                      <Paper
                        key={idx}
                        sx={{
                          p: 2,
                          mb: 2,
                          bgcolor: "#fafafa",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          mb={2}
                        >
                          <Typography variant="subtitle1" fontWeight={500}>
                            {t("productForm.variation")} #{idx + 1}
                          </Typography>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleRemoveVariation(idx)}
                            disabled={isLoading}
                          >
                            <IoMdClose />
                          </IconButton>
                        </Box>

                        {/* color selector */}
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <FormLabel
                              sx={{ display: "block", mb: 1, fontWeight: 500 }}
                            >
                              {t("productForm.color")}
                            </FormLabel>
                            <Select
                              size="small"
                              fullWidth
                              value={variation.color.label}
                              onChange={(e) =>
                                handleVariationChange(
                                  idx,
                                  "label",
                                  e.target.value
                                )
                              }
                              disabled={isLoading}
                            >
                              <MenuItem value="">
                                {t("productForm.selectColor")}
                              </MenuItem>
                              {productRamsData.map((c) => (
                                <MenuItem key={c._id} value={c.name}>
                                  {c.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>

                          {/* color images */}
                          <Grid item xs={12}>
                            <FormLabel
                              sx={{ display: "block", mb: 1, fontWeight: 500 }}
                            >
                              {t("productForm.Images")}
                            </FormLabel>
                            <Box display="flex" gap={1} flexWrap="wrap">
                              <Grid item xs={6} sm={3}>
                                <UploadBox
                                  multiple
                                  name="colorImages"
                                  url="/api/product/uploadColorImages"
                                  setPreviewsFun={(imgs) =>
                                    setVariations((prev) =>
                                      prev.map((v, i) =>
                                        i === idx
                                          ? {
                                              ...v,
                                              color: {
                                                ...v.color,
                                                images: [
                                                  ...v.color.images,
                                                  ...imgs,
                                                ],
                                              },
                                            }
                                          : v
                                      )
                                    )
                                  }
                                  disabled={isLoading}
                                />
                              </Grid>

                              {variation.color.images.map((img, imgIdx) => (
                                <Box
                                  key={imgIdx}
                                  sx={{
                                    position: "relative",
                                    width: 80,
                                    height: 80,
                                  }}
                                >
                                  <Image
                                    src={img}
                                    alt={`variation-${idx}-img-${imgIdx}`}
                                    width={80}
                                    height={80}
                                    unoptimized
                                    style={{
                                      borderRadius: 4,
                                      objectFit: "cover",
                                    }}
                                  />
                                  <IconButton
                                    size="small"
                                    sx={{
                                      position: "absolute",
                                      top: -8,
                                      right: -8,
                                      bgcolor: "error.main",
                                      color: "white",
                                      width: 20,
                                      height: 20,
                                      "&:hover": { bgcolor: "error.dark" },
                                    }}
                                    onClick={() => removeColorImage(idx, img)}
                                    disabled={isLoading}
                                  >
                                    <IoMdClose fontSize="small" />
                                  </IconButton>
                                </Box>
                              ))}
                            </Box>
                          </Grid>
                        </Grid>

                        {/* sizes */}
                        <Box mt={2}>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={1}
                          >
                            <FormLabel sx={{ fontWeight: 500 }}>
                              {t("productForm.sizes")}
                            </FormLabel>
                            <Button
                              variant="text"
                              size="small"
                              startIcon={<IoMdAdd />}
                              onClick={() => handleAddSize(idx)}
                              disabled={isLoading}
                            >
                              {t("productForm.addSize")}
                            </Button>
                          </Box>

                          {variation.sizes.map((sz, sIdx) => (
                            <Grid
                              container
                              spacing={1}
                              alignItems="center"
                              sx={{ mb: 1 }}
                              key={sIdx}
                            >
                              <Grid item xs={3}>
                                <Select
                                  size="small"
                                  fullWidth
                                  value={sz.label}
                                  onChange={(e) =>
                                    handleSizeChange(
                                      idx,
                                      sIdx,
                                      "label",
                                      e.target.value
                                    )
                                  }
                                  disabled={isLoading}
                                >
                                  <MenuItem value="">
                                    {t("productForm.size")}
                                  </MenuItem>
                                  {productSizeData.map((opt) => (
                                    <MenuItem key={opt._id} value={opt.name}>
                                      {opt.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </Grid>
                              <Grid item xs={3}>
                                <TextField
                                  size="small"
                                  type="number"
                                  placeholder={t("productForm.price")}
                                  fullWidth
                                  value={sz.price}
                                  onChange={(e) =>
                                    handleSizeChange(
                                      idx,
                                      sIdx,
                                      "price",
                                      e.target.value
                                    )
                                  }
                                  disabled={isLoading}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextField
                                  size="small"
                                  type="number"
                                  placeholder={t("productForm.stock")}
                                  fullWidth
                                  value={sz.countInStock}
                                  onChange={(e) =>
                                    handleSizeChange(
                                      idx,
                                      sIdx,
                                      "countInStock",
                                      e.target.value
                                    )
                                  }
                                  disabled={isLoading}
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleRemoveSize(idx, sIdx)}
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

                {/* === PRODUCT IMAGES ================================= */}
                <Card sx={{ mb: 3, border: "1px solid #e0e0e0" }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <FaImage color="#1976d2" />
                      <Typography variant="h6" color="primary">
                        {t("productForm.productImages")}
                      </Typography>
                    </Box>

                    <Grid container spacing={2}>
                      {previews.map((img, idx) => (
                        <Grid item xs={6} sm={3} key={idx}>
                          <Paper sx={{ position: "relative", height: 150 }}>
                            <IconButton
                              size="small"
                              sx={{
                                position: "absolute",
                                top: -8,
                                right: -8,
                                bgcolor: "error.main",
                                color: "white",
                                width: 20,
                                height: 20,
                                zIndex: 10,
                                "&:hover": { bgcolor: "error.dark" },
                              }}
                              onClick={() => removeImg(img, idx)}
                              disabled={isLoading}
                            >
                              <IoMdClose fontSize="small" />
                            </IconButton>
                            <Image
                              src={img}
                              alt={`product-${idx}`}
                              width={150}
                              height={150}
                              unoptimized
                              style={{ objectFit: "cover", borderRadius: 4 }}
                            />
                          </Paper>
                        </Grid>
                      ))}
                      <Grid item xs={6} sm={3}>
                        <UploadBox
                          multiple
                          name="images"
                          url="/api/product/vendorProductImagesUpload"
                          setPreviewsFun={setPreviewsFun}
                          disabled={isLoading}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* === BANNER ========================================= */}
                <Card sx={{ mb: 3, border: "1px solid #e0e0e0" }}>
                  <CardContent>
                    {/* <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      mb={2}
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <BsCardImage color="#1976d2" />
                        <Typography variant="h6" color="primary">
                          {t("productForm.bannerSettings")}
                        </Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2">
                          {t("productForm.displayOnBanner")}
                        </Typography>
                        <Switch
                          checked={checkedSwitch}
                          onChange={handleChangeSwitch}
                          disabled={isLoading}
                        />
                      </Box>
                    </Box> */}

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.bannerTitle")}
                        </FormLabel>
                        <TextField
                          variant="outlined"
                          size="small"
                          fullWidth
                          placeholder={t("productForm.enterBannerTitle")}
                          name="bannerTitleName"
                          value={formFields.bannerTitleName}
                          onChange={onChangeInput}
                          disabled={isLoading}
                        />
                      </Grid>

                      {/* banner images */}
                      <Grid item xs={12}>
                        <FormLabel
                          sx={{ display: "block", mb: 1, fontWeight: 500 }}
                        >
                          {t("productForm.bannerImages")}
                        </FormLabel>
                        <Grid container spacing={2}>
                          {bannerPreviews.map((img, idx) => (
                            <Grid item xs={6} sm={3} key={idx}>
                              <Paper sx={{ position: "relative", height: 150 }}>
                                <IconButton
                                  size="small"
                                  sx={{
                                    position: "absolute",
                                    top: -8,
                                    right: -8,
                                    bgcolor: "error.main",
                                    color: "white",
                                    width: 20,
                                    height: 20,
                                    zIndex: 10,
                                    "&:hover": { bgcolor: "error.dark" },
                                  }}
                                  onClick={() => removeImg(img, idx, true)}
                                  disabled={isLoading}
                                >
                                  <IoMdClose fontSize="small" />
                                </IconButton>
                                <Image
                                  src={img}
                                  alt={`banner-${idx}`}
                                  width={150}
                                  height={150}
                                  unoptimized
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: 4,
                                  }}
                                />
                              </Paper>
                            </Grid>
                          ))}
                          <Grid item xs={6} sm={3}>
                            <UploadBox
                              multiple
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

                {/* === SUBMIT ========================================= */}
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{ minWidth: 120 }}
                        disabled={isLoading}
                      >
                        {t("productForm.cancel")}
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ minWidth: 200 }}
                        startIcon={
                          isLoading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <FaCloudUploadAlt />
                          )
                        }
                        disabled={isLoading}
                      >
                        {isEditMode
                          ? t("productForm.updateProduct")
                          : t("productForm.publishProduct")}
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
