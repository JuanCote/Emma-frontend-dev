<script>
export default {
  data() {
    return {
        botNameInput: ''
    };
  },
  computed: {
    tutorial() {
        return this.$store.getters.getTutorial
    },
    bots() {
        return this.$store.state.bots.bots
    },
    chosenBot() {
        return this.$store.state.bots.chosenBot
    },
    
  },
  methods: {
    choseBot(bot) {
        if (bot.id != this.chosenBot.id) {
            this.bots.forEach(element => {
                if (bot != element) {
                    element.editing = false
                    element.popup = false
                }
            });
            this.$store.dispatch('choseBot', {bot: bot})
            
            window.location.reload()
        }
    },
    createBot() {
        if (this.tutorial.currentStep == 1) {
            this.$store.dispatch('setNextStep', {})
        }else {
            this.$store.dispatch('createBot')
        }
    },
    changeBotName(bot) {
        if (this.botNameInput.length != 0){
            this.$store.dispatch('changeBotName', {id: bot.id, name: this.botNameInput})
            bot.name = this.botNameInput
            bot.editing = false
        }
    }
  }
};
</script>

<template>
    <div class="emma-left-menu-container">
        <div>
            <div class="emma-left-menu-header">
                <img src="@/assets/images/logo.jpg">
                <h1 class="emma-left-menu-h1">EMMA</h1>
            </div>
            <ul class="emma-left-menu-ul">
                <li v-if="tutorial.currentStep != 1" v-for="(bot, index) in bots" @click="choseBot(bot)" class="emma-left-menu-li" :class="{ 'chosen': chosenBot.id == bot.id }">
                  <div class="emma-left-menu-li-1">
                    <p v-if="!bot.editing && bot.name != bot.id">Помічник {{bot.name}}</p>
                    <p v-if="!bot.editing && bot.name == bot.id">Помічник {{index + 1}}</p>
                    <input v-model="botNameInput" maxlength="20" class="" v-if="bot.editing">
                    <img @click="bot.popup = !bot.popup; bot.editing = false" src="@/assets/images/3dots.png">
                    <div @click="bot.editing = true; bot.popup = false" v-if="bot.popup" class="emma-left-menu-li-popup">
                        <p>Змінити назву</p>
                    </div>
                  </div>
                  <button @click="changeBotName(bot)" v-if="bot.editing" class="emma-left-menu-save-name">Зберегти</button>
                </li>
            </ul>
            <div :class="{'tutorial': tutorial.currentStep == 1}" @click="createBot" class="emma-left-menu-create-bot">
                <img src="@/assets/images/fiol_plus.jpg">
                <p>Створити</p>
            </div>
        </div>
    </div>
</template>

<style>
    .emma-left-menu-li-1 input {
        height: 25px;
        outline: none;
        border: none;
        border-radius: 4px;
        padding-left: 8px;
    }
    .emma-left-menu-save-name {
        margin-top: -12px;
        border: none;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
    }
    .emma-left-menu-li-1 {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }
    .emma-left-menu-li-popup p {
        cursor: pointer;
    }
    .emma-left-menu-li-popup {
        position: absolute;
        right: 0;
        color: black;
        padding: 8px;
        z-index: 1;
        border-radius: 8px;
        transform: translateX(100%);
        background: #EAEAF3;
    }
    .emma-left-menu-li-1 img {
        height: 15px;
    }
    .emma-left-menu-create-bot.tutorial {
        position: relative;
        z-index: 10000;
        background: white;
        width: 100%;
        border-radius: 8px;
    }
    .emma-left-menu-create-bot img {
        height: 1.5em;
        margin-top: 2px;
    }
    .emma-left-menu-create-bot p {
        font-size: 14px;
        background: linear-gradient(to top right, #BC70FF, #7570FF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    .emma-left-menu-create-bot {
        border-top: 1px solid rgba(31, 31, 41, 0.1);
        border-bottom: 1px solid rgba(31, 31, 41, 0.1);
        padding: 12px 24px;
        align-items: center;
        cursor: pointer;
        display: flex;
        gap: 8px;
    }
    .emma-left-menu-button.expanded {
        transform: rotate(180deg);
    }
    .emma-left-menu-button {
        cursor: pointer;
    }
    .emma-left-menu-settings-block {
        gap: 8px;
        display: flex;
    }
    .emma-left-menu-settings img {
        cursor: pointer;
    }
    .emma-left-menu-settings p {
        margin-top: 3px;
        font-size: 12px;
        cursor: pointer;
    }
    .emma-left-menu-settings.expanded {
        flex-direction: column;
    }
    .emma-left-menu-settings {
        margin-top: auto;
        display: flex;
        padding: 16px;
        justify-content: space-between;
        gap: 8px;
        align-items: center;
    }
    .emma-left-menu-li.chosen {
        color: white;
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        border-radius: 0 8px 8px 0;
    }
    .emma-left-menu-li-1 p {
        margin-top: 4px;
        word-break: break-all;
    }
    .emma-left-menu-li.tutorial {
        position: relative;
        background: white;
        z-index: 10000;
        width: 100%;
        border-radius: 8px;
    }
    .emma-left-menu-li {
        display: flex;
        flex-direction: column;
        padding: 13px 24px;
        gap: 16px;
        justify-content: space-between;
        font-size: 14px;
        cursor: pointer;
        align-items: center;
    }
    .emma-left-menu-ul {
        list-style: none;
        position: relative;
    }
    .emma-left-menu-container {
        display: flex;
        height: 100vh;
        width: 20%;
        flex-direction: column;
        border-right: 1px solid rgba(31, 31, 41, 0.15);
    }
    .emma-left-menu-header {
        gap: 8px;
        align-items: center;
        display: flex;
        padding: 20px 15px 37px 15px;
    }
    .emma-left-menu-h1 {
        margin-top: 2px;
        font-size: 22px;
        font-weight: 600;
    }
</style>