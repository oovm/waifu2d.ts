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
        minify: true,
        rollupOptions: {
            output: [
                {
                    format: 'es',
                    // 将ESM输出配置为单个文件而非多个文件
                    preserveModules: false
                },
                {
                    format: 'umd',
                    // 确保UMD输出是最小化的
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