<script>
    import WidgetSettings from '@/components/Emma/WidgetSettings.vue'
    export default {
        components: {
            WidgetSettings
        },
        data() {
            return {
                chosenBot: 'Widget'
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
    <div @click="chosenBot = 'Telegram'" :class="{ 'chosen': chosenBot === 'Telegram'}">
        <img v-if="chosenBot != 'Telegram'" src="@/assets/images/telegram-icon.svg">
        <img v-if="chosenBot == 'Telegram'" src="@/assets/images/telegram-icon-white.svg">
        <p>Telegram</p>
    </div>
    <div>
        <img src="@/assets/images/viber.svg">
        <p>Viber</p>
    </div>
    <div @click="chosenBot = 'Widget'" :class="{ 'chosen': chosenBot === 'Widget'}">
        <img v-if="chosenBot != 'Widget'" src="@/assets/images/widget-black.svg">
        <img v-if="chosenBot == 'Widget'" src="@/assets/images/widget.svg">
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
<WidgetSettings></WidgetSettings>

</template>

<style>
</style>