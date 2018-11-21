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
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
</style>