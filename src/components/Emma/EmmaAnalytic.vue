<script>
    export default {
        data() {
            return {
                chosenMenu: 'botAnalytics',
                graphic1Dropdown: false,
                usersActivity: {
                    'MON': 1000,
                    'TUE': 2000,
                    'WED': 3000,
                    'THU': 1500,
                    'FRI': 2500,
                    'SAT': 500,
                    'SUN': 1000
                }
            }
        }
    }
</script>

<template>
    <div class="emma-analytic">
        <div class="emma-analytic-main">
            <div class="emma-analytic-menu">
                <button @click="chosenMenu = 'botAnalytics'" :class="{ 'chosen': chosenMenu === 'botAnalytics' }">Аналітика бота</button>
                <button @click="chosenMenu = 'QueryAnalytics'" :class="{ 'chosen': chosenMenu === 'QueryAnalytics' }">Аналітика запитів</button>
            </div>
            <div class="emma-analytic-bot-analytics">
                <div class="emma-analytic-bot-analytics-top">
                    <div class="emma-analytic-bot-analytics-part">
                        <img src="@/assets/images/analytic-users-total.svg">
                        <div>
                            <p class="emma-analytic-bot-analytics-part-total-users">Total Users</p>
                            <p class="emma-analytic-bot-analytics-part-total-users-number">80 000</p>
                        </div>
                    </div>
                    <div class="emma-analytic-bot-analytics-part">
                        <img src="@/assets/images/new-users-per-day.svg">
                        <div>
                            <p class="emma-analytic-bot-analytics-part-total-users">New users per day</p>
                            <p class="emma-analytic-bot-analytics-part-total-users-number">14</p>
                        </div>
                    </div>
                </div>
                <div class="emma-analytic-bot-analytics-graphics">
                    <div class="emma-analytic-bot-graphic">
                        <div class="emma-analytic-bot-graphic-header">
                            <div class="emma-analytic-bot-graphic-header-1">
                                <p>Активність</p>
                                <h1>Користувачі</h1>
                            </div>
                            <div class="emma-analytic-bot-graphic-header-2">
                                <div @click="graphic1Dropdown = !graphic1Dropdown">
                                    <p>Тижнева</p>
                                    <img :class="{'dropdown': graphic1Dropdown}" src="@/assets/images/down_arrow_graphic.svg">
                                </div>
                                <ul v-if="graphic1Dropdown">
                                    <li>Тижнева</li>
                                    <li>За місяць</li>
                                </ul>
                            </div>
                        </div>
                        <div class="emma-analytic-bot-graphic-hr"></div>
                        <div class="emma-analytic-bot-graphic-panel">
                            <div class="emma-analytic-bot-graphic-numbers-chart">
                                <div class="emma-analytic-bot-graphic-numbers">
                                    <p>3k</p><p>2k</p><p>1k</p><p>0k</p>
                                </div>
                                <div class="emma-analytic-bot-graphic-chart">
                                    <div class="emma-analytic-bot-graphic-chart-lines">
                                        <div></div><div></div><div></div>
                                        <div class="last-line"></div>
                                    </div>
                                    <div class="emma-analytic-bot-graphic-chart-columns">
                                        <!-- <div></div><div></div><div></div><div></div><div></div><div></div><div></div> -->
                                    </div>
                                    <ul class="emma-analytic-bot-graphic-chart-days">
                                        <li>MON</li>
                                        <li>TUE</li>
                                        <li>WED</li>
                                        <li>TRU</li>
                                        <li>FRI</li>
                                        <li>SAT</li>
                                        <li>SUN</li>
                                    </ul>        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .emma-analytic-bot-graphic-chart-columns div {
        width: 26px;
        height: 100px;
        border-radius: 7px 7px 0 0;
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
    }
    .emma-analytic-bot-graphic-chart-columns {
        display: flex;
        gap: 37.5px;
        bottom: 0;
        position: absolute;
    }
    .emma-analytic-bot-graphic-chart-days {
        list-style: none;
        display: flex;
        color: rgba(31, 31, 41, 0.50);
        font-size: 12px;
        margin-top: 18.3px;
        gap: 37.5px;
    }
    .emma-analytic-bot-graphic-chart-lines div.last-line {
        background-image: linear-gradient(to right, #E5E5EF 100%, rgba(255,255,255,0) 0%);
    }
    .emma-analytic-bot-graphic-chart-lines div {
        background-image: linear-gradient(to right, #E5E5EF 50%, rgba(255,255,255,0) 0%);
        background-position: bottom;
        background-size: 10px 1.5px;
        background-repeat: repeat-x;
        height: 1.5px;
    }
    .emma-analytic-bot-graphic-chart-lines {
        width: 100%;
        display: flex;
        margin-top: 5px;
        flex-direction: column;
        gap: 57px;
    }
    .emma-analytic-bot-graphic-chart {
        position: relative;
        width: 100%;
    }
    .emma-analytic-bot-graphic-numbers {
        display: flex;
        flex-direction: column;
        gap: 43px;
        font-size: 12px;
        color: rgba(31, 31, 41, 0.50);
    }
    .emma-analytic-bot-graphic-numbers-chart {
        display: flex;
        gap: 28px;
    }
    .emma-analytic-bot-graphic-panel {
        margin-top: 40px;
    }
    .emma-analytic-bot-graphic-hr {
        top: 20%;
        position: absolute;
        width: 90%;
        left: 50%;
        border-bottom: 1px solid #E5E5EF;
        transform: translateX(-50%);
    }
    .emma-analytic-bot-graphic-header-2 ul li {
        padding: 10px 12px;
        font-size: 12px;
        cursor: pointer;
    }
    .emma-analytic-bot-graphic-header-2 ul {
        width: 104px;
        background: white;
        position: absolute;
        left: 0;
        z-index: 10 ;
        margin-top: 12px;
        border: 1px solid rgba(31, 31, 41, 0.15);
        border-radius: 8px;
        list-style: none;
    }
    .emma-analytic-bot-graphic-header-2 div p {
        margin-top: 2px;
        color: rgba(31, 31, 41, 0.5);
    }
    .emma-analytic-bot-graphic-header-2 div {
        display: flex;
        justify-content: space-between;
    }
    .emma-analytic-bot-graphic-header-2 img.dropdown {
        transform: rotate(180deg);
    }
    .emma-analytic-bot-graphic-header-2 {
        width: 104px;
        cursor: pointer;
        position: relative;
        height: 37px;
        border: 1px solid rgba(31, 31, 41, 0.15);
        border-radius: 8px;
        padding: 10px 15px;
        font-size: 12px;
    }
    .emma-analytic-bot-graphic-header-1 h1 {
        font-size: 16px;
        font-weight: 500;
    }
    .emma-analytic-bot-graphic-header-1 p {
        color: #9291A5;
        font-size: 12px;
    }
    .emma-analytic-bot-graphic-header-1 {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .emma-analytic-bot-graphic-header {
        display: flex;
        justify-content: space-between;
    }
    .emma-analytic-bot-graphic {
        width: 492px;
        position: relative;
        height: 380px;
        padding: 24px 32px;
        background: white;
        border-radius: 20px;
    }
    .emma-analytic-bot-analytics-graphics {
        margin-top: 10px;
        display: flex;
    }
    .emma-analytic-bot-analytics-part-total-users-number {
        font-weight: 500;
        font-size: 20px;
    }
    .emma-analytic-bot-analytics-part-total-users {
        color:rgba(31, 31, 41, 0.50);
        font-size: 12px;
    }
    .emma-analytic-bot-analytics-part div {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .emma-analytic-bot-analytics-part {
        width: 202px;
        display: flex;
        padding: 15px;
        gap: 16px;
        align-items: center;
        background-color: white;
        border-radius: 16px;
    }
    .emma-analytic-bot-analytics-top {
        display: flex;
        gap: 14px;
    }
    .emma-analytic-bot-analytics {
        margin-top: 16px;
    }
    .emma-analytic-menu button.chosen {
        color: white;
        font-weight: 500;
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
    }
    .emma-analytic-menu button {
        height: 40px;
        cursor: pointer;
        padding: 10px 24px;
        background: white;
        border: none;
        border-radius: 8px;
        font-weight: 500;
    }
    .emma-analytic-menu {
        display: flex;
        gap: 4px;
    }
    .emma-analytic-main {
        padding: 16px;
        background: #f0f3fa;
        height: 100%;
    }
    .emma-analytic-header button {
        width: 104px;
        height: 33px;
        border-radius: 8px;
        background: #EAEAF3;
        color: #5A5A76;
        border: none;
    }
    .emma-analytic-header div {
        display: flex;
        gap: 24px;
    }
    .emma-analytic {
        width: 100%;
        height: 100%;
    }
    .emma-analytic-header {
        justify-content: space-between;
        display: flex;
        width: 100%;
        padding: 20px 16px;
        border-bottom: 1px solid rgba(31, 31, 41, 0.15);
    }
</style>