import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchImage from "../../../hooks/useFetchImage";
import { fetchAuthorDetails } from "../../../utils/fetchAuthorDetails";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import sanitizeHtml from "../../../utils/sanitizeHtml"; // Add this import

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const { title, body, created } = blog.attributes;
  const authorId = blog.relationships.field_author?.data?.id;
  const heroImageId = blog.relationships.field_hero_image?.data?.id;

  const imageUrl = useFetchImage(heroImageId);
  const [authorDetails, setAuthorDetails] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (authorId) {
        const author = await fetchAuthorDetails(authorId);
        setAuthorDetails(author);
      }
    };
    fetchAuthor();
  }, [authorId]);

  const formattedDate = new Date(created).toLocaleDateString();

  const handleCardClick = () => {
    navigate(`/blogs/${blog.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        width: 500,
        height: 550,
        borderRadius: 1,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
        },
        backgroundColor: "#fff",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {imageUrl && (
        <Box sx={{ height: 300, overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={imageUrl}
            alt={title}
            sx={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Box>
      )}
      <CardContent sx={{ padding: 3 }}>
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
            color: "#333",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            fontSize: "0.9rem",
            color: "#555",
          }}
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(body.processed) }}
        />
        <Box mt={2}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.8rem" }}
          >
            Published on: {formattedDate}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ fontSize: "0.8rem" }}
          >
            Author: {authorDetails ? authorDetails.attributes.display_name : "Unknown"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

BlogCard.propTypes = {
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
        }),
      }),
      field_hero_image: PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.string,
        }),
      }),
    }).isRequired,
  }).isRequired,
};

export default BlogCard;
