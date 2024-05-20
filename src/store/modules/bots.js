import { BACKEND_URL } from '@/config.js'
import { compileScript } from 'vue/compiler-sfc';


const state = {
    bots: [],
    chosenBot: Object
  };
  
  const mutations = {
    updateBots(state, bots) {
      state.bots = bots;
    },
    updateChosenBot(state, bot) {
        state.chosenBot = bot
    }
  };
  
  const actions = {
    async fetchBots({ commit }) {
      try {
        const response = await fetch(`${BACKEND_URL}/get_telegram_bots`, {
          method: 'GET',
          credentials: 'include'
      });
        const data = await response.json();
        state.chosenBot = data[0]
        commit('updateBots', data);
      } catch (error) {
        console.error('Ошибка загрузки алгоритмов:', error);
      }
    },
    async deleteBot({ commit }, id) {
      try {
        const response = await fetch(`${BACKEND_URL}/delete_bot?bot_id=${id}`, {
          method: 'DELETE',
          credentials: 'include'
      });
        const data = await response.json();
        commit('updateBots', data);
        commit('updateChosenBot', data[0]);
      } catch (error) {
        console.error('Ошибка удаления алгоритма:', error);
      }
    },
    async createBot({commit, dispatch}) {
      try {
        const response = await fetch(`${BACKEND_URL}/add_telegram_bot`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
      }).then(() => {
        dispatch('fetchBots')
      })
      } catch (error) {
        console.error('Ошибка создания алгоритма:', error);
      }
    },
    async choseBot({commit, dispatch}, payload) {
        commit('updateChosenBot', payload.bot)
    }
  };
  
  export default {
    state,
    mutations,
    actions
  };
  