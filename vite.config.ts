import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/coffsite/', // Это говорит сайту: "Ты живешь в папке /coffsite/"
})