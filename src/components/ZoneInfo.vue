<template lang="pug">
q-dialog(
  :value="visibility"
  minimized
  @hide="emitHideEvent()"
  @before-show="getStatusModules()"
)
  q-card.card-info
    q-card-section
      p.title {{ selectedZone[0].name }}
    q-card-section
      div.container-info
        div.datas
          span.info-title Air Temperature
          pan.data {{ Math.round(selectedZone[0].air_temperature) }}ºC
        div.datas
          span.info-title Precipitation
          span.data {{ selectedZone[0].precipitation }}mm
      div.container-info
        div.datas
          span.info-title Ground Temp.
          span.data {{ Math.round(selectedZone[0].soil_temperature) }}ºC
        div.datas
          span.info-title Ground Humidity
          span.data {{ selectedZone[0].ground_humidity }}%
      div.container-info.column
        div.datas(style="margin-bottom: 20px")
          span.info-title Water Consumption
          span.data {{ selectedZone[0].water_consumption }}L
        span.info-title Modules
        div.battery-status.row
          div.modules-info(v-for="status_module in status_modules")
            q-icon(size="24px" :name="setBattery(status_module)" color="grey-8")#teste
            q-icon(v-if="status_module >= 0" name="mdi-checkbox-blank-circle" color="green" size="10px")
            q-icon(v-else name="mdi-checkbox-blank-circle" color="red" size="10px")
      div.container-info#active-btn
        q-btn-dropdown(
          split
          label="Activate"
          @click="statusController(false)").active-btn
          q-list.activate-irrigate-btn
            q-item(
              clickable
              v-close-popup
              @click="statusController(true)")
              q-item-section(avatar style="width: 10%")
                q-avatar
                  img(style="width: 100%" src="statics/images/ativo1.png")
              q-item-section
                q-item-label Activate and Irrigate
                q-item-label(caption).activate-irrigate-caption Enable data collection for this zone and turn on irrigation
    q-inner-loading(:showing="isLoading")
</template>
// status=True
<script>
import { irrigate } from '../api/api'
import { mapGetters } from 'vuex'

export default {
  name: 'ZoneInfoComponent',
  props: {
    visibility: {
      type: Boolean,
      required: true
    },
    selectedZone: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters('users', ['currentUser']),
    ...mapGetters('controllers', ['selectedController'])
  },
  data () {
    return {
      isLoading: false,
      status_modules: undefined,
      infos: {
        status: false,
        is_active: false,
        token: null,
        zone_name: null
      }
    }
  },
  methods: {
    setBattery (battery) {
      switch (battery) {
        case 1:
          return 'mdi-battery-10'
        case 2:
          return 'mdi-battery-40'
        case 3:
          return 'mdi-battery-80'
        case 4:
          return 'mdi-battery-plus'
        default:
          return 'mdi-battery-alert'
      }
    },
    async emitHideEvent () {
      this.isLoading = false
      this.$emit('hide-dialog')
    },
    async getStatusModules () {
      this.status_modules = this.selectedZone[0].status_modules
    },
    async statusController (status) {
      this.infos.token = this.selectedController.token
      this.infos.status = status
      this.infos.is_active = true
      this.infos.zone_name = this.selectedZone[0].name

      await irrigate({ ...this.infos }, this.currentUser.token)
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  font-size 13px
  color $grey-8

.container-info
  padding 0 0 20px 10px
  display flex

.info-title
  font-size 16px
  color $grey-8

.datas
  width 50%
  display flex
  flex-direction column

.data
  font-size 25px
  font-weight bold
  color $grey-8

.battery-status
  padding-top 10px

.modules-info
  &:first-child
    margin-left -4px
  margin-left 15px
  align-items center

#active-btn
  justify-content center
  padding 0
  margin-top 20px
  width 100%

.active-btn
  background-color $primary
  color $grey-2

.activate-irrigate-btn
  font-weight 400
  color $primary

.activate-irrigate-caption
  color $grey-8

</style>
