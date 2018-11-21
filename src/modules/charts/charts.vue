<template>
  <div :class="b()" @click="query">
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  block: 'charts',
  methods: {
    ...mapActions([
      'query'
    ])
  }
};
</script>
<style scoped lang="sass">
.charts
  display: flex
  flex-direction: column
  height: 100px
  flex-grow: 1
  background: green
</style>