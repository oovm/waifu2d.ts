# Live2D Core Adapter

This is the core library for rendering Live2D models in web applications. 

It provides essential functionalities to load and display Live2D models with interactive capabilities.

## Usage


### In HTML via Module

```html
<script src="https://cdn.jsdelivr.net/npm/@doki-land/live2d@latest/dist/l2d.umd.js">
<script type="module">
l2d.initializeLive2D();
l2d.createLive2D({
    element_id: 'live2d-canvas',
    models: [
        {}
    ]
})
</script>
```


### In Node via npm

- installation

```bash
npm install @doki-land/live2d-core
```

- usage

```javascript





```

### In Other Frameworks

- [VitePress]()
- [VuePress]()
- [Hexo]()

## Features

- Render Live2D Cubism™ v1, v2 (`*.model.json`). 
- Render Live2D Cubism™ v3, v4, v5 (`*.model3.json`).



### API Documentation
- `initializeLive2D()`: Initializes the Live2D environment
- `createLive2dModel(options)`: Creates and renders a Live2D model with specified options