"use client";
import React, { Suspense, useContext } from "react";
import { MyContext } from "@/context/ThemeProvider";
import AccountSidebar from "../../components/AccountSidebar";
import ServiceZoneSelector from "../../components/ServiceZoneSelector";
import { Typography, Card, CardContent, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#ffffff",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
}));

const ZoneManagement = () => {
  const context = useContext(MyContext);

  const handleVendorUpdate = () => {
    // Refresh the vendor data
    context.getUser();
  };

  if (!context?.userData) {
    return null;
  }

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
            <StyledCard className="bg-white rounded-md mb-6">
              <CardContent className="p-6">
                <Typography
                  variant="h4"
                  className="font-bold text-gray-900 pb-4"
                >
                  Service Zone Management
                </Typography>
                <hr className="border-t border-gray-200" />

                <Box className="mt-6">
                  <Typography variant="body1" className="text-gray-600 mb-4">
                    Manage the service zones where you want to provide your
                    services. Select the cities and areas where you can deliver
                    your products effectively.
                  </Typography>

                  <Typography variant="body2" className="text-amber-600 mb-4">
                    <strong>Note:</strong> Any changes to your service zones
                    will require admin verification before they become active.
                    Your vendor status will be temporarily set to
                    &quot;unverified&quot; during the review process.
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>

            {/* Service Zone Management */}
            <ServiceZoneSelector
              vendor={context.userData}
              onUpdate={handleVendorUpdate}
            />
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default ZoneManagement;
