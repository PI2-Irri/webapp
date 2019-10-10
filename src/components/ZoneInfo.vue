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
            p.data 13 ºC
          div.datas
            span.info-title Precipitação
            p.data 20%
        div.container-info
          div.datas
            span.info-title Temp. Solo
            p.data 23 ºC
          div.datas
            span.info-title Umid. Solo
            p.data 23 kPa
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

.datas
  width 50%

.data
  font-size 25px
  font-weight bold
  color $grey-8
</style>
