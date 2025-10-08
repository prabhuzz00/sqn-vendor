"use client";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { fetchDataFromApi, putData } from "@/utils/api";
import { useTranslation } from "@/utils/useTranslation";

const ServiceZoneSelector = ({ vendor, onUpdate }) => {
  const { t } = useTranslation();
  const [serviceZones, setServiceZones] = useState([]);
  const [selectedZones, setSelectedZones] = useState([]);
  const [originalZones, setOriginalZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [confirmDialog, setConfirmDialog] = useState(false);

  useEffect(() => {
    loadServiceZones();
    loadVendorServiceZones();
  }, []);

  const loadServiceZones = async () => {
    try {
      const response = await fetchDataFromApi("/api/service-zones?admin=true");
      if (response?.success) {
        setServiceZones(response.data);
      }
    } catch (err) {
      setError("Failed to load service zones");
    }
  };

  const loadVendorServiceZones = () => {
    // Parse vendor's current service zones (assuming it's stored as comma-separated string)
    if (vendor?.serviceZone) {
      const zones = vendor.serviceZone.split(",").map(zone => zone.trim()).filter(Boolean);
      setSelectedZones(zones);
      setOriginalZones(zones);
    }
    setLoading(false);
  };

  const handleZoneToggle = (cityName) => {
    setSelectedZones(prev => {
      if (prev.includes(cityName)) {
        return prev.filter(zone => zone !== cityName);
      } else {
        return [...prev, cityName];
      }
    });
  };

  const hasChanges = () => {
    const current = [...selectedZones].sort();
    const original = [...originalZones].sort();
    return JSON.stringify(current) !== JSON.stringify(original);
  };

  const handleSave = () => {
    if (!hasChanges()) {
      setError("No changes to save");
      return;
    }
    setConfirmDialog(true);
  };

  const confirmSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");
    setConfirmDialog(false);

    try {
      const serviceZoneString = selectedZones.join(", ");
      const response = await putData(`/api/vendor/update-service-zones/${vendor._id}`, {
        serviceZone: serviceZoneString
      });

      if (response?.success) {
        setSuccess("Service zones updated successfully. Your vendor status has been set to unverified pending admin review.");
        setOriginalZones([...selectedZones]);
        // Call parent update function to refresh vendor data
        if (onUpdate) {
          onUpdate();
        }
      } else {
        setError(response?.message || "Failed to update service zones");
      }
    } catch (err) {
      setError("Failed to update service zones");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setSelectedZones([...originalZones]);
    setError("");
    setSuccess("");
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <CircularProgress />
          <Typography className="mt-2">Loading service zones...</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-6">
        <CardContent>
          <Typography variant="h5" className="font-bold mb-4">
            Service Zone Management
          </Typography>
          
          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" className="mb-4">
              {success}
            </Alert>
          )}

          <Typography variant="body2" className="mb-4 text-gray-600">
            Select the cities where you want to provide your services. Note: Updating service zones will require admin verification before becoming active.
          </Typography>

          <FormControl component="fieldset">
            <FormLabel component="legend" className="mb-2">
              Available Service Zones
            </FormLabel>
            <FormGroup>
              <Grid container spacing={2}>
                {serviceZones.map((zone) => (
                  <Grid item xs={12} sm={6} md={4} key={zone._id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedZones.includes(zone.city)}
                          onChange={() => handleZoneToggle(zone.city)}
                          color="primary"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="subtitle2" className="font-medium">
                            {zone.city}
                          </Typography>
                          <Typography variant="caption" className="text-gray-500">
                            {zone.areas?.length || 0} areas available
                          </Typography>
                        </Box>
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </FormControl>

          {/* Current Selection Display */}
          {selectedZones.length > 0 && (
            <Box className="mt-4">
              <Typography variant="subtitle2" className="mb-2">
                Selected Service Zones ({selectedZones.length}):
              </Typography>
              <Box className="flex flex-wrap gap-2">
                {selectedZones.map((zone, index) => (
                  <Chip
                    key={index}
                    label={zone}
                    variant="filled"
                    color="primary"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Action Buttons */}
          <Box className="mt-6 flex gap-2 justify-end">
            <Button
              variant="outlined"
              onClick={handleReset}
              disabled={!hasChanges() || saving}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!hasChanges() || saving}
              startIcon={saving && <CircularProgress size={20} />}
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>Confirm Service Zone Update</DialogTitle>
        <DialogContent>
          <Typography>
            Updating your service zones will set your vendor status to "unverified" 
            and require admin approval before the changes become active. Are you sure you want to proceed?
          </Typography>
          <Box className="mt-3">
            <Typography variant="subtitle2" className="mb-1">
              New service zones:
            </Typography>
            <Box className="flex flex-wrap gap-1">
              {selectedZones.map((zone, index) => (
                <Chip key={index} label={zone} size="small" />
              ))}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>Cancel</Button>
          <Button onClick={confirmSave} variant="contained" color="primary">
            Confirm Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ServiceZoneSelector;