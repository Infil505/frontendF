<template>
    <div class="surface-ground p-4 min-h-screen">
        <div class="flex justify-between items-center mb-4 flex-wrap gap-2">
            <h2 class="text-2xl font-bold text-center flex-grow text-center">Ítems agrupados por tipo</h2>

            <div class="flex gap-2">
                <router-link :to="{ name: 'ItemCreate' }">
                    <Button label="Nuevo ítem" icon="pi pi-plus" class="p-button-sm" />
                </router-link>
            </div>
        </div>

        <div v-if="groupedItems.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card v-for="(group, index) in groupedItems" :key="index" class="shadow-2 border-1 border-gray-200">
                <template #title>
                    <h3 class="text-xl font-semibold capitalize">{{ group.type }}</h3>
                </template>

                <template #content>
                    <div v-for="item in group.items.slice(0, 3)" :key="item.id" class="mb-3 border-b pb-2">
                        <p class="font-semibold">{{ item.name }}</p>
                        <p class="text-sm text-gray-600">{{ item.brand }} - €{{ parseFloat(item.final_price).toFixed(2)
                            }}</p>
                    </div>
                </template>

                <template #footer>
                    <router-link :to="{ name: 'Search', query: { q: group.type } }">
                        <span class="text-sm text-blue-600 hover:underline">VER MÁS →</span>
                    </router-link>
                </template>

            </Card>
        </div>

        <div v-else class="text-center text-gray-500 mt-10">
            <Message severity="info">No hay ítems disponibles.</Message>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from '@/axios'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Message from 'primevue/message'

const items = ref([])

const fetchItems = async () => {
    try {
        const res = await axios.get('/items')
        items.value = res.data.items?.data || []
    } catch (err) {
        console.error('❌ Error cargando ítems:', err)
    }
}

onMounted(fetchItems)

// Agrupar por tipo
const groupedItems = computed(() => {
    const groups = {}
    for (const item of items.value) {
        if (!groups[item.type]) {
            groups[item.type] = []
        }
        groups[item.type].push(item)
    }
    return Object.entries(groups).map(([type, items]) => ({ type, items }))
})
</script>
