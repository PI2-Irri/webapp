<template lang="pug">
q-dialog(
  :value="visibility"
  minimized
  @hide="emitHideEvent()"
  @before-show="getStatusModules()"
)
  q-card.card-info
    div
      q-card-section
        p.title {{ selectedZone[0].name }}
      q-card-section
        div.container-info
          div.datas
            span.info-title Temp. Ambiente
            pan.data {{ selectedZone[0].air_temperature }} ºC
          div.datas
            span.info-title Precipitação
            span.data {{ selectedZone[0].precipitation }}%
        div.container-info
          div.datas
            span.info-title Temp. Solo
            span.data {{ selectedZone[0].soil_temperature }} ºC
          div.datas
            span.info-title Umid. Solo
            span.data {{ selectedZone[0].ground_humidity }} kPa
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
          q-btn(label="Ativar").active-btn
    q-inner-loading(:showing="isLoading")
</template>

<script>
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
  data () {
    return {
      isLoading: false,
      status_modules: undefined
    }
  },
  methods: {
    async emitHideEvent () {
      this.isLoading = false
      this.$emit('hide-dialog')
    },
    async getStatusModules () {
      this.status_modules = this.selectedZone[0].status_modules
    }
  }
}
</script>

<style lang="stylus" scoped>
.card-info
  width 80vh
  background-color $grey-2

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
  /* margin-left -10px */

.modules-info
  margin auto
  align-items center

#active-btn
  justify-content center
  padding 0

.active-btn
  margin-top 20px
  background-color #10BF70
  color $grey-2

</style>
