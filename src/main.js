import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BodyScrollLock from '@/plugins/body-scroll-lock'
import root from './app.vue'
import './assets/styles/app.css'

const app = createApp(root)
const pinia = createPinia()

app.use(pinia)
app.use(BodyScrollLock)
app.mount('#app')
