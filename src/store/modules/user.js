import { BACKEND_URL } from '@/config.js';

const state = {
  user: null
};

const mutations = {
  updateUser(state, user) {
    state.user = user;
  }
};

const actions = {
  async checkUser({ commit }) {
    try {
      const response = await fetch(`${BACKEND_URL}/check_user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      if (response.ok) {
        const user = await response.json();
        commit('updateUser', user);
        return true;
      }
    } catch (error) {
      console.log(error)
      return false;
    }
  }
};

export default {
  state,
  mutations,
  actions
};
