import { createComponent } from '@vue/composition-api';

export default createComponent({
  name: 'home',
  setup() {
    return () => (
      <div>
        <h1>这是首页</h1>
      </div>
    )
  }
});
