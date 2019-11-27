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
import { mapGetters, mapActions } from 'vuex'
import { createZone, getControllersInfo } from '../api/api'

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
    ...mapActions('controllers', ['setSelectedController']),
    async registerZone () {
      if (this.infos.name !== '' && this.infos.zip !== '') {
        this.infos.controller = this.selectedController.token
        await createZone({ ...this.infos }, this.currentUser.token)

        let newZone = await getControllersInfo(this.currentUser)
        let controller

        for (controller in newZone) {
          if (newZone[controller].token === this.selectedController.token) {
            this.setSelectedController(newZone[controller])

            window.location.reload()
            this.emitHideEvent()
          }
        }
      } else {
        this.$q.notify({
          message: 'Zone name or ZIP field is empty',
          color: 'negative'
        })
      }
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
