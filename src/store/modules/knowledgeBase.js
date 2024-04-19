import { BACKEND_URL } from '@/config.js'

const state = {
    noKnowledgeBase: true,
    knowledgeBase: null
};
  
const mutations = {
  
};

const actions = {
  async getKnowledgeBase({ state }) {
    try {
      const response = await fetch(`${BACKEND_URL}/get_knowledge_base`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include' // Включаем передачу кук с запросами
      });

      if (!response.ok) {
          throw new Error('Failed to save knowledge base');
      }

      // Получаем данные из ответа
      const responseData = await response.json();
      if (!('message' in responseData)) {
        state.noKnowledgeBase = false
        state.knowledgeBase = responseData
      }else {
        state.knowledgeBase = {
          field: '',
          role: '',
          manner: '',
          reply_to_non_company_topics: false,
          language: ''
        }
      }
    } catch (error) {
        console.error('Error saving knowledge base:', error);
        throw error;
    }
  },
  async saveKnowledgeBase({ state }) {
    if (state.knowledgeBase.reply_to_non_company_topics == 'true') {
      state.knowledgeBase.reply_to_non_company_topics = true
    }else {
      state.knowledgeBase.reply_to_non_company_topics = false
    }
    try {
      const response = await fetch(`${BACKEND_URL}/add_knowledge_base`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(state.knowledgeBase),
          credentials: 'include' // Включаем передачу кук с запросами
      });

      if (!response.ok) {
          throw new Error('Failed to save knowledge base');
      }

      // Получаем данные из ответа
      const responseData = await response.json();
      state.noKnowledgeBase = false
    } catch (error) {
        console.error('Error saving knowledge base:', error);
        throw error;
    }
  }
};

export default {
  state,
  mutations,
  actions
};
  