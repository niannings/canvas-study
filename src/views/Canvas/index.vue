<template>
  <div class="app-wrap__canvas">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({
  name: "Canvas",
  setup() {}
});
</script>

<style scoped>
.app-wrap__canvas {
  height: 100%;
}
</style>
