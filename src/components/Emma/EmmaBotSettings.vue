<script>
    import BotKnowledgeBase from '@/components/Emma/BotKnowledgeBase.vue'
    import BotSettings from '@/components/Emma/BotSettings.vue'
    export default {
        components: {
            BotKnowledgeBase,
            BotSettings
        },
    }
</script>

<template>
    <div class="bot-settings">
        <div class="bot-settings-left-menu">
            <ul>
                <li @click="this.$router.push('/emma/settings/bot_settings')" :class="{ 'chosen': $route.path.startsWith('/emma/settings/bot_settings')}">Bots settings</li>
                <li @click="this.$router.push('/emma/settings/knowledge_base')" :class="{ 'chosen': $route.path.startsWith('/emma/settings/knowledge_base')}">Bot Knowledge Base</li>
                <li @click="this.$router.push('/emma/settings/templates')" :class="{ 'chosen': $route.path.startsWith('/emma/settings/templates')}">Templates</li>
            </ul>
        </div>
        <div class="bot-settings-right-menu">
            <BotSettings v-if="$route.path.startsWith('/emma/settings/bot_settings')"></BotSettings>
            <BotKnowledgeBase v-if="$route.path.startsWith('/emma/settings/knowledge_base')"></BotKnowledgeBase>
        </div>
    </div>
</template>

<style>
    .bot-settings-right-menu-bots div.chosen {
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        color: white;
    }
    .bot-settings-right-menu-bots div p {
        margin-top: 2px;
    }
    .bot-settings-right-menu-bots div {
        border-radius: 8px;
        width: 139px;
        cursor: pointer;
        height: 56px;
        display: flex;
        gap: 8px;
        align-items: center;
        background: white;
        justify-content: center;
    }
    .bot-settings-right-menu-bots {
        display: flex;
        margin-top: 24px;
        gap: 4px;
    }
    .bot-settings-right-menu-header-botSettings {
        font-size: 12px;
        margin-top: 3px;
    }
    .bot-settings-right-menu-header-settings {
        color: #818284;
        font-size: 12px;
        margin-top: 3px;
    }
    .bot-settings-right-menu-header {
        display: flex;
        gap: 4px;
        align-items: center;
    }
    .bot-settings-right-menu {
        padding: 16px;
        width: 100%;
        background: #f0f3fa;
    }
    .bot-settings-left-menu ul li.chosen {
        background: linear-gradient(to bottom left, rgba(117, 112, 255, 0.2), rgba(188, 112, 255, 0.2));

    }
    .bot-settings-left-menu ul li {
        padding: 16.5px 16px;
        font-size: 14px;
        cursor: pointer;
        font-weight: 400;
        border-bottom: 1px solid rgba(31, 31, 41, 0.08);
    }
    .bot-settings-left-menu ul {
        list-style: none;
    }
    .bot-settings {
        display: flex;
        height: 100%;
    }
    .bot-settings-left-menu {
        width: 30%;
        border-radius: 0 8px 8px 0;
        border-right: 1px solid rgba(31, 31, 41, 0.16);
    }
</style>