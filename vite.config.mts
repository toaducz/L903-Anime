import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: '/',
    base: '',
    resolve: {
      alias: {
        css: path.resolve(__dirname, './css'),
        api: path.resolve(__dirname, '/api'),
        components: path.resolve(__dirname, './components'),
        pages: path.resolve(__dirname, './pages'),
        hooks: path.resolve(__dirname, './hooks'),
        assets: path.resolve(__dirname, './assets'),
        states: path.resolve(__dirname, './states'),
        utils: path.resolve(__dirname, './utils'),
        state: path.resolve(__dirname, './state'),
        type: path.resolve(__dirname, './type'),
        enums: path.resolve(__dirname, './enums')
      }
    },
    plugins: [tailwindcss()]
  })
}
