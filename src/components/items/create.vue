<template>
    <div class="container mx-auto mt-6">
        <h2 class="text-2xl font-semibold border-bottom-1 surface-border mb-4 pb-2">
            Nueva Categoría
        </h2>

        <Message v-if="errorsArray.length" severity="error" class="mb-3">
            <ul class="list-none m-0 p-0">
                <li v-for="(err, idx) in errorsArray" :key="idx">{{ err }}</li>
            </ul>
        </Message>

        <div class="formgrid grid">
            <div class="field col-12 md:col-6">
                <label for="categoria" class="block font-medium mb-2">Nombre de la categoría</label>
                <InputText id="categoria" v-model.trim="form.categoria" class="w-full"
                    :class="{ 'p-invalid': serverErrors.categoria }" />
            </div>

            <div class="field col-12 md:col-6">
                <label for="codigo" class="block font-medium mb-2">Código</label>
                <InputText id="codigo" v-model.trim="form.codigo" class="w-full"
                    :class="{ 'p-invalid': serverErrors.codigo }" />
            </div>
        </div>

        <div class="mt-4 flex gap-2">
            <Button label="Guardar" icon="pi pi-save" :disabled="processing" @click="submitForm" />
            <router-link :to="{ name: 'CategoryIndex' }">
                <Button label="← Volver" outlined severity="secondary" />
            </router-link>

        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/axios'
import Message from 'primevue/message'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const router = useRouter()

const form = reactive({
    categoria: '',
    codigo: ''
})

const processing = ref(false)
const serverErrors = ref({})

const errorsArray = computed(() =>
    serverErrors.value ? Object.values(serverErrors.value).flat() : []
)

const submitForm = async () => {
    processing.value = true
    serverErrors.value = {}

    try {
        await api.post('/categorias', form)

        router.push({ name: 'CategoryIndex' })
    } catch (err) {
        if (err.response?.status === 422) {
            serverErrors.value = err.response.data.errors || {}
        } else {
            alert('❌ Error al crear la categoría.')
        }
    } finally {
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
</style>
