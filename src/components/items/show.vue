<template>
  <!-- contenedor principal -->
  <div class="item-details" v-if="item">
    <h2>{{ item.name }}</h2>

    <div class="p-grid">
      <!-- columna 1 -->
      <div class="p-col-12 p-md-6">
        <ul>
          <li><strong>Categoría:</strong> {{ item.category?.name || 'Sin categoría' }}</li>
          <li><strong>Tipo:</strong> {{ item.type }}</li>
          <li><strong>Marca:</strong> {{ item.brand }}</li>
          <li><strong>Stock disponible:</strong> {{ item.stock }}</li>
        </ul>
      </div>

      <!-- columna 2 -->
      <div class="p-col-12 p-md-6">
        <ul>
          <li><strong>Precio original:</strong> €{{ +item.price   | currency }}</li>
          <li><strong>Descuento:</strong> {{ item.discount }}%</li>
          <li><strong>Precio final:</strong> €{{ +item.final_price | currency }}</li>
        </ul>
      </div>
    </div>

    <div class="btn-wrapper">
      <router-link :to="`/items/${item.id}/edit`" class="p-button p-button-primary">
        Editar
      </router-link>
    </div>
  </div>

  <!-- estado de carga -->
  <div v-else class="loading">
    Cargando ítem…
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/axios'        // usa tu instancia global

const item  = ref(null)
const route = useRoute()

onMounted(async () => {
  try {
    const { data } = await axios.get(`/items/${route.params.id}`)
    item.value = data
  } catch (e) {
    console.error('Error cargando ítem:', e)
  }
})
</script>

<style scoped>
.item-details {
  background: #ffffff;           /* fondo claro */
  color: #212121;                /* texto oscuro */
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,.15);
  padding: 1.5rem;
}

.item-details h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 1rem;
  text-align: center;
  color: #0d47a1;               /* azul para destacar título */
}

.item-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item-details li {
  margin-bottom: .5rem;
}

.btn-wrapper {
  text-align: center;
  margin-top: 1.5rem;
}

.loading {
  padding: 2rem;
  text-align: center;
  color: #555;
}
</style>
