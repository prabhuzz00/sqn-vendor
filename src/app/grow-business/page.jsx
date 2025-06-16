"use client";
import Head from 'next/head';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import Link from 'next/link';
import { FaStore, FaChartLine, FaShippingFast } from 'react-icons/fa';
import { useTranslation } from '@/utils/useTranslation';


const GrowBusinessPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('grow.title')} | Vendor Panel | Soouqna</title>
      </Head>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          {t('grow.title')}
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          {t('grow.intro')}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaStore /> {t('grow.section1Title')}
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            {t('grow.section1Desc')}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaChartLine /> {t('grow.section2Title')}
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            {t('grow.section2Desc')}
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaShippingFast /> {t('grow.section3Title')}
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            {t('grow.section3Desc')}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body1" sx={{ mb: 3 }}>
          {t('grow.helpText')}
        </Typography>

        <Link href="/contact">
          <Button variant="contained" size="large" color="primary">
            {t('grow.contactBtn')}
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default GrowBusinessPage;
