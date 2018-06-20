import Vue  from 'vue';
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
      return state.orders.filter( order => order.type === 'sell' && order.quantity > 0 );
    },
    buyOrders: state => {
      return state.orders.filter( order => order.type === 'buy' && order.quantity > 0 );
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

        // Push the new orders to the current orders
        state.orders = state.orders.concat(res.body);

        // Matching two orders Algorithm
        // NOTE: Using for as it's more appropriate and faster for this occasion.
        for(let i=0; i < res.body.length; i++){

          // Add a simpler alias to one of the newest orders
          let newItem = state.orders[ res.body[i].id-1 ];

          for(let j=0; j < state.orders.length; j++){

            // Continue if the orders are buy+sell, their price is within a range of 10 and they have a positive quantity
            if(state.orders[j].type!=newItem.type && Math.abs(state.orders[j].price-newItem.price)<=10 && Math.min(newItem.quantity,state.orders[j].quantity)>0 ){

              // Remember the values (without the reference) of our two matched orders
              let newItemValue      = Object.assign({}, newItem);
              let selectedItemValue = Object.assign({}, state.orders[j]);

              // Create the general match object
              let match = {
                id: state.matches.length,
                quantity: Math.min(newItem.quantity,state.orders[j].quantity),
                date: new Date( Date.now() ),
                actionType: newItem.type
              }

              // Add the matched orders/items to our match object
              match.matchItems = {};
              match.matchItems[newItemValue.type]       = newItemValue;
              match.matchItems[selectedItemValue.type]  = selectedItemValue;

              state.matches.push(match);

              // Change the new quantities of our matched orders
              state.orders[res.body[i].id-1].quantity = newItem.quantity-match.quantity;
              state.orders[j].quantity = state.orders[j].quantity-match.quantity;

              // If our new order is perfectly matched, don't bother looking for other matches anymore
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
