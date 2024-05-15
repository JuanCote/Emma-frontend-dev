<script>
    import WidgetSettings from '@/components/Emma/WidgetSettings.vue'
    import TelegramSettings from './TelegramSettings.vue';
    export default {
        components: {
            WidgetSettings,
            TelegramSettings
        },
        data() {
            return {
                chosenMenu: 'Widget'
            }
        },
        methods: {
            choseTelegram() {
                this.chosenMenu = 'Telegram'
                this.$router.push('/emma/settings/bot_settings/telegram')
            },
            choseWidget() {
                this.chosenMenu = 'Widget'
                this.$router.push('/emma/settings/bot_settings/widget')
            }
        }
    }
</script>

<template>
<div class="bot-settings-right-menu-header">
    <p class="bot-settings-right-menu-header-settings">Налаштування</p>
    <img src="@/assets/images/right-arrow.svg">
    <p class="bot-settings-right-menu-header-botSettings">Налаштування бота</p>
</div>
<div class="bot-settings-right-menu-bots">
    <div @click="choseTelegram" :class="{ 'chosen': chosenMenu === 'Telegram'}">
        <img v-if="chosenMenu != 'Telegram'" src="@/assets/images/telegram-icon.svg">
        <img v-if="chosenMenu == 'Telegram'" src="@/assets/images/telegram-icon-white.svg">
        <p>Telegram</p>
    </div>
    <div>
        <img src="@/assets/images/viber.svg">
        <p>Viber</p>
    </div>
    <div @click="choseWidget" :class="{ 'chosen': chosenMenu === 'Widget'}">
        <img v-if="chosenMenu != 'Widget'" src="@/assets/images/widget-black.svg">
        <img v-if="chosenMenu == 'Widget'" src="@/assets/images/widget.svg">
        <p>Widget</p>
    </div>
    <div>
        <img src="@/assets/images/messanger.svg">
        <p>Messanger</p>
    </div>
    <div>
        <img src="@/assets/images/instagram.svg">
        <p>Instagram</p>
    </div>
</div>
<WidgetSettings v-if="$route.path == '/emma/settings/bot_settings/widget'"></WidgetSettings>
<TelegramSettings v-if="$route.path == '/emma/settings/bot_settings/telegram'"></TelegramSettings>
</template>

<style>
</style>