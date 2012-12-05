import type { Plugin, ResolvedConfig } from 'vite';
import * as path from 'path';
import * as fs from 'fs';
import { Live2dOptions } from '@doki-land/live2d';

export interface Live2DVitePluginOptions extends Live2dOptions {
    /**
     * Live2D模型文件的目录路径
     * @default 'public/live2d'
     */
    modelsDir?: string;

    /**
     * 是否自动注入Live2D脚本到HTML中
     * @default true
     */
    autoInject?: boolean;

    /**
     * 是否在移动设备上显示
     * @default false
     */
    showOnMobile?: boolean;
}

/**
 * Vite插件，用于在Vite项目中使用Live2D模型
 * @param options 插件配置选项
 * @returns Vite插件
 */
export default function live2dVitePlugin(options: Live2DVitePluginOptions = {}): Plugin {
    const {
        modelsDir = 'public/live2d',
        autoInject = true,
        modelOptions = {},
        showOnMobile = false
    } = options;

    let config: ResolvedConfig;
    let projectRoot: string;

    return {
        name: 'vite-plugin-live2d',

        configResolved(resolvedConfig) {
            config = resolvedConfig;
            projectRoot = config.root;
        },

        transformIndexHtml(html) {
            if (!autoInject) return html;

            // 检查是否已经包含Live2D脚本
            if (html.includes('live2d-container')) {
                return html;
            }

            // 创建Live2D脚本
            const live2dScript = `
<script type="module">
</script>
`;

            // 在</body>标签前注入脚本
            return html.replace('</body>', `${live2dScript}</body>`);
        },

        configureServer(server) {
            // 检查模型目录是否存在
            const modelsDirPath = path.resolve(projectRoot, modelsDir);
            if (!fs.existsSync(modelsDirPath)) {
                console.warn(`Live2D models directory not found: ${modelsDirPath}`);
                return;
            }

            // 添加静态资源服务
            server.middlewares.use('/live2d', (req, res, next) => {
                const url = req.url || '';
                const filePath = path.join(modelsDirPath, url);

                if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                    const fileContent = fs.readFileSync(filePath);
                    const ext = path.extname(filePath).toLowerCase();

                    // 设置适当的Content-Type
                    const contentTypeMap: Record<string, string> = {
                        '.json': 'application/json',
                        '.png': 'image/png',
                        '.jpg': 'image/jpeg',
                        '.jpeg': 'image/jpeg',
                        '.moc': 'application/octet-stream',
                        '.moc3': 'application/octet-stream',
                        '.model3.json': 'application/json',
                        '.physics3.json': 'application/json',
                        '.pose3.json': 'application/json',
                        '.motion3.json': 'application/json'
                    };

                    res.setHeader('Content-Type', contentTypeMap[ext] || 'application/octet-stream');
                    res.end(fileContent);
                } else {
                    next();
                }
            });
        }
    };
}