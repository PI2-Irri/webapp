<template lang="pug">
  q-dialog(
    :value="visibility"
    minimized
    @hide="emitHideEvent()"
  )
    q-card.card-info.schedulesInfo
      div.flex.column.calendar-container
        p.title <b>Irrigation schedules:</b> {{ selectedDay[0].attr.dates }}
        div(v-for="zone in selectedDay" style="margin-bottom: 10px; max-width: 95%; max-height: 150px")
          span.title(style="margin-left: 20px") {{ zone.zone }}
          div.flex.schedule-container
            span(v-for="schedule in zone.schedule").schedules {{ schedule }}
</template>

<style lang="stylus" scoped>
.schedulesInfo
  max-height 50vh

.calendar-container
  padding 0 0 20px 10px

.title
  font-size 15px
  color $grey-8

.schedule-container
  justify-content center
  overflow auto
  max-height 70px

.schedules
  margin 5px
  background-color #0a5959
  border-radius 10px
  width 55px
  color $grey-2
  text-align center
</style>

<script>
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
    return {}
  },
  methods: {
    async emitHideEvent () {
      this.isLoading = false
      console.log(this.selectedDay)
      this.$emit('hide-dialog')
    }
  }
}
</script>
