"use client";
import Head from "next/head";
import { Container, Typography, Box, Divider, Button } from "@mui/material";
import {
  FaRegUserCircle,
  FaStoreAlt,
  FaBoxOpen,
  FaRocket,
} from "react-icons/fa";
import Link from "next/link";
import { useTranslation } from "@/utils/useTranslation";

const HowItWorks = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("howItWorks.title")} | Vendor Panel | Soouqna</title>
      </Head>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          {t("howItWorks.title")}
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          {t("howItWorks.intro")}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <FaRegUserCircle /> {t("howItWorks.steps.step1")}
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            {t("howItWorks.steps.desc1")}
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <FaStoreAlt /> {t("howItWorks.steps.step2")}
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            {t("howItWorks.steps.desc2")}
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <FaBoxOpen /> {t("howItWorks.steps.step3")}
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            {t("howItWorks.steps.desc3")}
          </Typography>
        </Box>

        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <FaRocket /> {t("howItWorks.steps.step4")}
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            {t("howItWorks.steps.desc4")}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" color="primary" gutterBottom>
          {t("howItWorks.vendorOptionsTitle")}
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          {t("howItWorks.vendorOptionsDesc")}
        </Typography>

        <Box sx={{ pl: 2, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {t("howItWorks.option1Title")}
          </Typography>
          <Typography variant="body2">{t("howItWorks.option1Desc")}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {t("howItWorks.option1Note")}
          </Typography>
        </Box>

        <Box sx={{ pl: 2, mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {t("howItWorks.option2Title")}
          </Typography>
          <Typography variant="body2">{t("howItWorks.option2Desc")}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {t("howItWorks.option2Note")}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body1" sx={{ mb: 3 }}>
          {t("howItWorks.cta")}
        </Typography>

        <Link href="/become-vendor">
          <Button variant="contained" size="large" color="primary">
            {t("howItWorks.registerBtn")}
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default HowItWorks;
