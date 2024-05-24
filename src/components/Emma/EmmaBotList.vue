<script>
export default {
    data() {
        return {
            deleteConfirmation: false,
            botToDelete: Object,
            generalBlock: false,
            botNameInput: ''
        };
    },
    methods: {
        createBot() {
            this.$store.dispatch('createBot')
        },
        choseBot(bot) {
            this.bots.forEach(botInArray => {
                if (bot != botInArray) {
                    botInArray.editing = false
                }
            });
            this.$store.dispatch('choseBot', {bot: bot})
        },
        onDelete(bot) {
            if (this.bots.length != 1) {
                this.deleteConfirmation = true
                this.botToDelete = bot
            }
        },
        deleteBot() {
            if (!this.generalBlock) {
                this.generalBlock = true
                this.deleteConfirmation = false
                this.$store.dispatch('deleteBot', this.botToDelete.id).then(() => {
                    this.generalBlock = false
                })
            }
        },
        changeBotName(bot) {
            if (this.botNameInput.length != 0){
                this.$store.dispatch('changeBotName', {id: bot.id, name: this.botNameInput})
                bot.name = this.botNameInput
                bot.editing = false
            }
        }
    },
    computed: {
        bots() {
            return this.$store.state.bots.bots
        },
        chosenBot() {
            return this.$store.state.bots.chosenBot
        },
        tutorial() {
            return this.$store.getters.getTutorial
        }
    },
  
}
</script>

<template>
    <img class="general-loading" v-if="generalBlock" src="@/assets/images/load.gif">
    <div class="emma-bot-list">
        <div class="emma-bots-container" :class="{'tutorial': this.tutorial.currentStep == 26 && !this.tutorial.done}">
            <div class="emma-bots-header">
                <p>Your bots: {{ bots.length }}</p>
                <div>
                    <button @click="createBot" class="emma-bot-list-create-bot"><img src="@/assets/images/white-plus.svg"><p>Create bot</p></button>
                </div>
            </div>
            <ul>
                <li v-for="bot in bots" @click="choseBot(bot)" :class="{'chosen': chosenBot.id == bot.id}">
                    <p>Помічник - 
                        <span v-if="!bot.editing" @click="bot.editing = true">{{ bot.name }}</span>
                        <input v-model="botNameInput" maxlength="20" class="emma-bots-bot-name-input" v-if="bot.editing">
                        <button @click="changeBotName(bot)" class="emma-bots-bot-editing-name-button" v-if="bot.editing">Зберегти</button>
                    </p>
                    <div @click="onDelete(bot)" class="bot-events-script-script-part2-button">
                        <img src="@/assets/images/deleteScript.svg">
                    </div>
                </li>
            </ul>
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
.emma-bots-bot-editing-name-button {
    background: #EAEAF3;
    border: none;
    margin-left: 8px;
    border-radius: 4px;
    cursor: pointer;
    padding: 4px;
}
.emma-bots-bot-name-input {
    border-radius: 8px;
    border: none;
    height: 20px;
    outline: none;
    padding-left: 8px;
    padding-right: 8px;
}
.emma-bots-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
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
.emma-bots-container {

}
.emma-bots-container.tutorial {
    position: relative;
    z-index: 10000;
    border-radius: 8px;
    background: white;
    padding: 12px;
    transform: translateX(-12px);
}
.emma-bot-list-create-bot p {
    margin-top: 2px;
}
.emma-bot-list-create-bot {
    margin-top: 10px;
    padding: 12px 24px;
    height: 40px;
    border: none;
    gap: 8px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    background: linear-gradient(to top right, #BC70FF, #7570FF);
    color: white;
}
.emma-bot-list ul li.chosen {
    background: linear-gradient(to top right, #7570FF, #BC70FF);
    color: white;
}
.emma-bot-list ul li {
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    font-size: 16px;
    border: 1px solid rgba(31, 31, 41, 0.16);
    color: black;
    background: white;
    display: flex;
    font-size: 12px;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
    margin-bottom: 8px;
}
.emma-bot-list {
    padding: 16px;
    background: #f0f3fa;
    height: 100%;
}
.emma-bot-list ul {
    list-style-type: none;
    display: inline-block;
    width: 100%;
    margin-top: 16px;
    flex-direction: column;
    gap: 8px;
}
</style>