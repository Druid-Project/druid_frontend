import React, { useEffect } from "react";
import { Container, Grid, Typography, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchFooterData } from "../redux/footerSlice";
import ConnectCard from "../components/servicespage/components/ConnectCard";
import "../assets/css/Footer.css";

function Footer() {
  const dispatch = useDispatch();
  const footerData = useSelector((state) => state.footer.data);
  const loading = useSelector((state) => state.footer.loading);
  const error = useSelector((state) => state.footer.error);

  useEffect(() => {
    dispatch(fetchFooterData({ endpoint: "node/footer", includes: "field_footer_page_sections.field_connect_card" }));
  }, [dispatch]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading footer data</Typography>;
  }

  if (!footerData.included) {
    return null;
  }

  const footerSection = footerData.included.find(
    (item) => item.type === "paragraph--footer_section"
  );

  const socialLinks = footerSection ? footerSection.attributes.field_social_media_link : [];
  const menuLinks = footerSection ? footerSection.attributes.field_menu_links : [];

  return (
    <footer style={{ backgroundColor: "#F6F6F6", padding: "2rem 0" }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <ConnectCard data={footerData} />
          </Grid>
        </Grid>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} textAlign="center">
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Grid container justifyContent="center">
              {menuLinks.map((link, index) => (
                <Grid item key={index} xs={12} sm={6}>
                  <Link href={link.uri} underline="none" color="textPrimary">
                    {link.title}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Grid container justifyContent="center">
              {socialLinks.map((link, index) => (
                <Grid item key={index} xs={12} sm={6}>
                  <Link href={link.uri} underline="none" color="textPrimary">
                    {link.title}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
