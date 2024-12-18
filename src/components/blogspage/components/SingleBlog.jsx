import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlog } from "../../../redux/blogSlice";
import { Container, Typography, Box } from "@mui/material";
import { baseUrl } from "../../../config";
import MauticForm from "../../mautic/MauticForm";
import useFetchImage from "../../../hooks/useFetchImage";
import ImageBlock from "../../common/ImageBlock";
import { fetchParagraphsAndImages } from "../../../utils/fetchParagraphsAndImages";
import { fetchAuthorDetails } from "../../../utils/fetchAuthorDetails";
import sanitizeHtml from "../../../utils/sanitizeHtml"; // Add this import

const SingleBlog = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const { singleBlog: blog, loading, error } = useSelector((state) => state.blogs);
  const [paragraphs, setParagraphs] = useState([]);
  const [blockImageUrls, setBlockImageUrls] = useState({});
  const [authorDetails, setAuthorDetails] = useState(null);

  const heroImageId = blog?.relationships?.field_hero_image?.data?.id;
  const heroImageUrl = useFetchImage(heroImageId);

  useEffect(() => {
    dispatch(fetchSingleBlog(blogId));
  }, [dispatch, blogId]);

  useEffect(() => {
    if (blog) {
      document.title = blog.attributes.title || "Blog";
      const fetchData = async () => {
        const { paragraphData, imageUrlMap } = await fetchParagraphsAndImages(blog);
        setParagraphs(paragraphData);
        setBlockImageUrls(imageUrlMap);
      };
      fetchData();

      const fetchAuthor = async () => {
        const authorId = blog.relationships.field_author?.data?.id;
        if (authorId) {
          const author = await fetchAuthorDetails(authorId);
          setAuthorDetails(author);
        }
      };
      fetchAuthor();
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

  if (loading) return <Typography>Loading blog...</Typography>;
  if (error) return <Typography color="error">Error loading blog: {error}</Typography>;
  if (!blog) return <Typography>Blog not found</Typography>;

  const { title, body, created } = blog.attributes;
  const formattedDate = new Date(created).toLocaleDateString();

  const renderSection = (section) => {
    switch (section.type) {
      case "paragraph--text_block":
        return (
          <Box key={section.id} mt={2}>
            <Typography
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(processInlineImages(section.attributes.field_text.processed)),
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
                __html: sanitizeHtml(section.attributes.field_quote_text),
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
              if (!imageUrl) return null;
              return <ImageBlock key={image.id} imageUrl={imageUrl} altText={image.filename || "Block image"} />;
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
        <Box sx={{ borderBottom: "1px solid #ccc" }}>
          <Typography variant="caption" color="text.secondary">
            Published on: {formattedDate}
          </Typography>
          {authorDetails && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: "capitalize",
                padding: "10px",
              }}
            >
              Author: {authorDetails.attributes.display_name}
            </Typography>
          )}
        </Box>

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
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(body.processed) }}
          />
        </Box>
        {paragraphs.map((section) => renderSection(section))}
      </Box>
    </Container>
  );
};

SingleBlog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      body: PropTypes.shape({
        processed: PropTypes.string.isRequired,
      }).isRequired,
      created: PropTypes.string.isRequired,
    }).isRequired,
    relationships: PropTypes.shape({
      field_author: PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.string,
          attributes: PropTypes.shape({
            display_name: PropTypes.string,
          }),
        }),
      }),
      field_hero_image: PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.string,
        }),
      }),
      field_content_sections: PropTypes.shape({
        data: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
          })
        ).isRequired,
      }).isRequired,
    }).isRequired,
  }),
};

export default SingleBlog;
