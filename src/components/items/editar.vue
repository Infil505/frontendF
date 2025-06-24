<template>
  <div class="container mt-6">
    <h2 class="text-2xl font-semibold mb-4">Editar ítem: {{ form.name }}</h2>

    <Message v-if="errorsArray.length" severity="error" class="mb-3">
      <h4 class="font-semibold mb-2">Por favor corrige los siguientes errores:</h4>
      <ul class="list-none p-0 m-0">
        <li v-for="(err, idx) in errorsArray" :key="idx">{{ err }}</li>
      </ul>
    </Message>

    <form @submit.prevent="submitForm" class="grid gap-4" v-if="loaded">
      <div class="field">
        <label for="name">Nombre</label>
        <InputText id="name" v-model.trim="form.name" class="w-full" required />
      </div>

      <div class="field">
        <label for="brand">Marca</label>
        <InputText id="brand" v-model.trim="form.brand" class="w-full" required />
      </div>

      <div class="field">
        <label for="type">Tipo</label>
        <InputText id="type" v-model.trim="form.type" class="w-full" required />
      </div>

      <div class="field">
        <label for="stock">Stock</label>
        <InputNumber id="stock" v-model.number="form.stock" :min="0" class="w-full" />
      </div>

      <div class="field">
        <label for="price">Precio</label>
        <InputNumber id="price" v-model.number="form.price" mode="currency" currency="EUR" locale="es-ES" class="w-full" />
      </div>

      <div class="field">
        <label for="discount">Descuento (%)</label>
        <InputNumber id="discount" v-model.number="form.discount" :min="0" :max="100" class="w-full" />
      </div>

      <div class="field">
        <label for="category_id">Categoría</label>
        <Dropdown v-model="form.category_id" :options="categories" optionLabel="categoria" optionValue="id" placeholder="Seleccione una categoría" class="w-full" />
      </div>

      <div class="flex justify-content-between mt-4">
        <Button label="Actualizar ítem" icon="pi pi-save" type="submit" :disabled="processing" />
        <router-link :to="`/items/${route.params.id}`">
          <Button label="← Volver" severity="secondary" outlined />
        </router-link>
      </div>
    </form>

    <div v-else class="loading">Cargando datos del ítem...</div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/axios'
import Message from 'primevue/message'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()

const processing = ref(false)
const serverErrors = ref({})
const loaded = ref(false)

const form = reactive({
  name: '',
  brand: '',
  type: '',
  stock: 0,
  price: 0,
  discount: 0,
  category_id: ''
})

const categories = ref([])

const errorsArray = computed(() => {
  return serverErrors.value ? Object.values(serverErrors.value).flat() : []
})

onMounted(async () => {
  try {
    const [{ data: item }, { data: cat }] = await Promise.all([
      api.get(`/items/${route.params.id}`),
      api.get('/categorias')
    ])

    // llenar formulario
    form.name = item.name
    form.brand = item.brand
    form.type = item.type
    form.stock = item.stock
    form.price = item.price
    form.discount = item.discount
    form.category_id = item.category_id

    categories.value = cat
    loaded.value = true
  } catch (e) {
    console.error('Error cargando datos:', e)
    alert('Error cargando datos del ítem o categorías.')
  }
})

const submitForm = async () => {
  processing.value = true
  serverErrors.value = {}

  try {
    await api.put(`/items/${route.params.id}`, form)
    router.push(`/items/${route.params.id}`)
  } catch (err) {
    if (err.response?.status === 422) {
      serverErrors.value = err.response.data.errors || {}
    } else {
      alert('Error al actualizar el ítem.')
    }
    processing.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}
.loading {
  text-align: center;
  padding: 1rem;
}
</style>
