import Head from 'next/head';
import { Container, Typography, Box, Divider, Button } from '@mui/material';
import { FaRegUserCircle, FaStoreAlt, FaBoxOpen, FaRocket } from 'react-icons/fa';
import Link from 'next/link';

const HowItWorks = () => {
  return (
    <>
      <Head>
        <title>How It Works | Vendor Panel | Soouqna</title>
      </Head>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          How Selling on Soouqna Works
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          Joining Soouqna as a vendor is quick and easy. Follow these steps to start your online business and reach customers across the region.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Step 1 */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaRegUserCircle /> Step 1: Register as a Vendor
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            Create a vendor account by providing your business details. It only takes a few minutes to sign up.
          </Typography>
        </Box>

        {/* Step 2 */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaStoreAlt /> Step 2: Set Up Your Store
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            Add your brand logo, description, and other details to make your store appealing to customers.
          </Typography>
        </Box>

        {/* Step 3 */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaBoxOpen /> Step 3: Add Products
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            Upload product images, set prices, stock, and variations like size or color to start listing your products.
          </Typography>
        </Box>

        {/* Step 4 */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaRocket /> Step 4: Start Selling & Shipping
          </Typography>
          <Typography variant="body2" sx={{ pl: 4 }}>
            Once your products are live, start receiving orders and ship them to customers quickly to build your reputation.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body1" sx={{ mb: 3 }}>
          Ready to begin? Join hundreds of successful vendors already selling on Soouqna.
        </Typography>

        <Link href="/vendor/register">
          <Button variant="contained" size="large" color="primary">
            Register as a Vendor
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default HowItWorks;
