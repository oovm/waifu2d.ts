import * as path from 'path';
import * as fs from 'fs';

import { Live2dOptions } from '@doki-land/live2d';

export interface HexoPluginLive2D extends Partial<Live2dOptions> {
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
 * Hexo插件，用于在Hexo博客中使用Live2D模型
 */
function hexoLive2DPlugin(hexo: any, options: HexoPluginLive2D = {}) {
    const {
        modelsDir = 'source/live2d',
        modelOptions = {},
        showOnMobile = false,
        models = [],
        position = 'right',
        spacing_x = 20,
        spacing_y = 20,
        auto_motion = true,
        mouse_tracking = true
    } = options;

    // 注册Hexo过滤器，在生成页面时注入Live2D脚本
    hexo.extend.filter.register('after_render:html', (html: string) => {
        // 检查是否已经包含Live2D脚本
        if (html.includes('live2d-container')) {
            return html;
        }

        // 创建Live2D脚本
        const live2dScript = `
<script type="module">
  // 检查是否为移动设备
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (${!showOnMobile} && isMobile) {
    // 在移动设备上不显示
    console.log('Live2D is disabled on mobile devices');
  } else {
    // 动态导入Live2D核心库
    import('https://cdn.jsdelivr.net/npm/@doki-land/live2d/dist/index.es.js')
      .then(({ createLive2DModel }) => {
        // 创建Live2D容器
        const container = document.createElement('div');
        container.id = 'live2d-container';
        container.style.position = 'fixed';
        container.style.${position} = '${spacing_x}px';
        container.style.bottom = '${spacing_y}px';
        container.style.zIndex = '999';
        document.body.appendChild(container);
        
        // 创建Canvas元素
        const canvas = document.createElement('canvas');
        canvas.id = 'live2d-canvas';
        canvas.width = ${modelOptions.width || 300};
        canvas.height = ${modelOptions.height || 300};
        container.appendChild(canvas);
        
        // 添加粉色主题样式
        const style = document.createElement('style');
        style.textContent = `
          #live2d-container {
            transition: all 0.3s ease-in-out;
            filter: drop-shadow(0 0 10px rgba(255, 182, 193, 0.7));
          }
          #live2d-container:hover {
            transform: translateY(-5px);
            filter: drop-shadow(0 0 15px rgba(255, 105, 180, 0.9));
          }
        `;
        document.head.appendChild(style);
        
        // 加载Live2D模型 - 从CDN加载模型
        const modelConfig = {
          // 优先使用配置中的模型URL，如果没有则使用默认的CDN模型
          modelPath: ${models.length > 0 ? `'${models[0].model_url}'` : `'https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json'`},
          elementId: 'live2d-canvas',
          width: ${modelOptions.width || 300},
          height: ${modelOptions.height || 300},
          autoFit: ${modelOptions.autoFit !== false},
          autoMotion: ${auto_motion},
          mouseTracking: ${mouse_tracking}
        };
        
        createLive2DModel(modelConfig).catch(error => {
          console.error('Failed to load Live2D model:', error);
        });
      })
      .catch(error => {
        console.error('Failed to import Live2D library:', error);
      });
  }
</script>
`;

        // 在</body>标签前注入脚本
        return html.replace('</body>', `${live2dScript}</body>`);
    });

    // 不再复制模型文件到输出目录，因为我们使用CDN加载模型
    hexo.extend.generator.register('live2d', () => {
        // 如果配置了本地模型目录，则提示用户现在使用CDN加载模型
        const modelsDirPath = path.join(hexo.source_dir, modelsDir);
        if (fs.existsSync(modelsDirPath)) {
            hexo.log.info('Live2D models are now loaded from CDN. Local models directory will be ignored.');
        }
        
        return [];
    }
    });
}

// 导出插件函数
export default hexoLive2DPlugin;

