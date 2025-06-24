<template>
  <form @submit.prevent="search" class="mb-4">
    <span class="p-input-icon-right w-full md:w-30rem">
      <i class="pi pi-search" />
      <InputText v-model="query" type="text" placeholder="Buscar producto..." class="w-full" />
    </span>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'

const query = ref('')
const router = useRouter()

const search = () => {
  if (query.value.trim()) {
    router.push({ name: 'Search', query: { q: query.value } })
  }
}
</script>

