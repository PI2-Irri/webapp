<template lang="pug">
q-dialog(
  :value="visibility"
  minimized
  @hide="emitHideEvent()"
)
  q-card.card-info
    span.title Register Controller
    div.inputs.flex.column
      q-input(
        placeholder="Controller name"
        color="#0A5959"
        bg-color="$grey-2"
        v-model="infos.name"
        dense filled
        ).input
      q-input(
        placeholder="Controller token"
        color="#0A5959"
        bg-color="$grey-2"
        v-model="infos.token"
        dense filled
        ).input
      div.buttons.flex.column
        q-btn.register(
          @click="registerController()"
          ) Register
        q-btn.register(
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
