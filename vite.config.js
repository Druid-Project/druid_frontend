import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/form": {
        target: import.meta.env.VITE_MAUTIC_HOST_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/form/, ""),
        onProxyRes: (proxyRes) => {
          proxyRes.headers["Access-Control-Allow-Origin"] = "*";
        },
      },
    },
  },
});
