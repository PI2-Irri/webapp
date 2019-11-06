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
import { mapGetters } from 'vuex'
import { createZone } from '../api/api'

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
        latitude: 15,
        longitude: 10,
        controller: ''
      }
    }
  },
  methods: {
    async registerZone () {
      this.setZoneArea()
      this.infos.controller = this.selectedController.token
      await createZone({ ...this.infos }, this.currentUser.token)
      this.emitHideEvent()
    },
    async setZoneArea () {
      // TODO: set latitude and longitude
    },
    async emitHideEvent () {
      this.infos.name = ''
      this.infos.zip = ''
      this.$emit('hide-dialog')
    }
  },
  computed: {
    ...mapGetters('controllers', ['selectedController']),
    ...mapGetters('users', ['currentUser'])
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
