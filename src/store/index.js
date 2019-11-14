import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import users from './users'
import controllers from './controllers'

Vue.use(Vuex)

export default function () {
  const vuexPersist = new VuexPersist({
    storage: window.localStorage
  })

  const Store = new Vuex.Store({
    modules: {
      users,
      controllers
    },
    plugins: [vuexPersist.plugin],
    strict: process.env.DEV
  })

  return Store
}
