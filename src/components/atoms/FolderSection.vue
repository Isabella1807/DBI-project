<script lang="ts" setup>
import BasicIcon from '@/components//atoms/BasicIcon.vue';
  // Define a prop to switch between views: "detailed" or "list"
  const props = defineProps({
    view: {
      type: String,
      default: 'detailed'  // default to detailed view; use "list" for list view
    }
  });

  // Dummy folder data
  const folders = [
    { id: 1, name: "Mappe A" },
    { id: 2, name: "Mappe B" },
    { id: 3, name: "Mappe C" },
    { id: 4, name: "Mappe D" },
    { id: 5, name: "Mappe E" },
    { id: 6, name: "Mappe F" }
  ];
</script>

<template>
  <!-- Parent container that applies different layouts based on view -->
  <div :class="['folderContainer', props.view]">
    <!-- Render each folder item -->
    <div 
      v-for="folder in folders" 
      :key="folder.id" 
      :class="['folder', props.view]"
    >
      <div class="folderContent">
        <BasicIcon name="Folder" class="huge" />
        <p>{{ folder.name }}</p>
      </div>
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
