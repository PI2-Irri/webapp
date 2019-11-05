<template lang="pug">
  q-dialog(
    :value="visibility"
    minimized
    @hide="emitHideEvent()"
  )
    q-card.card-info
      span.title Register Zone
      div.inputs.flex.column
        q-input(
          placeholder="Zone name"
          color="#0A5959"
          bg-color="$grey-2"
          v-model="infos.name"
          dense filled
          ).input
        q-input(
          placeholder="ZIP"
          color="#0A5959"
          bg-color="$grey-2"
          v-model="infos.zip"
          dense filled
          ).input
        div.buttons.flex.column
          q-btn.register(
            @click="registerZone()"
            ) Register
          q-btn.register(
            @click="emitHideEvent()"
            outline
            ) Cancel</template>

<script>
export default {
  name: 'RegisterZones',
  props: {
    visibility: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      infos: {
        name: '',
        zip: '',
        controller: '',
        latitude: '',
        longitude: ''
      }
    }
  },
  methods: {
    async registerZone () {
      console.log('Eai')
      this.emitHideEvent()
    },
    async emitHideEvent () {
      this.$emit('hide-dialog')
    }
  }
}
</script>

<style lang="stylus" scoped>

.card-info
  width 80vh
  padding-top 15px
  background-color $grey-2

.title
  color $grey-8
  font-size 24px
  margin-left 15px

.inputs
  color white
  margin 20px 0
  align-items center

.input
  width 80%
  margin-bottom 20px

.buttons
  width 80%
  margin-top 10px

.register
  background-color #0A5959

  &:last-child
    color #0A5959
    margin-top 15px

</style>
