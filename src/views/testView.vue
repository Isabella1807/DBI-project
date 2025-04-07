<script setup lang="ts">
import TestComp from "@/components/TestComp.vue";
import BasicButton from "@/components/BasicButton.vue";
import FolderComponet from '@/components/folderComponet.vue';
import FolderSection from "@/components/FolderSection.vue";
</script>

<template>
    <div>
        <TestComp />
        <BasicButton label="Opret" type="default" />
        <BasicButton label="Eksporter" type="secondary" :showIcon="false" />
        <BasicButton label="Annuller" type="annuller" :showIcon="false" />
        <BasicButton label="Ja - afslut og luk ned" type="lukNed" :showIcon="false" />
        <FolderComponet/>
        <FolderSection view="list"/>
    </div>
</template>

<style scoped lang="scss">

</style>
