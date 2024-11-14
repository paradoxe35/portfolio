import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: "./build",
    target: "ESNEXT",
    sourcemap: false,
  },
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
  plugins: [react() as any],
});
