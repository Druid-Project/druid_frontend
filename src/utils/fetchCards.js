import { fetchContent } from "../api/api";
import { fetchImage } from "./fetchImage";

export const fetchCardDetails = async (cardId, baseUrl) => {
  try {
    const response = await fetchContent(`jsonapi/paragraph/card/${cardId}`);
    const cardData = response.data;
    if (cardData.relationships.field_card_image?.data?.id) {
      const imageId = cardData.relationships.field_card_image.data.id;
      const imageUrl = await fetchImage(imageId, baseUrl);
      cardData.imageUrl = imageUrl;
    }
    return cardData;
  } catch (error) {
    console.error("Error fetching card details:", error);
    return null;
  }
};

export const fetchCards = async (section, baseUrl, fieldName) => {
  if (section.relationships && section.relationships[fieldName]) {
    const cardDetailsPromises = section.relationships[fieldName].data.map(
      (card) => fetchCardDetails(card.id, baseUrl)
    );
    const cardDetails = await Promise.all(cardDetailsPromises);
    return cardDetails;
  }
  return [];
};
