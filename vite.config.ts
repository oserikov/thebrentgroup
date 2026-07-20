import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "/thebrentgroup/",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        technology: resolve(__dirname, "technology.html"),
        credibility: resolve(__dirname, "credibility.html"),
        messagesToFuture: resolve(__dirname, "messages-to-the-future.html"),
      },
    },
  },
});
