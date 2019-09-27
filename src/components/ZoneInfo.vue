<template lang="pug">
q-dialog(
  :value="visibility"
  minimized
  @hide="emitHideEvent()"
  @before-show="fetchZoneInfo()"
)
  q-card
    div
      q-card-section
        p {{ selectedZone.name }}
      q-card-section
        span Poe a rapadura pra bater
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
</style>
