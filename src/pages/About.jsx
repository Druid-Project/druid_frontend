import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import { Container, Box, Typography } from "@mui/material";
import Hero from "../components/common/Hero";
import Feature from "../components/about/Feature";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import useFetchCardDetails from "../hooks/useFetchCardDetails";
import { baseUrl } from "../config";
import HeroCard from "../components/common/HeroCard";

const About = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.content);
  const [cardId, setCardId] = useState(null);

  useEffect(() => {
    dispatch(
      fetchContentData({
        endpoint: "node/about",
        includes:
          "field_about_page_sections,field_about_page_sections.field_background_image,field_about_page_sections.field_visible_to",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const card = data.included?.find(
      (item) =>
        item.type === "paragraph--card" &&
        item.id === "3517aa5f-e382-405e-90a1-0da107113bfb"
    );
    if (card) {
      setCardId(card.id);
    }
  }, [data]);

  const paragraphCard = useFetchCardDetails(cardId, baseUrl);

  useEffect(() => {
    console.log("Fetched paragraph card:", paragraphCard);
  }, [paragraphCard]);

  if (loading) return <Loading />;
  if (error) return <Error message={`Something went wrong. ${error}`} />;

  const aboutData = data?.data?.find((item) => item.type === "node--about");

  if (!aboutData) {
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
          No data available for the about page. Please check back later.
        </Typography>
      </Box>
    );
  }

  const heroSection = data.included?.find(
    (item) => item.type === "paragraph--hero_section"
  );

  return (
    <Container disableGutters maxWidth="xl">
      {heroSection && <Hero data={{ included: [heroSection] }} />}
      <Feature data={data} />
      {paragraphCard && (
        <HeroCard
          title={paragraphCard.attributes.field_card_title}
          description={paragraphCard.attributes.field_card_description}
          ctaButton={paragraphCard.attributes.field_card_cta_button}
          imageUrl={paragraphCard.imageUrl}
        />
      )}
    </Container>
  );
};

export default About;
