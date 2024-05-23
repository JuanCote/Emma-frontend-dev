<script>
import algorithms from '@/store/modules/algorithms';

 export default {
    data() {
        return {
            showFileUploading: false,
            fileUploadText: 'Виберіть файл',
            invalidExtensionFile: false,
            uploadBlock: false,
            generalBlock: false
        }
    },
    methods: {
        deleteDocument(id) {
            if (!this.generalBlock) {
                this.generalBlock = true
                this.$store.dispatch('deleteDocument', {id: id, botId: this.chosenBot.id}).then(() => {
                    this.generalBlock = false
                })
            }
        },
        deleteAlgorithm(id) {
            if (!this.generalBlock) {
                this.generalBlock = true
                this.$store.dispatch('deleteAlgorithm', {id: id, botId: this.chosenBot.id}).then(() => {
                    this.generalBlock = false
                })
            }
        },
        copyAlgorithm(algorithm) {
            if (!this.generalBlock) {
                this.generalBlock = true
                this.$store.dispatch('copyAlgorithm', {id: algorithm.id, botId: this.chosenBot.id}).then(() => {
                    this.generalBlock = false
                })
            }
        },
        createScript() {
            if (this.tutorial.currentStep == 8 && !this.tutorial.done) {
                this.$store.dispatch('setNextStep', {})
            }
            this.$router.push('/emma/bot_events/create_script')
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileUpload() { 
            const allowedFileTypes = [
                'text/x-c',
                'text/x-csharp',
                'text/x-c++',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/html',
                'text/x-java',
                'application/json',
                'text/markdown',
                'application/pdf',
                'text/x-php',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'text/x-python',
                'text/x-script.python',
                'text/x-ruby',
                'text/x-tex',
                'text/plain',
                'text/css',
                'text/javascript',
                'application/x-sh',
                'application/typescript'
            ];

            const file = this.$refs.fileInput.files[0];

            if (file && allowedFileTypes.includes(file.type) && !this.uploadBlock) {
                this.generalBlock = true
                this.uploadBlock = true
                this.$store.dispatch('uploadDocument', { file, botId: this.chosenBot.id }).then(() => {
                    this.uploadBlock = false
                    this.generalBlock = false
                    this.showFileUploading = false;
                    if (this.tutorial.currentStep == 16 && !this.tutorial.done) {
                        this.$store.dispatch('setNextStep', {});
                    }
                });
            } else {
                alert('Недопустимый тип файла. Пожалуйста, загрузите файл одного из следующих типов: .c, .cs, .cpp, .doc, .docx, .html, .java, .json, .md, .pdf, .php, .pptx, .py, .rb, .tex, .txt, .css, .js, .sh, .ts');
            }
        },

        handleFileUploadToInput() {
            this.fileUploadText = this.$refs.fileInput.files[0].name
        },
        showFileUploadingClick() {
            if (this.tutorial.currentStep == 15 && !this.tutorial.done) {
                this.$store.dispatch('setNextStep', {})
            }
            this.fileUploadText = 'Виберіть файл'
            this.showFileUploading = true
          
        }
     },
    computed: {
        algorithms() {
            return this.$store.state.algorithms.algorithms
        },
        tutorial() {
            return this.$store.getters.getTutorial
        },
        chosenBot() {
            return this.$store.state.bots.chosenBot
        },
        documents() {
            return this.$store.state.documents.documents
        }
    },
    mounted() {
        if (this.tutorial.currentStep == 16 && !this.tutorial.done) {
            this.showFileUploading = true
        }
        this.$store.dispatch('fetchAlgorithms', {botId: this.chosenBot.id})
        this.$store.dispatch('fetchDocuments', {botId: this.chosenBot.id})
    }
 }
</script>

<template>
    <div class="bot-events">
        <img class="general-loading" v-if="generalBlock" src="@/assets/images/load.gif">
        <div class="bot-events-header">
            <div class="bot-settings-right-menu-header">
                <p class="bot-settings-right-menu-header-settings">Події</p>
                <img src="@/assets/images/right-arrow.svg">
                <p class="bot-settings-right-menu-header-botSettings">Всі події</p>
            </div>
            <div class="bot-events-header-buttons">
                <button :class="{'tutorial': (tutorial.currentStep == 15) && !tutorial.done}" @click="showFileUploadingClick" class="bot-events-header-button">
                    <img src="@/assets/images/plus-instr.svg">
                    <p>Завантажити документ</p>
                </button>
                <button :class="{'tutorial': (tutorial.currentStep == 8 || tutorial.currentStep == 14) && !tutorial.done}" @click="createScript" class="bot-events-header-button">
                    <img src="@/assets/images/plus-instr.svg">
                    <p>Додати інструкцію</p>
                </button>
                <!-- <button class="bot-events-header-button">
                    <img src="@/assets/images/plus-instr.svg">
                    <p>Додати кнопку</p>
                </button> -->
            </div>
        </div>
        <div v-if="algorithms.length" class="bot-events-scripts">
            <div class="bot-events-script-header">
                <p class="bot-events-script-header-p">Знайдені події: {{ algorithms.length }}</p>
                <!-- <div class="bot-events-script-header-search-and-bots">
                    <div class="bot-events-script-bots">
                        <p>Всі помічники</p>
                        <img src="@/assets/images/bot-down-arrow.svg">
                    </div>
                    <input placeholder="Search chat"><img class="bot-events-script-bot-lupa" src="@/assets/images/search-script.svg"></input>
                </div> -->
            </div>
            <div v-for="algorithm in algorithms" class="bot-events-script">
                <div class="bot-events-script-scripts">
                    <div class="bot-events-script-script">
                        <div class="bot-events-script-script-part1">
                            <p>1</p>
                            <h1 @click="$router.push(`/emma/bot_events/edit_script?algorithm_id=${algorithm.id}`)">{{ algorithm.name }}</h1>
                        </div>
                        <div class="bot-events-script-script-part2">
                    
                            <div class="bot-events-script-script-selection">
                                <p>Не вибрано</p>
                                <img src="@/assets/images/bot-down-arrow.svg">
                            </div>
                            <div class="bot-events-script-script-part2-buttons">
                                <div @click="copyAlgorithm(algorithm)" class="bot-events-script-script-part2-button">
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
        <div v-if="documents.length" class="bot-events-scripts">
            <div class="bot-events-script-header">
                <p class="bot-events-script-header-p">Знайдені документи: {{ documents.length }}</p>
            </div>
            <div v-for="document in documents" class="bot-events-script">
                <div class="bot-events-script-scripts">
                    <div class="bot-events-script-script">
                        <div class="bot-events-script-script-part1">
                            <p>1</p>
                            <h1>{{ document.file_name }}</h1>
                        </div>
                        <div class="bot-events-script-script-part2">
                                            
                            <div class="bot-events-script-script-part2-buttons">
                                <div @click="deleteDocument(document.file_id)" class="bot-events-script-script-part2-button">
                                    <img src="@/assets/images/deleteScript.svg">
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!documents.length && !algorithms.length" class="bot-events-empty-container">
            <img src="@/assets/images/404algorithms.svg">
            <p>Події та Документи відсутні</p>
            <!-- <div class="bot-events-block-guide">
                <div class="bot-events-block-guide-1">
                    <h1>Як налаштувати подію для вашого бота?</h1>
                    <p>Виконайте ці дії:</p>
                    <ul>
                        <li>Завантажте інформацію про вашу компанію</li>
                        <li>Створіть інструкції</li>
                        <li>Додайте кнопку</li>
                        <li>Опублікуйте бота</li>
                    </ul>
                </div>
                <div class="bot-events-block-guide-2">
                    <h1>Є питання, дивись на</h1>
                    <div class="bot-events-block-guide-2-video">
                        <img src="@/assets/images/youtube-logo.svg">
                        <p>Відео туторіал</p>
                    </div>
                    <p>Напишіть нам:</p>
                    <ul>
                        <li>support@gerabot.com</li>
                        <li>+38 (099) 000-00-00</li>
                    </ul>
                </div>
            </div> -->
        </div>
    </div>
    <div @click="showFileUploading = false" v-if="showFileUploading && !(this.tutorial.currentStep == 17 && !this.tutorial.done)" class="upload-file-window-background"></div>
    <div :class="{'tutorial': this.tutorial.currentStep == 16 && !this.tutorial.done}" v-if="showFileUploading && !(this.tutorial.currentStep == 17 && !this.tutorial.done)" class="upload-file-window">
        <div class="upload-file-form">
            <div @click="triggerFileInput" class="upload-file-form-window-to-drop">
                <p>{{ fileUploadText }}</p>
            </div>
            <input @change="handleFileUploadToInput" type="file" ref="fileInput" style="display: none;" />
            <button @click="handleFileUpload">Завантажити<img v-if="uploadBlock" src="@/assets/images/load.gif"></button>
        </div>
    </div>
</template>

<style>
    .bot-events-block-guide {
        margin-top: 72px;
        border-radius: 8px;
        width: 80%;
        background: white;
        padding: 16px;
        display: flex;
    }
    .bot-events-empty-container img {
        height: 170px;
    }
    .bot-events-empty-container p {
        font-size: 14px;
        font-weight: 500;
    }
    .bot-events-empty-container {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 70px;
        justify-content: center;
    }
    .general-loading {
        position: fixed;
        left: 50%;
        height: 3em;
        transform: translateX(-50%) translateY(-50%);
        top: 50%
    }
    .upload-file-window.tutorial {
        z-index: 10000;
    }
    .upload-file-form-window-to-drop {
        width: 100%;
        height: 100%;
        border: 1px dashed black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .upload-file-window-background {
        position: fixed;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .upload-file-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 12px;
        height: 100%;
        width: 100%;
    }
    .upload-file-form button img {
        height: 10px;
    }
    .upload-file-form button {
        border: none;
        background: linear-gradient(to bottom left, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        height: 30px;
        padding: 0 12px 0 12px;
        border-radius: 8px;
        color: white;
        cursor: pointer;
        display: flex;
        gap: 4px;
        align-items: center;
    }
    .upload-file-window {
        position: fixed;
        height: 30%;
        padding: 12px;
        width: 30%;
        top: 50%;
        left: 50%;
        border-radius: 8px;
        transform: translateX(-50%) translateY(-50%);
        background: white;
    }
    .bot-events-script {
        height: 47px;
    }
    .bot-events-scripts {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 24px;
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
        cursor: pointer;
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
    .bot-events-header-button.tutorial {
        position: relative;
        z-index: 10000;
    }
    .bot-events-header-button {
        height: 43px;
        cursor: pointer;
        border: none;
        padding: 0 24px 0 24px;
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