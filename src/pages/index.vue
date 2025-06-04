<template>
  <v-container>
    <v-card class="pa-4">
      <v-card-text>
        <h2 class="text-h6 mb-4">Index</h2>
        <v-btn class="mr-2" color="primary" icon @click="goToLogin">
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn color="success" icon @click="goToDashboard">
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goToLogin = () => {
    router.push('/login')
  }

  const goToDashboard = () => {
    router.push('/dashboard')
  }
</script>
