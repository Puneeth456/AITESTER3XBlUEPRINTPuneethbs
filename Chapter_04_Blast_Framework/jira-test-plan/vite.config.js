import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createProxyMiddleware } from 'http-proxy-middleware'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'jira-dynamic-proxy',
      configureServer(server) {
        const proxy = createProxyMiddleware({
          router: (req) => req.headers['x-jira-target'],
          changeOrigin: true,
          pathRewrite: { '^/jira-api': '' },
          on: {
            error: (err, _req, res) => {
              res.writeHead(502, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ error: `Proxy error: ${err.message}` }))
            }
          }
        })
        server.middlewares.use('/jira-api', proxy)
      }
    }
  ]
})
