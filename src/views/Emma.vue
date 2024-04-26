<script>
import EmmaLeftMenu from "@/components/Emma/EmmaLeftMenu.vue"
import EmmaAnalytic from "@/components/Emma/EmmaAnalytic.vue"
import EmmaRightContainer from "@/components/Emma/EmmaRightContainer.vue"

import { BACKEND_URL_WS } from '@/config.js'

export default {
    data() {
        return {
            socket: null,
            chatsLoaded: false,
        }
    },
    components: {
        EmmaLeftMenu,
        EmmaAnalytic,
        EmmaRightContainer
    },
    created() {
        this.socket = new WebSocket(`${BACKEND_URL_WS}/ws`);
        this.socket.onopen = () => {
          const data = {
              type: 'manager',
              user_id: this.user.id
          };
          this.socket.send(JSON.stringify(data));
      };
      this.socket.onmessage = (event) => {
          const eventData = JSON.parse(event.data);
          const chats = this.chats.slice()
          let chatFound = false; 
          chats.forEach((chat) => {
              if (chat.name == eventData.chat_id) {
                  if ("message" in eventData){
                      chat.messages.push({sender: 'user', message: eventData.message});
                  }
                  else if ("proposal" in eventData) {
                      chat.displayProposal = true
                      chat.emmaProposal = eventData.proposal['answer']
                  }
                  chatFound = true; 
              }
          });
          const archive = this.archive.slice()
          let archiveFound = false; 
          archive.forEach((chat) => {
              if (chat.name == eventData.chat_id) {
                  if ("message" in eventData){
                      chat.messages.push({sender: 'user', message: eventData.message});
                  }
                  else if ("proposal" in eventData) {
                      chat.displayProposal = true
                      chat.emmaProposal = eventData.proposal['answer']
                  }
                  archiveFound = true; 
              }
          });
          if (!chatFound && !archiveFound) {
              this.$store.dispatch('fetchChats')
          }
          this.$nextTick(() => {
              let container = document.querySelector('.emma-chat-messages');
              container.scrollTop = container.scrollHeight;
          });
      };
      this.socket.onclose = () => {
      console.log('Соединение закрыто');
      };
      this.socket.onerror = (error) => {
      console.error('Произошла ошибка:', error);
      };
      this.$store.dispatch('fetchChats').then(() => {
          this.chatsLoaded = true
      })

    },
    methods: {
        finishTutorial() {
            this.$store.dispatch('finishTutorial')
            this.$router.push('/emma/settings/bot_settings')
        }
    },
    computed: {
        selectedChat() {
            return this.$store.state.chat.selectedChat
        },
        chats() {
            return this.$store.state.chat.chats
        },
        archive() {
            return this.$store.state.chat.archive
        },
        user() {
            return this.$store.state.user.user
        },
        tutorial() {
            return this.$store.getters.getTutorial
        }
    }
}
</script>

<template>
    <div class="emma-background">
        <div class="emma-container">
            <div v-if="tutorial.currentStep == 1 && !tutorial.done" class="tutorial-block-api"><p>Спочатку вставте ключ API OpenAI, щоб бот міг генерувати відповіді. Після цього натисніть кнопку "Додати ключ"</p><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 2 && !tutorial.done" class="tutorial-block-knowledge-transition"><p>Тепер перейдіть до бази знань бота</p><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 3 && !tutorial.done" class="tutorial-block-knowledge"><p>Чудово! Тепер заповніть форму для опису бота і після цього натисніть кнопку "Зберегти"</p><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 4 && !tutorial.done" class="tutorial-block-add-script"><p>Тепер створіть свій перший скрипт</p><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 5 && !tutorial.done" class="tutorial-block-form-script"><p>У цій формі потрібно описати скрипт, який реагуватиме на конкретні повідомлення. В полі "Назва" ви можете вказати будь-яку назву на ваш вибір. У поле "Запитання" вам потрібно ввести запитання, на яке скрипт буде реагувати. У поле "Відповідь" вкажіть, як бот має відповісти на це запитання. У поле "Ключові слова" ви можете вказати слова, на які скрипт буде реагувати у повідомленні від користувача</p><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 6 && !tutorial.done" class="tutorial-block-get-widjet"><p>Щоб додати чат на ваш веб-сайт, скопіюйте цей код і вставте його прямо перед тегом &lt;/body&gt; у вашому HTML-коді.</p>
                <button class="finish-button" @click="finishTutorial">Закінчити туторіал</button>
            </div>
            <div v-if="!tutorial.done" class="tutorial-background"></div>
            <EmmaLeftMenu/>
            <div class="right-container">
                <div v-if="!socket" class="right-container-loading">
                    <img src="@/assets/images/load.gif">
                </div>
                <EmmaRightContainer v-if="socket" :socket="socket" :chatsLoaded="chatsLoaded"></EmmaRightContainer>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .tutorial-block-knowledge-transition p {
        text-align: center;
    }
    .tutorial-block-knowledge-transition {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 11em; /* Позиционируйте контент в нужное место */
        left: 16%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .finish-button {
        margin-top: 10px;
        border-radius: 20px; 
        border: none;
        height: 40px; 
        padding: 10px 20px; 
        background: linear-gradient(to right, #7F00FF, #E100FF); /* Added the missing semicolon */
        color: white;
        font-weight: bold; 
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: all 1s ease;
    }
    .finish-button:hover {
        transform: translateY(-5px); /* Slight upward movement on hover */
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Increased shadow on hover */
    }

    .finish-button:active {
        transition: all 1s ease;
        transform: translateY(1px); /* Slight downward movement on click */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Reduced shadow on click */
    }
    .tutorial-block-get-widjet {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 30%; /* Позиционируйте контент в нужное место */
        left: 10%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-get-widjet p {
        text-align: center; /* Center the text within the paragraph */
    }
    .tutorial-block-form-script {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 35%; /* Позиционируйте контент в нужное место */
        left: -2%;
        width: 20em;
        z-index: 101; /* убедитесь, что контент находится выше оверлея */
        padding: 20px;

    }
    .tutorial-block-form-script p {
        text-align: center;
    }
    .tutorial-block-add-script {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 8%; /* Позиционируйте контент в нужное место */
        left: 45%;
        width: 20em;
        z-index: 101; /* убедитесь, что контент находится выше оверлея */
        padding: 20px;
    }
    .tutorial-block-add-script p {
        text-align: center; /* Center the text within the paragraph */
    }
    .tutorial-block-knowledge {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 50%; /* Позиционируйте контент в нужное место */
        left: 17%;
        width: 20em;
        z-index: 101; /* убедитесь, что контент находится выше оверлея */
        padding: 20px;
    }
    .tutorial-block-knowledge p {
        text-align: center; /* Center the text within the paragraph */
    }
    .tutorial-block-api {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 31em; /* Позиционируйте контент в нужное место */
        left: 67%;
        width: 20em;
        z-index: 101; /* убедитесь, что контент находится выше оверлея */
        padding: 20px;
    }
    .tutorial-block-api p {
        text-align: center; /* Center the text within the paragraph */
    }
    .tutorial-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* полупрозрачный черный цвет */
        z-index: 100; /* убедитесь, что оверлей находится выше других элементов */
    }
    .right-container {
        position: relative;
        width: 100%;
        overflow-x: auto;
    }
    .right-container-loading img {
        height: 3em;
    }
    .right-container-loading {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translateX(50%);
    }
    .emma-right-block {
        height: 100vh;
        width: 100%;
    }
    .emma-background {
        background-color: #e9e9e9;
    }
    .emma-container {
        display: flex;
        width: 1280px;
        position: relative;
        margin: auto;
        background-color: white;
        
        
    }
</style>
