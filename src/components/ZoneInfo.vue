<template lang="pug">
q-dialog(
  :value="visibility"
  minimized
  @hide="emitHideEvent()"
  @before-show="fetchZoneInfo()"
)
  q-card.card-info
    div
      q-card-section
        p.title {{ selectedZone.name }}
      q-card-section
        div.container-info
          div.datas
            span.info-title Temp. Ambiente
            pan.data 20 ºC
          div.datas
            span.info-title Precipitação
            span.data 10%
        div.container-info
          div.datas
            span.info-title Temp. Solo
            span.data 30 ºC
          div.datas
            span.info-title Umid. Solo
            span.data 50 kPa
        div.container-info.column
          span.info-title Módulos
          div#battery-status.row
            div.modules-info
              q-icon(name="mdi-battery-80" color="grey-8" size="24px")
              q-icon(name="mdi-checkbox-blank-circle" color="green" size="10px")
            div.modules-info
              q-icon(name="mdi-battery-40" color="grey-8" size="24px")
              q-icon(name="mdi-checkbox-blank-circle" color="green" size="10px")
            div.modules-info
              q-icon(name="mdi-battery-10" color="grey-8" size="24px")
              q-icon(name="mdi-checkbox-blank-circle" color="red" size="10px")
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
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async emitHideEvent () {
      this.isLoading = false
      this.$emit('hide-dialog')
    },
    async fetchZoneInfo () {
      // TODO: avoid unnecessary loading
      this.isLoading = true
      if (this.selectedZone) { // if zone id is valid
        // TODO: fetch from API zone's data
        this.zoneInfo = {
          groundTemp: 10,
          ambTemp: 15,
          precipitation: 20,
          groundUmidity: 25,
          hydricConsume: 30,
          batteries: [0.2, 0.6, 1]
        }
      }
      await setTimeout(() => { this.isLoading = false }, 1000)
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
