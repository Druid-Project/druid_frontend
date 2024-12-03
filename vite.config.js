import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/form": {
        target: "https://druid-mautic.lndo.site",
        changeOrigin: true, // This modifies the origin of the request
        secure: false, // Use this if Mautic is using self-signed certificates
        rewrite: (path) => path.replace(/^\/form/, ""),
        onProxyRes: (proxyRes) => {
          // Optionally log or modify the response headers here if needed
          proxyRes.headers["Access-Control-Allow-Origin"] = "*"; // Allow any origin (or set to localhost:5173)
        },
      },
    },
  },
});
