// Ваш основной файл index.js

import { createStore } from "vuex";
import algorithmsModule from "./modules/algorithms";
import chatModule from "./modules/chat"
import User from './modules/user'
import knowledgeBase from './modules/knowledgeBase'
import tutorial from "./modules/tutorial";
import bots from "./modules/bots"
import documents from "./modules/documents";

export default createStore({
  modules: {
    algorithms: algorithmsModule,
    chat: chatModule,
    user: User,
    knowledgeBase: knowledgeBase,
    tutorial: tutorial,
    bots: bots,
    documents: documents
  }
  
});
