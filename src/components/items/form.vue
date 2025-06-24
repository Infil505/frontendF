<template>
    <div>
        <div class="field grid align-items-center">
            <label for="category_id" class="col-12 md:col-3 font-medium mb-2">Categoría</label>
            <div class="col-12 md:col-7">
                <Dropdown id="category_id" v-model="form.category_id" :options="categories" optionLabel="categoria"
                    optionValue="id" placeholder="Seleccione una categoría" class="w-full" />
            </div>
            <div class="col-12 md:col-2 text-right">
                <router-link to="/categories/create">
                    <Button label="+ Crear" icon="pi pi-plus" size="small" />
                </router-link>
            </div>
        </div>

        <div class="field">
            <label for="name">Nombre</label>
            <InputText id="name" v-model.trim="form.name" class="w-full" required />
        </div>

        <div class="field">
            <label for="type">Tipo</label>
            <InputText id="type" v-model.trim="form.type" class="w-full" required />
        </div>

        <div class="field">
            <label for="brand">Marca</label>
            <InputText id="brand" v-model.trim="form.brand" class="w-full" required />
        </div>

        <div class="formgrid grid">
            <div class="field col-12 md:col-6">
                <label for="price">Precio</label>
                <InputNumber id="price" v-model.number="form.price" mode="currency" currency="EUR" locale="es-ES"
                    class="w-full" />
            </div>

            <div class="field col-12 md:col-6">
                <label for="discount">Descuento (%)</label>
                <InputNumber id="discount" v-model.number="form.discount" :min="0" :max="100" class="w-full" />
            </div>
        </div>

        <div class="formgrid grid">
            <div class="field col-12 md:col-6">
                <label for="final_price">Precio final</label>
                <InputNumber id="final_price" v-model.number="form.final_price" mode="currency" currency="EUR"
                    locale="es-ES" class="w-full" />
            </div>

            <div class="field col-12 md:col-6">
                <label for="stock">Stock</label>
                <InputNumber id="stock" v-model.number="form.stock" :min="0" class="w-full" />
            </div>
        </div>

        <div class="field">
            <label for="short_description">Descripción corta</label>
            <Textarea id="short_description" v-model.trim="form.short_description" rows="4" class="w-full" />
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'

const props = defineProps({
    categories: Array,
    initialForm: Object
})

const emit = defineEmits(['update:form'])

const form = reactive({ ...structuredClone(props.initialForm) })

watch(
    form,
    (val) => emit('update:form', { ...val }),
    { deep: true }
)
</script>

<style scoped>
.field {
    margin-bottom: 1rem;
}
</style>
