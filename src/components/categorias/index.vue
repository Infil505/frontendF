<template>
  <div class="container mt-6">
    <!-- Botón para agregar nueva categoría -->
    <div class="flex justify-end mb-4">
      <!-- Botón para agregar nueva categoría -->
<div class="flex justify-end mb-4">
  <button class="btn-primary" @click="router.push({ name: 'CategoryCreate' })">
    + Nueva Categoría
  </button>
</div>

    </div>

    <!-- Tarjetas de categorías -->
    <div class="grid grid-nogutter md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="category in categorias" :key="category.id">
        <div class="card">
          <h3 class="card-title">{{ category.categoria }}</h3>
          <p class="card-info">Código: {{ category.codigo }}</p>
          <p class="card-info">
            Creada: {{ new Date(category.created_at).toLocaleDateString() }}
          </p>

          <!-- Botón eliminar -->
          <button class="btn-danger mt-3" @click="eliminarCategoria(category.id)">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axios'

const categorias = ref([])
const router = useRouter()

// Obtener categorías
const cargarCategorias = async () => {
  try {
    const response = await api.get('/categorias')
    categorias.value = response.data
  } catch (error) {
    console.error('❌ Error cargando categorías:', error)
  }
}

// Eliminar una categoría
const eliminarCategoria = async (id) => {
  if (!confirm('¿Estás seguro de eliminar esta categoría?')) return

  try {
    await api.delete(`/categorias/${id}`)
    categorias.value = categorias.value.filter(c => c.id !== id)
  } catch (error) {
    console.error('❌ Error al eliminar categoría:', error)
  }
}

onMounted(cargarCategorias)
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-danger {
  background-color: #ef4444;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.btn-danger:hover {
  background-color: #dc2626;
}

.card {
  background-color: #f0f9ff;
  border: 1px solid #dbeafe;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.card-info {
  font-size: 0.95rem;
  color: #475569;
  margin-bottom: 0.4rem;
}
</style>
