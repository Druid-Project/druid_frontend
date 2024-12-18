import { fetchContent } from "../api/api";
import { baseUrl } from "../config";
import { fetchImage } from "./fetchImage";

const getImageUrl = async (cardData) => {
  if (cardData.relationships.field_card_image?.data?.id) {
    const imageId = cardData.relationships.field_card_image.data.id;
    return await fetchImage(imageId, baseUrl);
  }
  return null;
};

export const fetchCardDetails = async (cardId) => {
  try {
    const response = await fetchContent(`jsonapi/paragraph/card/${cardId}`);
    const cardData = response.data;
    const imageUrl = await getImageUrl(cardData);
    if (imageUrl) {
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
    return await Promise.all(cardDetailsPromises);
  }
  return [];
};
