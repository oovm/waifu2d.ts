import type { Theme } from 'vitepress';
import { createLive2dModel, initializeLive2D, Live2dOptions } from '@doki-land/live2d';

// 在运行时动态导入，避免编译时的导入问题

export interface Live2dVitePressOptions extends Live2dOptions {
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
}

/**
 * VitePress插件，用于在VitePress文档中使用Live2D模型
 * @param options 插件配置选项
 * @returns VitePress主题和Vite插件
 */
export default function live2dVitePressPlugin(options: Live2dVitePressOptions) {
    const {
        include_paths = [
            '*'
        ],
        exclude_paths = [],
        models_folder = 'public/live2d',
        ...modelOptions
    } = options;

    // 创建Vite插件
    const vitePlugin = {
        name: 'vitepress-plugin-live2d'
        // 这里可以添加Vite插件的配置，如果需要的话
    };

    // 创建VitePress主题扩展
    const themePlugin: Theme = {
        enhanceApp(app) {
            // 在客户端加载时初始化Live2D
            if (typeof window !== 'undefined') {
                // 等待路由准备就绪
                app.router.onAfterRouteChange = (to) => {
                    // 检查当前路径是否应该显示Live2D模型
                    const shouldShow = checkShouldShowLive2D(to, include_paths, exclude_paths);
                    createLive2d(shouldShow, modelOptions).then(r => r);
                };
            }
        }
    };

    return {
        // 返回VitePress主题扩展
        theme: themePlugin,
        // 返回Vite插件
        vitePlugin
    };
}

async function createLive2d(shouldShow: boolean, options: Live2dVitePressOptions) {
    // 如果已经存在 Live2D 容器，则根据条件显示或隐藏
    const existingContainer = document.getElementById('live2d-container');
    if (existingContainer) {
        existingContainer.style.display = shouldShow ? 'block' : 'none';
        return;
    }

    // 如果应该显示且尚未创建容器，则创建Live2D模型
    if (shouldShow) {
        initializeLive2D();
        await createLive2dModel(options);
    }
}

/**
 * 检查当前路径是否应该显示Live2D模型
 * @param currentPath 当前路径
 * @param includePaths 仅在特定页面上显示
 * @param excludePaths 在特定页面上不显示
 * @returns 是否应该显示Live2D模型
 */
import { isMatch } from 'fast-glob';

function checkShouldShowLive2D(
    currentPath: string,
    includePaths: string[],
    excludePaths: string[]
): boolean {
    // 如果在排除列表中，则不显示
    if (excludePaths.some(path => isMatch(currentPath, path))) {
        return false;
    }

    // 如果有包含列表，则只在包含列表中的路径显示
    if (includePaths.length > 0) {
        return includePaths.some(path => isMatch(currentPath, path));
    }

    // 否则根据全局设置决定
    return true;
}