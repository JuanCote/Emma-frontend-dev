<script>
export default {
    data() {
        return {
            searchActivated: false,
            searchTerm: '',
        }
    },
    methods: {
        emitSearchTerm() {
          this.$emit('update-search', this.searchTerm.trim());
        }
  }
}
</script>

<template>
    <div v-if="!searchActivated" class="emma-search-container">
        <div @click="searchActivated = true" class="emma-search">
            <img src="@/assets/images/search.svg">
            <p>Search</p>
        </div>
    </div>
    <div v-if="searchActivated" class="emma-search-input-container">
        <img src="@/assets/images/search.svg">
        <input v-model="searchTerm" @input="emitSearchTerm" class="emma-search-input">
    </div>
</template>

<style>
    .emma-search-input-container {
        display: flex;
        padding: 6px 16px 6px 8px;
        color: #5A5A76;
        background-color: #EAEAF3;
        display: flex;
        align-items: center;
        width: 100%;
        border-radius: 16px;
        height: 32px;
        border: none;
        gap: 4px;
    }
    .emma-search-input {
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
        font-size: 16px;
        outline: none;
    }
    .emma-search {
        width: 87px;
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
        font-size: 12px;
    }
    .emma-search p {
        margin-top: 3px;
    }
</style>