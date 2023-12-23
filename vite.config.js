import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  cssPreprocessOptions: {
    scss: {
      additionalData: '' +
          '@import "src/assets/scss/_variables.scss"' +
          '@import "src/assets/scss/_post.scss"',
    }
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
