import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    publicDir: "demo-public",
    base: `/react-bibtex-reference-manager/`,
    server: {
        fs: {
            allow: ['..'],
        },
    },
    build: {
        rollupOptions: {
            input: path.resolve(__dirname, 'index.html'),
        },
    },

});