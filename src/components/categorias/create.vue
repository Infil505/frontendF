<template>
  <div class="container mx-auto mt-6">
    <h2 class="text-2xl font-semibold border-bottom-1 surface-border mb-4 pb-2">
      Nueva Categoría
    </h2>

    <Message v-if="errors.length" severity="error" class="mb-3">
      <ul class="list-none m-0 p-0">
        <li v-for="(err, idx) in errors" :key="idx">{{ err }}</li>
      </ul>
    </Message>

    <div class="formgrid grid">
      <div class="field col-12 md:col-6">
        <label for="categoria" class="block font-medium mb-2">Nombre de la categoría</label>
        <InputText
          id="categoria"
          v-model.trim="form.categoria"
          class="w-full"
          :class="{ 'p-invalid': submitted && !form.categoria }"
        />
      </div>

      <div class="field col-12 md:col-6">
        <label for="codigo" class="block font-medium mb-2">Código</label>
        <InputText
          id="codigo"
          v-model.trim="form.codigo"
          class="w-full"
          :class="{ 'p-invalid': submitted && !form.codigo }"
        />
      </div>
    </div>

    <div class="mt-4 flex gap-2">
      <Button
        label="Guardar"
        icon="pi pi-save"
        :disabled="processing"
        @click="submitForm"
      />
      <router-link :to="{ name: 'CategoryIndex' }">
        <Button label="← Volver" outlined severity="secondary" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axios'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'

const router = useRouter()

const form = reactive({
  categoria: '',
  codigo: ''
})

const errors = ref([])
const submitted = ref(false)
const processing = ref(false)

const submitForm = async () => {
  submitted.value = true
  errors.value = []
  processing.value = true

  try {
    await api.post('/categorias', form)
    router.push({ name: 'CategoryIndex' })
  } catch (err) {
    if (err.response?.status === 422) {
      errors.value = Object.values(err.response.data.errors || {})
    } else {
      alert('Error al crear la categoría.')
    }
  } finally {
    processing.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 1100px;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}
</style>
