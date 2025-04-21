<script lang="ts" setup>
import BasicIcon from '@/components/atoms/BasicIcon.vue';
import { inject, Ref } from 'vue';

const currentView = inject<Ref<string>>('currentView');


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
  <div :class="['folderContainer', currentView.value]">
    <div
      v-for="folder in folders"
      :key="folder.id"
      :class="['folder', currentView.value]"
    >
      <div class="folderContent">
        <BasicIcon name="Folder" class="huge" />
        <p>{{ folder.name }}</p>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
/* Parent container styles for detailed view: grid of 5 cards per row */
.folderContainer.detailed {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 10px;
}

/* Parent container styles for list view: vertical list */
.folderContainer.list {
  display: flex;
  flex-direction: column;
}

/* Detailed view styles for individual folder card */
.folder.detailed .folderContent {
  display: flex;
  width: 180px;
  height: 180px;
  padding: 40px 42px 11px 42px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.10);
  border-radius: 16px;
  background: $white;

  svg {
    flex-shrink: 0;
    color: $darkGrey;
  }

  p {
    @include bodyText;
    text-align: center;
    width: 96px;
    height: 39px;
    flex-shrink: 0;
  }
}

.folder.list:nth-child(even) .folderContent {
  background-color: $lightGrey;
  /* Replace with your desired color */
}

/* List view styles for individual folder item */
.folder.list .folderContent {
  background-color: $lightestGrey;
  display: flex;
  width: 100%;
  /* Takes the full available width */
  height: 60px;
  /* Reduced height for list view */
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  background: $white;


  /* Adjust the SVG icon size for list view */
  svg {
    width: 40px;
    height: 40px;
    color: $darkGrey;
  }

  /* Adjust text styling for list view */
  p {
    @include bodyText;
    text-align: left;
    margin: 0;
    flex-grow: 1;
    /* Let text take the remaining space */
  }
}
</style>
