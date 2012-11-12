import type { Plugin } from 'vite';
import type { Theme } from 'vitepress';
import live2dVitePlugin, { Live2DVitePluginOptions } from '@doki-land/live2d-vite';

export interface Live2DVitePressPluginOptions extends Live2DVitePluginOptions {
  /**
   * 是否在所有页面上显示Live2D模型
   * @default true
   */
  enableOnAllPages?: boolean;
  
  /**
   * 仅在特定页面上显示Live2D模型
   * 如果设置了此选项，则只有匹配的页面会显示Live2D模型
   */
  includePaths?: string[];
  
  /**
   * 在特定页面上不显示Live2D模型
   * 如果设置了此选项，则匹配的页面不会显示Live2D模型
   */
  excludePaths?: string[];
}

/**
 * VitePress插件，用于在VitePress文档中使用Live2D模型
 * @param options 插件配置选项
 * @returns VitePress主题和Vite插件
 */
export default function live2dVitePressPlugin(options: Live2DVitePressPluginOptions = {}) {
  const {
    enableOnAllPages = true,
    includePaths = [],
    excludePaths = [],
    ...vitePluginOptions
  } = options;
  
  // 创建Vite插件
  const vitePlugin = live2dVitePlugin({
    ...vitePluginOptions,
    // 禁用自动注入，由VitePress主题扩展来控制
    autoInject: false
  });
  
  // 创建VitePress主题扩展
  const themePlugin: Theme = {
    enhanceApp({ app, router }) {
      // 在客户端加载时初始化Live2D
      if (typeof window !== 'undefined') {
        // 等待路由准备就绪
        router.onAfterRouteChanged = (to) => {
          const currentPath = to;
          
          // 检查当前路径是否应该显示Live2D模型
          const shouldShow = checkShouldShowLive2D(currentPath, enableOnAllPages, includePaths, excludePaths);
          
          // 如果已经存在Live2D容器，则根据条件显示或隐藏
          const existingContainer = document.getElementById('live2d-container');
          if (existingContainer) {
            existingContainer.style.display = shouldShow ? 'block' : 'none';
            return;
          }
          
          // 如果应该显示且尚未创建容器，则创建Live2D模型
          if (shouldShow) {
            // 动态导入Live2D核心库
            import('@doki-land/live2d').then(({ createLive2DModel, initLive2D }) => {
              // 初始化Live2D
              initLive2D().then(() => {
                // 创建Live2D容器
                const container = document.createElement('div');
                container.id = 'live2d-container';
                container.style.position = 'fixed';
                container.style.right = '0';
                container.style.bottom = '0';
                container.style.zIndex = '999';
                document.body.appendChild(container);
                
                // 创建Canvas元素
                const canvas = document.createElement('canvas');
                canvas.id = 'live2d-canvas';
                canvas.width = vitePluginOptions.modelOptions?.width || 300;
                canvas.height = vitePluginOptions.modelOptions?.height || 300;
                container.appendChild(canvas);
                
                // 加载Live2D模型
                createLive2DModel({
                  modelPath: '/live2d/model.json',
                  elementId: 'live2d-canvas',
                  width: vitePluginOptions.modelOptions?.width || 300,
                  height: vitePluginOptions.modelOptions?.height || 300,
                  autoFit: vitePluginOptions.modelOptions?.autoFit !== false,
                  mouseTracking: vitePluginOptions.modelOptions?.mouseTracking !== false
                }).catch(error => {
                  console.error('Failed to load Live2D model:', error);
                });
              });
            }).catch(error => {
              console.error('Failed to import Live2D library:', error);
            });
          }
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

/**
 * 检查当前路径是否应该显示Live2D模型
 * @param currentPath 当前路径
 * @param enableOnAllPages 是否在所有页面上显示
 * @param includePaths 仅在特定页面上显示
 * @param excludePaths 在特定页面上不显示
 * @returns 是否应该显示Live2D模型
 */
function checkShouldShowLive2D(
  currentPath: string,
  enableOnAllPages: boolean,
  includePaths: string[],
  excludePaths: string[]
): boolean {
  // 如果在排除列表中，则不显示
  if (excludePaths.some(path => currentPath.includes(path))) {
    return false;
  }
  
  // 如果有包含列表，则只在包含列表中的路径显示
  if (includePaths.length > 0) {
    return includePaths.some(path => currentPath.includes(path));
  }
  
  // 否则根据全局设置决定
  return enableOnAllPages;
}