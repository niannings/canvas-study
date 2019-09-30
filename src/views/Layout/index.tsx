import { createComponent } from '@vue/composition-api';

export default createComponent({
  name: 'Layout',
  setup() {
    return () => (
      <div class="app-wrap">
        <router-view></router-view>
      </div>
    );
  },
});
