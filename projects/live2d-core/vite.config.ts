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
                    entryFileNames: 'l2d.esm.js',
                    format: 'es',
                    // 将ESM输出配置为单个文件而非多个文件
                    preserveModules: false,
                    sourcemap: true
                },
                {
                    name: "l2d",
                    entryFileNames: 'l2d.umd.js',
                    format: 'umd',
                    // 确保 UMD 输出是最小化的
                    compact: true,
                    sourcemap: true
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