import { fetchContent } from "../api/api";
import { baseUrl } from "../config";
import { fetchImage } from "./fetchImage";

export const fetchCardDetails = async (cardId) => {
  try {
    const response = await fetchContent(`jsonapi/paragraph/card/${cardId}`);
    const cardData = response.data;
    console.log("Fetched card data:", cardData);
    if (cardData.relationships.field_card_image?.data?.id) {
      const imageId = cardData.relationships.field_card_image.data.id;
      const imageUrl = await fetchImage(imageId, baseUrl);
      console.log("Fetched image URL:", imageUrl);
      cardData.imageUrl = imageUrl;
    }
    return cardData;
  } catch (error) {
    console.error("Error fetching card details:", error);
    return null;
  }
};

export const fetchCards = async (section, fieldName) => {
  if (section.relationships && section.relationships[fieldName]) {
    const cardDetailsPromises = section.relationships[fieldName].data.map(
      (card) => fetchCardDetails(card.id)
    );
    const cardDetails = await Promise.all(cardDetailsPromises);
    return cardDetails;
  }
  return [];
};
