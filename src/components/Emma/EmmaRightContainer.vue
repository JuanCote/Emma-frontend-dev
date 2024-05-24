<script>
import EmmaAnalytic from "@/components/Emma/EmmaAnalytic.vue"
import EmmaBotSettings from "@/components/Emma/EmmaBotSettings.vue"
import EmmaBotEvents from "@/components/Emma/EmmaBotEvents.vue"
import EditingScript from "@/components/Emma/EditingScript.vue"
import EmmaChat from "./EmmaChat.vue"

import { BACKEND_URL } from '@/config.js'
import tutorial from "@/store/modules/tutorial"


export default {
    data() {
        return {
            showTokenWarning: false,
            menuExpanded: true,
            deleteConfirmation: false
        }
    },
    components: {
        EmmaAnalytic,
        EmmaBotSettings,
        EmmaBotEvents,
        EditingScript,
        EmmaChat,
    },
    methods: {
        botEvents() {
            if (this.tutorial.currentStep == 10 && !this.tutorial.done) {
                this.$store.dispatch('setNextStep', {})
                this.$router.push('/emma/bot_events')
            }else {
                this.$router.push('/emma/bot_events')
            }
        },
        botSettings() {

            if (this.tutorial.currentStep == 19 && !this.tutorial.done) {
                this.$store.dispatch('setNextStep', {})
                this.$router.push('/emma/settings/bot_settings/widget')
            }else if (this.tutorial.currentStep == 2 && !this.tutorial.done) {
                this.$store.dispatch('setNextStep', {})
                this.$router.push('/emma/settings/knowledge_base')
            }   
            else {
                this.$router.push('/emma/settings/bot_settings/widget')
            }
        },
        deleteBot() {
            if (this.bots.length != 1) {
                this.$store.dispatch('deleteBot', this.chosenBot.id).then(() => {
                    this.deleteConfirmation = false
                })
            }else {
                this.deleteConfirmation = false
                alert('Ви не можете видалити останнього бота')
            }
        },
    },
    props: ['socket', 'chatsLoaded'],
    mounted() {
        try {
            fetch(`${BACKEND_URL}/get_token_balance`, {
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
                return response.json()
            })
            .then(data => {
                if (parseInt(data['tokens']) + parseInt(data['bonus_tokens']) < 5000) {
                    this.showTokenWarning = true
                }
            })
            .catch(error => {
                console.error('Error getting token balance:', error);
                throw error;
            });
        } catch (error) {
            console.error('Error in try block:', error);
            throw error;
        }
    },
    computed: {
        chosenBot() {
            return this.$store.state.bots.chosenBot
        },
        tutorial() {
            return this.$store.state.tutorial.tutorial
        },
        bots() {
            return this.$store.state.bots.bots
        }
    }
}

</script>

<template>
<div v-if="tutorial.currentStep != 1" class="emma-right-block">
    <div class="emma-analytic-header">
        <div class="emma-analytic-header-1">
            <!-- <button>Підказки</button> -->
            <div class="p-chosen-bot-div"><p>> Помічник {{ chosenBot.name }}</p></div>
            <div v-if="showTokenWarning && tutorial.done" class="low-token-balance-warning"><p>Вам потрібно поповнити баланс</p></div>
        </div>
        <!-- <div>
            <img src="@/assets/images/user-question.svg">
            <img src="@/assets/images/analytic-chats-question.svg">
        </div> -->
    </div>
    <div class="emma-right-container-parts">
        <div class="emma-right-container-left-part" :class="{'expanded': !menuExpanded}">
            <div class="emma-right-container-left-part-container">
                <div>
                    <ul class="emma-left-menu-ul">
                        <li @click="this.$router.push('/emma/chats')" class="emma-right-container-left-menu-li" :class="{ 'chosen': $route.path == '/emma/chats' }">
                        <img v-if="$route.path != '/emma/chats'" src="@/assets/images/chats.svg">
                        <img v-if="$route.path == '/emma/chats'" src="@/assets/images/chats-white.svg">
                        <p v-if="menuExpanded">Чати</p>
                        </li>
                        <li @click="botSettings" class="emma-right-container-left-menu-li" :class="{ 'chosen': ($route.path.startsWith('/emma/settings') && tutorial.currentStep != 2), 'tutorial': (tutorial.currentStep == 19 || tutorial.currentStep == 2) && !tutorial.done }">
                        <img v-if="$route.path.startsWith('/emma/settings') && tutorial.currentStep != 2" src="@/assets/images/bot_settings_white.svg">
                        <img v-if="tutorial.currentStep == 2 || !($route.path.startsWith('/emma/settings'))" src="@/assets/images/bot_settings.svg">
                        <p v-if="menuExpanded">Налаштування помічника</p>
                        </li>
                        <li @click="botEvents" class="emma-right-container-left-menu-li" :class="{ 'chosen': $route.path.startsWith('/emma/bot_events'), 'tutorial': tutorial.currentStep == 10 && !tutorial.done }">
                        <img v-if="!($route.path.startsWith('/emma/bot_events'))" src="@/assets/images/bot-events.svg">
                        <img v-if="$route.path.startsWith('/emma/bot_events')" src="@/assets/images/bot_events_white.svg">
                        <p v-if="menuExpanded">Події помічника</p>
                        </li>
                        <li @click="deleteConfirmation = true" class="emma-right-container-left-menu-li">
                        <img class="trash-can" src="@/assets/images/trash.png">
                        <p class="emma-right-container-delete-bot-p" v-if="menuExpanded">Видалити бота</p>
                        </li>
                    </ul>
                </div>
                <div :class="{'expanded': !menuExpanded}" class="emma-left-menu-settings">
                    <div class="emma-left-menu-settings-block">
                        <img @click="this.$router.push('/emma/settings/bot_settings')" src="@/assets/images/settings.svg">
                        <p @click="this.$router.push('/emma/settings/bot_settings')" v-if="menuExpanded"></p>
                    </div>
                    <img @click="menuExpanded = !menuExpanded" src="@/assets/images/dropdown.svg" class="emma-left-menu-button" :class="{'expanded': !menuExpanded}"></img>
                </div>
            </div>
        </div>
        <div v-if="tutorial.currentStep != 2" class="emma-right-container-right-part">
            <EmmaAnalytic v-if="$route.path == '/emma/analytic'"></EmmaAnalytic>
            <EmmaBotSettings v-if="$route.path.startsWith('/emma/settings')"></EmmaBotSettings>
            <EmmaBotEvents v-if="$route.path == '/emma/bot_events'"></EmmaBotEvents>
            <EditingScript v-if="$route.path == '/emma/bot_events/create_script'"></EditingScript>
            <EditingScript v-if="$route.path == '/emma/bot_events/edit_script'"></EditingScript>
            <EmmaChat :chatsLoaded="chatsLoaded" :socket="socket" v-if="$route.path == '/emma/chats'"></EmmaChat>
        </div>
    </div>
    <div @click="deleteConfirmation = false" class="emma-bot-list-form-to-delete-background" v-if="deleteConfirmation"></div>
    <div v-if="deleteConfirmation" class="emma-bot-list-form-to-delete">
        <p>Ви точно хочете видалити помічника? Всі події/документи, базова інструкція та додані ключі будуть стерті</p>
        <div class="emma-bot-list-delete-form-buttons">
            <button @click="deleteBot" class="yes">Так</button>
            <button @click="deleteConfirmation = false">Ні</button>
        </div>
    </div>
</div>
</template>

<style>
    .emma-bot-list-delete-form-buttons button.yes {
        background: #ec4134;
    }
    .emma-bot-list-delete-form-buttons button {
        padding: 12px 24px;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        background: #36c26d;
        color: white;

    }
    .emma-bot-list-delete-form-buttons {
        display: flex;
        gap: 4px;
        justify-content: center;
        margin-top: 20px;
    }
    .emma-bot-list-form-to-delete p {
        text-align: center;
    }
    .emma-bot-list-form-to-delete {
        position: fixed;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        top: 50%;
        width: 20%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .emma-bot-list-form-to-delete-background {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    .emma-right-container-delete-bot-p {
        margin-top: 3px;
    }
    .trash-can {
        height: 15px;
    }
    .emma-right-container-left-menu-li.chosen {
        color: white;
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        border-radius: 0 8px 8px 0;
    }
    .emma-right-container-left-menu-li {
        display: flex;
        align-items: center;
        height: 51px;
        padding-left: 24px;
        gap: 16px;
        cursor: pointer;
    }
    .emma-right-container-left-part-container {
        transition: width 0.5s ease;
        display: flex;
        height: 100%;
        flex-direction: column;
        border-right: 1px solid rgba(31, 31, 41, 0.15);
    }
    .emma-right-container-parts {
        display: flex;
        height: 100%;
        overflow-y: hidden;
        width: 100%;
    }
    .emma-right-container-left-part.expanded {
        width: 7%;
    }
    .emma-right-container-left-part {
        height: 100%;
        width: 31%;
        transition: width 0.5s ease;
    }
    .emma-right-container-right-part {
        height: 100%;
        width: 100%;
    }
    .low-token-balance-warning {
        font-size: 14px;
        font-weight: 400;
        background: #eb1010;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 20px 0 20px;
        border-radius: 8px;height: 100%;
    }
    .low-token-balance-warning p {
        color: white;
    }
    .emma-analytic-header-1 {
        display: flex;
        height: 33px;
        align-items: center;
    }
    .p-chosen-bot-div p {
        color: #5A5A76;
    }
    .p-chosen-bot-div {
        font-size: 14px;
        font-weight: 400;
        background: #EAEAF3;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 20px 0 20px;
        border-radius: 8px;
    }
    .emma-right-block {
        display: flex;
        flex-direction: column;
    }
</style>