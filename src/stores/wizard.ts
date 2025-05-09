import {defineStore} from 'pinia';
import {ref, computed} from 'vue';

export const useWizardStore = defineStore('wizardStore', () => {
  // reset
  const reset = () => {
    currentPage.value = 0;
    entityName.value = '';
    entityDescription.value = '';
    isReady.value = false;
  };

  //open close modal
  const confirmModalIsOpen = ref(false);

  // open close
  const isOpen = ref(false);
  const open = () => {
    reset();
    isOpen.value = true;
    setTimeout(() => {
      isReady.value = true;
    }, 50);
  };

  const close = () => {
    if (somethingIsWritten.value) {
      confirmModalIsOpen.value = true;
    } else {
      isOpen.value = false;
    }
  };

  const cancelClose = () => {
    confirmModalIsOpen.value = false;
  };

  const confirmClose = () => {
    confirmModalIsOpen.value = false;
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

  // handle confirm modal
  const somethingIsWritten = computed(() => {
    if (entityName.value === '' && entityDescription.value === '' && entitySyncId.value === '') {
      return false;
    }
    return true;
  });

  const submit = () => {
    confirmClose();
  };

  //transition fix
  const isReady = ref(false);

  // exports
  return {
    isOpen,
    confirmModalIsOpen,
    currentPage,
    totalPages,
    next,
    previous,
    open,
    close,
    cancelClose,
    confirmClose,
    submit,
    reset,
    setLength,
    entityName,
    entityDescription,
    entitySyncId,
    somethingIsWritten,
    isReady,
  };
});
