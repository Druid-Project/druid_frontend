const defaultDrupalUrl = "https://druid-backend.lndo.site";
const defaultMauticUrl = "https://mautic-lando.lndo.site";

export const baseUrl = import.meta.env.VITE_DRUPAL_HOST_URL || defaultDrupalUrl;
export const mauticBaseUrl = import.meta.env.VITE_MAUTIC_HOST_URL || defaultMauticUrl;
export const drupalBaseUrl = defaultDrupalUrl;
export const mauticContactsApiUrl = `${drupalBaseUrl}/api/mautic-contacts`; 
