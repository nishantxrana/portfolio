import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  server: {
    host: true, // Listen on all addresses (0.0.0.0)
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'sure-ant-informally.ngrok-free.app',
      'data-safari-ivory.ngrok-free.dev',
      'nishantxrana.com'
    ],
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
  },
})

