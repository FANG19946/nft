import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
    // Exposing via ngrok
    server: {
    host: true, // allow external access
    allowedHosts: [
      '8b0f49021a3a.ngrok-free.app' // add your ngrok domain here
    ]
  }
})
