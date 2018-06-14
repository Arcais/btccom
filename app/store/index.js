import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

export default new Vuex.Store({
  state: {
    orders: [],
    matches: []
  },
  getters: {
    orders: state => state.orders,
    matches: state => state.matches,
    sellOrders: state => {
      return state.orders.filter( order => order.type==='sell' );
    },
    buyOrders: state => {
      return state.orders.filter( order => order.type==='buy' );
    }
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

        for(let i=0;i<res.body.length;i++){

              // console.log(JSON.stringify(res.body[i].id));
              // console.log(state.orders);

          let newItem = state.orders[res.body[i].id-1];

          for(let j=0;j<state.orders.length;j++){
            if(state.orders[j].type!=newItem.type && Math.abs(state.orders[j].price-newItem.price)<=5 && Math.min(newItem.quantity,state.orders[j].quantity)>0 ){

              // console.log(JSON.stringify(state.orders[j]));
              // console.log(JSON.stringify(newItem));

              let match = {
                id: state.matches.length,
                sellMatch: newItem.type==='sell' ? newItem : state.orders[j],
                buyMatch: newItem.type==='buy' ? newItem : state.orders[j],
                quantity: Math.min(newItem.quantity,state.orders[j].quantity),
                date: ( new Date( Date.now() ) ).toLocaleDateString('nl-NL'),
                actionType: newItem.type
              } 

              state.matches.push(match);

              // console.log(state.matches);

              state.orders[res.body[i].id-1].quantity = newItem.quantity-match.quantity;
              state.orders[j].quantity = state.orders[j].quantity-match.quantity;

              // console.log(JSON.stringify(state.orders[j]));
              // console.log(JSON.stringify(state.orders[res.body[i].id-1]));


              if(!state.orders[res.body[i].id-1].quantity){
                break;
              }


            }
          };

        }

      }, err => {

        console.error(err);

      });

    }
  }
});
