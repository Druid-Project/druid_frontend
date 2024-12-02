import mautic from "mautic-tracking";

const mauticSiteUrl = import.meta.env.VITE_MAUTIC_HOST_URL;

mautic.initialize(`${mauticSiteUrl}/mtc.js`);

export default mautic;
