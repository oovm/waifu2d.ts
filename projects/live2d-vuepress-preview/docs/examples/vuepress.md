---
title: VuePress插件示例
description: 在VuePress中使用Live2D模型的示例
---

# VuePress插件示例

本页面展示了如何在VuePress中使用Live2D模型。

## 基本用法

在VuePress项目中安装插件：

```bash
npm install @doki-land/live2d-vuepress --save
```

然后在`.vuepress/config.js`中配置插件：

```js
module.exports = {
  plugins: [
    ['@doki-land/live2d-vuepress', {
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
      mouse_tracking: true
    }]
  ]
}
```

## 配置选项

### 模型配置

```js
models: [
  {
    model_url: '模型JSON文件的URL',
    position: {
      scale: 1.0,      // 模型缩放比例
      anchor_x: 0.5,    // 模型X轴锚点
      anchor_y: 0.5,    // 模型Y轴锚点
      width: 300,       // 模型宽度
      height: 300       // 模型高度
    },
    mobile: {           // 移动端配置
      model_url: '移动端模型URL',
      position: {
        scale: 0.8
      }
    }
  }
]
```

### 画布配置

```js
// 画布ID
element_id: 'live2d-canvas',
// 画布尺寸
width: 280,
height: 320,
```

### 位置配置

```js
// 模型位置，可选 'left' 或 'right'
position: 'right',
// 模型与左右边框的距离（像素）
spacing_x: 20,
// 模型与底部边框的距离（像素）
spacing_y: 20,
```

### 行为配置

```js
// 是否自动适应模型大小
auto_fit: true,
// 是否自动开始动画
auto_motion: true,
// 是否启用鼠标跟踪
mouse_tracking: true,
```

### 路由配置

```js
// 选择需要显示live2d的页面路由，默认为所有
include_route: ['*'],
// 在特定页面上不显示Live2D模型
exclude_route: ['/examples/vuepress'],
```

## 示例效果

在本文档的其他页面中，你可以看到右下角有一个Live2D模型。这个模型是通过上述配置添加的。

注意：在当前页面上，模型被设置为不显示（通过`exclude_route`配置）。