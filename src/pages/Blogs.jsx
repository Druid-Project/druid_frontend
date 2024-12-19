import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../redux/slices/blogSlice";
import BlogCard from "../components/blogspage/components/BlogCard";
import { Box, Container, Grid, Typography } from "@mui/material";
import sanitizeHtml from "../utils/sanitizeHtml"; // Add this import

const Blogs = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) return <Typography>Loading blogs...</Typography>;
  if (error) return <Typography>Error loading blogs: {error}</Typography>;

  return (
    <Container sx={{ padding: { xs: 2, md: 10 } }}>
      <Box padding={{ xs: 2, md: 20 }}>
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
          dangerouslySetInnerHTML={{ __html: sanitizeHtml("What's on the minds of druids? Our writings on the subject and beyond – our everyday life, our culture, and the world of software development.") }}
        />
      </Box>
      <Grid container spacing={2}>
        {blogs?.map((blog) => (
          <Grid item xs={12} sm={12} md={6} key={blog.id}>
            <BlogCard blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blogs;
