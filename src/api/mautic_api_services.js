import mautic from "mautic-tracking";
import axios from "axios";
import { mauticBaseUrl, drupalBaseUrl } from "../config";
import { getMtcId } from "../utils/cookieUtils"; // Import the utility

const mauticContactsApiUrl = `${drupalBaseUrl}/api/mautic-contacts`; // Centralized URL

// Initialize Mautic tracking
mautic.initialize(`${mauticBaseUrl}/mtc.js`);

// Function to send mtc_id to Drupal backend
export const sendMtcIdToBackend = async () => {
  const mtcId = getMtcId();

  if (!mtcId) {
    console.error("No mtc_id available to send");
    return [];
  }

  console.log("Sending MTC ID:", mtcId);

  try {
    const response = await axios.post(
      `${mauticContactsApiUrl}/mtc_id`, // Use centralized URL
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
        timeout: 5000, // Set timeout to 5 seconds
      }
    );

    console.log("mtc_id logged successfully:", response.data);

    // Fetch the segment based on mtc_id
    const segmentResponse = await axios.get(
      `${mauticContactsApiUrl}/mtc_id/segments` // Use centralized URL
    );

    // Process the backend response
    const { total, lists } = segmentResponse.data;
    console.log("Segments data:", segmentResponse.data);
    if (total > 0) {
      return Object.values(lists).map(list => list.name);
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

