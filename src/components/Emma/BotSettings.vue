<script>
    import WidgetSettings from '@/components/Emma/WidgetSettings.vue'
    import TelegramSettings from './TelegramSettings.vue';
import tutorial from '@/store/modules/tutorial';
    export default {
        components: {
            WidgetSettings,
            TelegramSettings
        },
        data() {
            return {
            }
        },
        methods: {
            choseTelegram() {
                if (this.tutorial.currentStep == 21 && !this.tutorial.done) {
                    this.$store.dispatch('setNextStep', {})
                }
                this.$router.push('/emma/settings/bot_settings/telegram')
            },
            choseWidget() {
                this.$router.push('/emma/settings/bot_settings/widget')
            }
        },
        computed: {
            tutorial() {
                return this.$store.getters.getTutorial
            },
        }
    }
</script>

<template>
<div class="bot-settings-right-menu-header">
    <p class="bot-settings-right-menu-header-settings">Налаштування</p>
    <img src="@/assets/images/right-arrow.svg">
    <p class="bot-settings-right-menu-header-botSettings">Налаштування помічника</p>
</div>
<div class="bot-settings-right-menu-bots">
    <div @click="choseWidget" :class="{ 'chosen': $route.path.startsWith('/emma/settings/bot_settings/widget') }">
        <img v-if="!$route.path.startsWith('/emma/settings/bot_settings/widget')" src="@/assets/images/widget-black.svg">
        <img v-if="$route.path.startsWith('/emma/settings/bot_settings/widget')" src="@/assets/images/widget.svg">
        <p>Widget</p>
    </div>
    <div class="bot-settings-right-menu-bots-telegram" @click="choseTelegram" :class="{ 'chosen': $route.path.startsWith('/emma/settings/bot_settings/telegram'), 'tutorial': this.tutorial.currentStep == 21 }">
        <img v-if="!$route.path.startsWith('/emma/settings/bot_settings/telegram')" src="@/assets/images/telegram-icon.svg">
        <img v-if="$route.path.startsWith('/emma/settings/bot_settings/telegram')" src="@/assets/images/telegram-icon-white.svg">
        <p>Telegram</p>
    </div>
    <!-- <div>
        <img src="@/assets/images/viber.svg">
        <p>Viber</p>
    </div> -->
    <!-- <div>
        <img src="@/assets/images/messanger.svg">
        <p>Messanger</p>
    </div>
    <div>
        <img src="@/assets/images/instagram.svg">
        <p>Instagram</p>
    </div> -->
</div>
<WidgetSettings v-if="$route.path == '/emma/settings/bot_settings/widget'"></WidgetSettings>
<TelegramSettings v-if="$route.path == '/emma/settings/bot_settings/telegram'"></TelegramSettings>
</template>

<style>
.bot-settings-right-menu-bots-telegram.tutorial {
    position: relative;
    z-index: 10000;
}
</style>