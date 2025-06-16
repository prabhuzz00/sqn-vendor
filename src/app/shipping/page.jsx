"use client";
import Head from 'next/head';
import { Box, Container, Typography, Divider } from '@mui/material';
import { useTranslation } from '@/utils/useTranslation';

const ShippingReturnsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("shippingReturns.title")} | Vendor Panel | Soouqna</title>
      </Head>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom color="primary">
          {t("shippingReturns.title")}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {t("shippingReturns.shippingTitle")}
          </Typography>
          <Typography variant="body1" paragraph>
            {t("shippingReturns.shippingDesc1")}
          </Typography>
          <Typography variant="body1" paragraph>
            {t("shippingReturns.shippingDesc2")}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {t("shippingReturns.returnTitle")}
          </Typography>
          <Typography variant="body1" paragraph>
            {t("shippingReturns.returnDesc1")}
          </Typography>
          <Typography variant="body1" paragraph>
            {t("shippingReturns.returnDesc2")}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {t("shippingReturns.responsibilityTitle")}
          </Typography>
          <Typography variant="body1" paragraph>
            {t("shippingReturns.responsibilityDesc")}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default ShippingReturnsPage;
