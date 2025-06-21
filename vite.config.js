import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  preview: {
    host: true,
    allowedHosts: ['conzofrontend.onrender.com', 'asthica.com'],
  },
});
