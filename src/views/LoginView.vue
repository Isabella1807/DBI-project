<script setup lang="ts">
import { ref } from 'vue';
import BasicButton from '@/components/atoms/BasicButton.vue';
import { useAuthStore } from '@/stores/loginStore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

async function handleLogin() {
  try {
    await authStore.login(email.value, password.value);
    router.push('/enheder'); // Omdiriger efter succesfuld login
  } catch (error) {
    console.error('Login fejl:', error);
  }
}
</script>

<template>
  <div class="loginWrapper">
    <div class="loginContainer">
      <h1>Egenkontrollen</h1>
      <h2>Log in</h2>

      <form class="loginForm" @submit.prevent="">
        <div class="formGroup">
          <label for="email" class="formLabel">E-mail</label>
          <input v-model="email" type="email" id="email" class="formInput" placeholder="E-mail" />
        </div>

        <div class="formGroup">
          <label for="password" class="formLabel">Adgangskode</label>
          <input v-model="password" type="password" id="password" class="formInput" placeholder="Adgangskode" />
        </div>

        <div class="buttonGroup">
          <BasicButton type="secondary" label="OPRET KONTO" ariaLabel="Opret ny konto" />
          <BasicButton
            type="default"
            label="LOG IND"
            ariaLabel="Log ind"
            :loading="authStore.loading"
            @click="handleLogin"
          />
          <p v-if="authStore.error" class="error">{{ authStore.error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loginWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.loginContainer {
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

  & > * {
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
