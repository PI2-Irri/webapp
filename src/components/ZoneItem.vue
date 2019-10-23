<template lang="pug">
  div.zone-item.flex
    span.zone-item_name {{ name }}
    q-icon(name="mdi-chevron-right" color="grey-8")
</template>

<script>
export default {
  name: 'ZonesItemComponent',
  props: {
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

.zone-item_name
  max-width 80%
  color $grey-9
  text-overflow ellipsis
  overflow hidden
  white-space nowrap
</style>
