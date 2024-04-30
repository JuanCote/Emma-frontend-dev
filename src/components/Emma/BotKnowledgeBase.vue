<script>
    export default{
        methods: {
            saveKnowledgeBase() {
                this.$store.dispatch('saveKnowledgeBase')
                if (this.tutorial.currentStep == 6 && !this.tutorial.done) {
                    this.$store.dispatch('setNextStep', {})
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
        <p class="bot-settings-right-menu-header-settings">Налаштування</p>
        <img src="@/assets/images/right-arrow.svg">
        <p class="bot-settings-right-menu-header-botSettings">База знань бота</p>
    </div>
<p class="bot-knowledge-name">База знань</p>
<p class="bot-knowledge-describe">Опишіть боту, в якій сфері він повинен розбиратися, яку роль відігравати та в якій манері спілкуватися. Вкажіть чи повинен бот відповідати на запитання, що не відносяться до теми компанії та на якій мові він повинен спілкуватися</p>
<div class="bot-knowledge-sections">
    <div class="bot-knowledge-section chosen">
        <p>Секція</p>
    </div>
    <div class="bot-knowledge-section">
        <p>Артиклі</p>
    </div>
</div>
<p v-if="noKnowledgeBase" class="bot-knowledge-no-base">Наразі жодного розділу до бази знань не додано</p>
<ul class="bot-knowledge-inputs">
    <div :class="{'tutorial': tutorial.currentStep == 1 && !tutorial.done}" class="bot-knowledge-input-div">
        <p>У якій сфері бот повинен розбиратися?</p>
        <input v-model="knowledgeBase.field" placeholder="Введіть сферу">
    </div>
    <div :class="{'tutorial': tutorial.currentStep == 2 && !tutorial.done}" class="bot-knowledge-input-div">
        <p>Яку роль бот повинен відігравати?</p>
        <input v-model="knowledgeBase.role" placeholder="Введіть роль">
    </div>
    <div :class="{'tutorial': tutorial.currentStep == 3 && !tutorial.done}" class="bot-knowledge-input-div">
        <p>У якій манері бот повинен спілкуватися?</p>
        <input v-model="knowledgeBase.manner" placeholder="Введіть манеру спілкування">
    </div>
    <div :class="{'tutorial': tutorial.currentStep == 4 && !tutorial.done}" class="bot-knowledge-input-div-question">
        <p>Чи повинен бот відповідати на запитання, що не стосується теми або вашої компанії?</p>
        <div class="bot-knowledge-input-div-question-checkboxes">
            <div>
                <input v-model="knowledgeBase.reply_to_non_company_topics" class="bot-knowledge-input-div-checkbox" type="radio" name="answer" value='true'>
                <span class="checkmark">Так</span>
            </div>
            <div>
                <input v-model="knowledgeBase.reply_to_non_company_topics" class="bot-knowledge-input-div-checkbox" type="radio" name="answer" value="false">
                <span class="checkmark">Ні</span>
            </div>
        </div>

    </div>
    <div :class="{'tutorial': tutorial.currentStep == 5 && !tutorial.done}" class="bot-knowledge-input-div">
        <p>На якій мові бот повинен спілкуватися?</p>
        <input v-model="knowledgeBase.language" placeholder="Введіть мову">
    </div>
    <div class="bot-knowledge-save-div" :class="{'tutorial': tutorial.currentStep == 6 && !tutorial.done}">
        <button @click="saveKnowledgeBase" class="bot-knowledge-save">Зберегти</button>
    </div>
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
    .bot-knowledge-save-div.tutorial {
        position: relative;
        padding: 10px;
        z-index: 10000;
        width: 99px;
        transform: translateX(-10px);
        background: white;
        border-radius: 8px;
    }
    .bot-knowledge-save-div {
        width: 79px;
    }
    .bot-knowledge-save {
        border-radius: 8px;
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        width: 100%;
        height: 43px;
        cursor: pointer;
        transition: background 0.5s ease, transform 0.5s ease;
    }

    .bot-knowledge-save:hover {
        background: linear-gradient(to top right, rgba(90, 85, 220, 1), rgba(150, 85, 220, 1)); /* Darker shades */
        transform: scale(1.05);
    }
    .bot-knowledge-save:active {
    transform: scale(0.95);
    transition: transform 0.2s;
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
    .bot-knowledge-input-div-question.tutorial {
        position: relative;
        background: white;
        padding: 10px;
        z-index: 10000;
        border-radius: 8px;
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
        width: 100%;
    }
    .bot-knowledge-input-div.tutorial {
        position: relative;
        background: white;
        padding: 10px;
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