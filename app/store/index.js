import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

export default new Vuex.Store({
  state: {
    orders: [],
    sellOrders: [],
    buyOrders: []
  },
  actions:{
    loadOrders (context, idList){

      context.commit('loadOrders', idList);
    }
  },
  mutations: {
    loadOrders (state, idList) {

      Vue.http.get(`http://localhost:5001/listOrders?start=${idList[0]}&size=${idList[1]}`).then(res => {

        state.orders = state.orders.concat(res.body);

        state.sellOrders = state.orders.filter( order => order.type==='sell' );
        state.buyOrders = state.orders.filter( order => order.type==='buy' );

      }, err => {

        console.error(err);

      });

    }
  }
});
