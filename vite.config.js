import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (www.macbookairwithstones.online) → base must be '/'
// If you ever use only kenzi-ugene.github.io/leap-edge-website/, change to '/leap-edge-website/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
//test