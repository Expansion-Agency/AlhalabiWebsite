import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// Vite configuration
export default defineConfig({
  base: '/', 
  plugins: [
    react(),

    visualizer({ open: true }), 
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), 
    },
  },

  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
// import path from "path";
// import tailwindcss from "@tailwindcss/vite";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// // https://vite.dev/config/
// export default defineConfig({
//   build: {
//     outDir: 'dist', // Ensure this matches Vercel's expected build output directory
//   },
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });

