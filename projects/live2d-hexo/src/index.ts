import * as path from 'path';
import * as fs from 'fs';

export interface Live2DHexoPluginOptions {
    /**
     * Live2D模型文件的目录路径
     * @default 'source/live2d'
     */
    modelsDir?: string;

    /**
     * 模型配置选项
     */
    modelOptions?: {
        width?: number;
        height?: number;
        autoFit?: boolean;
    };

    /**
     * 是否在移动设备上显示
     * @default false
     */
    showOnMobile?: boolean;
}

/**
 * Hexo插件，用于在Hexo博客中使用Live2D模型
 */
function hexoLive2DPlugin(hexo: any, options: Live2DHexoPluginOptions = {}) {
    const {
        modelsDir = 'source/live2d',
        modelOptions = {},
        showOnMobile = false
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
    import('https://cdn.jsdelivr.net/npm/@doki-land/live2d/dist/index.esm.js')
      .then(({ createLive2DModel }) => {
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
        canvas.width = ${modelOptions.width || 300};
        canvas.height = ${modelOptions.height || 300};
        container.appendChild(canvas);
        
        // 加载Live2D模型
        createLive2DModel({
          modelPath: '/live2d/model.json',
          elementId: 'live2d-canvas',
          width: ${modelOptions.width || 300},
          height: ${modelOptions.height || 300},
          autoFit: ${modelOptions.autoFit !== false}
        }).catch(error => {
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

    // 复制模型文件到输出目录
    hexo.extend.generator.register('live2d', () => {
        const modelsDirPath = path.join(hexo.source_dir, modelsDir);

        // 检查模型目录是否存在
        if (!fs.existsSync(modelsDirPath)) {
            hexo.log.warn(`Live2D models directory not found: ${modelsDirPath}`);
            return [];
        }

        // 读取模型目录中的所有文件
        const files = fs.readdirSync(modelsDirPath);

        // 生成静态文件
        return files.map(file => {
            const filePath = path.join(modelsDirPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isFile()) {
                return {
                    path: `live2d/${file}`,
                    data: () => fs.createReadStream(filePath)
                };
            }
            return null;
        }).filter(Boolean);
    });
}

// 导出插件函数
export default hexoLive2DPlugin;

