import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@services': path.resolve(__dirname, 'src/services')
    }
  }
})