<script lang="ts" setup>
import BasicIcon from '@/components/atoms/BasicIcon.vue';
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps<{
  type: 'delete' | 'restore'
}>()

const emits = defineEmits<{
  (e: 'undo'): void
}>()

const visible = ref(true)
const isEntering = ref(true)
const isExiting = ref(false)

const close = () => {
  isExiting.value = true
  setTimeout(() => {
    visible.value = false
  }, 300) // Svarer til animationens varighed
}

// Auto-hide efter 3 sekunder ved 'restore'
watch(() => props.type, (newVal) => {
  if (newVal === 'restore') {
    setTimeout(() => {
      close()
    }, 3000)
  }
}, { immediate: true })

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

// Fade-in animation ved mount
onMounted(() => {
  setTimeout(() => {
    isEntering.value = false
  }, 300)
})
</script>

<template>
  <Transition name="toast">
    <div v-if="visible"
         :class="['toast', toastTypeClass, { 'enter': isEntering, 'exit': isExiting }]">
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
  </Transition>
</template>

<style lang="scss" scoped>
.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: 4px;
  width: fit-content;
  width: 396px;
  height: 56px;
  color: $white;
  gap: 10px;
  transition: all 0.3s ease;

  &.enter {
    opacity: 0;
    transform: translateY(20px);
  }

  &.exit {
    opacity: 0;
    transform: translateY(-20px);
  }

  .SvgColor {
    color: $white !important;
  }

  p {
    @include bodyText;
  }
}

.toastDelete {
  background-color: $black;
}

.toastRestore {
  background-color: $darkGreen;
  width: 252px;
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
  color: $white;
  @include bodyText;
  cursor: pointer;
  display: flex;
  align-items: center;
}

/* Alternative animation med Vue Transition */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.toast-leave-active {
  position: absolute;
}
</style>
