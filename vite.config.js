import {defineConfig} from 'vite'
import { resolve } from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('crypto-browserify');

export default defineConfig({
    define: {
        'global': 'globalThis',
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            }
        }
    }
})
