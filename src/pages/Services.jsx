import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import { Box, Container, Typography } from "@mui/material";
import Hero from "../components/common/Hero";
import ServiceCardSection from "../components/servicespage/components/ServiceCardSection";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";

const Services = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(
      fetchContentData({
        endpoint: "node/services",
        includes:
          "field_services.field_connect_card,field_services,field_services.field_background_image,field_services.field_services_section_cards",
      })
    );
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <Error message={`Error: ${error}`} />;

  const servicesData = data?.data?.find(
    (item) => item.type === "node--services"
  );

  if (!servicesData) {
    return <Typography>No data available.</Typography>;
  }

  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <Hero data={data} />
      </Box>
      <Box>
        <ServiceCardSection data={data} />
      </Box>
    </Container>
  );
};

export default Services;
