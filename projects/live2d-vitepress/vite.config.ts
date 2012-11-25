import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    esbuild: {
        legalComments: 'none',
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Live2DVitepress',
        },
        minify: 'esbuild',
        sourcemap: true,
        rollupOptions: {
            output: [
                {
                    name: "l2d-vitepress",
                    entryFileNames: 'l2d-vitepress.esm.js',
                    format: 'es',
                    preserveModules: false,
                    compact: true,
                },
                {
                    name: "l2d-vitepress",
                    entryFileNames: 'l2d-vitepress.umd.js',
                    format: 'umd',
                    compact: true,
                }
            ]
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
});