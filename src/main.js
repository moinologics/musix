import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from 'pinia'
import WaveSurferVue from './plugins/wavesurfer-vue'

import './style.css'

const app = createApp(App)

const pinia = createPinia()

app.use(pinia);
app.use(WaveSurferVue);

app.mount('#app')
