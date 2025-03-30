# Live2D for VitePress (Unofficial)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a5e29106-8659-44bc-a57e-5ebc4c0ca9ab/deploy-status)](https://live2d-vitepress.netlify.app/)
[![NPM Version](https://img.shields.io/npm/v/%40doki-land%2Flive2d-vitepress)](https://www.npmjs.com/package/@doki-land/live2d-vitepress)

## Usage
This package provides Live2D model integration for VitePress documentation sites. It allows you to easily add interactive Live2D characters to your VitePress project.

- Installation
```bash
npm install @doki-land/live2d-vitepress
```

## Usage
1. Import the plugin in your VitePress config file:

```js
import { live2dPlugin } from '@doki-land/live2d-vitepress'

export default {
  // ...
  plugins: [
    live2dPlugin({
      // Configuration options
    })
  ]
}
```

2. Add the Live2D canvas element to your layout component:
```html
<Live2DCanvas />
```

## Configuration Options
- `modelPath`: Path to your Live2D model files
- `scale`: Initial scale of the model
- `position`: Model position on screen
- `interactive`: Enable/disable user interactions