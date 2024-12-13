import { useEffect, useState } from "react";
import { fetchCardDetails } from "../utils/fetchCards";

const useFetchCardDetails = (cardId, baseUrl) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (cardId) {
      const fetchCard = async () => {
        const card = await fetchCardDetails(cardId, baseUrl);
        setCard(card);
      };

      fetchCard();
    }
  }, [cardId, baseUrl]);

  return card;
};

export default useFetchCardDetails;
