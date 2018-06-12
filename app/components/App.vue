<template>

  <div id="generalWrapper">

    <div id="highestPriceOrders">
      
      <h1>Orders by price</h1>

      <div class="orderWrapper">
        
        <order-list :orders="limitBy(orderBy( sellOrders,'price', -1 ), 20)" :title="'Sell Orders'" :lastKnownItemID="this.prevItemCount"></order-list>

        <order-list :orders="limitBy(orderBy( buyOrders,'price' ), 20)" :title="'Buy Orders'" :lastKnownItemID="this.prevItemCount"></order-list>


        <!-- <order-list :orders="(buyOrders,20)" :title="'Buy Orders'" :lastKnownItemID="this.prevItemCount"></order-list> -->
      
      </div>

    </div>

    <div id="recentOrders">
      
      <h1>Orders by most recent</h1>

      <div class="orderWrapper">
        
        <order-list :orders="filterByLastNElements(sellOrders,20)" :title="'Sell Orders'" :lastKnownItemID="this.prevItemCount"></order-list>

        <order-list :orders="filterByLastNElements(buyOrders,20)" :title="'Buy Orders'" :lastKnownItemID="this.prevItemCount"></order-list>
      
      </div>

    </div>

  </div>

</template>

<script>

import OrderList from './OrderList.vue';
import {mapState, mapActions} from 'vuex';
 

export default {
  name: 'app',
  data() {
    return {
      idList: [0,100],
      prevItemCount: 0,
      currItemCount: 0
    };
  },
  computed: {
    ...mapState(['orders','sellOrders','buyOrders'])
  },
  methods: {
    ...mapActions(['loadOrders']),
    filterByLastNElements: function(list, n){
      return list.slice(Math.max(list.length - n, 1)).reverse();
    },
    filterByPrice: function(list, n){
      // return list.slice(Math.max(list.length - n, 1)).reverse();
      return _.orderBy(list, 'price').slice(Math.max(list.length - n, 1));
    }
  },
  created: function () {
    setInterval(function () {

      if(this.orders[this.orders.length-1]){

        this.idList[0]=this.orders[this.orders.length-1].id;
        this.idList[1]=this.orders[this.orders.length-1].id+100;

      }

      this.loadOrders(this.idList);

      this.prevItemCount = this.currItemCount;

      this.currItemCount = this.idList[0];

    }.bind(this), 1000); 
  },
  components: {
    OrderList
  }
};
</script>

<style lang="scss" scoped>

  #generalWrapper{
    display:flex;
    justify-content: space-around;    
  }

  .orderWrapper{
    display:flex;
    justify-content: space-around;
    margin:50px;
    margin-left:auto;
    margin-right:auto;
  }

  #recentOrders{
    width:40%;
    text-align:center;
  }

  #highestPriceOrders{
    width:40%;
    text-align:center;    
  }

</style>
