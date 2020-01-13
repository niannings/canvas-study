<template>
  <div class="canvas-container">
    <h1>烟花</h1>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, onMounted } from "@vue/composition-api";
// import initial from './draw';
import Fireworkds, { Vector2D } from './draw-v2';

function initial(canvas: HTMLCanvasElement, count = 10) {
  const fireworks = new Fireworkds({
    canvas,
    auto: true,
    density: count,
    frequency: 3000
  });
  const moveStart = new Vector2D(0, 0);

  fireworks.launch({
    position: new Vector2D(canvas.width / 2, canvas.height)
  });

  window.addEventListener('mousedown', e => {
    moveStart.x = e.clientX;
    moveStart.y = e.clientY;
  });

  window.addEventListener('mouseup', e => {
    const vx = (e.clientX - moveStart.x) / 20;
    const vy = Math.abs(e.clientY - moveStart.y) / 20;

    fireworks.launch({
      position: new Vector2D(canvas.width / 2, canvas.height),
      velocity: new Vector2D(vx, vy)
    });
  });
}

export default createComponent({
  name: "ty-fireworks",
  setup(_, ctx) {
    const canvasRef = ref(null);

    onMounted(() => {
      const canvasEl: any = canvasRef.value!;
      canvasEl.width = canvasEl.parentNode.clientWidth;
      canvasEl.height = canvasEl.parentNode.clientHeight;
      initial(canvasEl, 100)
    });

    return {
      canvasRef
    }
  }
});
</script>

<style scoped>
.canvas-container {
  height: 100%;
}
</style>
