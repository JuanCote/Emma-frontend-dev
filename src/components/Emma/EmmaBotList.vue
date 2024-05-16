<script>
export default {
    data() {
        return {
        };
    },
    methods: {
        createBot() {
            this.$store.dispatch('createBot')
        },
        choseBot(bot) {
            this.$store.dispatch('choseBot', {bot: bot})
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
    <div class="emma-bot-list" :class="{'tutorial': this.tutorial.currentStep == 22}">
        <ul>
            <li v-for="bot in bots" @click="choseBot(bot)" :class="{'chosen': chosenBot.id == bot.id}">Бот - {{ bot.id }}</li>
        </ul>
        <button @click="createBot" class="emma-bot-list-create-bot">Create bot</button>
    </div>
</template>

<style>
.emma-bot-list.tutorial {
    position: relative;
    background: white;
    z-index: 10000;
    width: 100%;
    border-radius: 8px;
}
.emma-bot-list-create-bot {
    margin-top: 10px;
    width: 120px;
    height: 40px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}
.emma-bot-list ul li.chosen {
    background-color: #9b9da3;
}
.emma-bot-list ul li {
    cursor: pointer;
    padding: 10px;
    background-color: #c5c9d1;
    border-radius: 8px;
    color: white;
}
.emma-bot-list {
    padding: 16px;
}
.emma-bot-list ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 140px;
}
</style>