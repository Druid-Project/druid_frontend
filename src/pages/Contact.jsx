import React from "react";
import { Container, Typography, TextField, Button, Box, Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const center = {
  lat: 60.1699,
  lng: 24.9384,
};

const Contact = () => {
  return (
    <Container style={{ padding: "2rem 0" }}>
      <Typography
        variant="h4"
        component="h2"
        style={{
          marginBottom: "1rem",
          fontWeight: 700,
          color: "#d10000", // Strong red
        }}
      >
        Get in <span style={{ color: "#000" }}>Touch</span>
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        style={{
          marginBottom: "2rem",
          color: "#333",
        }}
      >
        Any question or remarks? Just write us a message!
      </Typography>
      <Grid container spacing={4}>
        {/* Left Column - Form */}
        <Grid item xs={12} md={6}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone number"
              required
              variant="outlined"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="how-did-you-find-us">How did you find us?</InputLabel>
              <Select
                labelId="how-did-you-find-us"
                id="how-did-you-find-us"
                variant="outlined"
                defaultValue=""
              >
                <MenuItem value="google">Google</MenuItem>
                <MenuItem value="social_media">Social Media</MenuItem>
                <MenuItem value="friend">Friend</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              style={{
                backgroundColor: "#d10000", // Strong red
                color: "#fff",
                marginTop: "1rem",
                padding: "0.75rem",
              }}
            >
              SEND
            </Button>
          </Box>
          {/* Footer Contact Info - Phone and Email */}
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            {/* Phone Info */}
            <Box style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Box
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#d10000",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://img.icons8.com/material-rounded/24/ffffff/phone.png"
                  alt="phone"
                />
              </Box>
              <Typography variant="body1" style={{ color: "#333" }}>
                +358 20 187 6601 <br />
                (Mon-Fri 9-17)
              </Typography>
            </Box>
            {/* Email Info */}
            <Box style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Box
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#d10000",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://img.icons8.com/material-rounded/24/ffffff/new-post.png"
                  alt="email"
                />
              </Box>
              <Typography variant="body1" style={{ color: "#333" }}>
                support@druid.fi
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Column - Map */}
        <Grid item xs={12} md={6} style={{ position: "relative" }}>
          <Box
            style={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {/* Red accent on the top-right corner */}
            <Box
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                height: "50%", // Top half of the map
                width: "1rem",
                backgroundColor: "#d10000", // Strong red
              }}
            />
            {/* Red accent on the bottom-right corner */}
            <Box
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                height: "50%", // Bottom half of the map
                width: "1rem",
                backgroundColor: "#d10000", // Strong red
              }}
            />
            <MapContainer style={mapContainerStyle} center={center} zoom={15}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={center}>
                <Popup>
                  Visit us here! <br /> We're always happy to meet you.
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
