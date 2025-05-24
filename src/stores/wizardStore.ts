import {defineStore} from 'pinia';
import {ref, computed, type Ref} from 'vue';
import {useUnitStore} from '@/stores/unitStore.ts';
import type {UnitTypeWithId} from '@/types/unitTypes.ts';

export const useWizardStore = defineStore('wizardStore', () => {
  const unitStore = useUnitStore();
  const reset = () => {
    entityName.value = '';
    entityDescription.value = '';
    entitySyncId.value = '';

    entityToEdit.value = null;

    currentPage.value = 0;
    isReady.value = false;
  };
  const confirmModalIsOpen = ref(false);
  const isOpen = ref(false);
  const open = (editUnit?: UnitTypeWithId) => {
    reset();

    if (editUnit) {
      // Store original data
      entityToEdit.value = editUnit;
      // Prefill fields with data from the unit
      entityName.value = editUnit.name;
      entityDescription.value = editUnit.description;
      entitySyncId.value = editUnit.syncId;
    }

    isOpen.value = true;
    setTimeout(() => {
      isReady.value = true;
    }, 50);
  };
  const close = () => {
    if (somethingIsChanged.value) {
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
  const entityName = ref('');
  const entityDescription = ref('');
  const entitySyncId = ref('');
  const entityToEdit: Ref<UnitTypeWithId | null> = ref(null);
  const somethingIsChanged = computed(() => {
    if (entityToEdit.value === null) {
      // Wizard is creating a new unit. Check if all values are empty
      if (entityName.value === ''
        && entityDescription.value === ''
        && entitySyncId.value === '') {
        return false;
      }
    } else {
      // Wizard is editing a unit. Check if all values are the same as the original
      if (entityName.value === entityToEdit.value.name
        && entityDescription.value === entityToEdit.value.description
        && entitySyncId.value === entityToEdit.value.syncId) {
        return false;
      }
    }
    // Something has changed since the wizard opened
    return true;
  });
  const submit = () => {
    confirmClose();

    if (entityToEdit.value) {
      unitStore.updateUnit({
        ...entityToEdit.value,
        name: entityName.value,
        description: entityDescription.value,
        syncId: entitySyncId.value,
      });
    } else {
      unitStore.createNew({
        name: entityName.value,
        description: entityDescription.value,
        syncId: entitySyncId.value,
      });
    }
  };
  const isReady = ref(false);
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
    isReady,
  };
});
