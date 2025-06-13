<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        {{ isEditing ? 'Editar Sala' : 'Nova Sala' }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="form.nome"
          label="Nome da Sala"
          required
          :rules="[v => !!v || 'Nome é obrigatório']"
        />

        <v-select
          v-model="form.status_id"
          item-title="nome"
          item-value="id"
          :items="statusOptions"
          label="Status"
          required
          :rules="[v => !!v || 'Status é obrigatório']"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="error" variant="text" @click="close">
          Cancelar
        </v-btn>
        <v-btn color="primary" variant="text" @click="submit">
          {{ isEditing ? 'Atualizar' : 'Salvar' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import api from '@/api'
  import { useAppStore } from '@/stores/app'

  const props = defineProps({
    statusOptions: {
      type: Array as () => Array<{ id: number, nome: string }>,
      required: true,
    },
  })

  const emit = defineEmits(['salaSaved'])

  const store = useAppStore()
  const dialog = ref(false)
  const form = ref({
    id: null as number | null,
    nome: '',
    status_id: null as number | null,
  })

  const isEditing = computed(() => form.value.id !== null)

  const open = (salaData: any = null) => {
    form.value = salaData
      ? { ...salaData }
      : { id: null, nome: '', status_id: props.statusOptions[0]?.id || null }
    dialog.value = true
  }

  const close = () => {
    dialog.value = false
  }

  const submit = async () => {
    try {
      await (isEditing.value ? updateSala() : createSala())
      emit('salaSaved')
      close()
      console.log(`Sala ${isEditing.value ? 'atualizada' : 'criada'} com sucesso!`, 'success')
    } catch {
      console.error(`Erro ao ${isEditing.value ? 'atualizar' : 'criar'} sala`, 'error')
    }
  }

  const createSala = async () => {
    const { data } = await api.post('/salas', form.value)
    return data
  }

  const updateSala = async () => {
    if (!form.value.id) return
    const { data } = await api.put(`/salas/${form.value.id}`, form.value)
    return data
  }

  defineExpose({ open })
</script>
