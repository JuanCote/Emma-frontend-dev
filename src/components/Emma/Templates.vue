<script>
import { BACKEND_URL } from '@/config.js'

    export default {
        data() {
            return {
                connectConfirmationWindow: false,
                templateIdToConnect: '',
                loading: false
            }
        },
        computed: {
            chosenBot() {
                return this.$store.state.bots.chosenBot
            }
        },
        methods: {
            downloadTemplate() {
                if (!this.loading) {
                    const templateId = this.templateIdToConnect
                    this.loading = true
                    try {
                        fetch(`${BACKEND_URL}/connect_template?bot_id=${this.chosenBot.id}&template_id=${templateId}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'include',
                        })
                        .then(response => {
                            this.connectConfirmationWindow = false
                            this.loading = false
                        })
                        .then(data => {
                            alert('Шаблон успішно підключено')
                        })
                        .catch(error => {
                            console.error('Error connecting template:', error);
                            throw error;
                        });
                    } catch (error) {
                        console.error('Error in try block:', error);
                        throw error;
                    }
                }
            }
        }
    }
</script>

<template>
    <div class="bot-settings-right-menu-header">
        <p class="bot-settings-right-menu-header-settings">Налаштування</p>
        <img src="@/assets/images/right-arrow.svg">
        <p class="bot-settings-right-menu-header-botSettings">шаблони</p>
    </div>
    <div class="templates-container">
        <div class="templates-template">
            <img src="@/assets/images/templates-2.svg">
            <div>
                <h1>Представник з продажу</h1>
                <ul>
                    <li><p>електронна комерція</p></li>
                    <li><p>роздрібна торгівля</p></li>
                </ul>
            </div>
            <button @click="templateIdToConnect = 'Sales Representative'; connectConfirmationWindow = true">Завантажити шаблон</button>
        </div>
        <div class="templates-template">
            <img src="@/assets/images/templates-2.svg">
            <div>
                <h1>Помічник з навчання</h1>
                <ul>
                    <li><p>освіта</p></li>
                    <li><p>онлайн-курси</p></li>
                    <li><p>тренінги</p></li>
                </ul>
            </div>
            <button @click="templateIdToConnect = 'Learning Assistant'; connectConfirmationWindow = true">Завантажити шаблон</button>
        </div>
        <div class="templates-template">
            <img src="@/assets/images/templates-2.svg">
            <div>
                <h1>Туристичний агент</h1>
                <ul>
                    <li><p>подорожі</p></li>
                    <li><p>туризм</p></li>
                </ul>
            </div>
            <button @click="templateIdToConnect = 'Travel Agent'; connectConfirmationWindow = true">Завантажити шаблон</button>
        </div>
        <div class="templates-template">
            <img src="@/assets/images/templates-2.svg">
            <div>
                <h1>Персональний асистент</h1>
                <ul>
                    <li><p>особистий менеджмент</p></li>
                    <li><p>планування</p></li>
                    <li><p>продуктивність</p></li>
                </ul>
            </div>
            <button @click="templateIdToConnect = 'Personal Assistant'; connectConfirmationWindow = true">Завантажити шаблон</button>
        </div>
        <div class="templates-template">
            <img src="@/assets/images/templates-2.svg">
            <div>
                <h1>Підтримка клієнтів</h1>
                <ul>
                    <li><p>буть-яка галузь з взаємодією з клієнтами</p></li>
                </ul>
            </div>
            <button @click="templateIdToConnect = 'Customer Support'; connectConfirmationWindow = true">Завантажити шаблон</button>
        </div>
    </div>
    <div v-if="connectConfirmationWindow" @click="connectConfirmationWindow = false" class="templates-connect-confirmation-background"></div>
    <div v-if="connectConfirmationWindow" class="templates-connect-confirmation">
        <p>Якщо ви вже маєте інстуркції або документи, вони будуть стерті, ви точно бажаєте підключити шаблон?</p>
        <div class="emma-temaplates-form-buttons">
            <button @click="downloadTemplate" class="yes">Так<img v-if="loading" src="@/assets/images/load.gif"></button>
            <button @click="connectConfirmationWindow = false">Ні</button>
        </div>
    </div>
</template>

<style>
    .emma-temaplates-form-buttons button.yes {
        background: #ec4134;
    }
    .emma-temaplates-form-buttons button {
        padding: 12px 24px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;
        border-radius: 8px;
        background: #36c26d;
        color: white;

    }
    .emma-temaplates-form-buttons {
        display: flex;
        gap: 4px;
        justify-content: center;
        margin-top: 20px;
    }
    .emma-temaplates-form-buttons button img {
        height: 12px;
        margin-top: 2px;
    }
    .templates-connect-confirmation p {
        text-align: center;
    }
    .templates-connect-confirmation {
        position: fixed;
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        top: 50%;
        width: 20%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .templates-connect-confirmation-background {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    .templates-template button {
        margin-top: 24px;
        width: 100%;
        height: 43px;
        background: linear-gradient(to top right, #BC70FF, #7570FF);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }
    .templates-template ul li::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 6px; /* Ширина изображения маркера */
        height: 6px; /* Высота изображения маркера */
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        border-radius: 50%; /* Делает маркер круглым */
    }
    .templates-template ul li p {
        margin-top: 2px;
    }
    .templates-template ul li {
        position: relative; /* Устанавливает относительное позиционирование для li */
        padding-left: 16px; /* Отступ для размещения изображения маркера */
        color: rgba(31, 31, 41, 0.5);
        font-size: 12px;
        font-weight: 500;
        margin-top: 2px;
    }
    .templates-template ul {
        width: 100%;
        list-style: none; /* Убирает стандартные маркеры */
    }
    .templates-template h1 {
        font-size: 14px;
        font-weight: 500;
        width: 100%;
        margin-top: 8px;
    }
    .templates-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(270px, 270px));
        gap: 16px; /* Расстояние между элементами */
        padding: 16px;
        justify-content: center;
    }
    .templates-template {
        padding: 8px;
        width: 264px;
        background: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-radius: 8px;
        border: 1px solid rgba(31, 31, 41, 0.15);
    }
</style>