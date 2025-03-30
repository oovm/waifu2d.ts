import { defineConfig } from 'vite';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
    plugins: [
        // nodePolyfills({
        //     include:['path', 'fs'],
        //     exclude: [         ],
        //     protocolImports: true,
        // }),
    ],
    esbuild: {
        target: "node12",
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
            external: ["node:fs", "node:path"],
            output: [
                {
                    entryFileNames: 'index.js',
                    format: 'es',
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