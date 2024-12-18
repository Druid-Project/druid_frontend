import { fetchContent } from "../api/api";

export const fetchImage = async (imageId, baseUrl) => {
  try {
    const response = await fetchContent(`jsonapi/media/image/${imageId}`);

    const fileId = response.data.relationships?.field_media_image?.data?.id;

    if (!fileId) {
      console.error("Error: field_media_image relationship not found");
      return null;
    }

    const fileResponse = await fetchContent(`jsonapi/file/file/${fileId}`);
    const imageUrl = fileResponse.data.attributes.uri.url;

    return `${baseUrl}${imageUrl}`;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};
