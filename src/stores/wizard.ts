import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useWizardStore = defineStore('wizardStore', () => {
  // reset
  const reset = () => {
    currentPage.value = 0;
    entityName.value = '';
    entityDescription.value = '';
  };
  // open close
  const isOpen = ref(false);
  const open = () => {
    reset();
    isOpen.value = true;
  };
  const close = () => {
    isOpen.value = false;
  };
  // page handling
  const currentPage = ref(0);
  const totalPages = ref(0);
  const next = () => {
    if (currentPage.value < (totalPages.value - 1)) {
      currentPage.value += 1;
    }
  };
  const previous = () => {
    if (currentPage.value > 0) {
      currentPage.value -= 1;
    }
  };
  const setLength = (amountOfPages: number) => {
    totalPages.value = amountOfPages;
  };
  // form handling
  const entityName = ref('');
  const entityDescription = ref('');
  const entitySyncId = ref('');
  const submit = () => {
    console.log('SUBMIT', entityName.value, entityDescription.value, entitySyncId.value);
    close();
  };
  // exports
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
    entityName,
    entityDescription,
    entitySyncId,
  };
});
