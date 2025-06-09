<script setup lang="ts">
import { computed } from 'vue';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore.ts';
import BasicIcon from '../atoms/BasicIcon.vue';

const breadcrumbStore = useBreadcrumbStore();

const rootLabel = computed(() => breadcrumbStore.rootLabel);
const ancestors = computed(() => breadcrumbStore.ancestors);
const currentFolderName = computed(() => breadcrumbStore.currentFolderName);
const isAtRoot = computed(() => breadcrumbStore.currentFolderId === null);

function goRoot() {
  breadcrumbStore.resetToRoot();
}
function goTo(index: number) {
  breadcrumbStore.goToAncestor(index);
}
</script>

<template>
  <nav class="breadcrumb">
    <ul>
      <!-- 1) The fixed root crumb -->
      <li>
        <template v-if="isAtRoot">
          {{ rootLabel }}
        </template>
        <template v-else>
          <a @click.prevent="goRoot">{{ rootLabel }}</a>
        </template>
      </li>

      <!-- 2) Any ancestors -->
      <li
        v-for="(anc, i) in ancestors"
        :key="anc.id + '-' + i"
      >
        <div class="breadcrumbContainer">
          <BasicIcon name="ChevronRight" small/> <a @click.prevent="goTo(i)">{{ anc.name }}</a>
        </div>
      </li>

      <!-- 3) The current folder, if not at root -->
      <li v-if="!isAtRoot">
        <div class="breadcrumbContainer">
          <BasicIcon name="ChevronRight" small/> {{ currentFolderName }}
        </div>

      </li>
    </ul>
  </nav>
</template>


<style lang="scss" scoped>

.breadcrumbContainer {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
}

.breadcrumb ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 1rem;
  align-items: center;
}
.breadcrumb li {
  margin-right: 0.5rem;
  margin-left: -0.5rem;
}
.breadcrumb a {
  @include breadCrumb;
  cursor: pointer;
  color: #007bff;
  text-decoration: none;
}
.breadcrumb a:hover {
  text-decoration: underline;
}
</style>
