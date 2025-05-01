<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';

interface Props {
  label: string,
  labelId: string,
  placeholder: string,
  type?: string, //default is text
  autoFocus?: boolean,
}

const props = defineProps<Props>();
const model = defineModel<string>(); //type of model is Ref<string>
const emit = defineEmits(['blur']);
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if(props.autoFocus) {
    inputRef.value?.focus();
  }
});

watch(() => props.autoFocus, (newVal) => {
  if(newVal) {
    inputRef.value?.focus();
  }
});
</script>

<template>
  <div class="inputContainer">
    <label class="inputLabel" :for="props.labelId">{{ props.label }}</label>
    <input class="inputArea" :type="props.type || 'text'" :id="props.labelId"
           :placeholder="props.placeholder" v-model="model" ref="inputRef"
           @blur="emit('blur', $event)"/>
  </div>
</template>

<style scoped lang="scss">
.inputContainer {
  display: flex;
  flex-direction: column;
  width: 100%;

  .inputLabel {
    @include heading2;
    margin-bottom: 8px;
  }

  .inputArea {
    @include bodyText;
    padding: 10px 8px;
    border-radius: 12px;
    border: 1px solid $mediumGrey;

    &::placeholder {
      @include breadCrumb;
    }

    &:focus {
      outline: none;
    }

    /*&:not(:placeholder-shown) {
      border: 1px solid green;
    }*/
  }
}
</style>
