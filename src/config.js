export const baseUrl = import.meta.env.VITE_DRUPAL_HOST_URL || "https://druid-backend.lndo.site";
export const mauticBaseUrl = import.meta.env.VITE_MAUTIC_HOST_URL || "https://mautic-lando.lndo.site";
export const drupalBaseUrl = "https://druid-backend.lndo.site";
export const mauticContactsApiUrl = `${drupalBaseUrl}/api/mautic-contacts`; // Centralized URL
