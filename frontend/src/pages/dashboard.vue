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
  </v-app-bar>

  <v-container>

    <v-row class="justify-space-between align-center mb-4">
      <v-col>
        <h1 class="text-h5 font-weight-bold">Dashboard</h1>
      </v-col>
      <v-col class="text-right" cols="auto">
        <v-btn icon @click="openCreateModal">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <SalaModal
      ref="salaModal"
      :status-options="statusOptions"
      @sala-saved="fetchSalas"
    />

    <v-table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Data Criação</th>
          <th>Data Atualização</th>
          <th>Status</th>
          <th>Descrição do Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sala in salas" :key="sala.id">
          <td>{{ sala.id }}</td>
          <td>{{ sala.nome }}</td>
          <td>{{ new Date(sala.data_criacao).toLocaleDateString() }}</td>
          <td>{{ new Date(sala.data_atualizacao).toLocaleDateString() }}</td>
          <td>{{ sala.status }}</td>
          <td>{{ sala.status_descricao }}</td>
          <td>
            <v-btn icon @click="openEditModal(sala)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteSala(sala.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

  </v-container>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import api from '@/api'
  import SalaModal from '@/components/AddRoomModal.vue'

  const salas = ref<any[]>([])
  const statusOptions = ref<any[]>([])
  const salaModal = ref<InstanceType<typeof SalaModal> | null>(null)

  onMounted(async () => {
    await fetchSalas()
    await fetchStatusOptions()
  })

  const fetchSalas = async () => {
    try {
      const { data } = await api.get('/salas')
      salas.value = data
    } catch {
      console.error('Erro ao carregar salas', 'error')
    }
  }

  const fetchStatusOptions = async () => {
    try {
      const { data } = await api.get('/status-sala')
      statusOptions.value = data
    } catch {
      console.error('Erro ao carregar status', 'error')
    }
  }

  const openCreateModal = () => {
    salaModal.value?.open()
  }

  const openEditModal = (sala: any) => {
    salaModal.value?.open(sala)
  }

  const deleteSala = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta sala?')) return

    try {
      await api.delete(`/salas/${id}`)
      await fetchSalas()
      console.log('Sala excluída com sucesso!', 'success')
    } catch {
      console.error('Erro ao excluir sala', 'error')
    }
  }
</script>
