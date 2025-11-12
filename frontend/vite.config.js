import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ❌ Don't call typography() here — just import it so Tailwind sees it.
import '@tailwindcss/typography'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})
