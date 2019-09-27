<template lang="pug">
  q-page(style="background-color: #EFEFEF")
    div.flex.zones(@click="changeInfosVisibility(true)")
      span.zones_controller-name {{ getControllerName() }}
      div.zones_menu
        zone-item(
          :key="it"
          :name="it"
          v-for="it in ['maisde60 puta que pariu caraca porra asdaudhaiushdiuashdiash', 'oque', 'peixespo']"
          id="1"
          @click="changeInfosVisibility(true)"
        ).zone-item
      zone-info(
        :visibility="infosVisibility"
        :zoneId="selectedZone"
        @hide-dialog="changeInfosVisibility(false)"
      )

</template>

<script>
import ZoneItem from 'components/ZoneItem.vue'
import ZoneInfo from 'components/ZoneInfo.vue'

export default {
  name: 'ZonesPage',
  components: {
    'zone-info': ZoneInfo,
    'zone-item': ZoneItem
  },
  data () {
    return {
      infosVisibility: false,
      selectedZone: -1
    }
  },
  methods: {
    getControllerName () {
      return 'SouFoda'
    },
    async changeInfosVisibility (value) {
      console.log('bla')
      this.infosVisibility = value
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
