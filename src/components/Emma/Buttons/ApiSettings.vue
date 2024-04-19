<script>

</script>

<template>
    <button class="emma-api-settings">
        <img src="@/assets/images/manufacturing.svg">
        <slot></slot>
    </button>
</template>

<style>
    .emma-api-settings {
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
        width: 114px;
        cursor: pointer;
    }
</style>