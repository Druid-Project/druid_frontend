import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/slices/contentSlice";
import { Container, Box, Typography } from "@mui/material";
import Hero from "../components/common/Hero";
import ServicesSections from "../components/homepage/components/ServicesSections";
import Feature from "../components/homepage/components/Feature";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import DyanamicContents from "../components/mautic/DynamicContent";

const Home = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(
      fetchContentData({
        endpoint: "node/home",
        includes:
          "field_home_page_sections.field_services_section_cards,field_home_page_sections.field_feature_list",
      })
    );
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <Error message={`Something went wrong. ${error}`} />;

  const homeData = data?.data?.find((item) => item.type === "node--home");

  if (!homeData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          No data available for the homepage. Please check back later.
        </Typography>
      </Box>
    );
  }

  return (
    <Container disableGutters maxWidth="xl">
      <Hero data={data} />
      <ServicesSections data={data} />
      <Feature data={data} />
      <DyanamicContents />
    </Container>
  );
};

export default Home;
