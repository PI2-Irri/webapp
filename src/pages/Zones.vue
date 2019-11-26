<template lang="pug">
  q-page.zones-container
    div.flex.topbar-zones
      q-btn(
          flat
          @click.native="backToControllers()"
        ).return-btn
        q-icon(name="mdi-arrow-left" size="25px")
      q-btn(
          flat
          @click.native="changeCalendarVisibility()"
        ).calendar-btn
        q-icon(name="mdi-calendar-clock" size="25px")
    div.flex.column.zones
      span.zones_controller-name {{ getControllerName() }}
      div#calendar
        vc-calendar(title-position="left"
                    :attributes='attrs'
                    @dayclick="showDayClicked"
        ).calendar
        calendar-day(
          :visibility="dayVisibility"
          :selectedDay="selectedDay"
          @hide-dialog="changeDayVisibility(false)"
          )
      div#zones_menu
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
            round color="primary"
            icon="mdi-plus"
            size="20px"
            @click.native="registerZone()").add-component
      register-zone(
          :visibility="registerVisibility"
          @hide-dialog="changeZoneComponentVisibility(false)"
        )

</template>

<script>
import ZoneItem from 'components/ZoneItem.vue'
import ZoneInfo from 'components/ZoneInfo.vue'
import CalendarDay from 'components/CalendarDay.vue'
import RegisterZone from 'components/RegisterZone.vue'
import { mapGetters } from 'vuex'
import { getZonesInfo, getSchedulesInfo } from '../api/api'

export default {
  name: 'ZonesPage',
  components: {
    'zone-info': ZoneInfo,
    'zone-item': ZoneItem,
    'register-zone': RegisterZone,
    'calendar-day': CalendarDay
  },
  data () {
    return {
      infosVisibility: false,
      registerVisibility: false,
      dayVisibility: false,
      selectedZone: [{ 'name': '' }],
      daysInfo: [],
      selectedDay: [
        {
          'zone': '',
          'attr': {
            'dates': '',
            'dot': ''
          },
          'schedule': []
        }],
      zones: [],
      infos: {
        token: '',
        zone_name: ''
      },
      attrs: [
        {
          key: 'today',
          dot: {
            color: 'blue'
          },
          dates: new Date()
        }
      ]
    }
  },
  mounted () {
    if (!this.currentUser) {
      this.$router.push({ 'name': 'login' })
    }

    this.fetchZones()
  },
  computed: {
    ...mapGetters('controllers', ['selectedController']),
    ...mapGetters('users', ['currentUser'])
  },
  async created () {
    var attrsSet = new Set()
    let param = { 'token': this.selectedController.token }

    this.attrs = []
    this.daysInfo = await getSchedulesInfo({ ...param })

    for (let info of this.daysInfo) {
      if (!attrsSet.has(info.attr.dates)) {
        this.attrs.push(info.attr)
        attrsSet.add(info.attr.dates)
      }
    }
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
    },
    async changeInfosVisibility (value) {
      this.infosVisibility = value
    },
    async fetchZones () {
      let zonesController = this.selectedController.zones

      this.zones = zonesController
    },
    async registerZone () {
      this.changeZoneComponentVisibility(true)
    },
    async changeZoneComponentVisibility (value) {
      this.registerVisibility = value
    },
    backToControllers () {
      this.$router.push({ 'name': 'controllers' })
    },
    async showDayClicked (day) {
      this.selectedDay = []

      for (let selDay of this.daysInfo) {
        if (selDay.attr.dates === day.id) {
          this.selectedDay.push(selDay)
        }
      }

      this.changeDayVisibility(true)
    },
    async changeDayVisibility (value) {
      this.dayVisibility = value
    },
    async changeCalendarVisibility () {
      var calendar = document.getElementById('calendar')
      var zoneMenu = document.getElementById('zones_menu')

      if (calendar.style.display === 'none') {
        calendar.style.display = 'flex'
        zoneMenu.style.maxHeight = '30vh'
      } else {
        calendar.style.display = 'none'
        zoneMenu.style.maxHeight = '60vh'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.topbar-zones
  margin auto
  height 50px
  justify-content space-between

.return-btn
  z-index 3
  color white
  background none

.calendar-btn
  z-index 4
  color white
  background none

.zone-item + .zone-item
  border-top 4px solid #efefef

.zones-container
  width 100%
  background-color #EFEFEF

.zones
  height 100%
  justify-content center
  align-items center

.zones_controller-name
  margin-top 20px
  font-size 30px
  font-weight 400
  color $grey-8
  margin-bottom 15px

#zones_menu
  border-radius 8px
  width 90%
  max-height 60vh
  overflow auto
  background-color white

.add-zone
  position absolute
  bottom 8vh
  right 5vw
  padding 10px

.calendar
  width 90%
  height auto
  margin-bottom 25px

#calendar
  height auto
  width 100%
  justify-content center
  align-items center
  display none
</style>
