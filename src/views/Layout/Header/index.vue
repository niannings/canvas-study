<template>
  <div class="header-wrap">
    <ty-menu mode="horizontal" :routes="routes" @select="handleSelect" />
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";
import { RouteConfig } from "vue-router";
import routes from "@/route/config";
import TyMenu from "../components/Menu/index.vue";

export default createComponent({
  name: "top-header",
  setup(props, ctx) {
    const handleSelect = (route: RouteConfig) => {
      ctx.emit("route", route);
    };

    return {
      routes,
      handleSelect
    };
  },
  components: {
    TyMenu
  }
});
</script>
