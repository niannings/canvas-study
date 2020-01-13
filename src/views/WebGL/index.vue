<template>
  <el-container>
    <el-header>WebGL 学习</el-header>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import router from '@/route';
import { createComponent, ref, reactive } from "@vue/composition-api";

export default createComponent({
  name: "WebGL",
  setup() {
    const state = reactive({
      isCollapse: false
    });

    return {
      state
    };
  }
});
</script>

<style scoped>
  #info {
    position: absolute;
    top: 10px;
    width: 100%;
    text-align: center;
    z-index: 100;
      display:block;
      color: aliceblue;
  }

  .webgl-wrap, canvas {
    width: 100%;
    height: 100%
  }
</style>

