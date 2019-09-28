<template lang="pug">
  q-page.signup_page.flex.column
    div.background.flex
      img(src="statics/images/ativo2.png")
    div.logo.flex
      img(src="statics/images/ativo5.png")
    div.form.flex
      div.fields.flex
        q-input.input(
          placeholder="Fullname"
          color="#0A5959"
          bg-color="grey-2"
          v-model="fullname"
          dense filled
          )
        q-input.input(
          placeholder="Email"
          color="#0A5959"
          bg-color="grey-2"
          v-model="email"
          dense filled
          )
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
          dense filled
          )
        q-input.input(
          placeholder="Password confirmation"
          color="#0A5959"
          bg-color="grey-2"
          v-model="passwordConfirmation"
          dense filled
          )

      div.buttons.flex
        q-btn.signup Sign Up
        q-btn.signup(
          outline
          @click="$router.push({ name: 'login' })"
        ) Cancel
</template>

<script>
export default {
  name: 'SignUpPage',
  data () {
    return {
      username: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      fullname: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.input
  width 85%
  padding-bottom 13px
  &:last-child
    padding-bottom 25px

.signup
  background-color #0A5959
  color $grey-2
  width 100%
  border-radius: 5px
  &:last-child
    margin-top 13px
    color #0A5959

.fields
  width 85%
  padding-top 30%
  justify-content center

.form
  justify-content center
  height 100%

.signup_page
  background-color #0aa0a0

.logo
  margin-top 60px
  margin-bottom 60px
  justify-content center
  img
    width 43%
    height: 43%

.background
  position absolute
  justify-content center
  width 100%
  height 100%
  img
    opacity 0.2
    object-fit none
</style>
