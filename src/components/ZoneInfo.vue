<template lang="pug">
q-dialog(
  :value="visibility"
  minimized
  @hide="emitHideEvent()"
)
  q-card
    q-card-section
      p RAPADURA
    q-card-section
      span Poe a rapadura pra bater
</template>

<script>
export default {
  name: 'ZoneInfoComponent',
  props: {
    visibility: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    async emitHideEvent () {
      this.$emit('hide-dialog')
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
