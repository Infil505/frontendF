<template>
  <div class="surface-ground p-4 min-h-screen">
    <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
      <h2 class="text-2xl font-bold text-center flex-grow text-center">Listado de Ítems</h2>

      <div class="flex gap-2">
        <router-link :to="{ name: 'ItemListByType' }">
          <Button label="Por tipo" icon="pi pi-tags" class="p-button-outlined p-button-sm" />
        </router-link>

        <router-link :to="{ name: 'ItemCreate' }">
          <Button label="Nuevo ítem" icon="pi pi-plus" class="p-button-sm" />
        </router-link>
      </div>
    </div>


    <div v-if="items.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
      <Card v-for="item in items" :key="item.id" class="shadow-2 border-1 border-gray-200">
        <template #title>
          {{ item.name }}
        </template>

        <template #content>
          <p><strong>Marca:</strong> {{ item.brand }}</p>
          <p><strong>Tipo:</strong> {{ item.type }}</p>
          <p><strong>Stock:</strong> {{ item.stock }}</p>
          <p><strong>Precio:</strong> €{{ parseFloat(item.final_price).toFixed(2) }}</p>
        </template>

        <template #footer>
          <div class="flex justify-between items-center">
            <router-link :to="`/items/${item.id}`">
              <Button icon="pi pi-eye" class="p-button-text p-button-sm" />
            </router-link>
            <router-link :to="{ name: 'ItemEdit', params: { id: item.id } }">
              <Button icon="pi pi-pencil" class="p-button-text p-button-sm text-blue-600" />
            </router-link>
            <Button icon="pi pi-trash" class="p-button-text p-button-sm text-red-500"
              @click="() => deleteItem(item.id)" />
          </div>
        </template>
      </Card>
    </div>

    <!-- Paginador -->
    <Paginator v-if="pagination.total > pagination.perPage" :rows="pagination.perPage" :totalRecords="pagination.total"
      :first="(pagination.page - 1) * pagination.perPage" @page="onPageChange" class="mt-4" />

    <div v-else-if="!items.length" class="text-center text-gray-500">
      <Message severity="info">No hay ítems para mostrar.</Message>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Message from 'primevue/message';
import Card from 'primevue/card';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';
import axios from '@/axios';
import { useRouter } from 'vue-router';

const items = ref([])
const router = useRouter()

const pagination = ref({
  page: 1,
  perPage: 9,
  total: 0
})

const fetchItems = async () => {
  try {
    const res = await axios.get('/items', {
      params: { page: pagination.value.page }
    })

    const data = res.data.items
    items.value = data.data || []
    pagination.value.total = data.total
    pagination.value.perPage = data.per_page
    pagination.value.page = data.current_page

  } catch (err) {
    console.error('❌ Error cargando ítems:', err)
  }
}

onMounted(fetchItems)

const onPageChange = (event) => {
  pagination.value.page = event.page + 1
  fetchItems()
}

const deleteItem = async (id) => {
  if (!id) return

  const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este ítem?')
  if (!confirmDelete) return

  try {
    await axios.delete(`/items/${id}`)
    await fetchItems()
  } catch (error) {
    console.error('❌ Error al eliminar el ítem:', error)
  }
}
</script>
