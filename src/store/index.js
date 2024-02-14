import { createStore } from 'vuex';

export default createStore({
  state: {
    userPermissions: [], 
  },
  getters: {
    getUserPermissions: (state) => state.userPermissions,
  },
  mutations: {
    setUserPermissions: (state, permissions) => {
      state.userPermissions = permissions;
    },
  },
  actions: {
    updateUserPermissions({ commit }, permissions) {
      commit('setUserPermissions', permissions);
    },
  },
  modules: {
 
  },
});