# 基础示例

本页面提供了使用我们的Live2D集成解决方案的基础示例。

## 使用核心包

以下是使用`@doki-land/live2d`核心包的基础示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live2D Basic Example</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f0f0f0;
    }
    #live2d-container {
      width: 300px;
      height: 300px;
      border: 1px solid #ccc;
      background-color: #fff;
    }
  </style>
</head>
<body>
  <!-- 引入Cubism SDK -->
  <script src="https://cdn.jsdelivr.net/npm/@doki-land/live2d/lib/cubism5.min.js"></script>
  
  <!-- 创建Canvas元素 -->
  <div id="live2d-container">
    <canvas id="live2d-canvas" width="300" height="300"></canvas>
  </div>
  
  <!-- 使用Live2D -->
  <script type="module">
    import { createLive2DModel, initLive2D } from 'https://cdn.jsdelivr.net/npm/@doki-land/live2d/dist/index.esm.js';
    
    // 初始化Live2D
    await initLive2D();
    
    // 创建Live2D模型
    const model = await createLive2DModel({
      modelPath: '/live2d/model.json',
      elementId: 'live2d-canvas',
      width: 300,
      height: 300,
      autoFit: true,
      mouseTracking: true
    });
    
    // 可以在这里添加更多的交互逻辑
    // 例如，点击模型时播放特定动作
    document.getElementById('live2d-canvas').addEventListener('click', () => {
      model.motion('tap_body');
    });
  </script>
</body>
</html>
```

## 模型控制

以下是一些常用的模型控制方法：

```js
// 播放特定动作
model.motion('tap_body');

// 设置表情
model.expression('smile');

// 调整模型位置
model.position.set(x, y);

// 调整模型缩放
model.scale.set(scale);

// 调整模型旋转
model.rotation = angle;
```

## 事件监听

您可以监听模型的各种事件：

```js
// 监听模型加载完成事件
model.on('load', () => {
  console.log('Model loaded');
});

// 监听动作开始事件
model.on('motionStart', (group, index) => {
  console.log(`Motion started: ${group} ${index}`);
});

// 监听动作结束事件
model.on('motionFinish', (group, index) => {
  console.log(`Motion finished: ${group} ${index}`);
});
```

## 下一步

- [Vite项目示例](/examples/vite)：了解如何在Vite项目中使用Live2D模型。
- [VitePress示例](/examples/vitepress)：了解如何在VitePress文档中使用Live2D模型。
- [Hexo示例](/examples/hexo)：了解如何在Hexo博客中使用Live2D模型。