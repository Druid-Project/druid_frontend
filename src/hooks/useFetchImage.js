import { useState, useEffect } from "react";
import { fetchImage } from "../utils/fetchImage";
import { baseUrl } from "../config";

const useFetchImage = (imageId) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getImageUrl = async () => {
      const url = await fetchImage(imageId, baseUrl);
      setImageUrl(url);
    };

    if (imageId) {
      getImageUrl();
    }
  }, [imageId]);

  return imageUrl;
};

export default useFetchImage;
