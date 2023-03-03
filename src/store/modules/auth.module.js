import axios from "axios";
// import constants from '../../constants'
import router from "@/router";
import api from "../../utils/utilites";

const state = {
  authenticated: false,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    name: null,
    email: null,
    isAdmin: null,
    avatar: null,
  },
  accessToken: null,
  refreshToken: null,
  isTokenRefreshing: false,
};

const getters = {
  authenticated(state) {
    return state.authenticated;
  },
  user(state) {
    return state.user;
  },
  accessToken(state) {
    return state.accessToken;
  },
};

const mutations = {
  SET_AUTH_USER(state, value) {
    state.user = value;
  },
  SET_AUTH_TOKEN(state, payload) {
    state.accessToken = payload.token;
    // state.refreshToken = token.refresh_token
  },
  SET_AUTHENTICATED(state, value) {
    state.authenticated = value;
  },
  SET_REFRESHING(state, value) {
    state.isTokenRefreshing = value;
  },
  REMOVE_AUTH_TOKEN(state) {
    state.accessToken = null;
    state.refreshToken = null;
  },
  REMOVE_AUTH_USER(state) {
    state.user = {};
  },
};

const actions = {
  login({ commit }, credential) {
    return new Promise((resolve, reject) => {
      axios
        .post("/api/users/login", credential)
        .then((response) => {
          commit("SET_AUTHENTICATED", true);
          commit("SET_AUTH_TOKEN", response.data);
          resolve(response);
        })
        .catch((response) => {
          reject(response);
        });
    });
  },

  getUser({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      api
        .get("/users/profile")
        .then((response) => {
          //   console.log(response.data, "profile");
          commit("SET_AUTH_USER", response.data);
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  },

  logout({ commit }) {
    commit("SET_AUTHENTICATED", false);
    commit("REMOVE_AUTH_TOKEN");
    commit("REMOVE_AUTH_USER");

    router.push({ name: "login" });
    // router.replace({ name: 'login' })
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
