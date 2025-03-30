import type {App, Plugin} from 'vuepress';
import type  {  Live2dOptions } from '@doki-land/live2d/types';


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
export function vuePressLive2D(options: VuePressPluginLive2D): Plugin {
    return (app: App) => {
        return {
            name: 'vuepress-plugin-live2d',
        }
    }
}
