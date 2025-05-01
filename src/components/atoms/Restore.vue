<script lang="ts" setup>
import BasicIcon from '@/components/atoms/BasicIcon.vue';
import { ref, computed, watch } from 'vue'

// Props definition med TypeScript
const props = defineProps<{
  type: 'delete' | 'restore'
}>()

const emits = defineEmits<{
  (e: 'undo'): void
}>()

const visible = ref(true)

const close = () => {
  visible.value = false
}



// Tekster og ikon baseret på type
const message = computed(() =>
  props.type === 'delete' ? 'Element blev slettet' : 'Element gendannet'
)

const toastTypeClass = computed(() =>
  props.type === 'delete' ? 'toastDelete' : 'toastRestore'
)

const iconName = computed(() =>
  props.type === 'delete' ? 'CircleWarning' : 'Check'
)

const handleUndo = () => {
  emits('undo')
}
</script>

<template>
  <div v-if="visible" :class="['toast', toastTypeClass]">
    <div class="icon">
      <BasicIcon :name="iconName" class="SvgColor" />
    </div>

    <p>{{ message }}</p>

    <template v-if="props.type === 'delete'">
      <button @click="handleUndo" class="undo">GENDAN</button>
    </template>

    <button @click="close" class="close">
      <BasicIcon name="Close" class="SvgColor" />
    </button>
  </div>
</template>


<style lang="scss" scoped>
.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 8px;
  width: fit-content;
  min-width: 300px;
  font-family: sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  color: white;
  gap: 10px;

  .SvgColor {
    color: white !important;
  }

}

.toastDelete {
  background-color: $black;
}

.toastRestore {
  background-color: $darkGreen;
}

.icon {
  display: flex;
  align-items: center;
  color: $white;
}

.undo {
  background: none;
  border: none;
  color: $blue;
  font-weight: bold;
  cursor: pointer;
  margin-left: auto;
  margin-right: 10px;
}

.close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;

}
</style>
