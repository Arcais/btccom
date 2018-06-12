import Vue from 'vue';
import './main.scss';
import App from './components/App.vue';
import store from './store';
import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
