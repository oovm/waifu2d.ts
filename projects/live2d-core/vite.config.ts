import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    esbuild: {
        legalComments: 'none',
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Live2D',
        },
        minify: 'esbuild',
        sourcemap: true,
        rollupOptions: {
            output: [
                {
                    name: "l2d",
                    entryFileNames: 'l2d.umd.js',
                    format: 'umd',
                    // 确保 UMD 输出是最小化的
                    compact: true,
                }
            ]
        }
    },
});