import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    publicDir: "demo-public",
    optimizeDeps: {
        include: [
            '@liliana-sanfilippo/author-name-parser',
            '@liliana-sanfilippo/bibtex-ts-parser'
        ]
    }
});