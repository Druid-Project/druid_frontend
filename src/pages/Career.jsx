import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import { Container, Box, Typography, Button, Card, CardContent } from "@mui/material";
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
    <Container disableGutters maxWidth="lg" sx={{ padding: "40px 20px" }}>
      {/* Hero section */}
      <Hero data={data} />

      {/* Job Posts Section */}
      <Box sx={{ marginTop: "30px" }}>
        {textBlocks?.map((block) => (
          <Card
            key={block.id}
            sx={{
              marginBottom: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            <CardContent>
              {/* Title */}
              <Typography
                variant="h5"
                sx={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {block.attributes?.field_text?.processed
                  ? block.attributes.field_text.processed.split("<p>")[1]?.split("</p>")[0]
                  : "Job Title"}
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  marginBottom: "15px",
                  lineHeight: "1.6",
                }}
                dangerouslySetInnerHTML={{
                  __html: block.attributes?.field_text?.processed || "",
                }}
              />

              {/* Call-to-Action Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  backgroundColor: "#0073e6",
                  "&:hover": {
                    backgroundColor: "#005bb5",
                  },
                }}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Career;
