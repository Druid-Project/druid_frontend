import React, { useEffect } from "react";
import { Container, Grid, Typography, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchFooterData } from "../redux/footerSlice";
import ConnectCard from "../components/servicespage/components/ConnectCard";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";

function Footer() {
  const dispatch = useDispatch();
  const footerData = useSelector((state) => state.footer.data);
  const loading = useSelector((state) => state.footer.loading);
  const error = useSelector((state) => state.footer.error);

  useEffect(() => {
    dispatch(
      fetchFooterData({
        endpoint: "node/footer",
        includes: "field_footer_page_sections.field_connect_card",
      })
    );
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={`Error: ${error}`} />;
  }

  if (!footerData.included) {
    return null;
  }

  const footerSection = footerData.included.find(
    (item) => item.type === "paragraph--footer_section"
  );

  const socialLinks = footerSection
    ? footerSection.attributes.field_social_media_link
    : [];
  const menuLinks = footerSection
    ? footerSection.attributes.field_menu_links
    : [];

  return (
    <footer style={{ backgroundColor: "#fefefe", padding: "2rem 0" }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <ConnectCard data={footerData} />
            <hr />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          height="100px"
          sx={{ fontSize: "12px", textAlign: "center" }}
        >
          <Grid item xs={12} md={6}>
            <Grid container justifyContent="center">
              {socialLinks.map((link, index) => (
                <Grid item key={index} xs={12} sm={2}>
                  <Link href={link.uri} underline="none" color="textPrimary">
                    {link.title.toUpperCase()}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Grid container justifyContent="center">
              {menuLinks.map((link, index) => (
                <Grid item key={index} xs={12} sm={3}>
                  <Link href={link.uri} underline="none" color="textPrimary">
                    {link.title.toUpperCase()}
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
