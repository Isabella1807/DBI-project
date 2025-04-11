<script setup lang="ts">
interface Props {
  label: string,
  labelId: string,
  placeholder: string,
  type?: string, //default is text
}
/*

const emit = defineEmits<{(e: 'update:modelValue', value: string): void; }>();
const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};
*/

const props = defineProps<Props>();
const model = defineModel<string>(); //type of model is Ref<string>
/*const name = defineModel<string>('entityName'); //type of model is Ref<string>
const description = defineModel<string>('entityDescription');*/
</script>

<template>
  <div class="inputContainer">
    <label :for="props.labelId">{{props.label}}</label>
    <!--<input :type="props.type || 'text'" :id="props.labelId" :placeholder="props.placeholder" :value="modelValue" @input="onInput" required/>-->
    <input :type="props.type || 'text'" :id="props.labelId" :placeholder="props.placeholder" v-model="model" autofocus required/>
  </div>
</template>

<style scoped lang="scss">
.inputContainer{
  display: flex;
  flex-direction: column;
}
</style>
