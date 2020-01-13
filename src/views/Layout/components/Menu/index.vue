<template>
  <el-menu
    :default-active="state.activeIndex"
    class="el-menu-demo"
    v-bind="$attrs"
    @select="handleSelect"
  >
    <template v-for="item in props.routes">
      <el-submenu v-if="item.children && item.children.length" :key="item.name" :index="item.path">
        <template slot="title">{{item.meta.title}}</template>
        <el-menu-item v-for="child in item.children" :key="child.name" :index="child.path">
          <router-link tag="span" :to="{name: child.name}">{{child.meta.title}}</router-link>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :key="item.name" :index="item.path">
        <router-link tag="span" :to="{name: item.name}">{{item.meta.title}}</router-link>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { createComponent, ref, reactive } from "@vue/composition-api";
import { RouteConfig } from "vue-router";
import { get } from "@/utils";
import route from '@/route';
import routes from '@/route/config';

interface IMenuProps {
  routes: RouteConfig[];
}

export default createComponent({
  name: "ty-menu",
  props: {
    routes: Array
  },
  setup(props: IMenuProps, ctx) {
    const state = reactive({
      activeIndex: route.currentRoute.name
    });
    const handleSelect = (path: string) => {
      const { currentRoute } = route;
      const _route = routes.find(item => item.name === currentRoute.meta.parent || item.name === currentRoute.name);
      ctx.emit("select", _route);
    };

    return {
      props,
      state,
      handleSelect
    };
  }
});
</script>
