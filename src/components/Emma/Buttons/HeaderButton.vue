<script setup>

</script>

<template>
    <button class="emma-header-button">
        <slot></slot>
    </button>
</template>

<style scoped>
    .emma-header-button {
        width: 129px;
        height: 43px;
        border-radius: 8px;
        color: #5A5A76;
        background-color: #EAEAF3;
        font-weight: 600;
        gap: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
    }
    .emma-header-button {
        cursor: pointer;
    }
</style>
