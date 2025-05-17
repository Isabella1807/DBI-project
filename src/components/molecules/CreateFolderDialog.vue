<!-- src/components/molecules/CreateFolderDialog.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import BasicButton from '@/components/atoms/BasicButton.vue';

const props = defineProps<{
  visible: boolean
  currentFolderName: string
}>();

const emit = defineEmits<{
  (e: 'submit', folderName: string): void
  (e: 'cancel'): void
}>();

const name = ref('');
const dialogRef = ref<HTMLDialogElement>();

// Når `visible` skifter, åbn/luk dialogen
watch(() => props.visible, v => {
  if (!dialogRef.value) return;
  if (v) {
    dialogRef.value.showModal();
    name.value = '';
  } else {
    dialogRef.value.close();
  }
});

// Luk dialogen hvis brugeren trykker ESC eller klikker udenfor
function onCancel() {
  emit('cancel');
  // Parent skal sætte `visible = false`
}

// Send submit
function onSubmit() {
  if (!name.value.trim()) return;
  emit('submit', name.value.trim());
}
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialogRef"
      @cancel.prevent="onCancel"
    >
      <div class="card">
        <div class="content">
          <h1 class="cardTitle">
            Opret ny mappe i "{{ currentFolderName }}"
          </h1>
          <form @submit.prevent="onSubmit">
            <div class="field">
              <label for="folderName">Mappe-navn:</label>
              <input
                id="folderName"
                v-model="name"
                placeholder="Mappe-navn"
                required
              />
            </div>
          </form>
        </div>
        <div class="buttons">
          <BasicButton
            ariaLabel="Annuller og luk"
            label="Annuller"
            type="secondary"
            @click="onCancel"
          />
          <BasicButton
            ariaLabel="Opret mappe"
            label="Opret"
            type="default"
            :disabled="!name.trim()"
            @click="onSubmit"
          />
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped lang="scss">
/* Gør selve dialogen “usynlig” – vi style’r .card */
dialog {
  border: none;
  padding: 0;
  background: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* Baggrund bag dialogen */
dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Dit WizardCard-card */
.card {
  width: calc(max(min(30vw, 640px), min(420px, 95vw)));
  background-color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 4rem 3rem 3rem 3rem;
  border-radius: 20px;
}

.content {
  .cardTitle {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  .field {
    margin-bottom: 1.5rem;
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
}

.buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
</style>
