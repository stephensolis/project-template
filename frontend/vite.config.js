import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), basicSsl()],
  resolve: {
    tsconfigPaths: true
  },
  server: {
    port: Number(process.env.FRONTEND_PORT) || 14000,
    strictPort: true,
    cors: false,
    proxy: {
      "/api": {
        target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  test: {
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setupTest.ts",
    css: true,
    poolOptions: { forks: { execArgv: ["--no-experimental-webstorage"] } }
  }
});
