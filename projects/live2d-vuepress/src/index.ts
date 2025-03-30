import type { Plugin } from 'vuepress';
import type  {  Live2dOptions } from '@doki-land/live2d/types';
import { minimatch } from 'minimatch';

/**
 * 检查当前路径是否应该显示Live2D模型
 * @param currentPath 当前路径
 * @param includePaths 仅在特定页面上显示
 * @param excludePaths 在特定页面上不显示
 * @returns 是否应该显示Live2D模型
 */

// 在运行时动态导入，避免编译时的导入问题

export interface VuePressPluginLive2D extends Partial<Live2dOptions> {
    /**
     * 选择需要显示 live2d 的页面路由, 默认为所有
     *
     * 如果设置了此选项，则只有匹配的页面会显示Live2D模型
     *
     * @default ['*']
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
 * VuePress插件，用于在VuePress文档中使用Live2D模型
 * @param options 插件配置选项
 * @returns VuePress插件
 */
export function live2dVuePressPlugin(options: VuePressPluginLive2D): Plugin {
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

    // 创建并返回VuePress插件
    return {
        name: 'vuepress-plugin-live2d',
        enhanceAppFiles: [
            {
                name: 'live2d-plugin',
                content: `
                export default ({ router }) => {
                    router.afterEach((to) => {
                        if (typeof window !== 'undefined') {
                            const currentPath = to.path;
                            const shouldShow = allowShowLive2D(currentPath, ${JSON.stringify(include_route)}, ${JSON.stringify(exclude_route)});
                            
                            if (shouldShow) {
                                // 动态加载Live2D库
                                import('${cdn}').then(({ createLive2D, initializeLive2D }) => {
                                    initializeLive2D();
                                    // 检查是否已经存在canvas元素
                                    let canvas = document.getElementById('${element_id}');
                                    if (!canvas) {
                                        canvas = document.createElement('canvas');
                                        canvas.id = '${element_id}';
                                        document.body.appendChild(canvas);
                                    }
                                    
                                    createLive2D({
                                        element_id: ${JSON.stringify(element_id)},
                                        models: ${JSON.stringify(models)},
                                        ...${JSON.stringify(options)},
                                    });
                                });
                            } else {
                                // 如果不应该显示，移除canvas元素
                                const canvas = document.getElementById('${element_id}');
                                if (canvas) {
                                    canvas.remove();
                                }
                            }
                        }
                    });
                }
                `
            }
        ]
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

export default live2dVuePressPlugin;