<template>
  <!-- Menú siempre arriba -->
  <Menubar :model="menuModel" class="surface-ground px-3 py-2 shadow-2" />

  <!-- Buscador persistente debajo del menú -->
  <div class="container mx-auto my-2 px-4">
    <SearchForm class="mb-3" />
  </div>

  <!-- Vista dinámica -->
  <div class="container mx-auto my-4 p-4 border-round-xl shadow-3 surface-card">
    <Toast />
    <router-view />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SearchForm from '@/components/component/search.vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import api from '@/axios'

const router = useRouter()
const categorias = ref([])
const tiposPorCat = ref({})

onMounted(async () => {
  try {
    const res = await api.get('/categorias')
    categorias.value = res.data

    for (const cat of res.data) {
      const itemsRes = await api.get(`/categorias/${cat.id}/items`)
      const items = Array.isArray(itemsRes.data.items)
        ? itemsRes.data.items
        : itemsRes.data
      const tipos = [...new Set(items.map((i) => i.type))]
      tiposPorCat.value[cat.id] = tipos
    }
  } catch (e) {
    console.error('❌ Error cargando menú:', e)
  }
})

const menuModel = computed(() => {
  const menu = categorias.value.map((cat) => {
    const tipos = tiposPorCat.value[cat.id] || []
    return {
      label: cat.categoria?.toUpperCase() || 'SIN NOMBRE',
      items: [
        {
          label: 'Tipos',
          items: tipos.map((tipo) => ({
            label: tipo,
            command: () =>
              router.push({
                name: 'ItemsByCategory',
                params: { categoryId: cat.id },
                query: { tipo }
              })
          }))
        }
      ]
    }
  })

  menu.push({
    label: '➕ Agregar categoría',
    command: () => router.push({ name: 'CategoryCreate' })
  })

  return menu
})

</script>

<style scoped>
.container {
  max-width: 1100px;
}
</style>
