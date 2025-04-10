import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useWizardStore = defineStore('wizardStore', () => {
  const isOpen = ref(false);
  const currentPage = ref(0);
  const totalPages = ref(0);
  const next = () => {
    if (currentPage.value < (totalPages.value - 1)) {
      currentPage.value += 1;
    }
  };
  const previous = () => {
    console.log('PREV PAGE');
    if (currentPage.value > 0) {
      currentPage.value -= 1;
    }
  };
  const open = () => {
    reset();
    isOpen.value = true;
  };
  const close = () => {
    isOpen.value = false;
  };
  const submit = () => {
    console.log('SUBMIT WIZARD');
  };
  const reset = () => {
    currentPage.value = 0;
  };
  const setLength = (amountOfPages: number) => {
    totalPages.value = amountOfPages;
  };
  return {
    isOpen,
    currentPage,
    totalPages,
    next,
    previous,
    open,
    close,
    submit,
    reset,
    setLength,
  };
});
