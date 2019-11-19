<template lang="pug">
q-page.background
  div.controller-container.flex.column
    span#title Controllers
    q-card(
      v-for="controller in controllers"
      :key="controller.name"
      @click.native="selectController(controller)"
    ).controller-infos
      span.controller-name {{ controller.controller }}
      div.flex.row
        div.flex.column.datas
          span.data-type Zones
          span.data {{ controller.zones.length }}
        div.flex.column.datas
          span.data-type Water Reservatory
          span.data {{ controller.reservoir_level }}
    q-btn(
          round color="secondary"
          icon="mdi-plus"
          size="20px"
          @click.native="registerController()").add-component
    register-controller(
        :visibility="registerVisibility"
        @hide-dialog="changeControllerVisibility(false)"
      )
</template>

<script>
import { getControllersInfo } from '../api/api'
import { mapGetters, mapActions } from 'vuex'
import RegisterController from 'components/RegisterController.vue'

export default {
  name: 'ControllersPage',
  components: {
    'register-controller': RegisterController
  },
  data () {
    return {
      currentSlide: '1',
      controllers: undefined,
      registerVisibility: false
    }
  },
  computed: {
    ...mapGetters('users', ['currentUser']),
    ...mapGetters('controllers', ['userControllers'])
  },
  async created () {
    let userControllers
    userControllers = await getControllersInfo(this.currentUser)

    this.setUserControllers(userControllers)
    this.controllers = this.userControllers
  },
  methods: {
    ...mapActions('controllers', ['setSelectedController']),
    ...mapActions('controllers', ['setUserControllers']),
    async registerController () {
      this.changeControllerVisibility(true)
    },
    async changeControllerVisibility (value) {
      this.registerVisibility = value
    },
    selectController (controller) {
      this.setSelectedController(controller)
      this.$router.push({ name: 'zones' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.background
  width 100%
  padding-top 50px

.controller-container
  width 90vw
  margin auto
  padding-top 15px
  justify-content center

.controller-infos
  margin-bottom 10px
  padding 10px 0

.controller-name
  font-size 20px
  color $grey-8
  padding-left 15px

.data-type
  color $grey-8
  font-size 16px

.datas
  padding-left 25px

.data
  color $grey-9
  font-weight bold
  font-size 20px

#title
  color $grey-9
  font-size 26px
</style>
