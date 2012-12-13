import { defineConfig } from 'vite';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
    plugins: [
        nodePolyfills({
            // To exclude specific polyfills, add them to this list.
            exclude: [
            ],
            // Whether to polyfill `node:` protocol imports.
            protocolImports: true,
        }),
    ],
    esbuild: {
        sourcemap: true,
        legalComments: 'none',
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts')
        },
        minify: 'esbuild',
        sourcemap: true,
        rollupOptions: {
            output: [
                {
                    entryFileNames: 'index.js',
                    format: 'es',
                    preserveModules: false,
                    compact: true
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