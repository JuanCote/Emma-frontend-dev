<script>
import algorithms from '@/store/modules/algorithms';

 export default {
    methods: {
        deleteAlgorithm(id) {
            this.$store.dispatch('deleteAlgorithm', id)
        },
        copyAlgorithm(id) {
            this.$store.dispatch('copyAlgorithm', id)
        }
    },
    computed: {
        algorithms() {
            return this.$store.state.algorithms.algorithms
        }
    },
    mounted() {
        this.$store.dispatch('fetchAlgorithms')
    }
 }
</script>

<template>
    <div class="bot-events">
        <div class="bot-events-header">
            <div class="bot-settings-right-menu-header">
                <p class="bot-settings-right-menu-header-settings">Settings</p>
                <img src="@/assets/images/right-arrow.svg">
                <p class="bot-settings-right-menu-header-botSettings">Bot settings</p>
            </div>
            <div class="bot-events-header-buttons">
                <button @click="this.$router.push('/emma/bot_events/create_script')" class="bot-events-header-button">
                    <img src="@/assets/images/plus-instr.svg">
                    <p>Add script</p>
                </button>
                <button class="bot-events-header-button">
                    <img src="@/assets/images/plus-instr.svg">
                    <p>Add category</p>
                </button>
            </div>
        </div>
        <div class="bot-events-scripts">
            <div class="bot-events-script-header">
                <p class="bot-events-script-header-p">Events found: {{ algorithms.length }}</p>
                <div class="bot-events-script-header-search-and-bots">
                    <div class="bot-events-script-bots">
                        <p>All bots</p>
                        <img src="@/assets/images/bot-down-arrow.svg">
                    </div>
                    <input placeholder="Search chat"><img class="bot-events-script-bot-lupa" src="@/assets/images/search-script.svg"></input>
                </div>
            </div>
            <div v-for="algorithm in algorithms" class="bot-events-script">
                <div class="bot-events-script-scripts">
                    <div class="bot-events-script-script">
                        <div class="bot-events-script-script-part1">
                            <p>1</p>
                            <h1>{{ algorithm.name }}</h1>
                        </div>
                        <div class="bot-events-script-script-part2">
                    
                            <div class="bot-events-script-script-selection">
                                <p>Not selected</p>
                                <img src="@/assets/images/bot-down-arrow.svg">
                            </div>
                            <div class="bot-events-script-script-part2-buttons">
                                <div @click="copyAlgorithm(algorithm.id)" class="bot-events-script-script-part2-button">
                                    <img src="@/assets/images/copyscript.svg">
                                </div>
                                <div @click="deleteAlgorithm(algorithm.id)" class="bot-events-script-script-part2-button">
                                    <img src="@/assets/images/deleteScript.svg">
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .bot-events-script {
        height: 47px;
    }
    .bot-events-scripts {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .bot-events-script-script-part2-button {
        height: 32px;
        width: 32px;
        background: #EAEAF3;
        display: flex;
        cursor: pointer;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
    }
    .bot-events-script-script-part2-buttons {
        display: flex;
        gap: 4px;
    }
    .bot-events-script-script-selection p {
        font-size: 12px;
        color: rgba(31, 31, 41, 0.5);
        margin-top: 2px;
    }
    .bot-events-script-script-selection {
        border-radius: 20px;
        padding: 6px 8px 6px 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 32px;
        width: 143px;
        border: 1px solid rgba(31, 31, 41, 0.15);
    }
    .bot-events-script-script-part2 {
        display: flex;
        gap: 24px;
    }
    .bot-events-script-script-part1 h1 {
        font-size: 12px;
        display: flex;
        align-items: center;
        font-weight: 500;
    }
    .bot-events-script-script-part1 p {
        border-radius: 4px;
        background: rgba(31, 31, 41, 0.08);
        height: 32px;
        width: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
    }
    .bot-events-script-script-part1 {
        display: flex;
        gap: 8px;
    }
    .bot-events-script-scripts {
        margin-top: 16px;
    }
    .bot-events-script-script {
        background: white;
        padding: 8px;
        display: flex;
        justify-content: space-between;
        border-radius: 8px;
        width: 100%;
        height: 47px;
    }
    .bot-events-script-header-search-and-bots input::placeholder {
        color: rgba(31, 31, 41, 0.5); 
    }
    .bot-events-script-bot-lupa {
        position: absolute;
        cursor: pointer;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
    .bot-events-script-header-search-and-bots input {
        border-radius: 20px;
        height: 40px;
        width: 239px;
        background: white;
        color: rgba(31, 31, 41, 0.5);
        font-size: 12px;
        padding: 10px 40px 10px 12px;
        border: 1px solid rgba(31, 31, 41, 0.15);
        outline: none;
    }
    .bot-events-script-bots p {
        font-size: 12px;
        color: rgba(31, 31, 41, 0.5);
    }
    .bot-events-script-bots {
        border-radius: 20px;
        align-items: center;
        height: 40px;
        width: 114px;
        background: white;
        border: 1px solid rgba(31, 31, 41, 0.15);
        display: flex;
        justify-content: space-between;
        padding: 10px 8px 10px 12px;  
    }
    .bot-events-script-header-search-and-bots {
        display: flex;
        position: relative;
        gap: 8px;
    }
    .bot-events-script-header-p {
        font-size: 16px;
        font-weight: 500;
    }
    .bot-events-script-header {
        margin-top: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .bot-events-header-button {
        width: 171px;
        height: 43px;
        cursor: pointer;
        border: none;
        display: flex;
        display: flex;
        gap: 8px;
        color: white;
        font-size: 14px;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        background: linear-gradient(to bottom left, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
    }
    .bot-events-header-buttons {
        display: flex;
        gap: 8px;
    }
    .bot-events-header {
        display: flex;
        justify-content: space-between;
    }
    .bot-events {
        background: #f0f3fa;
        height: 100%;
        padding: 8px 16px;
    }
</style>