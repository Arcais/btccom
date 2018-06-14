<template>
  
  <div class="boardWrapper uk-card uk-card-default">
    
    <h1 class="boardTitle">
      Most Recent Matches
    </h1>

    <div class="preloadWrapper" v-if="!matches.length">
      No matches yet!
    </div>

    <table class="uk-table uk-table-hover" v-if="matches.length">
      
      <caption>Order Matches</caption>
      
      <thead>
        <tr>
          <th>Date</th>
          <th>Quantity</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="match in limitBy( orderBy( matches, 'id', -1 ), 20)">

          <td style="width:100px">{{match.date}}</td>
          <td>{{match.quantity}}</td>
          <!-- This COULD be cleaner but I'll leave it like this for now -->
          <td>Order #{{ match.actionType==='sell' ? match.sellMatch.id : match.buyMatch.id }} {{ match.actionType==='sell' ? 'sold to' : 'bought from' }} #{{ match.actionType==='buy' ? match.sellMatch.id : match.buyMatch.id }}: {{ match.quantity }} units worth ${{ ( ( match.sellMatch.price + match.buyMatch.price ) / 2 )*match.quantity }} </td>

<!--           <div class="extraInfo">
            LALALALALALALALALALALALALALALALAL
          </div> -->

        </tr>
      </tbody>

    </table>
      
  </div>

</template>

<script>

import {mapGetters} from 'vuex';


export default {
  name: 'orderboard',
  computed: {
    ...mapGetters(['matches'])
  }
};
</script>

<style lang="scss" scoped>

  th,td,caption{
    text-align: center;    
  }

  tr{
    cursor:pointer;
  }

  caption{
    font-size:24px;
  }

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
    text-align:center;
  }

  .orderWrapper{
    display:flex;
    justify-content: space-around;
  }

  .preloadWrapper{
    width:100%;
    text-align:center;
    font-size:26px;
    color: #f1613e;
  }

  .extraInfo{
    position:relative;
    width:100%;
  }

</style>
