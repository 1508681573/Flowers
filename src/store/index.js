import { createStore } from 'vuex'

export default createStore({
  state: {
    loginStatus: false,
    token: '',
    userName: ''
  },
  mutations: {
    SET_LOGINSTATUS: (state,status) => {
      state.loginStatus = status
    },
    SET_TOKEN: (state,token) => {
      state.token = token
    },
    SET_USERNAME: (stare,name) => {
      stare.userName = name
    }
  },
  actions: {
  },
  modules: {
  }
})
