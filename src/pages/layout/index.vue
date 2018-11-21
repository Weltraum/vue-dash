<template>
  <div :class="b()">
    <header-custom :classname="b('header')"/>
    <router-view/>
  </div>
</template>
<script>
import header from 'components/header';
export default {
  block: 'layout',
  components: {'header-custom': header}
};
</script>
<style scoped lang="sass">
.layout
  display: flex
  flex-direction: column
  width: 100%
  height: 100%
</style>