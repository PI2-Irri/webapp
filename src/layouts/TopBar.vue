<template lang="pug">
  q-layout
    q-page-container
      div.flex.bar
        img(src="statics/images/ativo5.png")
      router-view
</template>

<script>
export default {
  name: 'TopBarLayout'
}
</script>

<style lang="stylus" scoped>
.bar
  background-color #0a5959
  width 100%
  height 50px
  justify-content center
  align-content center
  img
    max-width 100%
    max-height 90%
    overflow hidden
</style>
