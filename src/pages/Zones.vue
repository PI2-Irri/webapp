<template lang="pug">
  q-page.zones-container
    q-btn(
        flat
        @click.native="backToControllers()"
      ).return-btn
      q-icon(name="mdi-arrow-left" size="25px")
    div.flex.column.zones
      span.zones_controller-name {{ getControllerName() }}
      vc-calendar(title-position="left"
                  :attributes='attrs'
                  @dayclick="showDayClicked"
      ).calendar
      calendar-day(
        :visibility="dayVisibility"
        :selectedDay="selectedDay"
        @hide-dialog="changeDayVisibility(false)"
        )
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
import { getZonesInfo } from '../api/api'

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
      // TODO: get daysInfo from API
      daysInfo: [
        {
          'zone': 'UED',
          'attr': {
            'dates': '2019-11-23',
            'dot': 'blue'
          },
          'schedule': ['13:20', '15:10', '22:11']
        },
        {
          'zone': 'UAC',
          'attr': {
            'dates': '2019-11-23',
            'dot': 'blue'
          },
          'schedule': ['11:20', '15:11', '22:10']
        },
        {
          'zone': 'Lappis',
          'attr': {
            'dates': '2019-11-22',
            'dot': 'blue'
          },
          'schedule': ['11:20', '15:11', '22:10']
        }
      ],
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
    this.attrs = []

    for (let info of this.daysInfo) {
      if (!attrsSet.has(info.attr.dates)) {
        this.attrs.push(info.attr)
        attrsSet.add(info.attr.dates)
      }
    }

    this.selectDay()
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
      // console.log(this.daysInfo.attr.dates)
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
    async selectDay (day) {
    }
  }
}
</script>

<style lang="stylus" scoped>
.return-btn
  color $grey-8
  padding-top 60px
  border none
  background none
  padding-left 15px
  &:focus
    background-color black

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
  font-size 30px
  font-weight 400
  color $grey-8
  margin-bottom 25px

.zones_menu
  border-radius 8px
  width 90%
  max-height 30vh
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
</style>

<!-- daysInfo: [
  {
    'zone': 'UED',
    'dates': '2019-11-22',
    'schedule': ['13:20', '15:10', '22:11']
  },
  {
    'zone': 'UAC',
    'dates': '2019-11-23',
    'schedule': ['13:20', '15:10', '22:11']
  },
  {
    'zone': 'Lappis',
    'date': '2019-11-24',
    'schedule': ['13:20', '15:10', '22:11']
  }
], -->
