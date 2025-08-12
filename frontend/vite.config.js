import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'assets': '/src/assets',
      'components': '/src/components',
      'contexts': '/src/contexts',
      'hooks': '/src/hooks',
      'pages': '/src/pages',
      'services': '/src/services',
      'styles': '/src/styles',
      'utils': '/src/utils'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
