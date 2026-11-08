import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

const root = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  root,
  plugins: [tailwindcss()],
  server: {
    host: "127.0.0.1",
  },
  build: {
    outDir: fileURLToPath(new URL("../dist/manual-ui", import.meta.url)),
    emptyOutDir: true,
  },
})
