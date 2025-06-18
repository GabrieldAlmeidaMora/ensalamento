<template>
  <v-app-bar color="primary" dark>
    <v-toolbar-title class="text-h6">Ensalamento</v-toolbar-title>

    <v-spacer />

    <v-btn class="mx-1" icon :title="'Home'" to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn class="mx-1" icon :title="'Dashboard'" to="/dashboard">
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn class="mx-1" icon :title="'Logout'" @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app'

  const { logout } = useAppStore()
</script>
