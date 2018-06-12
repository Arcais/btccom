<template>

  <div>

    <!-- <button @click="loadOrders('sell',1,20)" class="uk-button uk-button-default">Test Button</button> -->
    
    <table class="uk-table uk-table-hover">
      
      <caption>Sell Orders</caption>
      
      <thead>
        <tr>
          <th>Id</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in filterByLastNElements(sellOrders,20)">
          <td>{{order.id}}</td>
          <td>{{order.type}}</td>
          <td>{{order.quantity}}</td>
          <td>{{order.price}}</td>
        </tr>
      </tbody>

    </table>
    
    <table class="uk-table uk-table-hover">
      
      <caption>Buy Orders</caption>
      
      <thead>
        <tr>
          <th>Id</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in filterByLastNElements(buyOrders,20)">
          <td>{{order.id}}</td>
          <td>{{order.type}}</td>
          <td>{{order.quantity}}</td>
          <td>{{order.price}}</td>
        </tr>
      </tbody>

    </table>

  </div>

</template>

<script>
// import List from './List.vue';
import {mapState, mapActions} from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      idList: [0,100]
      // prevItemCount: 0
    };
  },
  computed: {
    ...mapState(['orders','sellOrders','buyOrders'])
  },
  methods: {
    ...mapActions(['loadOrders']),
    filterByLastNElements: function(list, n){
      return list.slice(Math.max(list.length - n, 1)).reverse();
    }
  },
  created: function () {
    setInterval(function () {

      if(this.orders[this.orders.length-1]){

        this.idList[0]=this.orders[this.orders.length-1].id;
        this.idList[1]=this.orders[this.orders.length-1].id+100;

      }

      this.loadOrders(this.idList);

      // console.log(this.idList[0]-this.prevItemCount);
      // this.prevItemCount = this.idList[0];

    }.bind(this), 1000); 
  },
  components: {
    // List
  }
};
</script>

<style lang="scss" scoped>

</style>
