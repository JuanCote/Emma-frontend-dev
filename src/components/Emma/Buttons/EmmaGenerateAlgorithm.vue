<script>

</script>

<template>
    <button class="emma-generate-algorithm-button">
        <img src="@/assets/images/generatealgorithm.svg">
        <slot></slot>
    </button>
</template>

<style>
    .emma-generate-algorithm-button {
        padding: 12px 16px 12px 8px;
        color: white;
        background: linear-gradient(to top right, rgba(117, 112, 255, 1), rgba(188, 112, 255, 1));
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 16px;
        border: none;
        font-weight: 500;
        gap: 4px;
        cursor: pointer;
        height: 32px;
    }
</style>