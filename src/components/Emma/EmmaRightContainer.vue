<script>
import EmmaAnalytic from "@/components/Emma/EmmaAnalytic.vue"
import EmmaBotSettings from "@/components/Emma/EmmaBotSettings.vue"
import EmmaBotEvents from "@/components/Emma/EmmaBotEvents.vue"
import EditingScript from "@/components/Emma/EditingScript.vue"
import EmmaChat from "./EmmaChat.vue"

export default {
    components: {
        EmmaAnalytic,
        EmmaBotSettings,
        EmmaBotEvents,
        EditingScript,
        EmmaChat
    },
    props: ['socket', 'chatsLoaded'],
}

</script>

<template>
<div class="emma-right-block">
    <div class="emma-analytic-header">
        <div>
            <img src="@/assets/images/analyticquestion.svg">
            <button>Підказки</button>
        </div>
        <div>
            <img src="@/assets/images/user-question.svg">
            <img src="@/assets/images/analytic-chats-question.svg">
        </div>
    </div>
    <EmmaAnalytic v-if="$route.path == '/emma/analytic'"></EmmaAnalytic>
    <EmmaBotSettings v-if="$route.path.startsWith('/emma/settings')"></EmmaBotSettings>
    <EmmaBotEvents v-if="$route.path == '/emma/bot_events'"></EmmaBotEvents>
    <EditingScript v-if="$route.path == '/emma/bot_events/create_script'"></EditingScript>
    <EmmaChat :chatsLoaded="chatsLoaded" :socket="socket" v-if="$route.path == '/emma/chats'"></EmmaChat>
</div>
</template>

<style>
    .emma-right-block {
        display: flex;
        flex-direction: column;
    }
</style>