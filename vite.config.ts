import { defineConfig, loadEnv } from 'vite'

import react from '@vitejs/plugin-react'

export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
      __APP_ENV__: process.env.VITE_VERCEL_ENV,
    },
  }
})
