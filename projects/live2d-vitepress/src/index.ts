import type { Plugin } from 'vitepress';
import { initializeLive2D, Live2dOptions } from '@doki-land/live2d';
import { minimatch } from 'minimatch';

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
    include_paths?: string[];

    /**
     * 在特定页面上不显示Live2D模型
     * 如果设置了此选项，则匹配的页面不会显示Live2D模型
     */
    exclude_paths?: string[];
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
export function live2dVitePressPlugin(options: Live2dVitePressOptions = {}): Plugin {
    const {
        element_id = 'live2d-canvas',
        include_paths = [
            '*'
        ],
        exclude_paths = [],
        models_folder = 'public/live2d'
    } = options;

    const cdn = options.cdn || 'https://cdn.jsdelivr.net/npm/@doki-land/live2d@0.0.0/dist/l2d.esm.js';

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

        },
        transformIndexHtml(html) {
            const injectScript = `<script type="module">
const { createLive2dModel, initializeLive2D } = await import('${cdn}');
initializeLive2D()
log("已初始化")
const routeMap = {};
document.addEventListener('DOMContentLoaded', () => {
    const app = window.__VitePress__;
    app.router.onAfterRouteChange = async (to) => {
        const shouldShow = routeMap[to] ?? true;
        const models = ${JSON.stringify(options.models || [])};
        const existingContainer = document.getElementById('live2d-container');
        if (existingContainer) {
            existingContainer.style.display = shouldShow ? 'block' : 'none';
            return;
        }
        if (shouldShow) {
            await createLive2dModel({
                element_id: '${element_id}',
                models,
                ...${JSON.stringify(options)}
            });
        };
    };
});
</script>`;
            return html.replace('</head>', `${injectScript}</head>`);
        }
    };
}



export async function createLive2d(shouldShow: boolean, options: Live2dOptions) {
    if (typeof window === 'undefined') return;
    try {
        // 如果已经存在 Live2D 容器，则根据条件显示或隐藏
        const existingContainer = document.getElementById('live2d-container');
        if (existingContainer) {
            existingContainer.style.display = shouldShow ? 'block' : 'none';
            return;
        }

        // 如果应该显示且尚未创建容器，则创建Live2D模型
        if (shouldShow) {
            // 此处必须使用惰性渲染!!! 否则会卡死 vite press 的 SSR 渲染流程
            const { createLive2dModel } = await import('@doki-land/live2d');
            // 确保DOM已经准备好
            await new Promise(resolve => setTimeout(resolve, 100));
            await createLive2dModel(options);
        }
    } catch (error) {
        console.error('Failed to create Live2D model:', error);
    }
}

function allowShowLive2D(currentPath: string, includePaths: string[], excludePaths: string[]): boolean {
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