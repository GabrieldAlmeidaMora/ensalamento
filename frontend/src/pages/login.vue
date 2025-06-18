<template>
  <v-container class="mt-5">
    <v-form @submit.prevent="handleLogin">
      <v-text-field
        v-model="email"
        label="Email"
        required
        type="email"
      />
      <v-text-field
        v-model="password"
        label="Senha"
        required
        type="password"
      />

      <v-btn
        class="mr-2"
        color="primary"
        :loading="app.loading"
        type="submit"
      >
        Entrar
      </v-btn>

      <v-btn
        color="red"
        :loading="app.loading"
        @click="app.loginWithGoogle"
      >
        Entrar com Google
      </v-btn>

      <v-alert
        v-if="app.error"
        class="mt-3"
        dense
        type="error"
      >
        {{ app.error }}
      </v-alert>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useAppStore } from '@/stores/app'

  const app = useAppStore()

  const email = ref('')
  const password = ref('')

  const handleLogin = async () => {
    await app.loginWithEmail(email.value, password.value)
  }
</script>
