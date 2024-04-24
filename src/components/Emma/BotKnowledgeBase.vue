<script>
    export default{
        methods: {
            saveKnowledgeBase() {
                this.$store.dispatch('saveKnowledgeBase')
                if (this.tutorial.currentStep == 2 && !this.tutorial.done) {
                    this.$store.dispatch('setNextStep')
                    this.$router.push('/emma/bot_events')
                }
            }
        },
        computed: {
            knowledgeBase() {
                return this.$store.state.knowledgeBase.knowledgeBase
            },
            noKnowledgeBase() {
                return this.$store.state.knowledgeBase.noKnowledgeBase
            },
            tutorial() {
                return this.$store.getters.getTutorial
            }
        },
        mounted() {
            this.$store.dispatch('getKnowledgeBase')
        }
    }
</script>

<template>
<div v-if="noKnowledgeBase && !knowledgeBase" class="bot-knowledge-base-loading">
    <img src="@/assets/images/load.gif">
</div>
<div v-if="knowledgeBase">
    <div class="bot-settings-right-menu-header">
        <p class="bot-settings-right-menu-header-settings">Settings</p>
        <img src="@/assets/images/right-arrow.svg">
        <p class="bot-settings-right-menu-header-botSettings">Bot Knowledge Base</p>
    </div>
<p class="bot-knowledge-name">Knowledge base</p>
<p class="bot-knowledge-describe">Describe to the bot what tasks it should do and how to respond</p>
<div class="bot-knowledge-sections">
    <div class="bot-knowledge-section chosen">
        <p>Section</p>
    </div>
    <div class="bot-knowledge-section">
        <p>Articles</p>
    </div>
</div>
<p v-if="noKnowledgeBase" class="bot-knowledge-no-base">Currently, no sections have been added to the knowledge base</p>
<ul class="bot-knowledge-inputs" :class="{'tutorial': tutorial.currentStep == 2 && !tutorial.done}">
    <div class="bot-knowledge-input-div">
        <p>What field should bot be good at?</p>
        <input v-model="knowledgeBase.field" placeholder="Enter the answer">
    </div>
    <div class="bot-knowledge-input-div">
        <p>What role should your bot play?</p>
        <input v-model="knowledgeBase.role" placeholder="Enter the answer">
    </div>
    <div class="bot-knowledge-input-div">
        <p>In what manner should the bot communicate?</p>
        <input v-model="knowledgeBase.manner" placeholder="Enter the answer">
    </div>
    <div class="bot-knowledge-input-div-question">
        <p>If the question are not related to the topic of your company or your activity, should a bot answer?</p>
        <div class="bot-knowledge-input-div-question-checkboxes">
            <div>
                <input v-model="knowledgeBase.reply_to_non_company_topics" class="bot-knowledge-input-div-checkbox" type="radio" name="answer" value='true'>
                <span class="checkmark">Yes</span>
            </div>
            <div>
                <input v-model="knowledgeBase.reply_to_non_company_topics" class="bot-knowledge-input-div-checkbox" type="radio" name="answer" value="false">
                <span class="checkmark">No</span>
            </div>
        </div>

    </div>
    <div class="bot-knowledge-input-div">
        <p>In which language should the bot communicate</p>
        <input v-model="knowledgeBase.language" placeholder="Enter the answer">
    </div>
    <button @click="saveKnowledgeBase" class="bot-knowledge-save">Save</button>
</ul>
</div>

</template>

<style>
    .bot-knowledge-base-loading img {
        height: 2em;
    }
    .bot-knowledge-base-loading {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .bot-knowledge-save {
        border-radius: 8px;
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        height: 43px;
        width: 79px;
        cursor: pointer;
    }
    .bot-knowledge-input-div-question-checkboxes span {
        font-size: 12px;
        margin-top: 2px;
    }
    .bot-knowledge-input-div-question-checkboxes div {
        display: flex;
        gap: 8px;
        align-items: center;
    }
    .bot-knowledge-input-div-question-checkboxes {
        display: flex;
        gap: 16px;
    }
    .bot-knowledge-input-div-question p {
        font-size: 14px;
        font-weight: 500;
    }
    .bot-knowledge-input-div-question {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .bot-knowledge-input-div input {
        width: 100%;
        border-radius: 8px;
        padding: 16px 8px;
        height: 40px;
        font-size: 12px;
        outline: none;
        border: 1px solid rgba(31, 31, 41, 0.16);
    }
    .bot-knowledge-input-div p {
        font-size: 14px;
        font-weight: 500;
    }
    .bot-knowledge-input-div {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .bot-knowledge-inputs.tutorial {
        position: absolute;
        background: white;
        padding-left: 5px;
        padding-right: 5px;
        transform: translateX(-5px);
        z-index: 10000;
        border-radius: 8px;
    }
    .bot-knowledge-inputs {
        margin-top: 14px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .bot-knowledge-no-base {
        width: 100%;
        font-size: 12px;
        padding: 16px 8px;
        margin-top: 16px;
        border-radius: 8px;
        background: linear-gradient(to bottom left, rgba(117, 112, 255, 0.1), rgba(188, 112, 255, 0.1));
    }
    .bot-knowledge-sections {
        display: flex;
        gap: 4px;
        margin-top: 24px;
    }
    .bot-knowledge-section.chosen {
        color: white;
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
    }
    .bot-knowledge-section {
        border-radius: 8px;
        height: 39px;
        font-size: 14px;
        width: 97px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .bot-knowledge-describe {
        margin-top: 8px;
        font-size: 12px;
        color: rgba(31, 31, 41, 0.5);
    }
    .bot-knowledge-name {
        font-size: 16px;
        margin-top: 16px;
        font-weight: 500;
    }
</style>