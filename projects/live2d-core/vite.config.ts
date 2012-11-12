import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Live2D',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'umd']
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
});