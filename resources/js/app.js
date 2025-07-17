/**
 * @file app.js
 * @description ໄຟລ໌ນີ້ແມ່ນຈຸດເລີ່ມຕົ້ນຂອງແອັບພລິເຄຊັນ Vue.js ຂອງພວກເຮົາ.
 * ມັນຮັບຜິດຊອບໃນການນຳເຂົ້າ Dependencies ທີ່ຈຳເປັນ, ການຕັ້ງຄ່າ Vue App,
 * ການລົງທະບຽນ Components ທົ່ວໄປ, ແລະ ການເຊື່ອມຕໍ່ກັບ Router ແລະ Pinia Store.
 */

// ນຳເຂົ້າ Bootstrap (ສຳລັບການຕັ້ງຄ່າ Axios ແລະອື່ນໆ)
import './bootstrap';

// ນຳເຂົ້າຟັງຊັນ createApp ຈາກ Vue ເພື່ອສ້າງ Instance ຂອງແອັບພລິເຄຊັນ Vue.
import { createApp } from 'vue';
// ນຳເຂົ້າ Component ຫຼັກຂອງແອັບພລິເຄຊັນ.
import App from './App.vue';
// ນຳເຂົ້າ Components ທີ່ໃຊ້ທົ່ວໄປ.
import Menu from './Components/Menu.vue';
import HeaderAdmin from './Components/HeaderAdmin.vue';
// ນຳເຂົ້າ Vue Router ສຳລັບການຈັດການເສັ້ນທາງ (Routing).
import router from './Router';
// ນຳເຂົ້າ VueFeather ສຳລັບການໃຊ້ Icon.
import VueFeather from 'vue-feather';

// ນຳເຂົ້າ VueSweetalert2 ສຳລັບການສະແດງ Alert ແບບສວຍງາມ.
// import VueSweetalert2 from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// ນຳເຂົ້າ createPinia ເພື່ອສ້າງ Pinia Store (State Management).
import { createPinia } from 'pinia';
const pinia = createPinia();



// ສ້າງ Instance ຂອງແອັບພລິເຄຊັນ Vue.
const app = createApp(App);
// ໃຊ້ Pinia ສຳລັບການຈັດການ State.
app.use(pinia);
// ໃຊ້ Vue Router ສຳລັບການຈັດການເສັ້ນທາງ.
app.use(router);
// ລົງທະບຽນ Components ທົ່ວໄປເພື່ອໃຫ້ສາມາດໃຊ້ໄດ້ທົ່ວທັງແອັບພລິເຄເຄຊັນ.
app.component('Menu', Menu);
app.component('HeaderAdmin', HeaderAdmin);
app.component(VueFeather.name, VueFeather);  // <vue-feather type="trash-2"></vue-feather>
// ໃຊ້ VueSweetalert2 ສຳລັບການສະແດງ Alert.
// app.use(VueSweetalert2)

// ເຊື່ອມຕໍ່ແອັບພລິເຄຊັນ Vue ເຂົ້າກັບ Element ທີ່ມີ ID 'app' ໃນ HTML.
app.mount('#app');


