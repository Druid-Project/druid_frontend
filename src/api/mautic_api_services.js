import mautic from "mautic-tracking";
import { mauticBaseUrl } from "../config";

mautic.initialize(`${mauticBaseUrl}/mtc.js`);

export default mautic;
