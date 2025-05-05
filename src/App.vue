<script setup lang="ts">
import TabNav from '@/components/organisms/TabNav.vue';
import WaterMark from '@/components/atoms/WaterMark.vue';
import UnderMenu from '@/components/organisms/UnderMenu.vue';
import CreateEntityWizard from '@/components/organisms/CreateEntityWizard.vue';
import {useWizardStore} from '@/stores/wizard.ts';
import ConfirmModal from '@/components/molecules/ConfirmModal.vue';
import Restore from './components/atoms/Restore.vue';
import { ref } from 'vue'

const showToast = ref(true)
const toastType = ref('delete')

const handleUndo = () => {
  toastType.value = 'restore'
}

const wizardStore = useWizardStore();
</script>

<template>
  <div class="bodyContainer">
    <WaterMark :class="{blur: wizardStore.isOpen}"/>
    <div class="mainContainer" :class="{blur: wizardStore.isOpen}">
      <main>
        <TabNav />
        <UnderMenu />
        <RouterView />
        <Restore v-if="showToast" :type="toastType" @undo="handleUndo" />
      </main>
    </div>
    <CreateEntityWizard/>
    <ConfirmModal
      v-if="wizardStore.confirmModalIsOpen"
      iconName="Circle_Warning"
      title="Det ser ud til, du ikke er færdig"
      description="Ændringer vil ikke blive gemt"
      note="Vil du afslutte alligevel?"
      cancelText="Annuller"
      confirmText="Ja - afslut og luk ned"
      @cancel="() => wizardStore.cancelClose()"
      @confirm="() => wizardStore.confirmClose()"
    />
  </div>
</template>

<style scoped lang="scss">
.bodyContainer {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  //border: 1px solid red;

  .mainContainer {
    flex: 1;
    display: flex;
    justify-content: space-around;
    //border: 1px solid blue;

    main {
      max-width: min(1280px, calc(100% - 3rem));
      flex: 1;
      //border: 1px solid blueviolet;
    }
  }
}

.blur{
  filter: blur(5px);
}
</style>
