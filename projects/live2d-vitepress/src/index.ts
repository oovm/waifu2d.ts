import type { Plugin } from 'vitepress';
import { generateCdn, generateElementId, generateModelList } from './helpers.js';
import { allowShowLive2D } from '@doki-land/live2d/fs';
import { VitePressPluginLive2D } from './types.js';

export type { ModelOptions } from '@doki-land/live2d/types';
export * from "./types.js"
export * from "./helpers.js";


/**
 * VitePress插件，用于在VitePress文档中使用Live2D模型
 * @param options 插件配置选项
 * @returns VitePress主题和Vite插件
 */
export function vitePressLive2D(options: VitePressPluginLive2D): Plugin {
    const elementId = generateElementId(options)
    const models = generateModelList(options)
    const cdn = generateCdn(options)

    // @ts-ignore
    const _showLive2D = allowShowLive2D(options.element_id || '', options.include_route || ['*'], options.exclude_route || [])
    delete options.include_route;
    delete options.exclude_route;

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
const { createLive2D, initializeLive2D } = await import(${JSON.stringify(cdn)});
initializeLive2D()
await createLive2D({
    element_id: ${JSON.stringify(elementId)},
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

export default vitePressLive2D;