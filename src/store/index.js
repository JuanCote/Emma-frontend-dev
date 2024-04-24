// Ваш основной файл index.js

import { createStore } from "vuex";
import algorithmsModule from "./modules/algorithms";
import chatModule from "./modules/chat"
import User from './modules/user'
import knowledgeBase from './modules/knowledgeBase'
import tutorial from "./modules/tutorial";

export default createStore({
  modules: {
    algorithms: algorithmsModule,
    chat: chatModule,
    user: User,
    knowledgeBase: knowledgeBase,
    tutorial: tutorial
  }
  
});
