import './bootstrap';

import { createApp } from 'vue';
import App from './App.vue';
import Menu from './Components/Menu.vue';
import HeaderAdmin from './Components/HeaderAdmin.vue';
// import Menu2 from './Components/Menu2.vue';
import router from './Router';
import feather from 'feather-icons';

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import { createPinia } from 'pinia';
const pinia = createPinia();



const app = createApp(App);
app.use(pinia);
app.use(router);
app.component('Menu', Menu);
app.component('HeaderAdmin', HeaderAdmin);
app.use(VueSweetalert2)
// app.component('Menu2', Menu2);

app.mount('#app');

  feather.replace()


