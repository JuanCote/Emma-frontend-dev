<script>
export default {
    data() {
        return { 
            archiveShow: false,
            image: null,
            imageUrl: null
        }
    },
    props: ['socket', 'chatsLoaded'],
    methods: {
        selectChat(index, archived = false) {
            if (!archived) {
                this.chats.forEach((chat) => {
                    if (chat.id === index) {
                        this.$store.commit('selectChat', chat);
                    } else {
                        chat.dropdown = false
                    }
                });
            }else {
                this.archive.forEach((chat) => {
                    if (chat.id === index) {
                        this.$store.commit('selectChat', chat);
                    } else {
                        chat.dropdown = false
                    }
                });
            }
        },
        selectChatById(id, chat_list) {
            chat_list.forEach(element => {
                if (element.id == id) {
                    this.$store.commit('selectChat', element);
                } 
            });
        },
        toggleDropdown(index, archived=false) {
            if (!archived) {
                this.chats.forEach((chat) => {
                    if (chat.id === index) {
                        chat.dropdown = !chat.dropdown
                    } else {
                        chat.dropdown = false
                    }
                });
            }else {
                this.archive.forEach((chat) => {
                    if (chat.id === index) {
                        chat.dropdown = !chat.dropdown
                    } else {
                        chat.dropdown = false
                    }
                });
            }
        },
        takeToWork() {
            this.selectedChat.takeToWork = !this.selectedChat.takeToWork
            this.selectedChat.dropdown = false
            const data = {
                type: 'take_on',
                to: this.selectedChat.name,
            };
            this.socket.send(JSON.stringify(data));
        },
        toArchive() {
            this.archive.push(this.selectedChat)
            this.selectedChat.dropdown = false
            this.chats.splice(this.chats.indexOf(this.selectedChat), 1)
            if (!this.chats.length == 0) {
                this.selectChat(this.chats[0].id)
            }
        },
        fromArchive() {
            this.chats.push(this.selectedChat)
            this.selectedChat.dropdown = false
            this.archive.splice(this.archive.indexOf(this.selectedChat), 1)
            if (!this.archive.length == 0) {
                this.selectChat(this.archive[0].id, true)
            } 
        },
        sendMessage(event) {
            if (this.selectedChat.input.length != 0) {
                if (!event.shiftKey) {
                        if (this.selectedChat.input || this.image) {
                        if (this.image) {
                            this.selectedChat.messages.push({sender: 'assistant', message: this.selectedChat.input, imageUrl: this.imageUrl})
                        }else {
                            this.selectedChat.messages.push({sender: 'assistant', message: this.selectedChat.input})
                        }
                        const data = {
                            type: 'message',
                            from: 'manager',
                            bot_id: this.chosenBot.id,
                            user_id: this.user.id,
                            to: this.selectedChat.name,
                            text: this.selectedChat.input
                        };
                        this.socket.send(JSON.stringify(data));
                        this.selectedChat.input = ''
                        this.selectedChat.displayProposal = false
                        this.image = null
                        this.imageUrl = null
                        this.archive.forEach(element => {
                            if (element.id == this.selectedChat.id) {
                                this.fromArchive()
                                this.selectChatById(element.id, this.chats)
                            }
                        });
                        this.$nextTick(() => {
                            let container = document.querySelector('.emma-chat-messages');
                            container.scrollTop = container.scrollHeight;
                        });
                    }
                }
                
            }
        },
        openFilePicker() {
            this.$refs.fileInput.click();
        },
        handleFileUpload(event) {
            const files = event.target.files;
            if (files.length > 0) {
                const image = files[0]
                const fileNameParts = image.name.split('.');
                const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
                if (['jpg', 'jpeg', 'png', 'svg'].includes(fileExtension)) {
                    this.image = image
                    this.imageUrl = URL.createObjectURL(image);
                }else {
                    alert('Selected file is not an image')
                }
            }
        },
        scrollToBottom() {
            let container = document.querySelector('.emma-chat-messages');
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }
     },
    computed: {
        selectedChat() {
            return this.$store.state.chat.selectedChat
        },
        chats() {
            return this.$store.state.chat.chats
        },
        archive() {
            return this.$store.state.chat.archive
        },
        user() {
            return this.$store.state.user.user
        },
        chosenBot() {
            return this.$store.state.bots.chosenBot
        }
    },
    mounted() {
        if(this.chatsLoaded) {
            this.scrollToBottom();
        }
    },
    watch: {
        chatsLoaded(newValue) {
            // При изменении пропса вызываем метод прокрутки, если чаты загружены
            if (newValue) {
                this.scrollToBottom();
            }
        }
    },
}
</script>

<template>
    <div class="emma-chat-container-main">
        <div v-if="!chats" class="emma-chat-loading">
            <img src="@/assets/images/load.gif">
        </div>
        <div v-if="chats" class="emma-chat">
            <div class="bot-events-header">
                <div class="bot-settings-right-menu-header">
                    <p class="bot-settings-right-menu-header-settings">Чати</p>
                    <img src="@/assets/images/right-arrow.svg">
                    <p class="bot-settings-right-menu-header-botSettings">Всі чати</p>
                </div>
            </div>
            <div>
                
            </div>
            <div class="bot-events-script-header">
                    <p class="bot-events-script-header-p">Чати: {{ chats.length }}</p>
                    <!-- <div class="bot-events-script-header-search-and-bots">
                        <input placeholder="Знайти чат"><img class="bot-events-script-bot-lupa" src="@/assets/images/search-script.svg"></input>
                    </div> -->
                </div>
            <div class="emma-chat-container">
                <div class="emma-chat-chats">
                    <ul class="emma-chat-chats-ul">
                        <li class="emma-chats-empty" v-if="chats.length == 0 && archive.length == 0">У вас немає чатів</li>
                        <li v-for="(chat) in chats" :key="chat.id" :class="{ 'choosen': chat == selectedChat }" @click="selectChat(chat.id)" class="emma-chat-chats-li">
                            <p>{{ chat.name }}</p>
                            <img @click="toggleDropdown(chat.id)" class="emma-chat-chats-3dots" src="@/assets/images/3dots.svg">
                            <div v-if="chat.dropdown" class="emma-chat-chats-dropdown">
                                <ul>
                                    <li @click="toArchive(chat.id)"><img src="@/assets/images/archive.svg"><span>Архів</span></li>
                                    <li :class="{'taken': chat.takeToWork == true}" @click="takeToWork(chat.id)"><img src="@/assets/images/takeon.svg"><span>До роботи</span></li>
                                </ul>
                            </div>
                        </li>
                        <li v-if="archive.length != 0" class="emma-chats-archive"><img src="@/assets/images/fromarchive.svg"><span>З архіву</span></li>
                        <li v-for="(chat) in archive" :key="chat.id" :class="{ 'choosen': chat == selectedChat }" @click="selectChatById(chat.id, this.archive)" class="emma-chat-chats-li">
                            <p>{{ chat.name }}</p>
                            <img @click="toggleDropdown(chat.id, true)" class="emma-chat-chats-3dots" src="@/assets/images/3dots.svg">
                            <div v-if="chat.dropdown" class="emma-chat-chats-dropdown-archive">
                                <ul>
                                    <li :class="{'taken': chat.takeToWork == true}" @click="takeToWork()">До роботи</li>
                                    <li @click="fromArchive()">Витягнути з архіву</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-if="chats.length > 0 || archive.length > 0" class="emma-chat-field">
                    <div class="emma-chat-messages">
                        <div class="emma-chat-message-for" v-for="(message) in selectedChat.messages">
                            <div :class='"emma-chat-message-container-" + message.sender'>
                                <div :class='"emma-chat-message-object-" + message.sender'>
                                    <img :class="'emma-chat-message-img' + (!message.message ? ' nonemessage' : '')" v-if="message.imageUrl" :src="message.imageUrl">
                                    <div v-if="message.message" :class="'emma-chat-message-' + message.sender + (message.imageUrl ? ' image' : '')">
                                        <p>{{ message.message }}</p>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <div v-if="selectedChat.displayProposal" class="emma-chat-proposal">
                        <p class="emma-chat-proposal-p">{{ selectedChat.emmaProposal }}</p>
                        <div class="emma-chat-proposal-buttons">
                            <button @click="selectedChat.input = selectedChat.emmaProposal" class="emma-chat-proposal-send"><img src="@/assets/images/Frame 29307.svg"></button>
                            <button @click="selectedChat.displayProposal = false" class="emma-chat-proposal-cross"><img src="@/assets/images/close.svg"></button>        
                        </div>
                    </div>
                    </div>
                    <img class="emma-chat-chosen-image" :src="imageUrl" alt="Selected Image" v-if="imageUrl" />
                    <div class="emma-chat-input-and-clip">
                        <div class="emma-chat-chat-input-container">
                            <textarea @keyup.enter="sendMessage" v-model="selectedChat.input" class="emma-chat-input" placeholder="Текст"></textarea>
                            <img @click="sendMessage" class="emma-chat-input-send" src="@/assets/images/send.svg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .bot-events-script-bots {
        position: relative;
    }
    .bot-events-script-bots-ul li {

    }
    .bot-events-script-bots-ul {
        position: absolute;
        top: 100%;
        list-style-type: none;
    }
    .emma-chat-message-for {
        
    }
    .emma-chat-loading img {
        height: 3em;
    }
    .emma-chat-loading {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .emma-chat-container-main {
        background: #f0f3fa;
        padding: 8px 16px;
        height: 100%;
        overflow-y: hidden;
    }
    .emma-chat {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .emma-chat-input-and-clip {
        display: flex;
        margin-top: 24px;
        gap: 8px;
    }
    .emma-chat-message-container-user {
        display: flex;
        flex-direction: column;
        margin-right: 20px;
    }
    .emma-chat-message-container-assistant {
        display: flex;
        flex-direction: column;
        align-items: end;
        max-width: 95%;
        margin-left: auto;
    }
    .emma-chat-message-assistant p {
        overflow-wrap: break-word; 
        word-wrap: break-word;
        white-space: pre-line;
    }
    .emma-chat-message-assistant.image {
        text-align: start;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        width: 100%;
    }
    .emma-chat-message-assistant {
        padding: 16px;
        font-size: 15px;
        max-width: 100%;
        color: white;
        border-radius: 16px 16px 4px 16px;
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        margin-left: auto;
    }
    .emma-chat-message-user {
        padding: 16px;
        color: white;
        font-size: 15px;
        white-space: pre-line;
        color: #1F1F29;
        border-radius: 16px 16px 16px 4px;
        background-color: #EAEAF3;
    }
    .emma-chat-message-object-user {
        display: flex;
        flex-direction: column;
        max-width: fit-content;
    }
    .emma-chat-message-object-assistant {
        display: flex;
        max-width: 100%;
        flex-direction: column;
        align-items: end;
    }
    .emma-chat-message-img.nonemessage {
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
    }
    .emma-chat-message-img {
        border-top-right-radius: 16px;
        border-top-left-radius: 16px;
        max-height: 20rem;
        width: 100%;
    }
    .emma-chat-chosen-image {
        max-height: 20rem;
        max-width: 30%;
        margin-top: 20px;
    }
    .emma-chat-fileinput {
        display: none;
    }
    .emma-chat-input-clip {
        margin-left: 8px;
        padding: 8px;
        border-radius: 12px;
        border: 1px solid rgba(31,31,41,0.08);
        cursor: pointer;
    }
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-50%);
        }
        to {
            opacity: 100;
            transform: translateY(0);
        }
    }
    .emma-chats-archive.choosen {
        background-color: #d9d9d9;
    }
    .emma-chats-archive span {
        margin-top: 3px;
    }
    .emma-chats-archive {
        font-weight: 500;
        font-size: 13px;
        padding: 12px;
        position: relative;
        gap: 4px;
        display: flex;
        background-color: rgba(31,31,31,0.04);;
        align-items: center;
        border-bottom: 1px solid rgba(31,31,31,0.08);
    }
    .emma-chats-archive:hover {
        cursor: pointer;
    }
    .emma-chats-empty {
        font-weight: 500;
        font-size: 20px;
        position: relative;
        padding: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .emma-chat-chats-dropdown-archive li.taken {
        color: green
    }
    .emma-chat-chats-dropdown li.taken {
        color: green
    }
    .emma-chat-chats-dropdown li {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px 25px 12px 12px;
        gap: 8px;
    }
    .emma-chat-chats-dropdown li:hover {
        background-color: rgba(234,234,234,0.5);
    }
    .emma-chat-chats-dropdown li span {
        margin-top: 3px;
    }
    .emma-chat-chats-dropdown ul {
        list-style: none;
        display: flex;
        flex-direction: column;
    }
    .emma-chat-chats-dropdown {
        z-index: 10;
        border: 1px solid rgba(31,31,31,0.16);
        right: -10px;
        transform: translateX(100%);
        position: absolute;
        top: 0;        
        font-weight: 500;
        border-radius: 8px;
        background-color: white;
    }
    .emma-chat-chats-dropdown-archive {
        z-index: 10;
        border: 1px solid rgba(31,31,31,0.16);
        right: -10px;
        transform: translateX(100%);
        position: absolute;
        top: 0;        
        font-weight: 500;
        border-radius: 8px;
        background-color: white;
    }
    .emma-chat-chats-dropdown-archive li span {
        margin-top: 3px;
    }
    .emma-chat-chats-dropdown-archive ul {
        list-style: none;
        display: flex;
        flex-direction: column;
    }
    .emma-chat-chats-dropdown-archive li {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12px;
        gap: 8px;
    }
    .emma-chat-chats-3dots {
        height: 20px;
        transition: 0.1s;
    }
    .emma-chat-chats-3dots:hover {
        transform: scale(1.1);
    }
    .emma-chat-container {
        display: flex;
        gap: 24px;
        margin-top: 16px;
        height: 100%;
        overflow-y: hidden;
    }
    .emma-chat-chats {
        width: 35%;
    }
    .emma-chat-chats-ul {
        list-style: none;
        border: 1px solid rgba(31,31,31,0.16);
        border-radius: 8px;
        background: white;
        -webkit-box-shadow: 0px 3px 20px -15px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 3px 20px -15px rgba(0,0,0,0.75);
        box-shadow: 0px 3px 20px -15px rgba(0,0,0,0.75);
        height: 100%;
    }
    .emma-chat-chats-li {
        font-weight: 500;
        font-size: 13px;
        padding: 12px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(31,31,31,0.08);
    }
    .emma-chat-chats-li:hover {
        cursor: pointer;
    }
    .emma-chat-chats-li.choosen {
        font-weight: 600;
        background: linear-gradient(to top right, rgba(117, 112, 255, 0.1), rgba(188, 112, 255, 0.15));
    }
    .emma-chat-field {
        border: 1px solid rgba(31,31,31,0.16);
        border-radius: 8px;
        -webkit-box-shadow: 0px 3px 20px -15px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 3px 20px -15px rgba(0,0,0,0.75);
        box-shadow: 0px 3px 20px -15px rgba(0,0,0,0.75);
        width: 100%;
        padding: 12px;
        background: white;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        justify-content: end;
    }
    .emma-chat-input {
        width: 87%;
        height: 40px;
        font-size: 15px;
        font-weight: 500;
        padding: 12px 16px;
        overflow: hidden;
        outline: none;
        resize: none;
        border: none;
        border-radius: 12px;
        font-family: Fixel;
        font-weight: 400;
    }
    .emma-chat-chat-input-container {
        border: 1px solid rgba(31,31,31,0.16);
        border-radius: 12px;
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
    }
    .emma-chat-input-send {
        position: absolute;
        right: 18px;
        padding: 10px;
    }
    .emma-chat-input-send:hover {
        cursor: pointer;
    }
    .emma-chat-messages::-webkit-scrollbar {
        width: 10px;
    }
    .emma-chat-messages::-webkit-scrollbar-thumb {
        background-color: rgba(31,31,31,0.15);
        border-radius: 4px;
        cursor: pointer;
    }
    .emma-chat-messages {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        padding-right: 12px;
        gap: 16px;
    }
    .emma-chat-proposal {
        margin-top: 16px;
        border-radius: 16px;
        background: linear-gradient(to top right, rgba(117, 112, 255, 0.1), rgba(188, 112, 255, 0.15));
        padding: 16px;
        justify-content: space-between;
        display: flex;
        word-wrap: break-word;
    }
    .emma-chat-proposal-p {
        font-size: 15px;
        display: flex;
        align-items: center;
        background: linear-gradient(to bottom left, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }
    .emma-chat-proposal-buttons {
        display: flex;
        gap: 4px;
        align-items: end;
    }
    .emma-chat-proposal-send {
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 8px;
        width: 32px;
        height: 32px;
        font-size: 15px;
        color: white;
    }
    .emma-chat-proposal-cross {
        background-color: white;
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        border-radius: 8px;
        color: white;
    }
    .emma-chat-proposal-send:hover, .emma-chat-proposal-cross:hover {
        cursor: pointer;
    }
</style>