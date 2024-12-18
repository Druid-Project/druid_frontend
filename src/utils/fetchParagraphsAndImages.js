import { fetchParagraphDetails } from "./fetchParagraphDetails";
import { fetchImage } from "./fetchImage";
import { baseUrl } from "../config";

export const fetchParagraphsAndImages = async (blog) => {
  const paragraphPromises = blog.relationships.field_content_sections.data.map((section) =>
    fetchParagraphDetails(section.type.replace("paragraph--", ""), section.id)
  );
  const paragraphData = await Promise.all(paragraphPromises);

  const imageIds = paragraphData
    .filter((section) => section.type === "paragraph--image_block")
    .flatMap((section) => section.relationships.field_image.data.map((image) => image.id));

  const imageUrls = await Promise.all(imageIds.map((imageId) => fetchImage(imageId, baseUrl)));
  const imageUrlMap = imageIds.reduce((acc, id, index) => {
    acc[id] = imageUrls[index];
    return acc;
  }, {});

  return { paragraphData, imageUrlMap };
};
