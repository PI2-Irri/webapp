<template lang="pug">
q-page.background
  q-carousel(
    infinite
    animated
    swipeable
    navigation
    v-if="controllers && controllers.length"
    v-model="controllers[0].name"
  )
    q-carousel-slide(
      v-for="controller in controllers"
      :key="controller.name"
      :name="controller.name"
    )
      q-card.controller-infos
        q-card-section
          h2 {{ controller.name }}
        q-card-section.flex.column
          h3 Zones
          h4 5
        q-card-section.flex.column
          h3 Water Reservatory
          h4 {{ controller.water_reservatory }}

  span(v-else) No controllers
</template>

<script>
import { getControllers } from '../api/api'

export default {
  name: 'ControllersPage',
  data () {
    return {
      currentSlide: '1',
      controllers: undefined
    }
  },
  async created () {
    this.controllers = await getControllers()
  }
}
</script>

<style lang="stylus" scoped>
.controller-infos
  padding 15px
  padding-top 0

  h2
    margin 0
    font-weight 400
    font-size 25px
    color #7f7f7f
  h3
    margin 0
    font-weight 400
    font-size 20px
    color #7f7f7f
  h4
    margin 0
    font-weight 500
    font-size 35px
    color #7f7f7f
</style>
