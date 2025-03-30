<template>
  <div class="live2d-container">
    <canvas ref="canvas" class="live2d-canvas" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Live2DModel } from '@doki-land/live2d';

export default defineComponent({
  name: 'Live2DCanvas',
  props: {
    modelPath: {
      type: String,
      required: true
    },
    scale: {
      type: Number,
      default: 1
    },
    position: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    },
    interactive: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const canvas = ref<HTMLCanvasElement | null>(null);
    let model: Live2DModel | null = null;

    onMounted(async () => {
      if (!canvas.value) return;
      
      model = await Live2DModel.from(props.modelPath, canvas.value);
      model.scale = props.scale;
      model.position = props.position;
      
      if (props.interactive) {
        // 添加交互逻辑
      }
    });

    return { canvas };
  }
});
</script>

<style scoped>
.live2d-container {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
}

.live2d-canvas {
  display: block;
}
</style>