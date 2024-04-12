import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    esbuild: {
        loader: 'jsx',
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
        },
    },
    plugins: [react()],
    server: {
        // windows
        host: '192.168.1.4',
        // linux
        // host: '192.168.1.1',
        port: 3000,
        // default
        // host : '127.0.0.1',
        // port : 8000
    }
})
