import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  /** GitHub Pages 项目页：https://<user>.github.io/meiyou-fetal/ */
  base: '/meiyou-fetal/',
})
