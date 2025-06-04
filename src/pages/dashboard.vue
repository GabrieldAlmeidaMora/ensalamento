<template>
  <v-app-bar color="primary" dark>
    <v-toolbar-title class="text-h6">Meu App</v-toolbar-title>

    <v-spacer />

    <v-btn class="mx-1" icon :title="'Home'" to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn class="mx-1" icon :title="'Dashboard'" to="/dashboard">
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn
      class="mx-1"
      color="red"
      icon
      :title="'Logout'"
      @click="handleLogout"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>

  <v-container>
    <v-row class="justify-space-between align-center mb-4">
      <v-col>
        <h1 class="text-h5 font-weight-bold">Dashboard</h1>
      </v-col>
      <v-col class="text-right" cols="auto">
        <v-btn icon @click="addSala">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-table>
      <thead>
        <tr>
          <th>Sala</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sala, index) in salas" :key="index">
          <td>{{ sala.nome }}</td>
          <td>
            <v-chip
              class="text-white"
              :color="sala.status === 'livre' ? 'green' : 'red'"
              small
            >
              {{ sala.status }}
            </v-chip>
          </td>
          <td>
            <v-btn icon @click="editSala(index)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteSala(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import router from '@/router'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

  interface Sala {
    nome: string
    status: 'livre' | 'reservado'
  }

  const salas = ref<Sala[]>([
    { nome: 'A-101', status: 'livre' },
    { nome: 'B-202', status: 'reservado' },
  ])

  function addSala () {
    salas.value.push({ nome: 'Nova Sala', status: 'livre' })
  }

  function editSala (index: number) {
    const sala = salas.value[index]
    sala.status = sala.status === 'livre' ? 'reservado' : 'livre'
  }

  function deleteSala (index: number) {
    salas.value.splice(index, 1)
  }

  const handleLogout = async () => {
    await store.logout()
    router.push('/login') // redireciona após logout
  }
</script>

<style scoped>
.v-table {
  width: 100%;
}
</style>
