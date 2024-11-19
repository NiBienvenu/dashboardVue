import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import { i18n } from './i18n'
import "@/assets/style.css"


const app = createApp(App)
app.use(PrimeVue , {
    theme: {
        preset: Aura
    }
})
app.use(i18n)
app.use(ConfirmationService)
app.use(ToastService)
app.use(router)
app.use(store)
app.mount('#app')