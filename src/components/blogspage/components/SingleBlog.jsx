import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlog } from "../../../redux/blogSlice";
import { fetchParagraphDetails } from "../../../utils/fetchParagraphDetails";
import { Container, Typography, Box } from "@mui/material";
import { baseUrl } from "../../../config"; // Import baseUrl
import MauticForm from "../../mautic/MauticForm"; // Import MauticForm
import { fetchImage } from "../../../utils/fetchImage";

const SingleBlog = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const {
    singleBlog: blog,
    loading,
    error,
  } = useSelector((state) => state.blogs);
  const [paragraphs, setParagraphs] = useState([]);
  const [heroImageUrl, setHeroImageUrl] = useState(null); // State for hero image URL
  const [blockImageUrls, setBlockImageUrls] = useState({}); // State for block image URLs

  useEffect(() => {
    dispatch(fetchSingleBlog(blogId));
  }, [dispatch, blogId]);

  useEffect(() => {
    if (blog) {
      document.title = blog.attributes.title || "Blog";
      const fetchParagraphs = async () => {
        const paragraphPromises =
          blog.relationships.field_content_sections.data.map((section) =>
            fetchParagraphDetails(
              section.type.replace("paragraph--", ""),
              section.id
            )
          );
        const paragraphData = await Promise.all(paragraphPromises);
        setParagraphs(paragraphData);
      };
      fetchParagraphs();

      // Fetch hero image
      const fetchHeroImage = async (imageId) => {
        const imageUrl = await fetchImage(imageId, baseUrl);
        setHeroImageUrl(imageUrl);
      };

      if (blog.relationships.field_hero_image?.data?.id) {
        fetchHeroImage(blog.relationships.field_hero_image.data.id);
      }
    }
  }, [blog]);

  const processInlineImages = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const images = doc.querySelectorAll("img");

    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (src && !src.startsWith("http")) {
        img.setAttribute("src", `${baseUrl}${src}`);
      }
    });

    return doc.documentElement.innerHTML;
  };

  const fetchBlockImages = async (imageIds) => {
    const imageUrls = await Promise.all(
      imageIds.map((imageId) => fetchImage(imageId, baseUrl))
    );
    const imageUrlMap = imageIds.reduce((acc, id, index) => {
      acc[id] = imageUrls[index];
      return acc;
    }, {});
    setBlockImageUrls(imageUrlMap);
  };

  useEffect(() => {
    const imageIds = paragraphs
      .filter((section) => section.type === "paragraph--image_block")
      .flatMap((section) =>
        section.relationships.field_image.data.map((image) => image.id)
      );
    if (imageIds.length > 0) {
      fetchBlockImages(imageIds);
    }
  }, [paragraphs]);

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
        return (
          <Box key={section.id} mt={2}>
            <Typography
              dangerouslySetInnerHTML={{
                __html: processInlineImages(
                  section.attributes.field_text.processed
                ),
              }}
            />
          </Box>
        );
      case "paragraph--quote_block":
        return (
          <Box key={section.id} mt={2}>
            <Typography
              sx={{
                fontStyle: "italic",
                borderLeft: "4px solid #ccc",
                paddingLeft: "16px",
              }}
              dangerouslySetInnerHTML={{
                __html: section.attributes.field_quote_text,
              }}
            />
          </Box>
        );
      case "paragraph--mautic":
        return (
          <Box key={section.id} mt={2}>
            <Typography variant="h5" gutterBottom>
              {section.attributes.field_mautic_title}
            </Typography>
            <MauticForm formId={section.attributes.field_mautic_formid} />
          </Box>
        );
      case "paragraph--image_block":
        return (
          <Box key={section.id} mt={2} display="flex" flexWrap="wrap" justifyContent="center">
            {section.relationships.field_image.data.map((image) => {
              const imageUrl = blockImageUrls[image.id];
              if (!imageUrl) {
                return null;
              }
              return (
                <Box key={image.id} p={1}>
                  <img
                    src={imageUrl}
                    alt={image.filename}
                    style={{
                      width: "300px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
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
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: body.processed }}
          />
        </Box>
        {paragraphs.map((section) => renderSection(section))}
      </Box>
    </Container>
  );
};

export default SingleBlog;
