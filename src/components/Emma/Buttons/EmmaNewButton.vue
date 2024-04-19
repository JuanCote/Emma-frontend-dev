<script>

</script>

<template>
    <button class="emma-new-button">
        <img src="@/assets/images/add.svg">
        <slot></slot>
    </button>
</template>

<style>
    .emma-new-button {
        padding: 6px 16px 6px 8px;
        color: #5A5A76;
        background-color: #EAEAF3;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        height: 32px;
        border: none;
        gap: 4px;
    }
    .emma-new-button {
        cursor: pointer;
    }
</style>