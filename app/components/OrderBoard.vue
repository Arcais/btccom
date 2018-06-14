<template>
  
  <div class="orderWrapper uk-card uk-card-default">
        
    <order-list :orders="sellFilter" :title="'Sell Orders'" :lastKnownItemID="lastKnownItemID" class="orderList"></order-list>

    <order-list :orders="buyFilter" :title="'Buy Orders'" :lastKnownItemID="lastKnownItemID" class="orderList"></order-list>
      
  </div>

</template>

<script>

import OrderList from './OrderList.vue';

export default {
  name: 'orderboard',
  props: ['sellFilter','buyFilter','lastKnownItemID','title'],
  components: {
    OrderList
  }
};
</script>

<style lang="scss" scoped>

  .orderWrapper{
    display:flex;
    justify-content: space-around;
    margin:20px;
    margin-left:auto;
    margin-right:auto;
    padding:20px;
    padding-top:30px;
  }

  .orderList{
    width:40%;
  }

</style>
