import { defineConfig } from 'vite';
import { resolve } from 'path';
// import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
    plugins: [
        // nodePolyfills({
        //     exclude: [            ],
        //     protocolImports: true,
        // }),
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