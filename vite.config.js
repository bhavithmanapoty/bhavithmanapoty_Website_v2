import { defineConfig } from "vite";
import { inject } from '@vercel/analytics';

inject();

export default defineConfig({
    base: "./",
    build: {
        minify: "terser"
    },
});