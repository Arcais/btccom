<template>

  <div class="mainWrapper">

    <div class="header">
      Welcome to a sample BTC order & match previewer!
    </div>

    <div class="orderWrapper">

      <order-board :sellFilter="limitBy(orderBy( sellOrders,'price', -1 ), 20)" :buyFilter="limitBy(orderBy( buyOrders,'price' ), 20)" :lastKnownItemID="this.prevItemCount" :title="'Orders by price'" class="orderBoard"  uk-scrollspy="cls:uk-animation-slide-bottom"></order-board>

      <order-board :sellFilter="limitBy(orderBy( sellOrders,'id', -1 ), 20)" :buyFilter="limitBy(orderBy( buyOrders,'id', -1 ), 20)" :lastKnownItemID="this.prevItemCount" :title="'Orders by most recent'" class="orderBoard"  uk-scrollspy="cls:uk-animation-slide-bottom"></order-board>

      <match-board class="orderBoard"  uk-scrollspy="cls:uk-animation-slide-bottom"></match-board>

    </div>

  </div>

</template>

<script>

import OrderBoard from './OrderBoard.vue';
import MatchBoard from './MatchBoard.vue';
import {mapGetters, mapActions} from 'vuex';
 

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
    ...mapGetters(['orders','sellOrders','buyOrders'])
  },
  methods: {
    ...mapActions(['loadOrders'])
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
    OrderBoard,
    MatchBoard
  }
};
</script>

<style lang="scss" scoped>

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
