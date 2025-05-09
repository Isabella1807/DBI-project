<!-- src/components/molecules/Breadcrumb.vue -->
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
        / <a @click.prevent="goTo(i)">{{ anc.name }}</a>
      </li>

      <!-- 3) The current folder, if not at root -->
      <li v-if="!isAtRoot">
        / {{ currentFolderName }}
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFolderStore } from '@/stores/folderStore'

const store = useFolderStore()

const rootLabel = computed(() => store.rootLabel)
const ancestors = computed(() => store.ancestors)
const currentFolderName = computed(() => store.currentFolderName)
const isAtRoot = computed(() => store.currentFolderId === null)

function goRoot() {
  store.resetToRoot()
}
function goTo(index: number) {
  store.goToAncestor(index)
}
</script>

<style lang="scss" scoped>
.breadcrumb ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}
.breadcrumb li {
  margin-right: 0.5rem;
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
