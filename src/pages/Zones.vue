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
        :name="selectedZone[0].name"
        @hide-dialog="changeInfosVisibility(false)"
      )
      q-btn(
            round color="secondary"
            icon="mdi-plus"
            size="20px"
            @click.native="registerZone()").add-zone
      register-zone(
          :visibility="registerVisibility"
          @hide-dialog="changeZoneComponentVisibility(false)"
        )

</template>

<script>
import ZoneItem from 'components/ZoneItem.vue'
import ZoneInfo from 'components/ZoneInfo.vue'
import RegisterZone from 'components/RegisterZone.vue'
import { mapGetters } from 'vuex'
import { getZonesInfo } from '../api/api'

export default {
  name: 'ZonesPage',
  components: {
    'zone-info': ZoneInfo,
    'zone-item': ZoneItem,
    'register-zone': RegisterZone
  },
  data () {
    return {
      infosVisibility: false,
      selectedZone: {},
      zones: [],
      infos: {
        token: '',
        zone_name: ''
      },
      registerVisibility: false
    }
  },
  mounted () {
    // TODO: not sure this should be here, should it be an sync func?
    this.zones = this.fetchZones()
  },
  computed: {
    ...mapGetters('controllers', ['selectedController']),
    ...mapGetters('users', ['currentUser'])
  },
  methods: {
    getControllerName () {
      return this.selectedController.controller
    },
    async selectZone (zone) {
      this.infos.token = this.selectedController.token
      this.infos.zone_name = zone.name
      this.selectedZone = await getZonesInfo(
        { ...this.infos },
        this.currentUser.token
      )
      this.changeInfosVisibility(true)
      console.log(this.selectedZone)
    },
    async changeInfosVisibility (value) {
      this.infosVisibility = value
    },
    fetchZones () {
      return this.selectedController.zones
    },
    async registerZone () {
      this.changeZoneComponentVisibility(true)
    },
    async changeZoneComponentVisibility (value) {
      this.registerVisibility = value
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

.add-zone
  position absolute
  bottom 8vh
  right 5vw
  padding 10px
</style>
