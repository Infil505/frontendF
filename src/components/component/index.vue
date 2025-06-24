<template>
    <div class="item-details">
        <h2 class="text-2xl font-semibold mb-4 text-center text-blue-900">
            Resultados para: "{{ route.query.q }}"
        </h2>

        <!-- Spinner de carga -->
        <div v-if="loading" class="flex justify-center p-4">
            <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="6" />
        </div>

        <!-- Resultados -->
        <div v-else-if="items.length" class="grid">
            <div v-for="item in items" :key="item.id" class="col-12 md:col-6 lg:col-4">
                <div class="item-card">
                    <h3 class="text-xl font-bold mb-2">{{ item.name }}</h3>
                    <p><strong>Tipo:</strong> {{ item.type }}</p>
                    <p><strong>Marca:</strong> {{ item.brand }}</p>
                    <p><strong>Precio:</strong> €{{ parseFloat(item.price).toFixed(2) }}</p>
                    <router-link :to="`/items/${item.id}`" class="p-button p-button-sm mt-2">Ver detalles</router-link>
                </div>
            </div>
        </div>

        <!-- Sin resultados -->
        <div v-else class="loading text-center">No se encontraron resultados.</div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/axios'
import ProgressSpinner from 'primevue/progressspinner'

const route = useRoute()
const items = ref([])
const loading = ref(false)

const loadItems = async () => {
    const q = route.query.q
    if (!q) return

    loading.value = true
    items.value = []

    try {
        const res = await api.get('/items/search', { params: { q } })
        console.log('📦 Datos cargados:', res.data)
        items.value = Array.isArray(res.data.items) ? res.data.items : res.data
    } catch (e) {
        console.error('❌ Error en búsqueda:', e)
    } finally {
        loading.value = false
    }
}

onMounted(loadItems)
watch(() => route.query.q, loadItems)
</script>

<style scoped>
.item-details {
    background: #ffffff;
    color: #212121;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    padding: 1.5rem;
}

.item-card {
    background-color: #f9f9f9;
    border-radius: 6px;
    padding: 1rem;
    margin-bottom: 1rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    color: #1e1e1e;
}

.item-card p,
.item-card li,
.item-card h3 {
    color: #1e1e1e;
}

.loading {
    padding: 2rem;
    color: #555;
}
</style>
