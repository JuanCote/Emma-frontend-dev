<script>
import { BACKEND_URL } from '@/config.js'

 export default {
    data() {
        return {
            buttonBlock: false,
            editing: false,
            newButton: {
                button_text: '',
                response_text: '',
            },
            options: {
                modules: {
                toolbar: ['bold', 'italic', 'link']
                },
                placeholder: 'Введіть відповідь',
                readOnly: false,
                theme: 'snow'
            }
        }
    },
    methods: {
        createButton() {
            if (!this.buttonBlock) {
                if (this.newButton.button_text && this.newButton.response_text){
                    this.newButton.bot_id = this.chosenBot.id
                    this.newButton.response_text = this.newButton.response_text.replace(/<\/?p>/g, '');
                    if (this.editing) {
                        this.buttonBlock = true
                        this.$store.dispatch('editButton', {button: this.newButton, id: this.$route.query.button_id, botId: this.chosenBot.id}).then(() => {
                            this.$router.push('/emma/bot_events')
                        })
                    }else {
                        this.buttonBlock = true
                        this.$store.dispatch('createButton', {button: this.newButton}).then(() => {
                            if (this.tutorial.currentStep == 15 && !this.tutorial.done) {
                                this.$router.push('/emma/bot_events')
                                this.$store.dispatch('setNextStep', {})
                            }else {
                                this.$router.push('/emma/bot_events')
                            }
                        })
                    }
                }
            }
        }
    },
    computed: {
        tutorial() {
            return this.$store.getters.getTutorial
        },
        buttons() {
            return this.$store.state.buttons.buttons
        },
        chosenBot() {
            return this.$store.state.bots.chosenBot
        }
    },
    created() {
        this.$store.dispatch('fetchButtons', {botId: this.chosenBot.id}).then(() => {
            if (this.$route.query.button_id) {
                const id = this.$route.query.button_id
                this.editing = true
                
                this.buttons.forEach(element => {
                    if (element.id == id) {
                        this.newButton.button_text = element.button_text
                        this.newButton.response_text = element.response_text
                    }
                });
            }
        })
    }
 }
</script>

<template>
    <div class="bot-events">
        <div class="bot-events-header">
            <div class="bot-settings-right-menu-header">
                <p class="bot-settings-right-menu-header-settings">Події</p>
                <img src="@/assets/images/right-arrow.svg">
                <p class="bot-settings-right-menu-header-botSettings">Створення кнопки</p>
            </div>
            <div class="bot-events-header-buttons">
                
               
            </div>
        </div>
        <div class="create-script-main">
            <div class="create-script-form">
              
                <div class="create-script-form-content"> 
                    <div class="create-script-div" :class="{'tutorial': tutorial.currentStep == 13 && !tutorial.done}">
                        <p class="create-script-input-label">Текст кнопки</p>
                        <p class="create-script-describe-creating-script">Напишіть текст кнопки, котрий буде відображатися на ній</p>
                        <input v-model="newButton.button_text" placeholder="Введіть запитання" class="create-script-input">
                    </div>
                    <div class="create-script-div-for-response-text" :class="{'tutorial': tutorial.currentStep == 14 && !tutorial.done}">
                        <p class="create-script-input-label">Відповідь</p>
                        <p class="create-script-describe-creating-script">Який текст повинен з'явитися при натисканні на кнопку</p>
                        <div class="quill-container"><QuillEditor resi class="create-script-input" v-model:content="newButton.response_text" content-type="html" :options="options" theme="snow" /></div>
                    </div>   
                    <div class="create-script-buttons">
                        <div :class="{'tutorial': tutorial.currentStep == 15 && !tutorial.done}" class="create-script-save-button-div">
                            <button @click="createButton" class="create-script-button chosen">Зберегти<img v-if="buttonBlock" src="@/assets/images/load.gif"></button>
                        </div>
                        <button class="create-script-button"><p>Видалити</p></button>
                    </div>
                </div>
            </div>
            <div class="create-script-phone">
                <img src="@/assets/images/phone.png">
            </div>
        </div>
    </div>
</template>

<style>
    .create-script-div-for-response-text {
        max-width: 400px;
        margin-top: 12px;
    }
    .quill-container {
        margin-top: 12px;
    }
    .create-script-save-button-div.tutorial {
        position: relative;
        padding: 10px;
        z-index: 10000;
        width: 99px;
        transform: translateX(-10px) translateY(-10px);
        background: white;
        border-radius: 8px;
        width: 124px;
    }
    .create-script-save-button-div {
        width: 104px;
    }
    .create-script-div.tutorial {
        position: relative;
        padding: 10px;
        z-index: 10000;
        transform: translateX(-10px);
        background: white;
        border-radius: 8px;
    }
    .create-script-div {
        max-width: 100%;
        margin-top: 12px;
    }
    .create-script-describe-creating-script {
        font-size: 12px;
        color: rgba(31, 31, 41, 0.5); 
        margin-top: 8px;
    }
    .create-script-adding-keyword {
        border: none;
        z-index: 2;
        background-color: transparent;
        outline: none;
    }
    .empty-keywords-p {
        position: absolute;
        z-index: 1;
    }
    .create-script-container-all button img {
        height: 10px;
    }
    .create-script-container-all button {
        border-radius: 8px;
        display: flex;align-items: center;
        justify-content: center;
        gap: 5px;
        background: #EAEAF3;
        font-size: 12px;
        color: #5A5A76;
        height: 40px;
        max-height: 60px;
        cursor: pointer;
        border: none;
        min-width: 140px;
    }
    .create-script-container-all {
        display: flex;
        margin-top: 8px;
        gap: 8px;
    }
    .create-script-container-keywords p {
        margin-top: 3px;
        color: rgba(31, 31, 41, 0.7); 
        font-size: 13px;
    }
    .create-script-keyword img {
        cursor: pointer;
    }
    .create-script-keyword p {
        margin-top: 2px;
        font-size: 12px;
    }
    .create-script-keyword {
        display: flex;
        border-radius: 4px;
        border: 1px solid rgba(31, 31, 41, 0.15);
        padding: 8px;
        gap: 8px;
    }
    .create-script-container-keywords {
        border-radius: 8px;
        align-items: center;
        background: white;
        border: 1px solid rgba(31, 31, 41, 0.16);
        padding: 8px;
        display: flex;
        gap: 4px;
        min-height: 40px;
        width: 100%;
        flex-wrap: wrap;
    }
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
        transition: background 0.5s ease, transform 0.5s ease;
    }

    .create-script-button:hover {
        background: linear-gradient(to top right, rgba(90, 85, 220, 1), rgba(150, 85, 220, 1)); /* Darker shades */
        transform: scale(1.05);
    }
    .create-script-button:active {
        transform: scale(0.95);
        transition: transform 0.2s;
    }
    .create-script-buttons img {
        height: 10px;
        position: absolute;
        right: 10px;
    }
    .create-script-buttons button {
        position: relative;
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
        height: 40rem;
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
        padding: 8px 8px;
        border: 1px solid rgba(31, 31, 41, 0.16);
    }
    .create-script-input-label-name {
        font-size: 14px;
    }
    .create-script-input-label {
        margin-top: 12px;
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
    .create-script-form-content {
        margin-top: 24px;
    }
    .create-script-form-content.tutorial {
        position: relative;
        background: white;
        padding: 10px 10px 10px 10px;
        transform: translateX(-10px);
        border-radius: 8px;
        z-index: 10000;
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