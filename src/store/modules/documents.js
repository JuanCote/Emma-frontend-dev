import { BACKEND_URL } from '@/config.js'


const state = {
    documents: []
  };
  
  const mutations = {
    updateDocuments(state, documents) {
      state.documents = documents;
    }
  };
  
  const actions = {
    async fetchDocuments({ commit }, payload) {
      try {
        const response = await fetch(`${BACKEND_URL}/get_files?bot_id=${payload.botId}`, {
          method: 'GET',
          credentials: 'include'
      });
        const data = await response.json();
        commit('updateDocuments', data);
      } catch (error) {
        console.error('Ошибка загрузки алгоритмов:', error);
      }
    },
    async deleteDocument({ dispatch, commit }, payload) {
      try {
        const response = await fetch(`${BACKEND_URL}/delete_file?file_id=${payload.id}&bot_id=${payload.botId}`, {
          method: 'DELETE',
          credentials: 'include'
      }).then(() => {
        dispatch('fetchDocuments', {botId: payload.botId})
      });
      } catch (error) {
        console.error('Ошибка удаления алгоритма:', error);
      }
    },
    
    async uploadDocument({commit, dispatch}, payload) {
      try {
        const formData = new FormData();
        formData.append('file', payload.file);
        formData.append('bot_id', payload.botId);

        const response = await fetch(`${BACKEND_URL}/upload_file`, {
          method: 'POST',
          credentials: 'include',
          body: formData
        }).then(() => {
          dispatch('fetchDocuments', {botId: payload.botId})
        })
      } catch (error) {
        console.error('Ошибка создания алгоритма:', error);
      }
    },
  };
  
  export default {
    state,
    mutations,
    actions
  };
  