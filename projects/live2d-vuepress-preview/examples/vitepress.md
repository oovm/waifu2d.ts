# VitePress示例

本页面提供了在VitePress文档中使用Live2D模型的示例。

## 安装

首先，安装必要的包：

```bash
# npm
npm install @doki-land/live2d-vitepress

# yarn
yarn add @doki-land/live2d-vitepress

# pnpm
pnpm add @doki-land/live2d-vitepress
```

## 配置VitePress插件

在VitePress配置文件中添加Live2D插件：

```js
// .vitepress/config.js / .vitepress/config.ts
import { defineConfig } from 'vitepress';
import live2dVitePressPlugin from 'projects/live2d-vitepress';

export default defineConfig({
  // ... 其他VitePress配置
  
  // 使用Live2D VitePress插件的主题扩展
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

## 准备模型文件

将Live2D模型文件放置在`public/live2d`目录下（或您在配置中指定的目录）：

```
public/
  live2d/
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

## 自定义配置

您可以根据需要自定义Live2D模型的显示：

### 控制显示页面

通过`enableOnAllPages`、`includePaths`和`excludePaths`选项，您可以控制在哪些页面显示Live2D模型：

```js
vitePressLive2D({
  // 在所有页面上显示
  enableOnAllPages: true,
  
  // 或者，仅在特定页面上显示
  includePaths: ['/guide/', '/examples/'],
  
  // 在特定页面上不显示
  excludePaths: ['/api/']
})
```

### 自定义模型样式

通过`modelOptions`选项，您可以自定义模型的显示样式：

```js
vitePressLive2D({
  modelOptions: {
    width: 280,            // 画布宽度
    height: 320,           // 画布高度
    autoFit: true,         // 是否自动适应模型大小
    mouseTracking: true    // 是否启用鼠标跟踪
  }
})
```

## 下一步

- [Hexo示例](/examples/hexo)：了解如何在Hexo博客中使用Live2D模型。
- [API参考](/api/)：了解更多关于API的详细信息。