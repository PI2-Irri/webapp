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
          pan.data {{ selectedZone[0].air_temperature }} ºC
        div.datas
          span.info-title Precipitation
          span.data {{ selectedZone[0].precipitation }}%
      div.container-info
        div.datas
          span.info-title Ground Temp.
          span.data {{ selectedZone[0].soil_temperature }} ºC
        div.datas
          span.info-title Ground Humidity
          span.data {{ selectedZone[0].ground_humidity }}%
      div.container-info.column
        span.info-title Módulos
        div#battery-status.row
          div.modules-info(v-for="status_module in status_modules")
            q-icon(name="mdi-battery-80" color="grey-8" size="24px")
            //q-icon(v-else-if="" name="mdi-battery-40" color="grey-8" size="24px")
            //q-icon(v-else name="mdi-battery-10" color="grey-8" size="24px")
            q-icon(v-if="status_module === 1" name="mdi-checkbox-blank-circle" color="green" size="10px")
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

      let res = await irrigate({ ...this.infos }, this.currentUser.token)
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

#battery-status
  padding-top 10px

.modules-info
  margin auto
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
