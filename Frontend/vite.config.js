import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

// Vite configuration
export default defineConfig({
  // Base path configuration (for subdirectory deployment)
  base: '/', // Change '/myapp/' to the path where your app is hosted (if it's at the root, use '/')

  plugins: [
    // React plugin for JSX/TSX support
    react(),

    // Visualizer plugin to analyze the bundle size
    visualizer({ open: true }), // opens the report in the browser after build
  ],

  resolve: {
    // Alias configuration for simplified imports
    alias: {
      "@": path.resolve(__dirname, "./src"), // '@' alias maps to the 'src' directory
    },
  },

  // Tailwind CSS plugin configuration (if using Tailwind in your project)
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

