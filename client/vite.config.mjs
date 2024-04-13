import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite';

const env = loadEnv('development', process.cwd());
console.log(env.VITE_REACT_APP_SERVER_WITHOUT_PORT)

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
        host: env.VITE_REACT_APP_SERVER_WITHOUT_PORT,
        // linux
        // host: '192.168.1.1',
        port: 3000,
        // default
        // host : '127.0.0.1',
        // port : 8000
    }
})
