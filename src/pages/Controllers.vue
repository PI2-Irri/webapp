<template lang="pug">
q-page.background
  div.flex.justify-between.topbar-controller
    q-btn(
      flat
      @click.native="showNotifications()"
      @before-show="showNotifications()"
      no-caps
      ).logout
        q-icon(name="mdi-bell-ring-outline" color="white" size="25px")
        q-menu(anchor="bottom right" self="top right")
          q-item(style="width: 75vw" v-for="notification in notifications"  v-bind:key="notification.date")
            q-item-section(avatar style="width: 10%")
              q-avatar(v-bind:key="notification.date")
                img(style="width: 80%" src="statics/images/ativo1.png")
            q-item-section.notification-message
              q-item-label {{ notification.message }}
              q-item-label(caption) {{ notification.date }}
    q-btn(
      flat
      @click.native="logout()"
      ).logout
      q-icon(name="mdi-logout" color="white" size="25px").mdi-rotate-180

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
          span.data {{ getWaterReservatoryStatus(controller.reservoir_level) }}
    q-btn(
          round color="primary"
          icon="mdi-plus"
          size="20px"
          @click.native="registerController()").add-component
    register-controller(
        :visibility="registerVisibility"
        @hide-dialog="changeControllerVisibility(false)"
      )
</template>

<script>
import { getControllersInfo, getNotifications } from '../api/api'
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
      registerVisibility: false,
      notifications: null,
      waterReservatory: '-'
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
    this.notifications = this.showNotifications()
  },
  methods: {
    ...mapActions('controllers', ['setSelectedController']),
    ...mapActions('controllers', ['setUserControllers']),
    ...mapActions('users', ['setCurrentUser']),
    async registerController () {
      this.changeControllerVisibility(true)
    },
    async changeControllerVisibility (value) {
      this.registerVisibility = value
    },
    selectController (controller) {
      this.setSelectedController(controller)
      this.$router.push({ name: 'zones' })
    },
    getWaterReservatoryStatus (status) {
      switch (status) {
        case 2:
          this.waterReservatory = 'Full'
          break
        case 0:
          this.waterReservatory = 'Empty'
          break
        default:
          this.waterReservatory = '-'
          break
      }

      return this.waterReservatory
    },
    async logout () {
      let logoutUser = null

      this.$router.push({ 'name': 'login' })
      this.setCurrentUser(logoutUser)
      this.setUserControllers(logoutUser)
    },
    async showNotifications () {
      this.notifications = await getNotifications(this.currentUser.token)
    }
  }
}
</script>

<style lang="stylus" scoped>
.logout
  background none
  z-index 3
  float right

.topbar-controller
  height 50px
  margin auto
  flex-direction row-reverse

.background
  width 100%

.controller-container
  width 90vw
  margin auto
  padding-top 15px
  justify-content center

.notification-message
  color $grey-9

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
