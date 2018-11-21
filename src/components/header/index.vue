<template>
  <div :class="b(false, classname)">
    <router-link
      :class="b('link')"
      :active-class="b('link', {active: true})"
      to="/"
      exact
    >
      Home
    </router-link>
    <router-link
      :class="b('link')"
      :active-class="b('link', {active: true})"
      to="/help"
    >
      Help
    </router-link>
  </div>
</template>
<script>
export default {
  block: 'header',
  props: {
    classname: String
  }
};
</script>
<style scoped lang="sass">
.header
  background-color: $header_color
  width: 100%
  height: 50px
  display: flex
  flex-direction: row
  justify-content: center
  align-items: center

  &__link
    color: $white
    transition: color .2s ease
    font-size: $font_size_l
    cursor: pointer
    margin-right: 30px
    padding-bottom: 2px
    border-bottom-color: red
    border-bottom-style: solid
    border-bottom-width: 0

    &--active
      border-bottom-width: 2px
      padding-bottom: 0

    &:hover
      color: $white_hover
</style>