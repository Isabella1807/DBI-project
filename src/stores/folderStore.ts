// src/stores/folderStore.ts
import { defineStore } from 'pinia'

interface Ancestor {
  id: string | null
  name: string
}

export const useFolderStore = defineStore('folder', {
  state: () => ({
    // A fixed label for your “top‐level” view:
    rootLabel: 'All files',

    // These track where you are:
    currentFolderId: null as string | null,
    currentFolderName: 'All files',

    // Only store *real* ancestors here:
    ancestors: [] as Ancestor[],
  }),
  actions: {
    enterFolder(id: string, name: string) {
      // push only if you’re inside a non‐root folder
      if (this.currentFolderId !== null) {
        this.ancestors.push({
          id: this.currentFolderId,
          name: this.currentFolderName,
        })
      }
      this.currentFolderId = id
      this.currentFolderName = name
    },
    goToAncestor(index: number) {
      const target = this.ancestors[index]
      this.currentFolderId = target.id
      this.currentFolderName = target.name
      this.ancestors.splice(index)
    },
    resetToRoot() {
      this.currentFolderId = null
      // reset back to the fixed rootLabel
      this.currentFolderName = this.rootLabel
      this.ancestors = []
    },
  },
})
