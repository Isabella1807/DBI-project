import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useWizardStore = defineStore('wizardStore', () => {
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
  const close = () => {
    console.log('CLOSE WIZARD');
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
    currentPage,
    totalPages,
    next,
    previous,
    close,
    submit,
    reset,
    setLength,
  };
});
