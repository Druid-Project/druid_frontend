import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlog } from "../../../redux/contentSlice";
import { Container, Typography, Box } from "@mui/material";

const SingleBlog = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const { singleBlog: blog, loading, error } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(fetchSingleBlog(blogId));
  }, [dispatch, blogId]);

  if (loading) return <Typography>Loading blog...</Typography>;
  if (error) return <Typography>Error loading blog: {error}</Typography>;
  if (!blog) return <Typography>Blog not found</Typography>;

  const { title, body, field_date } = blog.attributes;
  const formattedDate = new Date(field_date).toLocaleDateString();
  const formattedTime = new Date(field_date).toLocaleTimeString();

  return (
    <Container>
      <Box padding={5}>
        <Typography variant="h3" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Published on: {formattedDate} at {formattedTime}
        </Typography>
        <Box mt={2}>
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: body.processed }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default SingleBlog;