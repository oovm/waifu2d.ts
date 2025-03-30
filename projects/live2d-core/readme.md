# Live2D Core Library

## Overview
This is the core library for rendering Live2D models in web applications. It provides essential functionalities to load and display Live2D models with interactive capabilities.

## Installation
```bash
npm install @doki-land/live2d-core
```

## Usage
### In HTML via Module
```html
<script type="module">
  const cdn = 'https://cdn.jsdelivr.net/npm/@doki-land/live2d@latest/dist/l2d.esm.js';
  const { createLive2dModel, initializeLive2D } = await import(cdn);
  initializeLive2D();
  await createLive2dModel({
    element_id: 'live2d-canvas',
    models: [
      {}
    ]
  });
</script>
```

### API Documentation
- `initializeLive2D()`: Initializes the Live2D environment
- `createLive2dModel(options)`: Creates and renders a Live2D model with specified options