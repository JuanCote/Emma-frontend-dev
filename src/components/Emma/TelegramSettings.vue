<script>
import { BACKEND_URL } from '@/config.js'

export default {
    data() {
        return {
            tokenInput: '',
            tokenInputError: false,
            hasOpenaiToken: false,
            tokenRented: false,
            placeholderInputOpenai: 'API Key',
            placeholderTelegram: 'Телеграм токен',
            telegramTokenInput: '',
            botRunning: Boolean
        }
    },
    methods: {
        async startBot() {
            try {
                const response = await fetch(`${BACKEND_URL}/start_telegram_bot?bot_id=${this.chosenBot.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                })
                if (response.ok) {
                    const data = await response.json()
                    if (data['message'] == 'Bot started successfully') {
                        this.botRunning = true
                    }
                }
            } catch (error) {
                console.error('Error starting telegram bot:', error);
                throw error;
            }
        },
        async createToken(leased=false) {
            try {
                const response = await fetch(`${BACKEND_URL}/create_openai_token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        token: this.tokenInput,
                        bot_id: this.chosenBot.id,
                        leased_token: leased
                    })
                })
                if (response.ok) {
                    this.hasOpenaiToken = true
                    const data = await response.json()
                    if (data['message'] == 'token rented successfuly') {
                        this.tokenRented = true
                        this.placeholderInputOpenai = 'Токен орендовано'
                        this.tokenInput = ''
                    }
                    if (this.tutorial.currentStep == 16 && !this.tutorial.done) {
                        this.$store.dispatch('setNextStep')
                    }
                }else {
                    this.tokenInput = ''
                    this.tokenInputError = true
                    this.placeholderInputOpenai = 'Невалідний OpenAI ключ'
                }
            } catch (error) {
                console.error('Error creating openai token:', error);
                throw error;
            }
        },
        async addTelegramToken() {
            try {
                const response = await fetch(`${BACKEND_URL}/add_token_to_telegram_bot`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        token: this.telegramTokenInput,
                        bot_id: this.chosenBot.id,
                    })
                })
            } catch (error) {
                console.error('Error creating openai token:', error);
                throw error;
            }
            if (this.tutorial.currentStep == 20 && !this.tutorial.done) {
                this.$store.dispatch('setNextStep', {})
                this.$router.push('/emma/all_bots')
            }
        }
    },
    mounted() {        
        fetch(`${BACKEND_URL}/check_telegram_bot_status?bot_id=${this.chosenBot.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            this.botRunning = responseData
        })
        .catch(error => {
            console.error('Error getting openai token:', error);
            throw error;
        });



        this.telegramTokenInput = this.chosenBot.telegram_bot_token ? this.chosenBot.telegram_bot_token : ''
        try {
            fetch(`${BACKEND_URL}/get_openai_tokens?bot_id=${this.chosenBot.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Преобразуем тело ответа в JSON
            })
            .then(data => {
                if (!('error' in data)) {
                    this.hasOpenaiToken = true
                    if (data.leased) {
                        this.placeholderInputOpenai = 'Токен орендовано'
                        this.tokenRented = true
                    }else {
                        const token = data.token;
                        this.tokenInput = token 
                    }
                }
            })
            .catch(error => {
                console.error('Error getting openai token:', error);
                throw error;
            });
        } catch (error) {
            console.error('Error in try block:', error);
            throw error;
        }
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
        tutorial() {
            return this.$store.getters.getTutorial
        },
        chosenBot() {
            return this.$store.state.bots.chosenBot
        }
    }
}
</script>


<template>
    <div class="widget-settings">
        <div class="telegram-settings-adding-telegram-token" :class="{'tutorial': this.tutorial.currentStep == 20}">
            <p class="widget-settings-openai">Додавання токену бота</p>
            <p class="create-script-describe-creating-script">Сюди треба вставити токен вашого телеграм бота, котрий отримується в BotFather</p>
            <div class="telegram-settings-telegram-div">
                <input v-model="telegramTokenInput" maxlength="46" :placeholder="placeholderTelegram">
                <button @click="addTelegramToken">Додати</button>
            </div>
            <button @click="startBot" v-if="!botRunning" class="telegram-bot-start">Запустити</button>
            <button v-if="botRunning" class="telegram-bot-stop">Зупинити</button>
        </div>
        <div class="widget-settings-adding-openai-key">
            <p class="widget-settings-openai">Додавання API-ключа від OpenAI</p>
            <p class="create-script-describe-creating-script">Ви хочете використовувати власний API-ключ OpenAI або орендувати наш? Використання власного ключа дає вам контроль над витратами, але вимагає самостійного управління балансом. Оренда ключа — це швидший та простіший спосіб</p>
            <div class="widget-settings-openai-div">
                <input :class="{'error': tokenInputError, 'rented': tokenRented}" v-model="tokenInput" :placeholder="placeholderInputOpenai">
                <button @click="createToken()" class="colored"><p>Додати ключ</p></button>
                <button @click="createToken(leased=true)" class="widget-settings-rent-button"><p>Орендувати ключ</p></button>
            </div>
        </div>
    </div>
</template>

<style>
    .telegram-bot-stop {
        background: red;
        border-radius: 8px;
        height: 40px;
        padding: 0 8px 0 8px;
        border: none;
        color: white;
        margin-top: 12px;
        cursor: pointer;
    }
    .telegram-bot-start {
        background: green;
        border-radius: 8px;
        height: 40px;
        padding: 0 8px 0 8px;
        border: none;
        color: white;
        margin-top: 12px;
        cursor: pointer;
    }
    .telegram-settings-adding-telegram-token.tutorial {
        position: relative;
        background: white;
        padding: 8px;
        margin-left: -8px;
        border-radius: 8px;
        z-index: 10000;
    }
    .telegram-settings-telegram-div button {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        height: 32px;
        padding: 0 8px 0 8px;
        background: #EAEAF3;
        font-size: 12px;
        color: #5A5A76;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
    .telegram-settings-telegram-div {
        height: 40px;
        position: relative;
    }
    .telegram-settings-telegram-div input {
        font-size: 12px;
        width: 100%;
        height: 100%;
        padding: 0 8px 0 8px;
        outline: none;
        border: 1px solid rgba(31, 31, 41, 0.16);
        border-radius: 8px;
    }
    .widget-settings-rent-button {
        transition: all 0.25s ease;
    }
    .widget-settings-rent-button:hover {
        background: #e1e1e6;
    }
    .widget-settings-openai-div button.colored {
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        color: white;
        width: 120px;
        transition: background 0.5s ease, transform 0.5s ease;
    }

    .widget-settings-openai-div button.colored:hover {
        background: linear-gradient(to top right, rgba(90, 85, 220, 1), rgba(150, 85, 220, 1)); /* Darker shades */
        transform: scale(1.05);
    }
    .widget-settings-openai-div button.colored:active {
    transform: scale(0.95);
    transition: transform 0.2s;
    }
    .widget-settings-openai-div button {
        border-radius: 8px;
        background-color: #EAEAF3;
        padding: 16px 8px;
        font-size: 12px;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 120px;
        cursor: pointer;
    }
    .widget-settings-openai-div input.rented::placeholder {
        color: green;
    }
    .widget-settings-openai-div input.error::placeholder {
        color: red;
    }
    .widget-settings-openai-div input {
        font-size: 12px;
        padding: 16px 8px;
        width: 100%;
        outline: none;
        border: 1px solid rgba(31, 31, 41, 0.16);
        border-radius: 8px;
    }
    .bot-knowledge-inputs {
        position: relative;
    }
    .widget-settings-adding-openai-key {
        margin-top: 16px;
    }
    .widget-settings-adding-openai-key.tutorial {
        position: relative;
        background: white;
        padding: 8px;
        margin-left: -8px;
        border-radius: 8px;
        z-index: 10000;
    }
    .widget-settings-openai-div {
        gap: 8px;
        display: flex;
        height: 40px;
        margin-top: 8px;
    }
    .widget-settings-openai {
        font-size: 16px;
        margin-top: 8pxpx;
        font-weight: 500;
    }
    .widget-settings-code img {
        cursor: pointer;
    }
    .widget-settings-code p {
        font-weight: 500;
        font-size: 12px;
        margin-top: 2px;
    }
    .widget-settings-code.tutorial {
        position: relative;
        background: white;
        border-radius: 8px;
        z-index: 10000;
    }
    .widget-settings-code {
        margin-top: 16px;
        border-radius: 8px;
        background: white;
        padding: 8px;
        width: 100%;
        justify-content: space-between;
        display: flex;
        align-items: center;
    }
    .widget-settings-instruction {
        font-size: 12px;
        color: rgba(31, 31, 41, 0.5)
    }
    .widget-settings {
        margin-top: 16px;
    }
</style>