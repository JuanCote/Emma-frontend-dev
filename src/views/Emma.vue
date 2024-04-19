<script>
import EmmaLeftMenu from "@/components/Emma/EmmaLeftMenu.vue"
import EmmaAnalytic from "@/components/Emma/EmmaAnalytic.vue"
import EmmaRightContainer from "@/components/Emma/EmmaRightContainer.vue"

export default {
    data() {
        return {
            socket: null,
            chatsLoaded: false
        }
    },
    components: {
        EmmaLeftMenu,
        EmmaAnalytic,
        EmmaRightContainer
    },
    beforeRouteEnter(to, from, next) {
        if (to.path === '/emma') {
            next('/emma/analytic');
        } else {
            next();
        }
    },
    beforeCreate() {
        this.$store.dispatch('fetchChats').then(() => {
            this.chatsLoaded = true
        })
        this.$store.dispatch('checkUser').then(() => {
            this.socket = new WebSocket('ws://localhost:8000/ws/');
            this.socket.onopen = () => {
                const data = {
                    type: 'manager',
                    user_id: this.user.id
                };
                this.socket.send(JSON.stringify(data));
            };

            this.socket.onmessage = (event) => {
                const eventData = JSON.parse(event.data);
                console.log(eventData)
                const chats = this.chats.slice()
                let chatFound = false; 
                chats.forEach((chat) => {
                    if (chat.name == eventData.chat_id) {
                        if ("message" in eventData){
                            chat.messages.push({sender: 'user', message: eventData.message});
                        }
                        else if ("proposal" in eventData) {
                            chat.displayProposal = true
                            chat.emmaProposal = eventData.proposal['answer']
                        }
                        chatFound = true; 
                    }
                });
                const archive = this.archive.slice()
                let archiveFound = false; 
                archive.forEach((chat) => {
                    if (chat.name == eventData.chat_id) {
                        if ("message" in eventData){
                            chat.messages.push({sender: 'user', message: eventData.message});
                        }
                        else if ("proposal" in eventData) {
                            chat.displayProposal = true
                            chat.emmaProposal = eventData.proposal['answer']
                        }
                        archiveFound = true; 
                    }
                });
                if (!chatFound && !archiveFound) {
                    this.$store.dispatch('fetchChats')
                }
                this.$nextTick(() => {
                    let container = document.querySelector('.emma-chat-messages');
                    container.scrollTop = container.scrollHeight;
                });
            };

            this.socket.onclose = () => {
            console.log('Соединение закрыто');
            };

            this.socket.onerror = (error) => {
            console.error('Произошла ошибка:', error);
            };
        })
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
        }
    }
}
</script>

<template>
    <div class="emma-background">
        <div class="emma-container">
            <EmmaLeftMenu/>
            <div class="right-container">
                <div v-if="!socket" class="right-container-loading">
                    <img src="@/assets/images/load.gif">
                </div>
                <EmmaRightContainer v-if="socket" :socket="socket" :chatsLoaded="chatsLoaded"></EmmaRightContainer>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .right-container {
        position: relative;
        width: 100%;
    }
    .right-container-loading img {
        height: 3em;
    }
    .right-container-loading {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translateX(50%);
    }
    .emma-right-block {
        height: 100vh;
        width: 100%;
    }
    .emma-background {
        background-color: #e9e9e9;
    }
    .emma-container {
        display: flex;
        width: 1280px;
        margin: auto;
        background-color: white;
    }
</style>
