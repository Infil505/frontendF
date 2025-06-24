import { createRouter, createWebHistory } from 'vue-router'

// Vistas
import Home from '../views/Home.vue'

// Componentes
import ItemIndex from '../components/items/index.vue'
import ItemsByCategory from '../components/search/index.vue'
import ItemDetails from '../components/items/show.vue'
import ItemCreate from '../components/items/create.vue'
import ItemEdit from '../components/items/editar.vue'
import ItemSearchResults from '../components/search/index.vue'  

import CategoryIndex from '../components/categorias/index.vue'
import CategoryCreate from '../components/categorias/create.vue'

import Search from '../components/component/index.vue'



const routes = [
  // Página principal
  { path: '/', name: 'Home', component: Home },

  // Ítems
  { path: '/items', name: 'ItemIndex', component: ItemIndex },
  { path: '/items/create', name: 'ItemCreate', component: ItemCreate },
  { path: '/items/:id', name: 'ItemDetails', component: ItemDetails, props: true },
  { path: '/items/:id/edit', name: 'ItemEdit', component: ItemEdit, props: true },
  { path: '/items/search', name: 'ItemSearch', component: ItemSearchResults }, // (opcional)

  // todos los ítems 
  {
    path: '/categorias/:categoryId',
    name: 'ItemsByCategory',
    component: ItemsByCategory,
    props: true
  },

  {
  path: '/buscar',
  name: 'Search',
  component: Search,
  props: true
},


  // Categorías
  { path: '/categories', name: 'CategoryIndex', component: CategoryIndex },
  { path: '/categories/create', name: 'CategoryCreate', component: CategoryCreate },

  // Redirección para rutas inexistentes
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
