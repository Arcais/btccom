import Vue    from 'vue';
import App    from './components/App.vue';
import store  from './store';

// Plugins
import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
