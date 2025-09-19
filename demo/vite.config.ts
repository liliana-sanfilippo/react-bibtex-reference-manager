import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    publicDir: "demo-public",
    base: `/react-bibtext-reference-manager/`,
    server: {
        fs: {
            // erlaubt Zugriff auf das Root-Verzeichnis
            allow: ['..'],
        },
    },
    build: {
        rollupOptions: {
            // Wichtig: sonst packt Rollup es evtl. nicht richtig
            input: path.resolve(__dirname, 'index.html'),
        },
    },

});