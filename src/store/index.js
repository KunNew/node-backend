import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./modules/auth.module";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  getters,
  mutations,
  actions,
  modules: {
    auth,
  },
})


export default store;
