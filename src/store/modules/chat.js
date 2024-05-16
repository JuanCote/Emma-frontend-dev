// modules/chat.js

import { BACKEND_URL } from '@/config.js'

const state = {
    chats: null,
    archive: [],
    selectedChat: null
  };
  
  const mutations = {
    updateChats(state, chats) {
      state.chats = chats;
    },
    updateArchive(state, archive) {
      state.archive = archive;
    },
    selectChat(state, chat) {
      state.selectedChat = chat
    },
  };
  
  const actions = {
    async fetchChats({ commit }, payload) {
      try {
        const response = await fetch(`${BACKEND_URL}/get_chats?bot_id=${payload.botId}`, {
          credentials: 'include'
        });
        const data = await response.json();
  
        // Если данные - это объект, а не массив, добавьте его в массив
        // Проходимся по каждому объекту в data
        let count = 0
        const resultChats = []
        for (const chat in data) {
          const newChat = {
            id: count,
            name: chat,
            dropdown: false, 
            takeToWork: data[chat].takeToWork,
            displayProposal: false,
            emmaProposal: '',
            input: ''
          }
          const messages = []
          data[chat].messages.forEach(element => {
            messages.push({
              sender: element.sender,
              message: element.text
            })
          });
          newChat['messages'] = messages
          resultChats.push(newChat)
          count++
        }
        commit('updateChats', resultChats);
        if (resultChats.length > 0) {
          commit('selectChat', resultChats[0]); 
        }
      } catch (error) {
        console.error('Ошибка загрузки чатов:', error);
      }
    },
  };
  
  
  export default {
    state,
    mutations,
    actions
  };
  