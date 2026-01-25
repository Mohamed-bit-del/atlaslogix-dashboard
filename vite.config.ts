import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Create sever proxy to mock api calls in development mode issue (CORS)
  server: {
    proxy: {
      "/api": {
        target: "https://nexus-atlaslogix-assessment.vast-soft.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
