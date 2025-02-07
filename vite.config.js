import {defineConfig} from 'vite'
import handlebars from "vite-plugin-handlebars";
import { resolve } from 'path';

export default defineConfig({
    root: '.',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, './src/main.js'),
            }
        }
    },
    plugins: [handlebars()],
})
