import { useEffect, useState } from "react";
import { fetchCards } from "../utils/fetchCards";

const useFetchCards = (section, baseUrl, field) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (section) {
      const fetchServiceCards = async () => {
        const cards = await fetchCards(section, baseUrl, field);
        setCards(cards);
      };

      fetchServiceCards();
    }
  }, [section, baseUrl, field]);

  return cards;
};

export default useFetchCards;
