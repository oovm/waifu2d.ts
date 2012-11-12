# 安装

本页面将详细介绍如何安装我们的Live2D集成解决方案。

## 系统要求

- **Node.js**：>= 14.0.0
- **浏览器**：支持WebGL的现代浏览器

## 安装方式

### 使用npm

```bash
# 安装核心包
npm install @doki-land/live2d

# 安装Vite插件
npm install @doki-land/live2d-vite

# 安装VitePress插件
npm install @doki-land/live2d-vitepress

# 安装Hexo插件
npm install @doki-land/live2d-hexo
```

### 使用yarn

```bash
# 安装核心包
yarn add @doki-land/live2d

# 安装Vite插件
yarn add @doki-land/live2d-vite

# 安装VitePress插件
yarn add @doki-land/live2d-vitepress

# 安装Hexo插件
yarn add @doki-land/live2d-hexo
```

### 使用pnpm

```bash
# 安装核心包
pnpm add @doki-land/live2d

# 安装Vite插件
pnpm add @doki-land/live2d-vite

# 安装VitePress插件
pnpm add @doki-land/live2d-vitepress

# 安装Hexo插件
pnpm add @doki-land/live2d-hexo
```

## 安装Cubism SDK

我们的Live2D集成解决方案依赖于Cubism SDK，您需要在HTML中引入Cubism SDK：

```html
<!-- 引入Cubism SDK -->
<script src="/path/to/live2d-core/lib/cubism5.min.js"></script>
```

或者，您可以使用CDN：

```html
<!-- 使用CDN引入Cubism SDK -->
<script src="https://cdn.jsdelivr.net/npm/@doki-land/live2d/lib/cubism5.min.js"></script>
```

## 下一步

- [快速开始](/guide/getting-started)：了解如何在您的项目中集成Live2D模型。
- [配置](/guide/configuration)：了解如何配置Live2D模型。