import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContentData } from "../redux/contentSlice";
import BlogCard from "../components/blogspage/components/BlogCard";
import { Box, Container, Grid, Typography } from "@mui/material";
import { baseUrl } from "../config";
const Blogs = () => {
  const dispatch = useDispatch();

  const { data: blogs, loading, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(
      fetchContentData({
        endpoint: "node/blogs",
        includes: "field_hero_image,field_content_sections,field_author",
      })
    );
  }, [dispatch]);

  if (loading) return <Typography>Loading blogs...</Typography>;
  if (error) return <Typography>Error loading blogs: {error}</Typography>;

  return (
    <Container sx={{ padding: 10 }}>
      <Box padding={20}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ textAlign: "center" }}
          gutterBottom
        >
          Blogs
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center" }}
          gutterBottom
        >
          What's on the minds of druids? Our writings on the subject and beyond
          – our everyday life, our culture, and the world of software
          development.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {blogs.data &&
          blogs.data.map((blog) => (
            <Grid item xs={12} sm={6} md={6} key={blog.id}>
              <BlogCard blog={blog} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Blogs;
