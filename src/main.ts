import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import router from '@/route';
import ElementUI from 'element-ui';
import App from './App';

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
