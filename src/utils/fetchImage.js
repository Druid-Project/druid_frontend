import { fetchContent } from "../api/api";

export const fetchImage = async (imageId, baseUrl) => {
  try {
    // Fetch the media entity using the image ID
    const response = await fetchContent(`jsonapi/media/image/${imageId}`);
    console.log("Media response:", response);

    // Extract the file ID from the media entity's relationships
    const fileId = response.data.relationships?.field_media_image?.data?.id;
    console.log("File ID:", fileId);

    if (fileId) {
      // Fetch the file entity using the file ID
      const fileResponse = await fetchContent(`jsonapi/file/file/${fileId}`);
      // Extract the image URL from the file entity's attributes
      const imageUrl = fileResponse.data.attributes.uri.url;
      console.log("Image URL:", imageUrl);
      // Return the full image URL by concatenating the base URL and the image URL
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
