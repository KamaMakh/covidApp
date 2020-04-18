import Vue from 'vue';
import Vuex from 'vuex';
import stats from "./stats";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stats
  },
  state: {
    name: "My test name"
  },
  mutations: {

  },
  actions: {

  }
});
