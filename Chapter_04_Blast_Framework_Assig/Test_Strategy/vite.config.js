import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/jira': 'http://localhost:3001'
    }
  }
})

