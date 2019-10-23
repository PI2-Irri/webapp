<template lang="pug">
q-page.background
  div.controller-container.flex.column
    span#title Controllers
    q-card(
      v-for="controller in controllers.data"
      :key="controller.name"
    ).controller-infos
      span.controller-name {{ controller.name }}
      div.flex.row
        div.flex.column.datas
          span.data-type Zones
          span.data 10
        div.flex.column.datas
          span.data-type Water Reservatory
          span.data 20
    q-btn(round color="secondary" icon="mdi-plus" size="20px").teste

</template>

<script>
import { getControllers } from '../api/api'
import { mapGetters } from 'vuex'

export default {
  name: 'ControllersPage',
  data () {
    return {
      currentSlide: '1',
      controllers: undefined
    }
  },
  computed: {
    ...mapGetters('users', ['currentUser'])
  },
  async created () {
    this.controllers = await getControllers(this.currentUser)
  }
}
</script>

<style lang="stylus" scoped>
.teste
  position absolute
  right 5vw
  padding 10px
  // TODO: STOP ROLLING DOWN
  bottom 8vh

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
