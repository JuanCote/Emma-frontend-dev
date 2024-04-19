import { BACKEND_URL } from '@/config.js'

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
          commit('updateUser', user); // Обновление состояния хранилища с помощью мутации
        } else {
          window.location.href = '/auth'; // Редирект на страницу аутентификации в случае ошибки
        }
      } catch (error) {
        console.error('Ошибка при запросе checkUser:', error);
      }
    }
  };
  
  export default {
    state,
    mutations,
    actions
  };
  