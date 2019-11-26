<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import VCalendar from 'v-calendar'
import Vue from 'vue'

Vue.use(VCalendar, {
  componentPrefix: 'vc'
})

export default {
  name: 'App'
}
</script>

<style>
</style>
