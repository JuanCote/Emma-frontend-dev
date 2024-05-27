import { BACKEND_URL } from '@/config.js'


const state = {
    buttons: []
  };
  
  const mutations = {
    updateButtons(state, buttons) {
      state.buttons = buttons;
    }
  };
  
  const actions = {
    async fetchButtons({ commit }, payload) {
      try {
        const response = await fetch(`${BACKEND_URL}/get_buttons?bot_id=${payload.botId}`, {
          method: 'GET',
          credentials: 'include'
      });
        const data = await response.json();
        commit('updateButtons', data);
      } catch (error) {
        console.error('Ошибка загрузки кнопок:', error);
      }
    },
    async deleteButton({ dispatch, commit }, payload) {
      try {
        const response = await fetch(`${BACKEND_URL}/delete_button?button_id=${payload.id}`, {
          method: 'DELETE',
          credentials: 'include'
      }).then(() => {
        dispatch('fetchButtons', {botId: payload.botId})
      });
      } catch (error) {
        console.error('Ошибка удаления алгоритма:', error);
      }
    },
    async copyButton({ commit, dispatch }, payload) {
      try {
        const response = await fetch(`${BACKEND_URL}/copy_button?button_id=${payload.id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(() => {
          dispatch('fetchButtons', {botId: payload.botId})
        });
        
      } catch (error) {
        console.error('Ошибка копирования алгоритма:', error);
      }
    },
    
    async createButton({commit, dispatch}, payload) {
      try {
        const buttonToSend = payload.button
    
        const response = await fetch(`${BACKEND_URL}/create_button`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(buttonToSend)
      }).then(() => {
        dispatch('fetchButtons', {botId: payload.button.bot_id})
      })
      } catch (error) {
        console.error('Ошибка создания кнопки:', error);
      }
    },
    async editButton({commit, dispatch}, payload) {
      try {
        const response = await fetch(`${BACKEND_URL}/edit_button?button_id=${payload.id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload.button)
      }).then(() => {
        dispatch('fetchButtons', {botId: payload.botId})
      })
      } catch (error) {
        console.error('Ошибка редактирования кнопки:', error);
      }
    } 
  };
  
  export default {
    state,
    mutations,
    actions
  };
  