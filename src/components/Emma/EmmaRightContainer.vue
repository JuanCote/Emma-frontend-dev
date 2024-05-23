<script>
import EmmaAnalytic from "@/components/Emma/EmmaAnalytic.vue"
import EmmaBotSettings from "@/components/Emma/EmmaBotSettings.vue"
import EmmaBotEvents from "@/components/Emma/EmmaBotEvents.vue"
import EditingScript from "@/components/Emma/EditingScript.vue"
import EmmaChat from "./EmmaChat.vue"
import EmmaBotList from "./EmmaBotList.vue"

import { BACKEND_URL } from '@/config.js'


export default {
    data() {
        return {
            showTokenWarning: false,
            menuExpanded: true
        }
    },
    components: {
        EmmaAnalytic,
        EmmaBotSettings,
        EmmaBotEvents,
        EditingScript,
        EmmaChat,
        EmmaBotList,
    },
    methods: {
        botEvents() {
            if (this.tutorial.currentStep == 7 && !this.tutorial.done) {
                this.$store.dispatch('setNextStep', {})
                this.$router.push('/emma/bot_events')
            }else {
                this.$router.push('/emma/bot_events')
            }
        },
        botSettings() {
            if (this.tutorial.currentStep == 17 && !this.tutorial.done) {
                this.$store.dispatch('setNextStep', {})
                this.$router.push('/emma/settings/bot_settings/widget')
            }else {
                this.$router.push('/emma/settings/bot_settings/widget')
            }
        },
        botList() {
            if (this.tutorial.currentStep == 23 && !this.tutorial.done) {
                this.$store.dispatch('setNextStep', {})
                this.$router.push('/emma/all_bots')
            }else {
                this.$router.push('/emma/all_bots')
            }
        }
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
        }
    }
}

</script>

<template>
<div class="emma-right-block">
    <div class="emma-analytic-header">
        <div class="emma-analytic-header-1">
            <!-- <button>Підказки</button> -->
            <div class="p-chosen-bot-div"><p>Обраний помічник > Помічник - {{ chosenBot.name }}</p></div>
            <div v-if="showTokenWarning" class="low-token-balance-warning"><p>Вам потрібно поповнити баланс</p></div>
        </div>
        <!-- <div>
            <img src="@/assets/images/user-question.svg">
            <img src="@/assets/images/analytic-chats-question.svg">
        </div> -->
    </div>
    <!-- <div class="emma-right-container-parts">
        <div class="emma-right-container-left-part">
            <div class="emma-left-menu-container" :class="{'expanded': !menuExpanded}">
                <div>
                    <ul class="emma-left-menu-ul">
                        <li @click="this.$router.push('/emma/chats')" class="emma-left-menu-li" :class="{ 'chosen': $route.path == '/emma/chats' }">
                        <img v-if="$route.path != '/emma/chats'" src="@/assets/images/chats.svg">
                        <img v-if="$route.path == '/emma/chats'" src="@/assets/images/chats-white.svg">
                        <p v-if="menuExpanded">Чати</p>
                        </li>
                        <li @click="botList" class="emma-left-menu-li" :class="{ 'chosen': $route.path.startsWith('/emma/all_bots'), 'tutorial': tutorial.currentStep == 23 && !tutorial.done }">
                        <img v-if="$route.path.startsWith('/emma/all_bots')" src="@/assets/images/all-bots-white.svg">
                        <img v-if="!($route.path.startsWith('/emma/all_bots'))" src="@/assets/images/all-bots-black.svg">
                        <p v-if="menuExpanded">Всі помічники</p>
                        </li>
                        <li @click="botSettings" class="emma-left-menu-li" :class="{ 'chosen': $route.path.startsWith('/emma/settings'), 'tutorial': tutorial.currentStep == 17 && !tutorial.done }">
                        <img v-if="$route.path.startsWith('/emma/settings')" src="@/assets/images/bot_settings_white.svg">
                        <img v-if="!($route.path.startsWith('/emma/settings'))" src="@/assets/images/bot_settings.svg">
                        <p v-if="menuExpanded">Налаштування помічника</p>
                        </li>
                        
                        
                        <li @click="botEvents" class="emma-left-menu-li" :class="{ 'chosen': $route.path.startsWith('/emma/bot_events'), 'tutorial': tutorial.currentStep == 7 && !tutorial.done }">
                        <img v-if="!($route.path.startsWith('/emma/bot_events'))" src="@/assets/images/bot-events.svg">
                        <img v-if="$route.path.startsWith('/emma/bot_events')" src="@/assets/images/bot_events_white.svg">
                        <p v-if="menuExpanded">Події помічника</p>
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
        <div class="emma-right-container-right-part">
            <EmmaAnalytic v-if="$route.path == '/emma/analytic'"></EmmaAnalytic>
            <EmmaBotSettings v-if="$route.path.startsWith('/emma/settings')"></EmmaBotSettings>
            <EmmaBotEvents v-if="$route.path == '/emma/bot_events'"></EmmaBotEvents>
            <EditingScript v-if="$route.path == '/emma/bot_events/create_script'"></EditingScript>
            <EditingScript v-if="$route.path == '/emma/bot_events/edit_script'"></EditingScript>
            <EmmaBotList v-if="$route.path == '/emma/all_bots'"></EmmaBotList>
            <EmmaChat :chatsLoaded="chatsLoaded" :socket="socket" v-if="$route.path == '/emma/chats'"></EmmaChat>
        </div>
    </div> -->
    <EmmaAnalytic v-if="$route.path == '/emma/analytic'"></EmmaAnalytic>
            <EmmaBotSettings v-if="$route.path.startsWith('/emma/settings')"></EmmaBotSettings>
            <EmmaBotEvents v-if="$route.path == '/emma/bot_events'"></EmmaBotEvents>
            <EditingScript v-if="$route.path == '/emma/bot_events/create_script'"></EditingScript>
            <EditingScript v-if="$route.path == '/emma/bot_events/edit_script'"></EditingScript>
            <EmmaBotList v-if="$route.path == '/emma/all_bots'"></EmmaBotList>
            <EmmaChat :chatsLoaded="chatsLoaded" :socket="socket" v-if="$route.path == '/emma/chats'"></EmmaChat>
</div>
</template>

<style>
    .emma-right-container-parts {
        display: flex;
        height: 100%;
        width: 100%;
    }
    .emma-right-container-left-part {
        height: 100%;
        
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