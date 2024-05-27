<script>
import EmmaLeftMenu from "@/components/Emma/EmmaLeftMenu.vue"
import EmmaAnalytic from "@/components/Emma/EmmaAnalytic.vue"
import EmmaRightContainer from "@/components/Emma/EmmaRightContainer.vue"

import { BACKEND_URL_WS } from '@/config.js'
import { BACKEND_URL } from '@/config.js'

export default {
    data() {
        return {
            socket: null,
            chatsLoaded: false,
            paymentLink: String,
            promoInput: '',
            showInvalidPromo: false
        }
    },
    components: {
        EmmaLeftMenu,
        EmmaAnalytic,
        EmmaRightContainer
    },
    created() {
        if (this.tutorial.currentStep == 20 && !this.tutorial.done) {
            try {
                const response = fetch(`${BACKEND_URL}/stipe_generate_link_monthly`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                }).then(response => {
                    return response.json();
                })
                .then(responseData => {
                    this.paymentLink = responseData
                })
            } catch (error) {
                console.error('Get payment link error', error);
            }
        }


        this.$store.dispatch('fetchBots').then(() => {
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
                            chat.emmaProposal = eventData.proposal
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
                    this.$store.dispatch('fetchChats', {botId: this.chosenBot.id})
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
            this.$store.dispatch('fetchChats', {botId: this.chosenBot.id}).then(() => {
                this.chatsLoaded = true
            })
        })
        
    },
    methods: {
        finishTutorial() {
            this.$store.dispatch('finishTutorial')
        },
        async checkPayment() {
            try {
                const response = await fetch(`${BACKEND_URL}/check_payment`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                const responseData = await response.json()
                if (responseData) {
                    this.$store.dispatch('setNextStep', {});
                    const response = await fetch(`${BACKEND_URL}/add_bonus_tokens`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            bot_id: this.chosenBot.id,
                            new_tokens: 333000
                        })
                    })
                    const responseData = await response.json()
                    }
            } catch (error) {
                console.error('Get payment link error', error);
            }

        },
        async checkPromo() {
            try {
                const response = await fetch(`${BACKEND_URL}/check_promo?promo=${this.promoInput}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                const responseData = await response.json()
                if ('success' in responseData) {
                    try {
                        const response = await fetch(`${BACKEND_URL}/create_openai_token`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include',
                            body: JSON.stringify({
                                bot_id: this.chosenBot.id,
                                leased_token: true
                            })
                        })
                        if (response.ok) {
                            const data = await response.json()
                            if (data['message'] == 'token rented successfuly') {
                                this.$store.dispatch('setNextStep', {})
                                this.$router.go(0);
                            }
                        }else {
                            
                        }
                    } catch (error) {
                        console.error('Error creating openai token:', error);
                        throw error;
                    }
                } else if ('error' in responseData) {
                    this.showInvalidPromo = true
                }
                    
            } catch (error) {
                console.error('Checking promo error', error);
            }
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
        },
        chosenBot() {
            return this.$store.state.bots.chosenBot
        }
    },
}
</script>

<template>
    <div class="emma-background">
        <div class="emma-container">
            <!-- <button class="finish-button" @click="finishTutorial">Закінчити туторіал</button> -->
            <div v-if="tutorial.currentStep == 1 && !tutorial.done" class="tutorial-block-start"><p>Привіт! Спочатку створимо першого помічника, для цього натисність кнопку "Створити"</p></div>
            <div v-if="tutorial.currentStep == 2 && !tutorial.done" class="tutorial-block-to-settings-on-start"><p>Перейдіть до налаштувань помічника</p></div>
            <div v-if="tutorial.currentStep == 3 && !tutorial.done" class="tutorial-block-to-knowledge-base"><p>Тепер перейдіть до бази знань помічника</p></div>
            <div v-if="tutorial.currentStep == 4 && !tutorial.done" class="tutorial-block-knowledge-1"><p>Щоб створити свого помічника на базі штучного інтелекту спочатку необхідно заповнити форму "База знань помічника". Почнемо з поля "сфери помічника". Тут ви маєте описати в якій сфері помічник повинен розбиратися. Для того щоб піти далі - натисніть "Далі"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button></div>
            <div v-if="tutorial.currentStep == 5 && !tutorial.done" class="tutorial-block-knowledge-2"><p>В цьому полі необхідно вказати роль, яку повинен відігравати помічник</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button></div>
            <div v-if="tutorial.currentStep == 6 && !tutorial.done" class="tutorial-block-knowledge-3"><p>Опишіть манеру в якій помічник повинен спілкуватися</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button></div>
            <div v-if="tutorial.currentStep == 7 && !tutorial.done" class="tutorial-block-knowledge-4"><p>Вкажіть чи повинен помічник відповідати на повідомлення, що не стосуються теми вашої компанії</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button></div>
            <div v-if="tutorial.currentStep == 8 && !tutorial.done" class="tutorial-block-knowledge-5"><p>Напишіть на якій мові помічник повинен спілкуватися</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button></div>
            <div v-if="tutorial.currentStep == 9 && !tutorial.done" class="tutorial-block-knowledge-6"><p>Щоб зберегти заповнену "базу знань помічника" натисніть "Зберегти"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button></div>
            <div v-if="tutorial.currentStep == 21 && !tutorial.done" class="tutorial-block-api"><p>Це поле для ключа OpenAI. Зараз у вас ввімкнена оренда, тобто буде використовуватися наш ключ, за бажанням можна додати свій</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button></div>
            <div v-if="tutorial.currentStep == 10 && !tutorial.done" class="tutorial-block-knowledge-transition"><p>Тепер перейдіть до подій помічника</p></div>
            <div v-if="tutorial.currentStep == 11 && !tutorial.done" class="tutorial-block-add-script"><p>Створіть свій перший скрипт</p><button class="skip-step" @click="$store.dispatch('setNextStep', {step: 6})">Пропустити крок</button></div>
            <div v-if="tutorial.currentStep == 12 && !tutorial.done" class="tutorial-block-form-script-1"><p>Тут ви можете описати подію, котра буде відпрацьовувати при певних повідомленнях від користувача. Спочатку напишіть назву, вона може бути будь-яка</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button></div>
            <div v-if="tutorial.currentStep == 13 && !tutorial.done" class="tutorial-block-form-script-2"><p>Тепер напишіть "Запитання" на яке подія буде реагувати, наприклад: "Як називається ваша компанія?"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button></div>
            <div v-if="tutorial.currentStep == 14 && !tutorial.done" class="tutorial-block-form-script-3"><p>Зараз напишіть як помічник повинен відповідати на введене запитання, наприклад якщо запитання "Як називається ваша компанія", відповідь може бути "Neuroshop"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {step: 1})">Далі</button></div>
            <div v-if="tutorial.currentStep == 15 && !tutorial.done" class="tutorial-block-form-script-5"><p>Щоб зберегти подію натисніть "Зберегти"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {step: 3}), $router.push('/emma/bot_events')">Пропустити крок</button></div>
            <div v-if="tutorial.currentStep == 16 && !tutorial.done && $route.path != '/emma/bot_events/create_script'" class="tutorial-block-create-or-next"><p>Чудово! Можете ще додати інструкцію або продовжити налаштування, натиснувши "Пропустити крок"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Пропустити крок</button></div>
            <div v-if="tutorial.currentStep == 17 && !tutorial.done" class="tutorial-block-add-document"><p>Додайте документ</p><button class="skip-step" @click="$store.dispatch('setNextStep', {step: 2})">Пропустити крок</button></div>
            <div v-if="tutorial.currentStep == 19 && !tutorial.done" class="tutorial-block-to-settings"><p>Перейдіть до налаштувань помічника</p></div>
            <div v-if="tutorial.currentStep == 18 && !tutorial.done" class="tutorial-block-document-form"><p>В цій формі ви можете завантажити документ, по якому помічник буде відповідати клієнтам, для цього виберіть або перетягніть документ в поле та натисніть кнопку "Завантажити"</p><button class="skip-step" @click="$store.dispatch('setNextStep', {})">Пропустити крок</button></div>
            <div v-if="tutorial.currentStep == 22 && !tutorial.done" class="tutorial-block-get-widjet"><p>Щоб додати чат на ваш веб-сайт, скопіюйте цей код і вставте його прямо перед тегом &lt;/body&gt; у вашому HTML-коді.</p>
                <button class="skip-step" @click="$store.dispatch('setNextStep', {})">Далі</button>
            </div>
            <div v-if="!tutorial.done && (tutorial.currentStep != 16 || $route.path != '/emma/bot_events/create_script')" class="tutorial-background"></div>
            <div v-if="tutorial.currentStep == 23 && !tutorial.done" class="tutorial-block-to-telegram"><p>Перейдіть до налаштувань телеграма</p></div>
            <div v-if="tutorial.currentStep == 24 && !tutorial.done" class="tutorial-block-to-telegram-input"><p>Тут ви можете додати токен вашого телеграм помічнику з BotFather та запустити/зупинити його роботу. Запущений телеграм бот буде відповідати на основі наданих інструкцій</p><button class="finish-button" @click="finishTutorial">Закінчити туторіал</button></div>
            <EmmaLeftMenu/>
            <div class="right-container">
                <div v-if="!socket" class="right-container-loading">
                    <img src="@/assets/images/load.gif">
                </div>
                <EmmaRightContainer v-if="socket" :socket="socket" :chatsLoaded="chatsLoaded"></EmmaRightContainer>
            </div>
        </div>
        <div v-if="tutorial.currentStep == 20 && !tutorial.done" class="payment-form" :class="{'tutorial': tutorial.currentStep == 20}">
            <h1>Нажаль, Emma не є безкоштовною, щоб оплатити місячну підписку перейдіть за посиланням нижче</h1>
            <a v-if="paymentLink" :href="paymentLink"><p>Посилання для оплати</p></a>
            <button @click="checkPayment">Перевірити оплату</button>
            <input placeholder="Промокод" v-model="promoInput" class="promo-input">
            <p v-if="showInvalidPromo" class="promo-invalid-p">Невірний токен</p>
            <button @click="checkPromo" class="promo-check-button">Перевірити промокод</button>
        </div>
    </div>
</template>

<style scoped>
    .tutorial-block-to-knowledge-base {
        color: white;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 7.5em; /* Позиционируйте контент в нужное место */
        left: 55%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-to-settings-on-start {
        color: white;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 10.5em; /* Позиционируйте контент в нужное место */
        left: 45%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-start {
        color: white;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 7em; /* Позиционируйте контент в нужное место */
        left: 15%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .promo-invalid-p {
        text-align: center;
        color: red;
    }
    .promo-input {
        margin-top: 24px;
        border: 1px solid #d9bff5;
        border-radius: 8px;
        height: 30px;
        outline: none;
        padding-left: 8px;
        padding-right: 8px;
    }
    .tutorial-block-document-form {
        color: white;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 22em; /* Позиционируйте контент в нужное место */
        left: -2%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-add-document {
        color: white;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 8em; /* Позиционируйте контент в нужное место */
        left: 55%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-bots {
        color: white;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 18em; /* Позиционируйте контент в нужное место */
        left: 40%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-to-bots {
        color: white;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 17em; /* Позиционируйте контент в нужное место */
        left: 7%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-to-telegram-input {
        color: white;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 23em; /* Позиционируйте контент в нужное место */
        left: 50%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-to-telegram {
        color: white;
        position: absolute;
        text-align: center;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 8em; /* Позиционируйте контент в нужное место */
        left: 70%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .payment-form button:hover {
        background: linear-gradient(to top right, rgba(117, 112, 255, 0.9), rgba(188, 112, 255, 0.9));
    }
    .payment-form button {
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        margin-top: 12px;
        border: none;
        border-radius: 8px;
        height: 40px;
        color: white;
        padding: 0 8px 0 8px;
        cursor: pointer;
    }
    .payment-form p {
        margin-top: 12px;
        font-size: 14px;
        width: 100%;
        overflow-wrap: break-word
    }
    .payment-form h1 {
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        margin-top: 24px;
    }
    .payment-form.tutorial {
        background: white;
        padding: 8px;
        margin-left: -8px;
        border-radius: 8px;
        z-index: 10000;
    }
    .payment-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 25%;
        height: 40%;
        background: white;
        left: 50%;
    }
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
        top: 17em; /* Позиционируйте контент в нужное место */
        left: -1%;
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
        top: 8em; /* Позиционируйте контент в нужное место */
        left: 50%;
        width: 25em;
        z-index: 101;
        padding: 20px;
    }
    .tutorial-block-knowledge-transition {
        color: white;
        position: absolute;
        text-align: center;
        display: flex;
        max-width: 330px;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 18em; /* Позиционируйте контент в нужное место */
        left: 10%;
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
        top: 23em; /* Позиционируйте контент в нужное место */
        left: 15%;
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
        top: 28em; /* Позиционируйте контент в нужное место */
        left: 7%;
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
        top: 23em; /* Позиционируйте контент в нужное место */
        left: 5%;
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
        top: 20em; /* Позиционируйте контент в нужное место */
        left: 5%;
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
        left: 10%;
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
        top: 14%; /* Позиционируйте контент в нужное место */
        left: 78%;
        width: 20em;
        z-index: 101; /* убедитесь, что контент находится выше оверлея */
        padding: 20px;
    }
    .tutorial-block-add-script p {
        text-align: center; /* Center the text within the paragraph */
    }
    .tutorial-block-knowledge-1 {
        color: white;
        position: absolute;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        top: 18em; /* Позиционируйте контент в нужное место */
        left: 21%;
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
        top: 25em; /* Позиционируйте контент в нужное место */
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
        width: 1400px;
        position: relative;
        margin: auto;
        background-color: white;
        
        
    }
</style>
