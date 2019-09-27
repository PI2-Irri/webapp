<template lang="pug">
q-dialog(
  :value="visibility"
  minimized
  @hide="emitHideEvent()"
)
  q-card
    div(v-show="!isLoading")
      q-card-section
        p RAPADURA
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
    zoneId: {
      type: Number,
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
      this.$emit('hide-dialog')
    },
    async fetchZoneInfo () {
      if (this.zoneId > 0) { // if zone id is valid
        // TODO: fetch from API zone's data
        return {
          groundTemp: 10,
          ambTemp: 15,
          precipitation: 20,
          groundUmidity: 25,
          hydricConsume: 30,
          batteries: [0.2, 0.6, 1]
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
