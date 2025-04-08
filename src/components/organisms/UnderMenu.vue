<script setup lang="ts">
import DropdownButton from '@/components/molecules/DropdownButton.vue';
import SearchBar from "@/components/molecules/SearchBar.vue";
</script>

<template>
    <div class="toolbar-wrapper">
        <div class="toolbar-container">
            <DropdownButton label="Opret" type="default" iconName="PlusIcon" :options="[
                { label: 'Mappe', icon: 'Folder' },
                { label: 'Enhed', icon: 'Qr_code' }
            ]" />

            <SearchBar />
            <DropdownButton label="Eksporter" type="secondary" iconName="ShareExport" :options="[
                { label: 'Hent som PDF', icon: 'File' },
                { label: 'Hent som CSV', icon: 'Table' },
                { label: 'Send til printer kø', icon: 'Printer' }
            ]" />

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
    background: $white;

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
