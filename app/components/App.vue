<template>

  <div class="mainWrapper">

    <div class="header">
      Welcome to a sample BTC order & match previewer!
    </div>

    <div class="orderWrapper">

      <order-board class="orderBoard"  uk-scrollspy="cls:uk-animation-slide-bottom"
      :title              = "'Orders by price'"
      :sellFilter         = "orderBy( sellOrders, 'price', -1 )" 
      :buyFilter          = "orderBy( buyOrders, 'price' )" 
      :lastKnownItemID    = "this.prevItemCount" 
      :orderCountInBoard  = "20"
      ></order-board>

      <order-board class="orderBoard"  uk-scrollspy="cls:uk-animation-slide-bottom"
      :title              = "'Orders by most recent'"
      :sellFilter         = "orderBy( sellOrders, 'id', -1 )" 
      :buyFilter          = "orderBy( buyOrders, 'id', -1 )" 
      :lastKnownItemID    = "this.prevItemCount" 
      :orderCountInBoard  = "20"
      ></order-board>

      <match-board class="orderBoard"  uk-scrollspy="cls:uk-animation-slide-bottom"
      :matches            = "matches"
      :lastKnownItemID    = "this.prevItemCount"
      :orderCountInBoard  = "30"
      ></match-board>

    </div>

  </div>

</template>

<script>

import OrderBoard from './OrderBoard.vue';
import MatchBoard from './MatchBoard.vue';

import { mapGetters, mapActions } from 'vuex';

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
    ...mapGetters(['orders', 'sellOrders', 'buyOrders', 'matches'])
  },
  methods: {
    ...mapActions(['loadOrders'])
  },
  created: function () {

    // Polling interval on every second that calls the store to update the data based on the back-end.
    setInterval(function () {

      // Once orders is filled, change the id interval. Used 100 arbitrarily as a maximum interval margin.
      if(this.orders[this.orders.length-1]){

        this.idList[0]=this.orders[this.orders.length-1].id;
        this.idList[1]=this.orders[this.orders.length-1].id+100;

      }

      // Call the store with the id interval from above.
      this.loadOrders(this.idList);

      // Remember the last item (or the first item at the start of the cycle) added for updating purposes.
      this.prevItemCount = this.currItemCount || 0;

      // The latest item added will be remembered.
      this.currItemCount = this.idList[0];

    }.bind(this), 1000);

  },
  components: {
    OrderBoard,
    MatchBoard
  }
};
</script>

<style lang="scss" scoped>

  body {
    margin: 0;
    font-family: sans-serif;
  }

  .mainWrapper{
    background-color: #e6e9ee;
    min-height:100vh; 
  }

  .header{
    background-color: #3c78c2;
    height:50px;
    color:white;
    font-family: sans-serif;
    font-size:24px;
    line-height:50px;
    text-align: center;
  }

  .orderWrapper{
    display:flex;
    justify-content: space-around;
  }

  .orderBoard{
    width:32%;
    text-align:center;    
  }

</style>
