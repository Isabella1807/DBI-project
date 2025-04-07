<script setup lang="ts">
import BasicButton from "@/components/BasicButton.vue";
import SearchBar from "@/components/SearchBar.vue";
</script>

<template>
    <div class="toolbar-wrapper">
        <div class="toolbar-container">
            <BasicButton label="Opret" type="default" iconName="PlusIcon" />
            <SearchBar />
            <BasicButton label="Eksporter" type="secondary" iconName="ShareExport" />
        </div>
    </div>
</template>


<style scoped lang="scss">
.toolbar-wrapper {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    background:$white;

    .toolbar-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
