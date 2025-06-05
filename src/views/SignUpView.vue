<script setup lang="ts">
import { ref } from 'vue';
import BasicButton from '@/components/atoms/BasicButton.vue';
import { useRegisterStore } from '@/stores/opretStore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const registerStore = useRegisterStore();
const router = useRouter();

async function handleRegister() {
  if (password.value !== confirmPassword.value) {
    registerStore.error = 'Adgangskoderne matcher ikke';
    return;
  }

  try {
    await registerStore.register(email.value, password.value);
    router.push('/enheder'); // Gå til siden efter succes
  } catch (error) {
    console.error('Registrering fejlede:', error);
  }
}

function handleCancel() {
  router.push('/');
}
</script>

<template>
  <div class="OpretWrapper">
    <div class="OpretContainer">
      <h1>Egenkontrollen</h1>
      <h2>Opret din konto</h2>

      <form class="loginForm" @submit.prevent="handleRegister">
        <div class="formGroup">
          <label for="email" class="formLabel">E-mail</label>
          <input v-model="email" type="email" id="email" class="formInput" placeholder="E-mail" />
        </div>

        <div class="formGroup">
          <label for="password" class="formLabel">Adgangskode</label>
          <input v-model="password" type="password" id="password" class="formInput" placeholder="Adgangskode" />
        </div>

        <div class="formGroup">
          <label for="confirmPassword" class="formLabel">Gentag Adgangskode</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" class="formInput"
            placeholder="Gentag adgangskode" />
        </div>

        <div class="buttonGroup">
          <BasicButton type="secondary" label="ANNULLER" ariaLabel="Annuller oprettelse" @click="handleCancel" />
          <BasicButton type="default" label="OPRET KONTO" ariaLabel="Opret konto" :loading="registerStore.loading"
            @click="handleRegister" />
          <p v-if="registerStore.error" class="error">{{ registerStore.error }}</p>
        </div>
      </form>

    </div>
  </div>
</template>

<style scoped lang="scss">
.OpretWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.OpretContainer {
  width: 500px;
  min-height: 500px;
  background-color: $white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    @include heading1;
    color: $darkGreen;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  h2 {
    @include heading2;
    font-weight: 600;
    margin-bottom: 2rem;
    color: $black;
  }

  .error {
    color: $red;
  }
}

.loginForm {
  display: flex;
  @include heading2;
  font-weight: 600;
  flex-direction: column;
  gap: 1.5rem;
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

.formLabel {
  font-size: 1rem;
  font-weight: 700;
  color: $black;
}

.formInput {
  padding: 12px 16px;
  border: none;
  background-color: $background;
  border-radius: 5px;
  @include breadCrumb;
  font-size: 14px;

  &:focus {
    outline: none;
    @include bodyText;
  }
}

.buttonGroup {
  display: flex;
  gap: 1rem;
  margin-top: 3rem;

  &>* {
    flex: 1;

    :deep(button) {
      display: flex;
      justify-content: center;
      width: 100%;

      p {
        margin: 0;
      }
    }
  }
}
</style>
