<template>
    <div class="webgl-wrap">
        <canvas ref="canvas"></canvas>
        <div id="info">Description</div>
        <Coder code="" lang="javascript"/>
    </div>
</template>

<script lang="ts">
import { createComponent, ref, onMounted } from "@vue/composition-api";
import Coder from '@/components/Coder.vue';
import init from './graph';
import "../../style.css";

export default createComponent({
  name: "WebGL",
  setup() {
    const canvas = ref(null);

    onMounted(() => {
      const canvasEl: any = canvas.value;

      init(canvasEl);
    });

    return {
      canvas
    };
  },
  components: { Coder }
});
</script>
