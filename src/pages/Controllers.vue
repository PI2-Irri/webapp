<template lang="pug">
q-page.background
  q-carousel(
    infinite
    animated
    swipeable
    navigation
    v-model="currentSlide"
  )
    //- q-carousel-slide(
    //-   v-for=""
    //- )
    //-   div
    //-     p asda
</template>

<script>
export default {
  name: 'ControllersPage',
  data () {
    return {
      currentSlide: '1'
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
