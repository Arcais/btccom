<template>

    <table class="uk-table uk-table-hover">
      
      <caption>{{title}}</caption>
      
      <thead>
        <tr>
          <th>Id</th>
          <th>Type</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in limitBy(orders, orderCountInBoard)" v-bind:class="{'new': order.id>lastKnownItemID}">
          <td>{{order.id}}</td>
          <td>{{order.type}}</td>
          <td>{{order.quantity}}</td>
          <td>{{order.price}}</td>
        </tr>
      </tbody>

    </table>

</template>

<script>
export default {
  name: 'orderlist',
  props: [
  'title',
  'orders',
  'lastKnownItemID',
  'orderCountInBoard'
  ]
};
</script>

<style lang="scss" scoped>
  caption{
    font-size:24px;
    text-align: center;
  }
  th{
    text-align: center;    
  }
  .new{
    transition:background-color 0.5s ease;
    background-color:#ffda79;
  }
  *+.uk-table {
     margin-top: 0px; 
  }
</style>
