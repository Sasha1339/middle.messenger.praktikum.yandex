import {defineConfig} from 'vite'
import handlebars from "vite-plugin-handlebars";
import {nodePolyfills} from "vite-plugin-node-polyfills";

export default defineConfig({
    root: '.',
    plugins: [handlebars(), nodePolyfills({
        protocolImports: true,
    }),],
})
