import { createApp } from 'vue'
import App from './App.vue'

import './style.css'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Button from 'primevue/button'
import MegaMenu from 'primevue/megamenu'
import axios from 'axios';
import router from './router' 
import ToastService from 'primevue/toastservice'

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;


const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(router)

app.component('Button', Button)
app.component('MegaMenu', MegaMenu)

app.mount('#app')
