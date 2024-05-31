import './assets/main.css'
import { createPinia } from 'pinia'
import router from './router'
import { createApp } from 'vue'
import VueStripeElementPlus from 'vue-stripe-elements-plus'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'jquery/dist/jquery.slim.min.js';
import 'jquery/dist/jquery.min.js';
import '@popperjs/core/dist/umd/popper.min.js';
import './script.js'
const app = createApp(App).use(createPinia()).use(VueStripeElementPlus).use(router)

app.mount('#app')
