<script>
    
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
            <h1>Medicine, solutions for:</h1>
            <ul>
                <li><p>clinics</p></li>
                <li><p>dentistries</p></li>
                <li><p>massage salon</p></li>
                <li><p>medical institution</p></li>
            </ul>
            <button>Get template</button>
        </div>
        <div class="templates-template">
            <img src="@/assets/images/templates-2.svg">
            <h1>Medicine, solutions for:</h1>
            <ul>
                <li><p>clinics</p></li>
                <li><p>dentistries</p></li>
                <li><p>massage salon</p></li>
                <li><p>medical institution</p></li>
            </ul>
            <button>Get template</button>
        </div>
        <div class="templates-template">
            <img src="@/assets/images/templates-2.svg">
            <h1>Medicine, solutions for:</h1>
            <ul>
                <li><p>clinics</p></li>
                <li><p>dentistries</p></li>
                <li><p>massage salon</p></li>
                <li><p>medical institution</p></li>
            </ul>
            <button>Get template</button>
        </div>
    </div>
</template>

<style>
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
        border-radius: 8px;
        border: 1px solid rgba(31, 31, 41, 0.15);
    }
</style>