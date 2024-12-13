import { useEffect, useState } from "react";
import { fetchCardDetails } from "../utils/fetchCards";

const useFetchCardDetails = (cardId) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    if (cardId) {
      const fetchCard = async () => {
        const card = await fetchCardDetails(cardId);
        setCard(card);
      };

      fetchCard();
    }
  }, [cardId]);

  return card;
};

export default useFetchCardDetails;
