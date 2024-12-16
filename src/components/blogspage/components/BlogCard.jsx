import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchImage } from "../../../utils/fetchImage";
import { baseUrl } from "../../../config";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

const BlogCard = ({ blog }) => {
  const { title, body, field_date } = blog.attributes;
  const authorId = blog.relationships.field_author.data.id;
  const heroImageId = blog.relationships.field_hero_image.data.id;

  const [imageUrl, setImageUrl] = useState("");

  const author = useSelector((state) =>
    state.content.data.included.find(
      (item) => item.id === authorId && item.type === "user--user"
    )
  );

  useEffect(() => {
    const getImageUrl = async () => {
      const url = await fetchImage(heroImageId, baseUrl);
      setImageUrl(url);
    };

    if (heroImageId) {
      getImageUrl();
    }
  }, [heroImageId]);

  const formattedDate = new Date(field_date).toLocaleDateString();
  const formattedTime = new Date(field_date).toLocaleTimeString();

  return (
    <Card
      sx={{
        width: 500, // Fixed width for uniformity
        height: 550, // Fixed height for uniformity
        // margin: "10px auto",
        borderRadius: 1,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)",
        },
        backgroundColor: "#fff",
        overflow: "hidden",
        cursor: "pointer", // Pointer cursor to indicate interactivity
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
            WebkitLineClamp: 3, // Limit body to 3 lines
            WebkitBoxOrient: "vertical",
            fontSize: "0.9rem",
            color: "#555",
          }}
          dangerouslySetInnerHTML={{ __html: body.processed }}
        />
        <Box mt={2}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontSize: "0.8rem" }}
          >
            Published on: {formattedDate} at {formattedTime}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            sx={{ fontSize: "0.8rem" }}
          >
            Author: {author ? author.attributes.display_name : "Unknown"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
