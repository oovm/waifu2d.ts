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
                    name: 'VitePressLive2D',
                    entryFileNames: 'index.js',
                    format: 'umd',
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