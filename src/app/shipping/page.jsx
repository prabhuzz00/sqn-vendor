import Head from 'next/head';
import { Box, Container, Typography, Divider } from '@mui/material';

const ShippingReturnsPage = () => {
  return (
    <>
      <Head>
        <title>Shipping & Returns | Vendor Panel | Soouqna</title>
      </Head>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Shipping & Returns Policy
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Shipping Policy
          </Typography>
          <Typography variant="body1" paragraph>
            At Soouqna, vendors are responsible for managing their own product shipping. All vendors must ensure that items are dispatched within 2–3 business days after receiving an order.
          </Typography>
          <Typography variant="body1" paragraph>
            Vendors must provide accurate shipping details and tracking information to ensure smooth delivery to customers. Delays or issues must be communicated promptly to both Soouqna and the customer.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Return Policy
          </Typography>
          <Typography variant="body1" paragraph>
            Soouqna offers a return window of 7 days from the delivery date. Vendors are required to accept returns for items that are damaged, defective, or significantly different from their description.
          </Typography>
          <Typography variant="body1" paragraph>
            Upon receiving a return request, vendors must respond within 48 hours. Refunds or replacements should be issued once the returned item is inspected and approved.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Vendor Responsibilities
          </Typography>
          <Typography variant="body1" paragraph>
            Failure to comply with the shipping and return policies may result in temporary suspension or permanent deactivation of the vendor’s account. For support, please contact our vendor support team at <strong>support@soouqna.com</strong>.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default ShippingReturnsPage;
