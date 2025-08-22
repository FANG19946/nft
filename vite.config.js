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
      '9810ee9c0e2d.ngrok-free.app' // add your ngrok domain here
    ]
  }
})
