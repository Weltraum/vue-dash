<template>
  <div id="app">
    <layout/>
  </div>
</template>
<script>
import layout from 'pages/layout';
export default {
  name: 'App',
  components: {layout}
};
</script>
<style lang="sass">
@import 'index'
#app
  height: 100%

  & > div
    width: 100%
    height: 100%
</style>
