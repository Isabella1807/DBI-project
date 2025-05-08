<!-- src/components/molecules/CreateFolderDialog.vue -->
<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-backdrop">
      <div class="modal">
        <h3>Create New Folder in {{ currentFolderName }}</h3>
        <form @submit.prevent="onSubmit">
          <div>
            <label for="folderName">Folder Name:</label>
            <input
              id="folderName"
              v-model="name"
              placeholder="Folder Name"
              required
            />
          </div>
          <div class="buttons">
            <button type="submit">Create</button>
            <button type="button" @click="onCancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
  currentFolderName: string
}>()

const emit = defineEmits<{
  (e: 'submit', folderName: string): void
  (e: 'cancel'): void
}>()

const name = ref('')

// Clear input whenever dialog re‐opens
watch(() => props.visible, v => { if (v) name.value = '' })

function onSubmit() {
  if (!name.value.trim()) return
  emit('submit', name.value.trim())
}
function onCancel() {
  emit('cancel')
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
