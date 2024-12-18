import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import { Container, Box, Typography } from "@mui/material";
import Hero from "../components/common/Hero";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import JobCard from "../components/common/JobCard";
import DynamicContent from "../components/mautic/DynamicContent";
const Career = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(
      fetchContentData({
        endpoint: "node/careers",
        includes: "field_career_section",
      })
    );
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <Error message={`Something went wrong. ${error}`} />;

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

  return (
    <Container disableGutters maxWidth="xl">
      <Box>
        <Hero data={data} />
      </Box>
      <Box sx={{ marginTop: "30px", alignItems: "center" }}>
        {textBlocks?.map((block) => (
          <JobCard key={block.id} block={block} />
        ))}
      </Box>
      <Box>
        <DynamicContent />
      </Box>
    </Container>
  );
};

export default Career;
