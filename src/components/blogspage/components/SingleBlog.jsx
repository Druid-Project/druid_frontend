import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlog } from "../../../redux/blogSlice";
import { fetchParagraphDetails } from "../../../utils/fetchParagraphDetails";
import { fetchImage } from "../../../utils/fetchImage"; // Import fetchImage
import { Container, Typography, Box } from "@mui/material";
import { baseUrl } from "../../../config"; // Import baseUrl

const SingleBlog = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const { singleBlog: blog, loading, error } = useSelector((state) => state.blogs);
  const [paragraphs, setParagraphs] = useState([]);
  const [heroImageUrl, setHeroImageUrl] = useState(null); // State for hero image URL

  useEffect(() => {
    dispatch(fetchSingleBlog(blogId));
  }, [dispatch, blogId]);

  useEffect(() => {
    if (blog) {
      document.title = blog.attributes.title || "Blog";
      const fetchParagraphs = async () => {
        const paragraphPromises = blog.relationships.field_content_sections.data.map((section) =>
          fetchParagraphDetails(section.type.replace("paragraph--", ""), section.id)
        );
        const paragraphData = await Promise.all(paragraphPromises);
        setParagraphs(paragraphData);
      };
      fetchParagraphs();

      // Fetch hero image
      const fetchHeroImage = async () => {
        if (blog.relationships.field_hero_image?.data?.id) {
          const imageId = blog.relationships.field_hero_image.data.id;
          const imageUrl = await fetchImage(imageId, baseUrl);
          setHeroImageUrl(imageUrl);
        }
      };
      fetchHeroImage();
    }
  }, [blog]);

  if (loading) {
    return <Typography>Loading blog...</Typography>;
  }
  if (error) {
    return <Typography color="error">Error loading blog: {error}</Typography>;
  }
  if (!blog) {
    return <Typography>Blog not found</Typography>;
  }

  const { title, body, field_date } = blog.attributes;
  const formattedDate = new Date(field_date).toLocaleDateString();
  const formattedTime = new Date(field_date).toLocaleTimeString();

  const author = blog.relationships.field_author?.data;

  const renderSection = (section) => {
    switch (section.type) {
      case "paragraph--text_block":
        return <Typography dangerouslySetInnerHTML={{ __html: section.attributes.field_text.processed }} />;
      case "paragraph--quote_block":
        return (
          <Typography
            sx={{ fontStyle: "italic", borderLeft: "4px solid #ccc", paddingLeft: "16px" }}
            dangerouslySetInnerHTML={{ __html: section.attributes.field_quote_text }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Box padding={5}>
        <Typography variant="h3" component="h1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Published on: {formattedDate} at {formattedTime}
        </Typography>
        {author && author.attributes && (
          <Typography variant="caption" color="text.secondary">
            Author: {author.attributes.display_name}
          </Typography>
        )}
        {heroImageUrl && (
          <Box mt={2} display="flex" justifyContent="center">
            <img
              src={heroImageUrl}
              alt={title}
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>
        )}
        <Box mt={2}>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: body.processed }} />
        </Box>
        {paragraphs.map((section) => (
          <Box key={section.id} mt={2}>
            {renderSection(section)}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default SingleBlog;