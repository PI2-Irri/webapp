<template lang="pug">
  q-page.login_page.flex.column
    div.background.flex
      img(src="statics/images/ativo2.png")
    div.logo.flex
      img(src="statics/images/ativo5.png")
    div.form.flex
      div.fields.flex
        q-input.input(
          placeholder="Username"
          color="#0A5959"
          bg-color="grey-2"
          v-model="username"
          dense filled
        )
        q-input.input(
          placeholder="Password"
          color="#0A5959"
          bg-color="grey-2"
          v-model="password"
          type="password"
          dense filled
        )
      div.buttons.flex
        q-btn.login(
          @click="login()"
        ) Log in
        q-btn.login(outline) Register

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { makeLogin } from '../api/api'

export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('users', ['currentUser'])
  },
  methods: {
    ...mapActions('users', ['setCurrentUser']),
    async login () {
      let user = await makeLogin({
        username: this.username,
        password: this.password
      })

      if (user !== null) {
        this.setCurrentUser(user)
        this.$q.notify({
          message: 'Logged in succesfully',
          color: 'positive'
        })
        this.redirectToControllers()
      } else {
        this.$q.notify({
          message: 'Login failed',
          color: 'negative'
        })
      }
    },
    redirectToControllers () {
      this.$router.push({
        name: 'controllers'
      })
    }
  },
  created () {
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') this.login()
    })
  },
  mounted () {
    if (this.currentUser !== null) {
      this.redirectToControllers()
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  background-color #0A5959
  color $grey-2
  width 100%
  border-radius 5px
  &:last-child
    margin-top 13px
    color #0A5959

.buttons
  width 85%
  margin-top 30px

.input
  width 85%
  &:last-of-type
    padding-top 13px

.fields
  width 100%
  padding-top 40%
  justify-content center

.form
  justify-content center
  height 100%

.logo
  margin-top 60px
  margin-bottom 60px
  justify-content center
  img
    width 43%
    height 43%

.login_page
  background-color #0aa0a0

.background
  position absolute
  justify-content center
  width 100%
  height 100%
  img
    opacity 0.2
    object-fit none
</style>
