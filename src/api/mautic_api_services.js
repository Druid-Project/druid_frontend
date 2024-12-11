import mautic from "mautic-tracking";
import axios from "axios";
import { mauticBaseUrl, drupalBaseUrl } from "../config";
import { getMtcId } from "../utils/cookieUtils"; // Import the utility

// Initialize Mautic tracking
mautic.initialize(`${mauticBaseUrl}/mtc.js`);

// Function to send mtc_id to Drupal backend
export const sendMtcIdToBackend = async () => {
  const mtcId = getMtcId();

  if (!mtcId) {
    console.error("No mtc_id available to send");
    return null;
  }

  console.log("Sending MTC ID:", mtcId);

  try {
    const response = await axios.post(
      `${drupalBaseUrl}/api/mautic-contacts/mtc_id`, // Ensure drupalBaseUrl is correctly defined
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
    return response.data;
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

