import { useEffect, useState } from "react";
import "./MauticForm.css";

const MauticForm = () => {
  const mauticUrl = import.meta.env.VITE_MAUTIC_HOST_URL;
  const [formHtml, setFormHtml] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
        script.src = `${mauticUrl}/media/js/mautic-form.js?v775035ad`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      });
    };

    const modifyFormHtml = (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Ensure messages are repositioned without altering form layout
      const messageDiv = doc.getElementById(
        "mauticform_mauticcontactform_message"
      );
      const errorDiv = doc.getElementById("mauticform_mauticcontactform_error");

      if (messageDiv) {
        messageDiv.style.display = "none";
      }
      if (errorDiv) {
        errorDiv.style.display = "none";
      }

      // Add a container for messages, ensure it's independent of rows
      const messagesContainer = doc.createElement("div");
      messagesContainer.className = "mauticform-messages-container";

      if (errorDiv) messagesContainer.appendChild(errorDiv);
      if (messageDiv) messagesContainer.appendChild(messageDiv);

      const form = doc.querySelector(".mauticform-innerform");
      if (form) {
        // Insert messages container at the top of the form
        form.insertBefore(messagesContainer, form.firstChild);
      }

      return doc.documentElement.innerHTML;
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      if (!form.matches("#mauticform_mauticcontactform")) return;

      const messageDiv = document.getElementById(
        "mauticform_mauticcontactform_message"
      );
      const errorDiv = document.getElementById(
        "mauticform_mauticcontactform_error"
      );

      // Simulate server response
      const response = {
        success: true,
        message: "Thank you for your submission!",
      };

      if (response.success) {
        if (messageDiv) {
          messageDiv.textContent = response.message;
          messageDiv.style.display = "block";
        }
        if (errorDiv) errorDiv.style.display = "none";
        form.reset();
      } else {
        if (errorDiv) {
          errorDiv.textContent = "Submission failed. Please try again.";
          errorDiv.style.display = "block";
        }
        if (messageDiv) messageDiv.style.display = "none";
      }

      // Ensure the message container stays within its allocated space
      const messagesContainer = document.querySelector(
        ".mauticform-messages-container"
      );
      if (messagesContainer) {
        messagesContainer.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };

    const initializeMautic = async () => {
      try {
        const response = await fetch("/mautic-form.html");
        const data = await response.text();
        const updatedHtml = modifyFormHtml(
          data.replace(/http:\/\/localhost:\d+/g, mauticUrl)
        );
        setFormHtml(updatedHtml);

        await loadMauticScript();

        window.MauticDomain = mauticUrl;
        window.MauticLang = { submittingMessage: "Wait..." };

        if (window.MauticSDK) {
          window.MauticSDK.onLoad();
        }

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
      const scriptTag = document.querySelector(
        `script[src="${mauticUrl}/media/js/mautic-form.js"]`
      );
      if (scriptTag) scriptTag.remove();
    };
  }, [mauticUrl]);

  if (isLoading) {
    return <div>Loading form...</div>;
  }

  return (
    <div
      className="mauticform-container"
      dangerouslySetInnerHTML={{ __html: formHtml }}
    />
  );
};

export default MauticForm;
