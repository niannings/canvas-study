import './App.css';
import { createComponent } from '@vue/composition-api';
import Layout from '@/views/Layout';

export default createComponent({
  name: 'App',
  setup() {
    return () => <Layout />
  },
});
