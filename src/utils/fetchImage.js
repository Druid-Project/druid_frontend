import { fetchContent } from "../api/api";

export const fetchImage = async (imageId, baseUrl) => {
  try {
    const response = await fetchContent(`jsonapi/media/image/${imageId}`);
    console.log("Media response:", response);
    const fileId = response.data.relationships?.field_media_image?.data?.id;
    console.log("File ID:", fileId);
    if (fileId) {
      const fileResponse = await fetchContent(`jsonapi/file/file/${fileId}`);
      const imageUrl = fileResponse.data.attributes.uri.url;
      console.log("Image URL:", imageUrl);
      return `${baseUrl}${imageUrl}`;
    } else {
      console.error("Error: field_media_image relationship not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};
