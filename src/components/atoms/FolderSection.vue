<script lang="ts" setup>
import FolderComponent from '@/components/atoms/folderComponet.vue';
import { inject, ref } from 'vue';
import type { Ref } from 'vue';


const currentView = inject<Ref<string>>('currentView') ?? ref('detailed')


  const folders = [
  { id: 1, name: 'Mappe A' },
  { id: 2, name: 'Mappe B' },
  { id: 3, name: 'Mappe C' },
  { id: 4, name: 'Mappe D' },
  { id: 5, name: 'Mappe E' },
  { id: 6, name: 'Mappe F' },
  { id: 7, name: 'Mappe G' },
  { id: 8, name: 'Mappe H' },
  { id: 9, name: 'Mappe I' },
  { id: 10, name: 'Mappe J' }
];

</script>

<template>
  <div :class="['folderContainer', currentView?.value || 'detailed']">
    <div v-for="folder in folders" :key="folder.id" :class="['folder', currentView?.value || 'detailed']">
      <FolderComponent :name="folder.name" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.folderContainer.detailed {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 32px;
  max-width: 100%;
  margin-top: 1.5rem;
}

.folderContainer.list {
  display: flex;
  flex-direction: column;
}

.folder.list .folderContent {
  background: $lightestGrey;
  display: flex;
  width: 100%;
  height: 60px;
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  svg {
    width: 40px;
    height: 40px;
    color: $darkGrey;
  }

  p {
    @include bodyText;
    text-align: left;
    margin: 0;
    flex-grow: 1;
  }
}
</style>
