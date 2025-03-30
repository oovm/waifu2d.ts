# Live2D for VitePress (Unofficial)


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