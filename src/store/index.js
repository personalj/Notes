import Vue from "vue";
import Vuex from "vuex";
import service from "./modules/service";
import localStorage from "./modules/localStorage";
import firebase from "./modules/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    service,
    localStorage,
    firebase,
  },
});
