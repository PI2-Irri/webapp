<template lang="pug">
  q-page.signup_page.flex.column
    div.background.flex
      img(src="statics/images/ativo2.png")
    div.logo.flex
      img(src="statics/images/ativo5.png")
</template>

<script>
export default {
  name: 'SignUpPage'
}
</script>

<style lang="stylus" scoped>
.signup_page
  background-color #0aa0a0

.logo
  margin-top 60px
  margin-bottom 60px
  justify-content center
  img
    width 43%
    height: 43%

.background
  position absolute
  justify-content center
  width 100%
  height 100%
  img
    opacity 0.2
    object-fit none
</style>
