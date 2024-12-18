import mautic from "mautic-tracking";
import axios from "axios";
import { mauticBaseUrl, drupalBaseUrl } from "../config";
import { getMtcId } from "../utils/cookieUtils";

const mauticContactsApiUrl = `${drupalBaseUrl}/api/mautic-contacts`;

mautic.initialize(`${mauticBaseUrl}/mtc.js`);

const postMtcIdToBackend = async (mtcId) => {
  await axios.post(
    `${mauticContactsApiUrl}/mtc_id`,
    {
      data: {
        type: "mautic_segment",
        attributes: {
          mtc_id: mtcId,
        },
      },
    },
    {
      headers: {
        "Content-Type": "application/vnd.api+json",
      },
      timeout: 5000,
    }
  );
};

const fetchSegments = async () => {
  const response = await axios.get(`${mauticContactsApiUrl}/mtc_id/segments`);
  return response.data;
};

export const sendMtcIdToBackend = async () => {
  const mtcId = getMtcId();

  if (!mtcId) {
    console.error("No mtc_id available to send");
    return [];
  }

  try {
    await postMtcIdToBackend(mtcId);
    const { total, lists } = await fetchSegments();

    if (total > 0) {
      return Object.values(lists).map((list) => list.name);
    }

    return [];
  } catch (error) {
    if (error.response) {
      console.error("Backend responded with an error:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("No response received from backend:", error.request);
    } else {
      console.error("Error in sending request:", error.message);
    }
    throw error;
  }
};

export default mautic;

