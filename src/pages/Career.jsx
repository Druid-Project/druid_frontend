import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import { Container, Box, Typography } from "@mui/material";
import Hero from "../components/common/Hero"; // Import the reusable component
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";

const Career = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.content);

  // Fetch content data when component mounts
  useEffect(() => {
    dispatch(
      fetchContentData({
        endpoint: "node/careers",
        includes: "field_career_section",
      })
    );
  }, [dispatch]);

  // Loading state
  if (loading) return <Loading />;

  // Error state
  if (error) return <Error message={`Something went wrong. ${error}`} />;

  // No data available
  const careerData = data?.data?.find((item) => item.type === "node--careers");
  const textBlocks = data?.included?.filter(
    (item) => item.type === "paragraph--text_block"
  );

  if (!careerData) {
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
          No data available for this page. Please check back later.
        </Typography>
      </Box>
    );
  }

  // Main content
  return (
    <Container disableGutters maxWidth="xl">
      {/* Hero section */}
      <Hero data={data} />
      {/* Text blocks */}
      {textBlocks?.map((block) => (
        <Box key={block.id} sx={{ margin: "20px 0" }}>
          <Typography
            dangerouslySetInnerHTML={{ __html: block.attributes.field_text.processed }}
          />
        </Box>
      ))}
    </Container>
  );
};

export default Career;
 