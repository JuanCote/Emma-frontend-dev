<script>
import algorithms from '@/store/modules/algorithms';

 export default {
    data() {
        return {
            newAlgorithm: {
                name: '',
                if_the_user: '',
                then: '',
                keywords: ''
            }
        }
    },
    methods: {
        createAlgorithm() {
            if (this.newAlgorithm.name && this.newAlgorithm.if_the_user && this.newAlgorithm.then && this.newAlgorithm.keywords){
                this.$store.dispatch('createAlgorithm', this.newAlgorithm)
                this.$router.push('/emma/bot_events')
            }
        }
        
    }
 }
</script>

<template>
    <div class="bot-events">
        <div class="bot-events-header">
            <div class="bot-settings-right-menu-header">
                <p class="bot-settings-right-menu-header-settings">Settings</p>
                <img src="@/assets/images/right-arrow.svg">
                <p class="bot-settings-right-menu-header-botSettings">Creating Script</p>
            </div>
            <div class="bot-events-header-buttons">
                <button class="bot-events-header-button">
                    <img src="@/assets/images/plus-instr.svg">
                    <p>Add script</p>
                </button>
                <button class="bot-events-header-button">
                    <img src="@/assets/images/plus-instr.svg">
                    <p>Add category</p>
                </button>
            </div>
        </div>
        <div class="create-script-main">
            <div class="create-script-form">
                <div class="create-script-form-buttons">
                    <div :class="{'chosen': true}" class="create-script-form-button">
                        <p>Main settings</p>
                    </div>
                    <div class="create-script-form-button">
                        <p>Media files</p>
                    </div>
                    <div class="create-script-form-button">
                        <p>Additional</p>
                    </div>
                    <div class="create-script-form-button">
                        <p>Tags</p>
                    </div>
                    <div class="create-script-form-button">
                        <p>Keyboard</p>
                    </div>
                </div>
                <p class="create-script-input-label">Name</p>
                <input v-model="newAlgorithm.name" placeholder="Enter the name" class="create-script-input">
                <div class="create-script-radiobuttons">
                    <div class="create-script-radiobutton">
                        <input name="messageType" type="radio">
                        <p>Start event</p>
                        <img src="@/assets/images/question_creating_script.svg">
                    </div>
                    <div class="create-script-radiobutton">
                        <input name="messageType" type="radio">
                        <p>Unknown message</p>
                        <img src="@/assets/images/question_creating_script.svg">
                    </div>
                    <div class="create-script-radiobutton">
                        <input name="messageType" type="radio">
                        <p>Operator connection</p>
                        <img src="@/assets/images/question_creating_script.svg">
                    </div>
                </div>
                <p class="create-script-input-label">Question</p>
                <input v-model="newAlgorithm.if_the_user" placeholder="Enter a question" class="create-script-input">
                <p class="create-script-input-label">Answer</p>
                <input v-model="newAlgorithm.then" placeholder="Enter the answer" class="create-script-input">
                <p class="create-script-input-label">Keywords</p>
                <input v-model="newAlgorithm.keywords" placeholder="Enter a keywords" class="create-script-input">
                <div class="create-script-buttons">
                    <button @click="createAlgorithm" class="create-script-button chosen">Save</button>
                    <button class="create-script-button"><p>Remove</p></button>
                </div>
            </div>
            <div class="create-script-phone">
                <img src="@/assets/images/phone.svg">
            </div>
        </div>
    </div>
</template>

<style>
    .create-script-button.chosen {
        border: none;
        background: linear-gradient(to bottom left, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        color: white;
    }
    .create-script-button {
        border-radius: 8px;
        border: 1px solid #b371ff;
        height: 43px;
        padding: 16px 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: none;
        color: #b371ff;
    }
    .create-script-buttons {
        margin-top: 24px;
        display: flex;
        gap: 16px;
    }
    .create-script-main {
        margin-top: 16px;
        display: flex;
        justify-content: space-between;
    }
    .create-script-phone img {
        height: 44rem;
        margin-top: 10px;
    }
    .create-script-radiobutton p {
        font-size: 12px;
        margin-top: 5px;
        margin-left: 8px;
    }
    .create-script-radiobutton img {
        margin-left: 4px;
    }
    .create-script-radiobutton {
        display: flex;
        align-items: center;
    }
    .create-script-radiobuttons {
        display: flex;
        gap: 24px;
        margin-top: 12px;
    }
    .create-script-input {
        height: 40px;
        margin-top: 8px;
        width: 100%;
        border-radius: 8px;
        outline: none;
        padding: 8px 16px;
        border: 1px solid rgba(31, 31, 41, 0.16);
    }
    .create-script-input-label {
        margin-top: 24px;
        font-size: 14px;
    }
    .create-script-form-button.chosen {
        background: linear-gradient(to bottom left, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        color: white;
    }
    .create-script-form-button p {
        margin-top: 3px;
    }
    .create-script-form-button {
        border-radius: 8px;
        padding-left: 24px;
        padding-right: 24px;
        height: 39px;
        border: none;
        font-size: 14px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .create-script-form-buttons {
        display: flex;
        gap: 4px;
    }
    .create-script-main {
        display: flex;
        gap: 45px;
    }
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