# 配置

本页面将详细介绍如何配置我们的Live2D集成解决方案。

## 核心包配置

使用`@doki-land/live2d`核心包时，您可以通过`createLive2DModel`函数配置Live2D模型：

```js
import { createLive2DModel, initLive2D } from '@doki-land/live2d';

// 初始化Live2D
await initLive2D();

// 创建Live2D模型
const model = await createLive2DModel({
  // 必填参数
  modelPath: '/path/to/model.json', // 模型JSON文件的路径
  elementId: 'live2d-canvas',       // 要渲染到的HTML元素ID
  
  // 可选参数
  width: 300,                       // 画布宽度，默认300
  height: 300,                      // 画布高度，默认300
  autoFit: true,                    // 是否自动适应模型大小，默认true
  autoMotion: true,                 // 是否自动开始动画，默认true
  mouseTracking: true               // 是否启用鼠标跟踪，默认true
});
```

## Vite插件配置

使用`@doki-land/live2d-vite`插件时，您可以通过以下选项进行配置：

```js
// vite.config.js
import { defineConfig } from 'vite';
import live2dVitePlugin from '@doki-land/live2d-vite';

export default defineConfig({
  plugins: [
    live2dVitePlugin({
      // 模型文件目录，默认为'public/live2d'
      modelsDir: 'public/live2d',
      
      // 是否自动注入Live2D脚本到HTML中，默认为true
      autoInject: true,
      
      // 模型配置选项
      modelOptions: {
        width: 300,            // 画布宽度，默认300
        height: 300,           // 画布高度，默认300
        autoFit: true,         // 是否自动适应模型大小，默认true
        mouseTracking: true    // 是否启用鼠标跟踪，默认true
      },
      
      // 是否在移动设备上显示，默认为false
      showOnMobile: false
    })
  ]
});
```

## VitePress插件配置

使用`@doki-land/live2d-vitepress`插件时，您可以通过以下选项进行配置：

```js
// .vitepress/config.js
import { defineConfig } from 'vitepress';
import live2dVitePressPlugin from '@doki-land/live2d-vitepress';

export default defineConfig({
  // ... 其他VitePress配置
  
  // 使用Live2D VitePress插件的主题扩展
  vite: {
    plugins: [
      live2dVitePressPlugin({
        // 模型配置
        models: [
          {
            model_url: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json'
          }
        ],
        // 画布配置
        width: 280,
        height: 320,
        // 位置配置
        position: 'right',
        spacing_x: 20,
        spacing_y: 20,
        // 行为配置
        auto_fit: true,
        auto_motion: true,
        mouse_tracking: true,
        // 路由配置
        include_route: ['*'],
        exclude_route: ['/examples/vitepress']
      })
    ]
  }
});
```

## VuePress插件配置

使用`@doki-land/live2d-vuepress`插件时，您可以通过以下选项进行配置：

```js
// .vuepress/config.js
import { defineConfig } from 'vuepress';
import { live2dVuePressPlugin } from '@doki-land/live2d-vuepress';

export default defineConfig({
  // ... 其他VuePress配置
  
  // 使用Live2D VuePress插件
  plugins: [
    live2dVuePressPlugin({
      // 模型配置
      models: [
        {
          model_url: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json',
          position: {
            scale: 1.0,      // 模型缩放比例
            anchor_x: 0.5,   // 模型X轴锚点
            anchor_y: 0.5,   // 模型Y轴锚点
            width: 300,      // 模型宽度
            height: 300      // 模型高度
          },
          mobile: {          // 移动端配置
            model_url: '移动端模型URL',
            position: {
              scale: 0.8
            }
          }
        }
      ],
      // 画布配置
      element_id: 'live2d-canvas', // 画布ID
      width: 280,                  // 画布宽度
      height: 320,                 // 画布高度
      // 位置配置
      position: 'right',           // 模型位置，可选 'left' 或 'right'
      spacing_x: 20,               // 模型与左右边框的距离（像素）
      spacing_y: 20,               // 模型与底部边框的距离（像素）
      // 行为配置
      auto_fit: true,              // 是否自动适应模型大小
      auto_motion: true,           // 是否自动开始动画
      mouse_tracking: true,        // 是否启用鼠标跟踪
      // 路由配置
      include_route: ['*'],        // 选择需要显示live2d的页面路由，默认为所有
      exclude_route: ['/examples/vuepress'] // 在特定页面上不显示Live2D模型
    })
  ]
});
```
  extends: live2dVitePressPlugin({
    // 是否在所有页面上显示Live2D模型，默认为true
    enable_on_all_pages: true,
    
    // 仅在特定页面上显示Live2D模型
    include_paths: ['/guide/', '/examples/'],
    
    // 在特定页面上不显示Live2D模型
    exclude_paths: ['/api/'],
    
    // 模型文件目录，默认为'public/live2d'
    modelsDir: 'public/live2d',
    
    // 模型配置选项
    modelOptions: {
      width: 280,            // 画布宽度
      height: 320,           // 画布高度
      autoFit: true,         // 是否自动适应模型大小
      mouseTracking: true    // 是否启用鼠标跟踪
    },
    
    // 是否在移动设备上显示，默认为false
    showOnMobile: false
  }).theme,
  
  // 使用Live2D VitePress插件的Vite插件
  vite: {
    plugins: [
      live2dVitePressPlugin({
        // 配置选项与上面相同
        modelsDir: 'public/live2d',
        modelOptions: {
          width: 280,
          height: 320,
          autoFit: true,
          mouseTracking: true
        },
        showOnMobile: false,
        exclude_paths: ['/api/']
      }).vitePlugin
    ]
  }
});
```

## Hexo插件配置

使用`@doki-land/live2d-hexo`插件时，您可以在Hexo的`_config.yml`文件中进行配置：

```yaml
# _config.yml
live2d:
  # 模型文件目录，默认为'source/live2d'
  modelsDir: 'source/live2d'
  
  # 模型配置选项
  modelOptions:
    width: 300            # 画布宽度，默认300
    height: 300           # 画布高度，默认300
    autoFit: true         # 是否自动适应模型大小，默认true
  
  # 是否在移动设备上显示，默认为false
  showOnMobile: false
```

或者在Hexo插件的初始化代码中配置：

```js
// 在Hexo插件初始化代码中
const hexo = require('hexo');
const live2dHexoPlugin = require('@doki-land/live2d-hexo');

// 使用插件
live2dHexoPlugin(hexo, {
  modelsDir: 'source/live2d',
  modelOptions: {
    width: 300,
    height: 300,
    autoFit: true
  },
  showOnMobile: false
});
```

## 模型文件结构

无论使用哪种插件，您都需要准备Live2D模型文件。模型文件通常包括以下内容：

```
/live2d/
  model.json           # 模型配置文件
  model.moc            # 模型数据文件（Cubism 2）
  model.moc3           # 模型数据文件（Cubism 3/4/5）
  textures/            # 纹理文件目录
    texture_00.png
    texture_01.png
  motions/             # 动作文件目录
    idle_01.motion3.json
    tap_body.motion3.json
  physics.json         # 物理效果配置文件
  pose.json            # 姿势配置文件
```

您可以从[Live2D官方网站](https://www.live2d.com/)或其他资源获取模型文件。