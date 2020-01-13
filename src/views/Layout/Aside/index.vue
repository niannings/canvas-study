<template>
  <div class="layout-aside">
    <h2>{{props.route.meta.title}}</h2>
    <ty-menu mode="vertical" :routes="props.route.children || []" />
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from "@vue/composition-api";
import { RouteConfig } from "vue-router";
import TyMenu from "../components/Menu/index.vue";

interface IAsideProps {
  route: RouteConfig;
}

export default createComponent({
  name: "layout-aside",
  props: {
    route: Object
  },
  setup(props: IAsideProps) {
    return {
      props
    };
  },
  components: {
    TyMenu
  }
});
</script>
