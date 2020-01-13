import { createComponent, reactive, ref, onMounted } from '@vue/composition-api';
import { RouteConfig } from 'vue-router';
import Header from './Header/index.vue';
import Aside from './Aside/index.vue';
import route from '@/route';
import './style.css';

interface ILayoutState {
  currentRoute: any;
}

export default createComponent({
  name: 'Layout',
  setup(_, ctx) {
    const state = reactive<ILayoutState>({
      currentRoute: ctx.root.$router.currentRoute
    });
    const setCurrentRoute = (route: RouteConfig) => {
      state.currentRoute = route
    }

    onMounted(() => {
      console.log(ctx.root.$route)
    })

    return () => (
      <el-container class="container">
        <el-header>
          <Header onRoute={setCurrentRoute} />
        </el-header>
        <el-container class="content-container">
          <el-aside width="200px">
            <Aside route={state.currentRoute} />
          </el-aside>
          <el-main class="app-wrap">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    );
  },
});
