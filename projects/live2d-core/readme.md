## Doki land live2d renderer



## Using in html by module

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