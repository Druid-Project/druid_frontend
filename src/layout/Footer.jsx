import { useEffect } from "react";
import { Container, Grid, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchFooterData } from "../redux/footerSlice";
import ConnectCard from "../components/common/ConnectCard";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import sanitizeHtml from "../utils/sanitizeHtml";

function Footer() {
  const dispatch = useDispatch();
  const { data: footerData, loading, error } = useSelector((state) => state.footer);

  useEffect(() => {
    dispatch(
      fetchFooterData({
        endpoint: "node/footer",
        includes: "field_footer_page_sections.field_connect_card",
      })
    );
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <Error message={`Error: ${error}`} />;
  if (!footerData.included) return null;

  const footerSection = footerData.included.find(
    (item) => item.type === "paragraph--footer_section"
  );

  const socialLinks = footerSection?.attributes.field_social_media_link || [];
  const menuLinks = footerSection?.attributes.field_menu_links || [];

  const renderLinks = (links, xs, sm) =>
    links.map((link, index) => (
      <Grid item key={index} xs={xs} sm={sm}>
        <Link href={sanitizeHtml(link.uri)} underline="none" color="textPrimary">
          {sanitizeHtml(link.title).toUpperCase()}
        </Link>
      </Grid>
    ));

  return (
    <footer style={{ backgroundColor: "#fefefe", padding: "2rem 0" }}>
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <ConnectCard data={footerData} />
            <hr />
          </Grid>
        </Grid>
        <Grid container spacing={2} height="100px" sx={{ fontSize: "12px", textAlign: "center" }}>
          <Grid item xs={12} md={6}>
            <Grid container justifyContent="center">
              {renderLinks(socialLinks, 12, 2)}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Grid container justifyContent="center">
              {renderLinks(menuLinks, 12, 3)}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
