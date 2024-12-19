import { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import SnackbarAlert from "../common/SnackbarAlert";
import "./MauticForm.css";
import { mauticBaseUrl } from "../../config";

const MauticForm = () => {
  const [formHtml, setFormHtml] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const loadMauticScript = () => {
      return new Promise((resolve, reject) => {
        if (typeof window.MauticSDKLoaded !== "undefined") {
          resolve();
          return;
        }

        window.MauticSDKLoaded = true;
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `${mauticBaseUrl}/media/js/mautic-form.js?vf9b8e99a`;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error("Failed to load Mautic script"));
        document.head.appendChild(script);
      });
    };

    const modifyFormHtml = (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const messageDiv = doc.getElementById("mauticform_contactform_message");
      const errorDiv = doc.getElementById("mauticform_contactform_error");

      if (messageDiv) messageDiv.style.display = "block";
      if (errorDiv) errorDiv.style.display = "none";

      const messagesContainer = doc.createElement("div");
      messagesContainer.className = "mauticform-messages-container";

      if (errorDiv) messagesContainer.appendChild(errorDiv);
      if (messageDiv) messagesContainer.appendChild(messageDiv);

      const form = doc.querySelector(".mauticform-innerform");
      if (form) form.insertBefore(messagesContainer, form.firstChild);

      return doc.documentElement.innerHTML;
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      if (!form.matches("#mauticform_contactform")) return;

      const response = {
        success: true,
        message: "Thank you for your submission!",
      };

      setSnackbar({
        open: true,
        message: response.success ? response.message : "Submission failed. Please try again.",
        severity: response.success ? "success" : "error",
      });

      if (response.success) form.reset();
    };

    const initializeMautic = async () => {
      try {
        const response = await fetch("/mautic-form.html");
        const data = await response.text();
        const updatedHtml = modifyFormHtml(data.replace(/http:\/\/localhost:\d+/g, mauticBaseUrl));
        setFormHtml(updatedHtml);

        await loadMauticScript();

        window.MauticDomain = mauticBaseUrl;
        window.MauticLang = { submittingMessage: "Wait..." };

        if (window.MauticSDK) window.MauticSDK.onLoad();

        setTimeout(() => {
          document.addEventListener("submit", handleFormSubmit);
        }, 100);
      } catch (err) {
        console.error("Mautic form initialization error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeMautic();

    return () => {
      document.removeEventListener("submit", handleFormSubmit);
      const scriptTag = document.querySelector(`script[src="${mauticBaseUrl}/media/js/mautic-form.js?vf9b8e99a"]`);
      if (scriptTag) scriptTag.remove();
    };
  }, []);

  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ fontWeight: 700 }}>
        Contact Us
      </Typography>
      <Box>
        {isLoading ? (
          <Typography variant="body1" align="center">
            Loading...
          </Typography>
        ) : (
          <div className="mauticform_wrapper" dangerouslySetInnerHTML={{ __html: formHtml }} />
        )}
      </Box>
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Container>
  );
};

export default MauticForm;
