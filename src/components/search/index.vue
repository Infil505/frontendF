<template>
    <div class="item-details">
        <h2 class="text-2xl font-semibold mb-4">Ítems de la categoría "{{ categoryName }}"</h2>

        <div v-if="items.length" class="grid">
            <div v-for="item in items" :key="item.id" class="col-12 md:col-6 lg:col-4">
                <div class="item-card">
                    <h3 class="text-xl font-bold mb-2">{{ item.name }}</h3>
                    <ul>
                        <li><strong>Tipo:</strong> {{ item.type }}</li>
                        <li><strong>Marca:</strong> {{ item.brand }}</li>
                        <li><strong>Precio:</strong> €{{ parseFloat(item.price).toFixed(2) }}</li>
                    </ul>
                    <div class="btn-wrapper mt-2">
                        <router-link :to="`/items/${item.id}`" class="p-button p-button-sm">
                            Ver detalles
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="loading">No hay ítems en esta categoría.</div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/axios'

const route = useRoute()
const items = ref([])
const categoryName = ref('')
const categoryId = ref(route.params.categoryId)
const tipoFiltrado = ref(route.query.tipo || null)

const cargarItems = async () => {
    try {
        const res = await api.get(`/categorias/${categoryId.value}/items`)
        console.log('📦 Datos recibidos del backend:', res.data)

        let data = Array.isArray(res.data.items) ? res.data.items : res.data

        if (tipoFiltrado.value) {
            data = data.filter((i) => i.type === tipoFiltrado.value)
            console.log(`🔍 Filtrando por tipo "${tipoFiltrado.value}" →`, data)
        }

        items.value = data
        categoryName.value = data.length ? data[0].category?.categoria || 'Sin nombre' : 'Sin ítems'
    } catch (e) {
        console.error('❌ Error cargando ítems por categoría:', e)
    }
}

onMounted(cargarItems)
watch(() => route.params.categoryId, (newId) => {
    categoryId.value = newId
    tipoFiltrado.value = route.query.tipo || null
    cargarItems()
})
</script>

<style scoped>
.item-details {
    background: #ffffff;
    color: #212121;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    padding: 1.5rem;
}

.item-details h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
    color: #0d47a1;
}

.item-card {
    background-color: #f9f9f9;
    border-radius: 6px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.item-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.item-card li {
    margin-bottom: 0.5rem;
    color: #333;
}

.btn-wrapper {
    text-align: left;
    margin-top: 1rem;
}

.loading {
    padding: 2rem;
    text-align: center;
    color: #555;
}
</style>
