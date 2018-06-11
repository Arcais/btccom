<template>

  <button @click="getTransactions" class="uk-button uk-button-default">Test Button</button>

</template>

<script>
// import List from './List.vue';
import {mapState} from 'vuex';

export default {
  name: 'app',
  data() {
    return {
    };
  },
  computed: {
    // ...mapState(['transactions'])
  },
  methods: {
    getTransactions() {
      console.log('stuff');
    }
  },
  components: {
    // List
  }
};
</script>

<style lang="scss" scoped>

</style>
