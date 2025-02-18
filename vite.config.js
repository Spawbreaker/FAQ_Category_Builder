import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    define: {
      "process.env.IS_PREACT": JSON.stringify("true"),
    },
    base: "/",
    resolve: {
      alias: {
        "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      },
      server: {
        port: 3001,
        open: true,
        hot: true,
      },
    },
  };

  if (command !== 'serve') {
    config.base = "/FAQ_Category_Builder";
  }

  return config;
});
