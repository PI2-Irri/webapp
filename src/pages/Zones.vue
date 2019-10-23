<template lang="pug">
  q-page(style="background-color: #EFEFEF")
    div.flex.zones
      span.zones_controller-name {{ getControllerName() }}
      div.zones_menu
        zone-item(
          v-for="zone in zones"
          :key="zone.id"
          :name="zone.name"
          @click.native="selectZone(zone)"
        ).zone-item
      zone-info(
        :visibility="infosVisibility"
        :selectedZone="selectedZone"
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
      selectedZone: {},
      zones: []
    }
  },
  mounted () {
    // TODO: not sure this should be here, should it be an sync func?
    this.zones = this.fetchZones()
  },
  methods: {
    getControllerName () {
      // gets the name from a prop controllerInfo
      return 'FGA'
    },
    selectZone (zone) {
      this.selectedZone = zone
      this.changeInfosVisibility(true)
    },
    async changeInfosVisibility (value) {
      this.infosVisibility = value
    },
    fetchZones () {
      // gets all zones (id, name) tuple from a given controller
      // controller selected is a prop controllerInfo
      return [
        {
          name: 'Graminha',
          id: 1
        },
        {
          name: 'RU',
          id: 2
        },
        {
          name: 'UAC',
          id: 3
        },
        {
          name: 'UED',
          id: 4
        }
      ]
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
