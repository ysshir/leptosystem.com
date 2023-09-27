import react from "@vitejs/plugin-react"
import {defineConfig} from "vite"
import * as path from 'path'

const projectRoot = path.resolve(__dirname, '../../../');

export default defineConfig({
  root     : __dirname,
  plugins  : [
    react(),
  ],
  resolve  : {
    alias: {
      core             : path.resolve(projectRoot, 'src'),
      www              : __dirname,
      "./runtimeConfig": "./runtimeConfig.browser"
    }
  },
  server   : {
    port: 3000
  },
  publicDir: path.resolve(__dirname, 'public'),
  build    : {
    target   : "es2020",
    sourcemap: true,
    outDir   : path.resolve(projectRoot, "dist/www-ui"),

    rollupOptions: {
      input   : {
        main: path.resolve(__dirname, 'index.html')
      },
      external: ['path'],
    },
  },
  define   : {
    global: {},
  }
})
