"use client";
import React, { Suspense, useContext, useEffect } from "react";
import { MyContext } from "@/context/ThemeProvider";
import AccountSidebar from "../../components/AccountSidebar";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "@/utils/useTranslation";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#ffffff",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
}));

const MyAccount = () => {
  const context = useContext(MyContext);
  const { t } = useTranslation();

  useEffect(() => {
    console.log(
      "MyAccount rendered, isClient:",
      typeof window !== "undefined",
      "Hydration status:",
      typeof document !== "undefined" ? document.readyState : "server",
      "context.userData:",
      context?.userData
    );
  }, [context?.userData]);

  if (!context?.userData) {
    return null;
  }

  const displayData = {
    emailAddress:
      context.userData.emailAddress || context.userData.email || "N/A",
    isVerified: context.userData.isVerified ? "Yes" : "No",
    ownerName: context.userData.ownerName || "N/A",
    paymentDetails: context.userData.paymentDetails || "N/A",
    phoneNumber:
      context.userData.phoneNumber || context.userData.mobile || "N/A",
    productCategories: context.userData.productCategories || [],
    status: context.userData.status ? "Active" : "Inactive",
    storeAddress: context.userData.storeAddress || "N/A",
    storeBanner:
      context.userData.storeBanner?.length > 0 &&
      context.userData.storeBanner[0]
        ? context.userData.storeBanner[0]
        : "None",
    storeDescription: context.userData.storeDescription || "N/A",
    storeLogo:
      context.userData.storeLogo?.length > 0 && context.userData.storeLogo[0]
        ? context.userData.storeLogo[0]
        : "None",
    storeName: context.userData.storeName || "N/A",
    taxIdentificationNumber: context.userData.taxIdentificationNumber || "N/A",
  };

  return (
    <Suspense>
      <section className="py-3 lg:py-10 w-full">
        <div className="container flex flex-col lg:flex-row gap-5">
          {/* Sidebar */}
          <div className="w-full lg:w-[20%]">
            <AccountSidebar />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-[80%]">
            <StyledCard className="bg-white rounded-md">
              <CardContent className="p-6">
                <Typography
                  variant="h4"
                  className="font-bold text-gray-900 pb-4"
                >
                  {t("profile.myProfile")}
                </Typography>
                <hr className="border-t border-gray-200" />

                <Box className="mt-6">
                  <Grid container spacing={3}>
                    {/* Email Address */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.emailAddress")}
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {displayData.emailAddress}
                      </Typography>
                    </Grid>

                    {/* Owner Name */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.ownerName")}
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {displayData.ownerName}
                      </Typography>
                    </Grid>

                    {/* Phone Number */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.phoneNumber")}
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {displayData.phoneNumber}
                      </Typography>
                    </Grid>

                    {/* Store Name */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.storeName")}
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {displayData.storeName}
                      </Typography>
                    </Grid>

                    {/* Store Address */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.storeAddress")}
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {displayData.storeAddress}
                      </Typography>
                    </Grid>

                    {/* Payment Details */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.paymentDetails")}
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {displayData.paymentDetails}
                      </Typography>
                    </Grid>

                    {/* Tax Identification Number */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.taxIdentificationNumber")}
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {displayData.taxIdentificationNumber}
                      </Typography>
                    </Grid>

                    {/* Product Categories */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.productCategories")}
                      </Typography>
                      <Box>
                        {displayData.productCategories.length > 0 ? (
                          displayData.productCategories.map(
                            (category, index) => (
                              <Chip
                                key={index}
                                label={category}
                                className="mr-2 mb-2 bg-gray-100 text-gray-700"
                                variant="outlined"
                              />
                            )
                          )
                        ) : (
                          <Typography variant="body1" className="text-gray-800">
                              {t("profile.none")}
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    {/* Store Description */}
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.storeDescription")}
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {displayData.storeDescription}
                      </Typography>
                    </Grid>

                    {/* Store Logo */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.storeLogo")}
                      </Typography>
                      <Typography variant="body1">
                        {displayData.storeLogo !== "None" ? (
                          <Avatar
                            src={displayData.storeLogo}
                            alt="Store Logo"
                            variant="rounded"
                            className="h-16 w-16 mt-2"
                          />
                        ) : (
                          <Typography variant="body1" className="text-gray-800">
                              {t("profile.none")}
                          </Typography>
                        )}
                      </Typography>
                    </Grid>

                    {/* Store Banner */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.storeBanner")}
                      </Typography>
                      <Typography variant="body1">
                        {displayData.storeBanner !== "None" ? (
                          <Avatar
                            src={displayData.storeBanner}
                            alt="Store Banner"
                            variant="rounded"
                            className="h-16 w-16 mt-2"
                          />
                        ) : (
                          <Typography variant="body1" className="text-gray-800">
                              {t("profile.none")}
                          </Typography>
                        )}
                      </Typography>
                    </Grid>

                    {/* Is Verified */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.verified")}
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {displayData.isVerified}
                      </Typography>
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12} sm={6}>
                      <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        className="font-medium"
                      >
                        {t("profile.status")}
                      </Typography>
                      <Typography variant="body1" className="text-gray-800">
                        {displayData.status}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </StyledCard>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default MyAccount;
