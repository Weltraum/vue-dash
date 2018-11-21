<template>
  <div :class="b()">
    <charts/>
  </div>
</template>
<script>
import charts from 'modules/charts';
export default {
  block: 'dashboard',
  components: {charts}
};
</script>
<style scoped lang="sass">
.dashboard
  display: flex
  width: 100%
  flex-grow: 1
</style>