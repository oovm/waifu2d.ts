# Vite项目示例

本页面提供了在Vite项目中使用Live2D模型的示例。

## 安装

首先，安装必要的包：

```bash
# npm
npm install @doki-land/live2d-vite

# yarn
yarn add @doki-land/live2d-vite

# pnpm
pnpm add @doki-land/live2d-vite
```

## 配置Vite插件

在Vite配置文件中添加Live2D插件：

```js
// vite.config.js / vite.config.ts
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

## 手动使用

如果您禁用了自动注入（`autoInject: false`），您可以在组件中手动使用Live2D模型：

```jsx
// React组件示例
import { useEffect, useRef } from 'react';
import { createLive2DModel, initLive2D } from '@doki-land/live2d';

function Live2DComponent() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // 初始化Live2D
    initLive2D().then(() => {
      // 创建Canvas元素
      const canvas = document.createElement('canvas');
      canvas.id = 'live2d-canvas';
      canvas.width = 300;
      canvas.height = 300;
      containerRef.current.appendChild(canvas);
      
      // 创建Live2D模型
      createLive2DModel({
        modelPath: '/live2d/model.json',
        elementId: 'live2d-canvas',
        width: 300,
        height: 300,
        autoFit: true,
        mouseTracking: true
      }).catch(error => {
        console.error('Failed to load Live2D model:', error);
      });
    });
    
    // 清理函数
    return () => {
      const canvas = document.getElementById('live2d-canvas');
      if (canvas) {
        canvas.remove();
      }
    };
  }, []);
  
  return <div ref={containerRef} style={{ width: 300, height: 300 }} />;
}

export default Live2DComponent;
```

```vue
<!-- Vue组件示例 -->
<template>
  <div ref="containerRef" style="width: 300px; height: 300px;"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { createLive2DModel, initLive2D } from '@doki-land/live2d';

const containerRef = ref(null);

onMounted(() => {
  // 初始化Live2D
  initLive2D().then(() => {
    // 创建Canvas元素
    const canvas = document.createElement('canvas');
    canvas.id = 'live2d-canvas';
    canvas.width = 300;
    canvas.height = 300;
    containerRef.value.appendChild(canvas);
    
    // 创建Live2D模型
    createLive2DModel({
      modelPath: '/live2d/model.json',
      elementId: 'live2d-canvas',
      width: 300,
      height: 300,
      autoFit: true,
      mouseTracking: true
    }).catch(error => {
      console.error('Failed to load Live2D model:', error);
    });
  });
});

onUnmounted(() => {
  // 清理
  const canvas = document.getElementById('live2d-canvas');
  if (canvas) {
    canvas.remove();
  }
});
</script>
```

## 下一步

- [VitePress示例](/examples/vitepress)：了解如何在VitePress文档中使用Live2D模型。
- [Hexo示例](/examples/hexo)：了解如何在Hexo博客中使用Live2D模型。