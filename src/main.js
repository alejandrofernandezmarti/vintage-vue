import './assets/main.css'
import { createPinia } from 'pinia'
import router from './router'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App).use(createPinia()).use(router)

app.mount('#app')

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap versión 5.1.3
import 'bootstrap'; // Importa los componentes y utilidades de Bootstrap
import 'jquery/dist/jquery.slim.min.js'; // Importa jQuery slim
import 'jquery/dist/jquery.min.js'; // Importa jQuery
import '@popperjs/core/dist/umd/popper.min.js'; // Importa Popper.js
import './script.js';