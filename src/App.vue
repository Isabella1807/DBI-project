<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import TabNav from '@/components/organisms/TabNav.vue';
import WaterMark from '@/components/atoms/WaterMark.vue';
import CreateEntityWizard from '@/components/organisms/CreateEntityWizard.vue';
import ConfirmModal from '@/components/molecules/ConfirmModal.vue';
import { useWizardStore } from '@/stores/wizard.ts';
import { useAuthStore } from '@/stores/loginStore';
import { onMounted } from 'vue';

const wizardStore = useWizardStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

// Initialiser auth ved komponentoprettelse
onMounted(async () => {
  await authStore.initializeAuth();

  // Hvis bruger ikke er logget ind og ikke er på auth-siden
  if (!authStore.isAuthenticated && route.meta.layout !== 'auth') {
    router.push('/');
  }
});
</script>

<template>
  <div class="bodyContainer">
    <!-- Kun vis hvis bruger er logget ind -->
    <template v-if="authStore.isAuthenticated && route.meta.layout !== 'auth'">
      <WaterMark :class="{ blur: wizardStore.isOpen }" />
      <div class="mainContainer" :class="{ blur: wizardStore.isOpen }">
        <main>
          <TabNav />
          <RouterView />
        </main>
      </div>
      <CreateEntityWizard />
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
    </template>

    <!-- Vis login-siden for ikke-autentificerede brugere -->
    <template v-else>
      <RouterView />
    </template>
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
