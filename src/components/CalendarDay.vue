<template lang="pug">
  q-dialog(
    :value="visibility"
    minimized
    @hide="emitHideEvent()"
    @before-show="getZonesName()"
  )
    q-card.card-info.schedules-info
      div.flex.column.calendar-container
        div.flex.setting-schedule
          p.title <b>Irrigation schedules:</b> {{ selectedDay[0].attr.dates }}
          q-btn(icon="mdi-alarm-plus" flat).schedule-icon
            q-popup-proxy(transition-show="scale" transition-hide="scale")
              q-time(v-model="infos.time" now-btn)
                div.flex.column.schedule-zone
                  q-select(standout="bg-teal text-white"
                    :options="zones"
                    v-model="infos.zone_name"
                    label="Zone").zone-select
                  div.flex.justify-between(style="width: 95%")
                    q-btn(outline
                      color="primary"
                      label="Cancel").schedule-btn
                    q-btn(label="Schedule"
                      color="primary"
                      @click="setNewSchedule").schedule-btn
        div(v-for="zone in selectedDay")#schedule-time
          span.title(style="margin-left: 20px") {{ zone.zone }}
          div.flex.schedule-container
            span(v-for="schedule in zone.schedule").schedules {{ schedule }}
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CalendarDayComponent',
  props: {
    visibility: {
      type: Boolean,
      required: true
    },
    selectedDay: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      zones: [],
      infos: {
        zone_name: null,
        token: null,
        time: null
      }
    }
  },
  computed: {
    ...mapGetters('controllers', ['selectedController'])
  },
  methods: {
    async emitHideEvent () {
      this.isLoading = false
      this.$emit('hide-dialog')
    },
    async getZonesName () {
      this.zones = []

      for (let zone of this.selectedController.zones) {
        this.zones.push(zone.name)
      }
    },
    async setNewSchedule () {
      this.infos.token = this.selectedController.token
      this.infos.time = this.selectedDay[0].attr.dates + ' ' + this.infos.time
    }
  }
}
</script>

<style lang="stylus" scoped>
.schedules-info
  max-height 100vh

.calendar-container
  padding 0 0 20px 15px

.title
  font-size 15px
  color $grey-8

.schedule-container
  justify-content center
  overflow auto
  max-height 70px

.schedules
  margin 5px
  background-color #0AA0A0
  border-radius 10px
  width 55px
  color $grey-2
  text-align center

.setting-schedule
  justify-content space-between
  padding-right 15px
  width 100%

#schedule-time
  margin-bottom 10px
  max-width 95%
  max-height 150px

.schedule-icon
  margin-top -7px
  color $grey-8
  padding 0
  height 25px

.zone-select
  width 95%
  margin-bottom 15px

.schedule-zone
  align-items center

.schedule-btn
  width 48.5%
</style>
