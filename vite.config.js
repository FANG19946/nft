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
      '22de5a98d6a6.ngrok-free.app' // add your ngrok domain here
    ]
  }
})
