import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Exchange authorization code for access token
      axios
        .post(`${import.meta.env.VITE_MAUTIC_API_BASE_URL}/oauth/v2/token`, {
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_MAUTIC_API_CLIENT_ID,
          client_secret: import.meta.env.VITE_MAUTIC_API_CLIENT_SECRET,
          code: code,
          redirect_uri: "http://localhost:5173/oauth/callback",
        })
        .then((response) => {
          // Save the access token in localStorage
          localStorage.setItem("access_token", response.data.access_token);
          navigate("/success"); // Redirect after successful authorization
        })
        .catch((error) => {
          console.error("Error fetching access token:", error);
        });
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default OAuthCallback;
