import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/manage/',
  plugins: [react()],
  server: {
    proxy: {
      '/company': 'http://localhost:3000',
      '/officers': 'http://localhost:3000',
      '/search': 'http://localhost:3000',
      '/new': 'http://localhost:3000'
    }
  }
})
