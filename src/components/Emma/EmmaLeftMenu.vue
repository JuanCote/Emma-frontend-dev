<script>
export default {
  data() {
    return {
      menuExpanded: true
    };
  },
  computed: {
    tutorial() {
            return this.$store.getters.getTutorial
        }
  },
  methods: {
    botEvents() {
        if (this.tutorial.currentStep == 7 && !this.tutorial.done) {
            this.$store.dispatch('setNextStep')
            this.$router.push('/emma/bot_events')
        }else {
            this.$router.push('/emma/bot_events')
        }
    },
    botSettings() {
        if (this.tutorial.currentStep == 11 && !this.tutorial.done) {
            this.$store.dispatch('setNextStep')
            this.$router.push('/emma/settings/bot_settings')
        }else {
            this.$router.push('/emma/settings/bot_settings')
        }
    }
  }
};
</script>

<template>
    <div class="emma-left-menu-container" :class="{'expanded': !menuExpanded}">
        <div>
                <div class="emma-left-menu-header">
                <img src="@/assets/images/logo.jpg">
                <h1 v-if="menuExpanded" class="emma-left-menu-h1">EMMA</h1>
            </div>
            <ul class="emma-left-menu-ul">
                <li @click="botSettings" class="emma-left-menu-li" :class="{ 'chosen': $route.path.startsWith('/emma/settings'), 'tutorial': tutorial.currentStep == 11 && !tutorial.done }">
                  <img v-if="$route.path.startsWith('/emma/settings')" src="@/assets/images/bot_settings_white.svg">
                  <img v-if="!($route.path.startsWith('/emma/settings'))" src="@/assets/images/bot_settings.svg">
                  <p v-if="menuExpanded">Налаштування бота</p>
                </li>
                <li @click="this.$router.push('/emma/analytic')" class="emma-left-menu-li" :class="{ 'chosen': $route.path == '/emma/analytic' }">
                  <img v-if="$route.path == '/emma/analytic'" src="@/assets/images/analytic.svg">
                  <img v-if="$route.path != '/emma/analytic'" src="@/assets/images/analytic-black.svg">
                  <p v-if="menuExpanded">Аналітика</p>
                </li>
                <li @click="this.$router.push('/emma/chats')" class="emma-left-menu-li" :class="{ 'chosen': $route.path == '/emma/chats' }">
                  <img v-if="$route.path != '/emma/chats'" src="@/assets/images/chats.svg">
                  <img v-if="$route.path == '/emma/chats'" src="@/assets/images/chats-white.svg">
                  <p v-if="menuExpanded">Чати</p>
                </li>
                <li @click="botEvents" class="emma-left-menu-li" :class="{ 'chosen': $route.path.startsWith('/emma/bot_events'), 'tutorial': tutorial.currentStep == 7 && !tutorial.done }">
                  <img v-if="!($route.path.startsWith('/emma/bot_events'))" src="@/assets/images/bot-events.svg">
                  <img v-if="$route.path.startsWith('/emma/bot_events')" src="@/assets/images/bot_events_white.svg">
                  <p v-if="menuExpanded">Події бота</p>
                </li>
            </ul>
        </div>
        <div :class="{'expanded': !menuExpanded}" class="emma-left-menu-settings">
            <div class="emma-left-menu-settings-block">
                <img @click="this.$router.push('/emma/settings/bot_settings')" src="@/assets/images/settings.svg">
                <p @click="this.$router.push('/emma/settings/bot_settings')" v-if="menuExpanded">Налаштування</p>
            </div>
            <img @click="menuExpanded = !menuExpanded" src="@/assets/images/dropdown.svg" class="emma-left-menu-button" :class="{'expanded': !menuExpanded}"></img>
        </div>
    </div>
</template>

<style>
    .emma-left-menu-button.expanded {
        transform: rotate(180deg);
    }
    .emma-left-menu-button {
        cursor: pointer;
    }
    .emma-left-menu-settings-block {
        gap: 8px;
        display: flex;
    }
    .emma-left-menu-settings img {
        cursor: pointer;
    }
    .emma-left-menu-settings p {
        margin-top: 3px;
        font-size: 12px;
        cursor: pointer;
    }
    .emma-left-menu-settings.expanded {
        flex-direction: column;
    }
    .emma-left-menu-settings {
        margin-top: auto;
        display: flex;
        padding: 16px;
        justify-content: space-between;
        gap: 8px;
        align-items: center;
    }
    .emma-left-menu-li.chosen {
        color: white;
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        border-radius: 0 8px 8px 0;
    }
    .emma-left-menu-li p {
        margin-top: 4px;
        white-space: nowrap
    }
    .emma-left-menu-li.tutorial {
        position: relative;
        background: white;
        z-index: 10000;
        width: 100%;
        border-radius: 8px;
    }
    .emma-left-menu-li {
        display: flex;
        padding: 13px 24px;
        gap: 16px;
        font-size: 14px;
        cursor: pointer;
        height: 51px;
        align-items: center;
    }
    .emma-left-menu-ul {
        list-style: none;
        position: relative;
    }
    .emma-left-menu-container.expanded {
        width: 5%;
    }
    .emma-left-menu-container {
        transition: width 0.5s ease;
        display: flex;
        height: 100vh;
        width: 30%;
        flex-direction: column;
        border-right: 1px solid rgba(31, 31, 41, 0.15);
    }
    .emma-left-menu-header {
        gap: 8px;
        align-items: center;
        display: flex;
        padding: 20px 15px 37px 15px;
    }
    .emma-left-menu-h1 {
        margin-top: 2px;
        font-size: 22px;
        font-weight: 600;
    }
</style>