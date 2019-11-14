<template lang="pug">
  q-dialog(
    :value="visibility"
    minimized
    @hide="emitHideEvent()"
  )
    q-card.card-info
      span.title-dialog Register Zone
      div.inputs-dialog.flex.column
        q-input(
          placeholder="Zone name"
          color="#0A5959"
          bg-color="$grey-2"
          v-model="infos.name"
          dense filled
          ).input-dialog
        q-input(
          placeholder="ZIP"
          color="#0A5959"
          bg-color="$grey-2"
          v-model="infos.zip"
          dense filled
          ).input-dialog
        div.buttons-dialog.flex.column
          q-btn.register-dialog(
            @click="registerZone()"
            ) Register
          q-btn.register-dialog(
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
