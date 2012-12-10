import type { Plugin } from 'vitepress';
import type  {  Live2dOptions } from '@doki-land/live2d';
import { minimatch } from 'minimatch';

export type { ModelOptions } from '@doki-land/live2d';

/**
 * 检查当前路径是否应该显示Live2D模型
 * @param currentPath 当前路径
 * @param includePaths 仅在特定页面上显示
 * @param excludePaths 在特定页面上不显示
 * @returns 是否应该显示Live2D模型
 */

// 在运行时动态导入，避免编译时的导入问题

export interface Live2dVitePressOptions extends Partial<Live2dOptions> {
    /**
     * 选择需要显示 live2d 的页面路由, 默认为所有
     *
     * 如果设置了此选项，则只有匹配的页面会显示Live2D模型
     *
     * @default ['*']
     *
     *
     */
    include_route?: string[];

    /**
     * 在特定页面上不显示Live2D模型
     * 如果设置了此选项，则匹配的页面不会显示Live2D模型
     */
    exclude_route?: string[];
    /**
     * 模型文件夹路径
     * @default 'public/live2d'
     */
    models_folder?: string;
    /**
     * CDN地址，用于从CDN加载@doki-land/live2d库
     * @example 'https://unpkg.com/@doki-land/live2d@latest/dist/index.js'
     */
    cdn?: string;
}

/**
 * VitePress插件，用于在VitePress文档中使用Live2D模型
 * @param options 插件配置选项
 * @returns VitePress主题和Vite插件
 */
export function live2dVitePressPlugin(options: Live2dVitePressOptions): Plugin {
    const {
        element_id = 'live2d-canvas',
        models,
        models_folder = 'public/live2d',
        include_route = [
            '*'
        ],
        exclude_route = []
    } = options;

    delete options.element_id;

    if (models == undefined || models.length == 0) {
        throw new Error('At least one live2d model is required');
    }
    delete options.models;

    const cdn = options.cdn || 'https://cdn.jsdelivr.net/npm/@doki-land/live2d@latest/dist/l2d.esm.js';
    delete options.cdn;

    // 创建并返回Vite插件
    return {
        name: 'vitepress-plugin-live2d',
        configureServer(server) {
            return () => {
                server.middlewares.use((_req, _res, next) => {
                    next();
                });
            };
        },
        transform() {
            console.log();

        },
        transformIndexHtml(html) {
            const injectScript = `<script type="module">
const { createLive2D, initializeLive2D } = await import('${cdn}');
initializeLive2D()
await createLive2D({
    element_id: ${JSON.stringify(element_id)},
    models: ${JSON.stringify(models)},
    ...${JSON.stringify(options)},
});
</script>`;
            // html = html.replace('</body>', `<canvas id="${element_id}"/></body>`);
            html = html.replace('</head>', `${injectScript}</head>`);
            return html;
        }
    };
}

export function allowShowLive2D(currentPath: string, includePaths: string[], excludePaths: string[]): boolean {
    // 如果在排除列表中，则不显示
    if (excludePaths.some(pattern => minimatch(currentPath, pattern))) {
        return false;
    }

    // 如果有包含列表，则只在包含列表中的路径显示
    if (includePaths.length > 0) {
        return includePaths.some(pattern => minimatch(currentPath, pattern));
    }

    // 默认显示所有
    return true;
}

export default live2dVitePressPlugin;