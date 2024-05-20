<script>
export default {
    data() {
        return {
            deleteConfirmation: false,
            botToDelete: Object
        };
    },
    methods: {
        createBot() {
            this.$store.dispatch('createBot')
        },
        choseBot(bot) {
            this.$store.dispatch('choseBot', {bot: bot})
        },
        onDelete(bot) {
            this.deleteConfirmation = true
            this.botToDelete = bot
        },
        deleteBot() {
            this.$store.dispatch('deleteBot', this.botToDelete.id)
            this.deleteConfirmation = false
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
    <div class="emma-bot-list">
        <div class="emma-bots-container" :class="{'tutorial': this.tutorial.currentStep == 24 && !this.tutorial.done}">
            <ul>
                <li v-for="bot in bots" @click="choseBot(bot)" :class="{'chosen': chosenBot.id == bot.id}">
                    <p>Бот - {{ bot.name }}</p>
                    <div @click="onDelete(bot)" class="bot-events-script-script-part2-button">
                        <img src="@/assets/images/deleteScript.svg">
                    </div>
                </li>
            </ul>
            <div><button @click="createBot" class="emma-bot-list-create-bot">Create bot</button></div>
        </div>
        <div @click="deleteConfirmation = false" class="emma-bot-list-form-to-delete-background" v-if="deleteConfirmation"></div>
        <div v-if="deleteConfirmation" class="emma-bot-list-form-to-delete">
            <p>Ви точно хочете видалити бота? Всі події/документи, базова інструкція та додані ключі будуть стерті</p>
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
.emma-bots-container {

}
.emma-bots-container.tutorial {
    position: relative;
    z-index: 10000;
    border-radius: 8px;
    background: white;
    padding: 24px;
    transform: translateX(-24px);
}
.emma-bot-list-create-bot {
    margin-top: 10px;
    width: 120px;
    height: 40px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
    color: white;
}
.emma-bot-list ul li.chosen {
    background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
    color: white;
}
.emma-bot-list ul li {
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    font-size: 16px;
    background: white;
    color: black;
    display: flex;
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
    flex-direction: column;
    gap: 8px;
}
</style>