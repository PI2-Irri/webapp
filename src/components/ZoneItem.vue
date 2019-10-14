<template lang="pug">
  div.zone-item.flex
    span {{ name }}
    q-icon(name="keyboard_arrow_right" size="xl")
</template>

<script>
export default {
  name: 'ZonesItemComponent',
  props: {
    id: {
      // TODO: Change this type to the database type
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="stylus" scoped>
.zone-item
  justify-content space-between
  padding 25px 20px
  align-items center
</style>
