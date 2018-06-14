<template>

  <!--This whole component is a mess but it's the quickest way to do it-->
  
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
          <th>Date & Hour</th>
          <th>Quantity</th>
          <th>Description</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="match in limitBy( orderBy( matches, 'id', -1 ), 20)" v-bind:style="{height: match.id===clickedItem ? '350px' : 'auto'}" v-on:click="clickedItem==match.id ? clickedItem = -1 : clickedItem = match.id" v-bind:class="{'new': match.id>prevId}">
          <td style="width:100px">{{match.date.toLocaleDateString('nl-NL')}}<br>{{match.date.toLocaleTimeString('nl-NL')}}</td>
          <td>{{match.quantity}}</td>
          <!-- This COULD be cleaner but I'll leave it like this for now -->
          <td>Order #{{ match.actionType==='sell' ? match.sellMatch.id : match.buyMatch.id }} {{ match.actionType==='sell' ? 'sold to' : 'bought from' }} #{{ match.actionType==='buy' ? match.sellMatch.id : match.buyMatch.id }}: {{ match.quantity }} units worth ${{ ( ( match.sellMatch.price + match.buyMatch.price ) / 2 )*match.quantity }} </td>

          <div class="extraInfo uk-card" v-show="match.id===clickedItem">
            <div class="infoDesc">
              <h4 class="uk-card-header">Extra Info</h4>
              <div class="uk-card-body">
                
                <div class="generalInfo">
                  Price of transaction: ${{ ( match.sellMatch.price + match.buyMatch.price ) / 2 }}<br>
                  Match made when the {{ match.actionType }} order was received<br>
                  {{ match.actionType === 'sell' ? match.sellMatch.quantity-match.quantity : match.buyMatch.quantity-match.quantity }} units left to be {{ match.actionType === 'sell' ? 'sold' : 'bought' }} after the transaction.
                </div>

                <div class="tableList">

                  <table class="uk-table">

                    <caption>Sell Order</caption>

                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{{match.sellMatch.id}}</td>
                        <td>{{match.sellMatch.quantity}}</td>
                        <td>{{match.sellMatch.price}}</td>
                      </tr>
                    </tbody>

                  </table>

                  <table class="uk-table" style="border-left:1px solid grey">

                    <caption>Buy Order</caption>

                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{{match.buyMatch.id}}</td>
                        <td>{{match.buyMatch.quantity}}</td>
                        <td>{{match.buyMatch.price}}</td>
                      </tr>
                    </tbody>

                  </table>

                </div>

              </div>
            </div>
          </div>

        </tr>
      </tbody>

    </table>
      
  </div>

</template>

<script>

import {mapGetters} from 'vuex';


export default {
  name: 'orderboard',
  data() {
    return {
      clickedItem: null,
      currentId: 0,
      prevId: -1
    };
  },
  computed: {
    ...mapGetters(['matches'])
  },
  watch: {
    matches: function (matches) {
      this.prevId = this.currentId;
      this.currentId = matches.length-1;

      //VERY bad solution but this filter plugin is driving me mad and i want to get over with it
      // let self = this;
      // setTimeout(function(){ self.prevId=matches.length; }, 5000);

    }
  }
};
</script>

<style lang="scss" scoped>

  th,td,caption{
    text-align: center;    
  }

  .uk-table-hover>tbody>tr{
    cursor:pointer;
  }

  .new{
    transition:background-color 0.5s ease;
    background-color:#ffda79;
  }

  .uk-table-hover>caption{
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
    position:absolute;
    width:90%;
    left:3.25%;
    padding:1.65%;
    margin-top:70px;
    text-align: left;
  }

  .infoDesc{
    width:100%;
    height:100%;
    padding-left:15px;
    padding-right:15px;
  }

  .infoDesc>.uk-card-header{
    padding-top:0px !important;
    padding-bottom:0px !important;
    margin-bottom:0px !important;
  }

  .infoDesc>.uk-card-body{
    padding:0px !important;
  }

  .tableList{

    display: flex;
    justify-content: center;
  }

  .tableList>table{
    width: 45%;
    font-size: 16px;
  }

  .tableList>table>tbody>tr>td,
  .tableList>table>thead>tr>th{
    padding:5px;
  }

  .tableList>table>caption{
    font-size:16px;
  }
  
  *+.uk-table {
     margin-top: 0px; 
  }

  .generalInfo{
    padding:15px;
    line-height:30px;
  }

</style>
