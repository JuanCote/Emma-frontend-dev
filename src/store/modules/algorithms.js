import { BACKEND_URL } from '@/config.js'


const state = {
    algorithms: []
  };
  
  const mutations = {
    updateAlgorithms(state, algorithms) {
      state.algorithms = algorithms;
    }
  };
  
  const actions = {
    async fetchAlgorithms({ commit }, payload) {
      try {
        const response = await fetch(`${BACKEND_URL}/get_algorithms?bot_id=${payload.botId}`, {
          method: 'GET',
          credentials: 'include'
      });
        const data = await response.json();
        console.log(data)
        commit('updateAlgorithms', data);
      } catch (error) {
        console.error('Ошибка загрузки алгоритмов:', error);
      }
    },
    async deleteAlgorithm({ dispatch, commit }, payload) {
      try {
        const response = await fetch(`${BACKEND_URL}/delete_algorithm?algorithm_id=${payload.id}&bot_id=${payload.botId}`, {
          method: 'DELETE',
          credentials: 'include'
      }).then(() => {
        dispatch('fetchAlgorithms', {botId: payload.botId})
      });
      } catch (error) {
        console.error('Ошибка удаления алгоритма:', error);
      }
    },
    async copyAlgorithm({ commit, dispatch }, payload) {
      try {
        const response = await fetch(`${BACKEND_URL}/copy_algorithm?algorithm_id=${payload.id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(() => {
          dispatch('fetchAlgorithms', {botId: payload.botId})
        });
        
      } catch (error) {
        console.error('Ошибка копирования алгоритма:', error);
      }
    },
    
    async createAlgorithm({commit, dispatch}, payload) {
      try {
        const algorithmToSend = payload.algorithm
        if (payload.tutorial) {
          algorithmToSend.while_tutorial = true
        }
        const response = await fetch(`${BACKEND_URL}/create_algorithm`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(algorithmToSend)
      }).then(() => {
        dispatch('fetchAlgorithms', {botId: payload.algorithm.bot_id})
      })
      } catch (error) {
        console.error('Ошибка создания алгоритма:', error);
      }
    },
    async editAlgorithm({commit, dispatch}, payload) {
      try {
        const response = await fetch(`${BACKEND_URL}/edit_algorithm?algorithm_id=${payload.id}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload.algorithm)
      }).then(() => {
        dispatch('fetchAlgorithms', {botId: payload.botId})
      })
      } catch (error) {
        console.error('Ошибка создания алгоритма:', error);
      }
    } 
  };
  
  export default {
    state,
    mutations,
    actions
  };
  