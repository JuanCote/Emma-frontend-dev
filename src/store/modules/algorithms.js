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
    async fetchAlgorithms({ commit }) {
      try {
        const response = await fetch(`${BACKEND_URL}/get_algorithms`, {
          method: 'GET',
          credentials: 'include'
      });
        const data = await response.json();
        commit('updateAlgorithms', data);
      } catch (error) {
        console.error('Ошибка загрузки алгоритмов:', error);
      }
    },
    async deleteAlgorithm({ commit }, id) {
      try {
        const response = await fetch(`${BACKEND_URL}/delete_algorithm?algorithm_id=${id}`, {
          method: 'DELETE',
          credentials: 'include'
      });
        const data = await response.json();
        commit('updateAlgorithms', data);
      } catch (error) {
        console.error('Ошибка удаления алгоритма:', error);
      }
    },
    async copyAlgorithm({commit}, algorithm) {
      console.log(algorithm)
    },
    async createAlgorithm({commit, dispatch}, algorithm) {
      const algorithmToSend = Object.assign({}, algorithm);
      algorithmToSend.keywords = algorithmToSend.keywords.split(' ')
      try {
        const response = await fetch(`${BACKEND_URL}/create_algorithm`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(algorithmToSend)
      }).then(() => {
        dispatch('fetchAlgorithms')
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
  