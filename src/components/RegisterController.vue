<template lang="pug">
q-dialog(
  :value="visibility"
  minimized
  @hide="emitHideEvent()"
)
  q-card.card-info
    span.title-dialog Register Controller
    div.inputs-dialog.flex.column
      q-input(
        placeholder="Controller name"
        color="#0A5959"
        bg-color="$grey-2"
        v-model="infos.name"
        dense filled
        ).input-dialog
      q-input(
        placeholder="Controller token"
        color="#0A5959"
        bg-color="$grey-2"
        v-model="infos.token"
        dense filled
        ).input-dialog
      div.buttons-dialog.flex.column
        q-btn.register-dialog(
          @click="registerController()"
          ) Register
        q-btn.register-dialog(
          @click="emitHideEvent()"
          outline
          ) Cancel

</template>

<script>
import { mapGetters } from 'vuex'
import { connectControllers } from '../api/api'

export default {
  name: 'RegisterControllerComponent',
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
        token: '',
        is_active: true
      },
      owner: ''
    }
  },
  methods: {
    async emitHideEvent () {
      this.infos.name = ''
      this.infos.token = ''
      this.$emit('hide-dialog')
    },
    async registerController () {
      this.owner = this.currentUser.token

      await connectControllers({
        ...this.infos
      }, this.owner)

      this.emitHideEvent()
    }
  },
  computed: {
    ...mapGetters('users', ['currentUser'])
  }
}
</script>
