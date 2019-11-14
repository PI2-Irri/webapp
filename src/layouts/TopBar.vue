<template lang="pug">
  q-layout
    q-page-container
      div.flex.row-reverse.topbar#background-irri
        q-btn(
          flat
          @click.native="logout()"
          ).teste
          q-icon(name="mdi-logout" color="white" size="25px")
      router-view
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TopBarLayout',
  methods: {
    ...mapActions('users', ['setCurrentUser']),
    async logout () {
      let user = null

      this.$router.push({ 'name': 'login' })
      this.setCurrentUser(user)
    }
  }
}
</script>

<style lang="stylus" scoped>
.teste
  background none

#background-irri
  background-color #0a5959
  background-image url('../statics/images/ativo5.png')
  background-repeat no-repeat
  background-position center
  background-size 90px

.topbar
  width 100%
  height 50px
  top 0
  overflow hidden
  position fixed
  z-index 2
  justify-content flex-end
</style>
