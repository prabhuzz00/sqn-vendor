import Head from 'next/head';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import Link from 'next/link';
import { FaStore, FaChartLine, FaShippingFast } from 'react-icons/fa';

const GrowBusinessPage = () => {
  return (
    <>
      <Head>
        <title>Grow Your Business | Vendor Panel | Soouqna</title>
      </Head>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Grow Your Business with Soouqna
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          At Soouqna, we’re committed to helping vendors succeed. Take advantage of our tools, resources, and marketplace reach to grow your business faster.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaStore /> Open Your Storefront
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            Customize your vendor profile and storefront to stand out. Highlight your best products and tell your brand’s story.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaChartLine /> Use Data to Drive Sales
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            Access analytics and reporting tools to track your performance, customer behavior, and optimize your product listings.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaShippingFast /> Offer Fast Shipping
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            Improve customer satisfaction and increase your sales by ensuring quick and reliable shipping.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body1" sx={{ mb: 3 }}>
          Need help or ideas to grow faster? Our support team is here to guide you.
        </Typography>

        <Link href="/contact">
          <Button variant="contained" size="large" color="primary">
            Contact Vendor Support
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default GrowBusinessPage;
