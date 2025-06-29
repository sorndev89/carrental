import './bootstrap';

import { createApp } from 'vue';
import App from './App.vue';
import Menu from './Components/Menu.vue';
// import Menu2 from './Components/Menu2.vue';
import router from './Router';
import feather from 'feather-icons'


const app = createApp(App);
app.use(router);
app.component('Menu', Menu);
// app.component('Menu2', Menu2);

app.mount('#app');

  feather.replace()


