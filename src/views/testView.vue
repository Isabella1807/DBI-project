<script setup lang="ts">
import TestComp from "@/components/TestComp.vue";
import BasicButton from "@/components/BasicButton.vue";
</script>

<template>
    <div>
        <TestComp />
        <BasicButton label="Opret" type="default" />
        <BasicButton label="Eksporter" type="secondary" :showIcon="false" />
        <BasicButton label="Slet" type="annuller" :showIcon="false" />
        <BasicButton label="nejtak" type="lukNed" :showIcon="false" />
    </div>
</template>

<style scoped lang="scss">

</style>
