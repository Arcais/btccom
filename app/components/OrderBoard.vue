<template>
  
  <div class="boardWrapper uk-card uk-card-default">

    <h1 class="boardTitle">
      {{title}}
    </h1>

    <div class="preloadWrapper" v-if="!sellFilter.length&&!buyFilter.length">
      <div uk-spinner="ratio: 3"></div>
    </div>

    <div class="orderWrapper" v-if="sellFilter.length||buyFilter.length">

      <order-list :orders="sellFilter" :title="'Sell Orders'" :lastKnownItemID="lastKnownItemID" :orderCountInBoard="orderCountInBoard" class="orderList"></order-list>

      <order-list :orders="buyFilter" :title="'Buy Orders'" :lastKnownItemID="lastKnownItemID" :orderCountInBoard="orderCountInBoard" class="orderList"></order-list>

    </div>
      
  </div>

</template>

<script>

import OrderList from './OrderList.vue';

export default {
  name: 'orderboard',
  props: ['sellFilter','buyFilter','lastKnownItemID','title','orderCountInBoard'],
  components: {
    OrderList
  }
};
</script>

<style lang="scss" scoped>

  .boardWrapper{
    margin:20px;
    margin-left:auto;
    margin-right:auto;
    padding:20px;
  }

  .boardTitle{
    margin-top:10px;
    margin-bottom:30px;
    font-size:26px;
  }

  .orderWrapper{
    display:flex;
    justify-content: space-around;
  }

  .orderList{
    width:40%;
  }

  .preloadWrapper{
    width:100%;
    text-align:center;
    /*font-size:26px;*/
    /*color: #f1613e;*/
  }

</style>
