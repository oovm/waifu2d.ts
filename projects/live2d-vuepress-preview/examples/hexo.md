# Hexo示例

本页面提供了在Hexo博客中使用Live2D模型的示例。

## 安装

首先，安装必要的包：

```bash
# npm
npm install @doki-land/live2d-hexo

# yarn
yarn add @doki-land/live2d-hexo

# pnpm
pnpm add @doki-land/live2d-hexo
```

## 配置Hexo插件

在Hexo的`_config.yml`文件中添加Live2D插件配置：

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

## 在Hexo中初始化插件

在Hexo的插件初始化文件中添加Live2D插件：

```js
// 在Hexo的scripts目录下创建live2d.js文件
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

## 准备模型文件

将Live2D模型文件放置在`source/live2d`目录下（或您在配置中指定的目录）：

```
source/
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

### 自定义模型样式

通过`modelOptions`选项，您可以自定义模型的显示样式：

```yaml
live2d:
  modelOptions:
    width: 300            # 画布宽度
    height: 300           # 画布高度
    autoFit: true         # 是否自动适应模型大小
```

### 移动设备支持

通过`showOnMobile`选项，您可以控制是否在移动设备上显示Live2D模型：

```yaml
live2d:
  showOnMobile: false     # 默认在移动设备上不显示
```

## 注意事项

- 确保模型文件的格式正确，支持Cubism 2/3/4/5格式的模型。
- 如果模型无法正常显示，请检查浏览器控制台是否有错误信息。
- 在移动设备上显示Live2D模型可能会影响页面加载速度和性能，请谨慎使用。

## 下一步

- [API参考](/api/)：了解更多关于API的详细信息。
- [配置](/guide/configuration)：了解更多配置选项。