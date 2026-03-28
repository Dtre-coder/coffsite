import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/coffsite/',  // название твоего репозитория
  plugins: [react()],
})
