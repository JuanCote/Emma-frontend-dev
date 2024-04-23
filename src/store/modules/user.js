import { BACKEND_URL } from '@/config.js'
import router from '../../router/index.js'

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
        } else if (response.status === 401) {
          return false;
        }
      } catch (error) {
        console.error('Ошибка при запросе checkUser:', error);
        return false;
      }
    }
  };
  
  export default {
    state,
    mutations,
    actions
  };
  