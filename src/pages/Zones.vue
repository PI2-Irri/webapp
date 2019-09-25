<template lang="pug">
  q-page(style="background-color: #EFEFEF")
    div.flex.zones
      span.zones_controller-name {{ getControllerName() }}

      div.zones_menu
        zone-item(:key="it" v-for="it in ['maisde60 puta que pariu caraca porra asdaudhaiushdiuashdiash', 'oque', 'peixespo', 'maisde60', 'oque', 'peixespo', 'maisde60', 'oque', 'peixespo']" id="1" :name="it").zone-item

</template>

<script>
import ZoneItem from 'components/ZoneItem.vue'

export default {
  name: 'ZonesPage',
  components: {
    'zone-item': ZoneItem
  },
  methods: {
    getControllerName () {
      return 'SouFoda'
    }
  }
}
</script>

<style lang="stylus" scoped>
.zone-item + .zone-item
  border-top 4px solid #efefef

.zones
  width 100%
  height 100%
  justify-content center

.zones_controller-name
  font-size 30px
  font-weight 400
  color $grey-8
  margin 25px 0

.zones_menu
  border-radius 8px
  width 90%
  max-height 60vh
  overflow auto
  background-color $grey-1
</style>
