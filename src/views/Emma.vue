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
        },
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
    },
}
</script>

<template>
    <div class="emma-background">
        <div class="emma-container">
            <div v-if="tutorial.currentStep == 1 && !tutorial.done" class="tutorial-block-knowledge-1"><p>Привіт! Щоб створити свого бота на базі штучного інтелекту спочатку необхідно заповнити форму "База знань бота". Почнемо з поля "сфери бота". Тут ви маєте описати в якій сфері бот повинен розбиратися. Для того щоб піти далі - натисніть "Далі"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 2 && !tutorial.done" class="tutorial-block-knowledge-2"><p>В цьому полі необхідно вказати роль, яку повинен відігравати бот</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 3 && !tutorial.done" class="tutorial-block-knowledge-3"><p>Опишіть манеру в якій бот повинен спілкуватися</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 4 && !tutorial.done" class="tutorial-block-knowledge-4"><p>Вкажіть чи повинен бот відповідати на повідомлення, що не стосуються теми вашої компанії</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 5 && !tutorial.done" class="tutorial-block-knowledge-5"><p>Напишіть на якій мові бот повинен спілкуватися</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 6 && !tutorial.done" class="tutorial-block-knowledge-6"><p>Щоб зберегти заповнену "базу знань бота" натисніть "Зберегти"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 16 && !tutorial.done" class="tutorial-block-api"><p>Тепер вставте ключ API OpenAI, щоб бот міг генерувати відповіді. Після цього натисніть кнопку "Додати ключ"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 7 && !tutorial.done" class="tutorial-block-knowledge-transition"><p>Тепер перейдіть до подій бота</p><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 8 && !tutorial.done" class="tutorial-block-add-script"><p>Створіть свій перший скрипт</p><button class="skip-step" @click="$store.dispatch('setNextStep', {step: 7})">Пропустити крок</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 9 && !tutorial.done" class="tutorial-block-form-script-1"><p>Тут ви можете описати подію, котра буде відпрацьовувати при певних повідомленнях від користувача. Спочатку напишіть назву, вона може бути будь-яка</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 10 && !tutorial.done" class="tutorial-block-form-script-2"><p>Тепер напишіть "Запитання" на яке подія буде реагувати, наприклад: "Як називається ваша компанія?"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 11 && !tutorial.done" class="tutorial-block-form-script-3"><p>Зараз напишіть як бот повинен відповідати на введене запитання, наприклад якщо запитання "Як називається ваша компанія", відповідь може бути "Neuroshop"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 12 && !tutorial.done" class="tutorial-block-form-script-4"><p>По ключовим словам подія відправцьовує на повідомлення користувача. Якщо в повідомленні буде хоч одне слово з вибірки ключових слів - бот відповість тим, що ви написали в "Відповідь" (якщо запитання користувача співпадає з текстом в "Запитання") </p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 13 && !tutorial.done" class="tutorial-block-form-script-5"><p>Щоб зберегти подію натисніть "Зберегти"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {}), $router.push('/emma/bot_events')">Пропустити крок</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 14 && !tutorial.done && $route.path != '/emma/bot_events/create_script'" class="tutorial-block-create-or-next"><p>Чудово! Можете ще додати інструкцію або продовжити налаштування, натиснувши "Пропустити крок"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Пропустити крок</button><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 15 && !tutorial.done" class="tutorial-block-to-settings"><p>Перейдіть до налаштувань бота</p><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <div v-if="tutorial.currentStep == 17 && !tutorial.done" class="tutorial-block-get-widjet"><p>Щоб додати чат на ваш веб-сайт, скопіюйте цей код і вставте його прямо перед тегом &lt;/body&gt; у вашому HTML-коді.</p>
                <button class="finish-button" @click="finishTutorial">Закінчити туторіал</button>
            </div>
            <div v-if="!tutorial.done && (tutorial.currentStep != 14 || $route.path != '/emma/bot_events/create_script')" class="tutorial-background"></div>
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
    .skip-step:hover {
        transform: translateY(-5px); /* Slight upward movement on hover */
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Increased shadow on hover */
    }
    .skip-step {
        margin-top: 10px;
        background: #EAEAF3;
        border-radius: 20px;
        border: none;
        min-width: 100px;
        padding: 10px 20px;
        cursor: pointer;
        transition: all 0.25s ease;
    }
    .tutorial-block-to-settings {
        color: white;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 8.5em; /* Позиционируйте контент в нужное место */
        left: -4%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-create-or-next {
        color: white;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 4em; /* Позиционируйте контент в нужное место */
        left: 40%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-knowledge-transition {
        color: white;
        position: absolute;
        display: flex;
        max-width: 330px;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 18em; /* Позиционируйте контент в нужное место */
        left: -3%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-knowledge-6 p {
        text-align: center;
    }
    .tutorial-block-knowledge-6 {
        color: white;
        position: absolute;
        display: flex;
        max-width: 330px;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 40em; /* Позиционируйте контент в нужное место */
        left: 15%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-knowledge-5 p {
        text-align: center;
    }
    .tutorial-block-knowledge-5 {
        color: white;
        position: absolute;
        display: flex;
        max-width: 330px;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 36em; /* Позиционируйте контент в нужное место */
        left: 15%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-knowledge-4 p {
        text-align: center;
    }
    .tutorial-block-knowledge-4 {
        color: white;
        position: absolute;
        display: flex;
        max-width: 330px;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 32em; /* Позиционируйте контент в нужное место */
        left: 15%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-knowledge-3 p {
        text-align: center;
    }
    .tutorial-block-knowledge-3 {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 25em; /* Позиционируйте контент в нужное место */
        left: 12%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-knowledge-2 p {
        text-align: center;
    }
    .tutorial-block-knowledge-2 {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 20em; /* Позиционируйте контент в нужное место */
        left: 12%;
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
        transition: all 0.25s ease;
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
    .tutorial-block-form-script-5 {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 37em; /* Позиционируйте контент в нужное место */
        left: -2%;
        width: 20em;
        z-index: 101; /* убедитесь, что контент находится выше оверлея */
        padding: 20px;

    }
    .tutorial-block-form-script-5 p {
        text-align: center;
    }
    .tutorial-block-form-script-4 {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 32em; /* Позиционируйте контент в нужное место */
        left: -2%;
        width: 20em;
        z-index: 101; /* убедитесь, что контент находится выше оверлея */
        padding: 20px;

    }
    .tutorial-block-form-script-4 p {
        text-align: center;
    }
    .tutorial-block-form-script-3 {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 30em; /* Позиционируйте контент в нужное место */
        left: -2%;
        width: 20em;
        z-index: 101; /* убедитесь, что контент находится выше оверлея */
        padding: 20px;

    }
    .tutorial-block-form-script-3 p {
        text-align: center;
    }
    .tutorial-block-form-script-2 {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 30em; /* Позиционируйте контент в нужное место */
        left: -2%;
        width: 20em;
        z-index: 101; /* убедитесь, что контент находится выше оверлея */
        padding: 20px;

    }
    .tutorial-block-form-script-2 p {
        text-align: center;
    }
    .tutorial-block-form-script-1 {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 20em; /* Позиционируйте контент в нужное место */
        left: 0%;
        width: 20em;
        z-index: 101; /* убедитесь, что контент находится выше оверлея */
        padding: 20px;

    }
    .tutorial-block-form-script-1 p {
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
    .tutorial-block-knowledge-1 {
        color: black;
        position: absolute;
        display: flex;
        background: white;
        border-radius: 8px;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 14em; /* Позиционируйте контент в нужное место */
        left: 15%;
        width: 20em;
        z-index: 101; /* убедитесь, что контент находится выше оверлея */
        padding: 20px;
    }
    .tutorial-block-knowledge-1 p {
        text-align: center; /* Center the text within the paragraph */
    }
    .tutorial-block-api {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 15em; /* Позиционируйте контент в нужное место */
        left: 15%;
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
