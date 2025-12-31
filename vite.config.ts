import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true, // Listen on all addresses (0.0.0.0)
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'sure-ant-informally.ngrok-free.app',
      'notbatman.me'
    ],
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
  },
})

