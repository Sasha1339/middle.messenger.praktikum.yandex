import {defineConfig} from 'vite'
import handlebars from "vite-plugin-handlebars";
import {nodePolyfills} from "vite-plugin-node-polyfills";

export default defineConfig({
    root: '.',
    define: {
        'process.env': {} // Это помогает избежать ошибок с переменными окружения
    },
    plugins: [handlebars(), nodePolyfills({
        protocolImports: true,
    }),],
})
