import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from '../Store/Auth.js'; // ນຳເຂົ້າ Pinia store

// --- ນຳເຂົ້າ Layouts (ຮັກສາໄວ້ແບບ static ເພາະຈຳເປັນຕ້ອງໃຊ້ຕະຫຼອດ) ---
import AdminLayout from '../Layouts/AdminLayout.vue';
import CustomerLayout from '../Layouts/CustomerLayout.vue';
import AuthLayout from '../Layouts/AuthLayout.vue';


// --- ບ່ອນວ່າງສຳລັບການຢືນຢັນຕົວຕົນ / ການອະນຸຍາດ ---
const isAuthenticated = () => {
    const store = useStore();
    console.log('ກຳລັງກວດສອບການຢືນຢັນຕົວຕົນ...');
    return !!store.token && !!store.user; // ກວດສອບວ່າ token ແລະ user ມີຢູ່ໃນ store ບໍ່
};

const isAdmin = () => {
    const store = useStore();
    console.log('ກຳລັງກວດສອບວ່າເປັນ Admin ບໍ່...');
    return store.user && store.user.role === 'admin'; // ກວດສອບບົດບາດຂອງຜູ້ໃຊ້
};
// --- ສິ້ນສຸດບ່ອນວ່າງການຢືນຢັນຕົວຕົນ ---


const routes = [
    // --- ເສັ້ນທາງສຳລັບລູກຄ້າ/ທົ່ວໄປ (ໃຊ້ CustomerLayout) ---
    {
        path: '/',
        component: CustomerLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../Pages/customer/HomePage.vue'),
                meta: { requiresAuth: false }, // ເສັ້ນທາງນີ້ບໍ່ຕ້ອງການການຢືນຢັນຕົວຕົນ
            },
            {
                path: 'browse-cars',
                name: 'browse.cars',
                component: () => import('../Pages/customer/BrowseCars.vue'),
                meta: { requiresAuth: false } // ເສັ້ນທາງນີ້ບໍ່ຕ້ອງການການຢືນຢັນຕົວຕົນ
            },
            {
                path: 'book-car',
                name: 'book.car',
                component: () => import('../Pages/customer/BookingForm.vue'),
                meta: { requiresAuth: false } // ເສັ້ນທາງນີ້ບໍ່ຕ້ອງການການຢືນຢັນຕົວຕົນ
            },
            {
                path: 'my-bookings',
                name: 'my.bookings',
                component: () => import('../Pages/customer/MyBookings.vue'),
                meta: { requiresAuth: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ
            },
            {
                path: 'my-rental-history',
                name: 'my.rental.history',
                component: () => import('../Pages/customer/MyRentalHistory.vue'), // ສົມມຸດວ່າທ່ານຈະສ້າງ component ນີ້
                meta: { requiresAuth: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ
            },
        ]
    },

    // --- ເສັ້ນທາງສຳລັບການຢືນຢັນຕົວຕົນ (ໃຊ້ AuthLayout) ---
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            {
                path: 'login',
                name: 'auth.login',
                component: () => import('../Pages/auth/UserLogin.vue'),
                meta: { requiresAuth: false } // ເສັ້ນທາງນີ້ບໍ່ຕ້ອງການການຢືນຢັນຕົວຕົນ
            },
            {
                path: 'register',
                name: 'auth.register',
                component: () => import('../Pages/auth/UserRegister.vue'),
                meta: { requiresAuth: false } // ເສັ້ນທາງນີ້ບໍ່ຕ້ອງການການຢືນຢັນຕົວຕົນ
            },
        ]
    },

    // --- ເສັ້ນທາງສຳລັບ Admin (ໃຊ້ AdminLayout) ---
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            { path: '', redirect: { name: 'admin.dashboard' } }, // ປ່ຽນເສັ້ນທາງ /admin ໄປຫາ /admin/dashboard
            {
                path: 'dashboard',
                name: 'admin.dashboard',
                component: () => import('../Pages/admin/AdminDashboard.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'bookings/list',
                name: 'admin.bookings.list',
                component: () => import('../Pages/admin/BookingsList.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'bookings/payments',
                name: 'admin.bookings.payments',
                component: () => import('../Pages/admin/PaymentsReview.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'customer/list',
                name: 'admin.customer.list',
                component: () => import('../Pages/admin/CustomerList.vue'),
                meta: { requiresAuth: true, requiresAdmin: true },
            },
            {
                path: 'cars/list',
                name: 'admin.cars.list',
                component: () => import('../Pages/admin/CarList.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'cars/types',
                name: 'admin.cars.types',
                component: () => import('../Pages/admin/CarTypes.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'drivers/list',
                name: 'admin.drivers.list',
                component: () => import('../Pages/admin/DriverList.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'finance/add',
                name: 'admin.finance.add',
                component: () => import('../Pages/admin/FinanceAddTransaction.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'finance/transactions',
                name: 'admin.finance.transactions',
                component: () => import('../Pages/admin/FinanceTransactionsList.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'users/list',
                name: 'admin.users.list',
                component: () => import('../Pages/admin/UserList.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'users/roles-permissions',
                name: 'admin.users.roles',
                component: () => import('../Pages/admin/RolesPermissions.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'reports/bookings',
                name: 'admin.reports.bookings',
                component: () => import('../Pages/admin/ReportBookings.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'reports/car-status',
                name: 'admin.reports.carstatus',
                component: () => import('../Pages/admin/ReportCarStatus.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'reports/payments',
                name: 'admin.reports.payments',
                component: () => import('../Pages/admin/ReportPayments.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'reports/finance',
                name: 'admin.reports.finance',
                component: () => import('../Pages/admin/ReportFinance.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
            {
                path: 'settings',
                name: 'admin.settings',
                component: () => import('../Pages/admin/AdminSettings.vue'),
                meta: { requiresAuth: true, requiresAdmin: true }, // ເສັ້ນທາງນີ້ຕ້ອງການການຢືນຢັນຕົວຕົນ ແລະບົດບາດ admin
            },
        ]
    },

    // --- ບໍ່ພົບ (ຕ້ອງເປັນເສັ້ນທາງສຸດທ້າຍ) ---
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../Pages/NotFound.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});

// --- Navigation Guards ---
router.beforeEach((to, from, next) => {
    // ກຳນົດວ່າເສັ້ນທາງເປົ້າໝາຍແມ່ນເສັ້ນທາງຂອງ admin (ເສັ້ນທາງໃດໆທີ່ເລີ່ມຕົ້ນດ້ວຍ /admin)
    const isAdminRoute = to.matched.some(record => record.path.startsWith('/admin'));

    // ຖ້າເສັ້ນທາງຕ້ອງການການຢືນຢັນຕົວຕົນ ຫຼື ເປັນເສັ້ນທາງຂອງ admin
    if (to.meta.requiresAuth || isAdminRoute) {
        if (!isAuthenticated()) {
            console.log('ຜູ້ໃຊ້ບໍ່ໄດ້ເຂົ້າສູ່ລະບົບ, ກຳລັງປ່ຽນເສັ້ນທາງໄປໜ້າເຂົ້າສູ່ລະບົບ.');
            // ປ່ຽນເສັ້ນທາງໄປໜ້າເຂົ້າສູ່ລະບົບສະເໝີ ຖ້າບໍ່ໄດ້ເຂົ້າສູ່ລະບົບ ແລະພະຍາຍາມເຂົ້າເຖິງເສັ້ນທາງທີ່ຖືກປ້ອງກັນ
            next({ name: 'auth.login' });
        } else {
            // ຜູ້ໃຊ້ໄດ້ເຂົ້າສູ່ລະບົບແລ້ວ
            if (isAdminRoute) { // ຖ້າມັນເປັນເສັ້ນທາງຂອງ admin ໂດຍສະເພາະ
                if (isAdmin()) {
                    console.log('ຜູ້ໃຊ້ໄດ້ເຂົ້າສູ່ລະບົບ ແລະເປັນ admin. ອະນຸຍາດໃຫ້ເຂົ້າເຖິງເສັ້ນທາງ admin.');
                    next(); // ອະນຸຍາດໃຫ້ເຂົ້າເຖິງເສັ້ນທາງ admin
                } else {
                    console.log('ຜູ້ໃຊ້ໄດ້ເຂົ້າສູ່ລະບົບແລ້ວ ແຕ່ບໍ່ແມ່ນ admin. ກຳລັງປ່ຽນເສັ້ນທາງຈາກ admin route ໄປໜ້າຫຼັກ.');
                    // ຖ້າໄດ້ເຂົ້າສູ່ລະບົບແລ້ວ ແຕ່ບໍ່ແມ່ນ admin, ປ່ຽນເສັ້ນທາງໄປໜ້າຫຼັກຂອງລູກຄ້າ
                    next({ name: 'home' });
                }
            } else {
                // ຜູ້ໃຊ້ທີ່ເຂົ້າສູ່ລະບົບເຂົ້າເຖິງເສັ້ນທາງທີ່ຖືກປ້ອງກັນທີ່ບໍ່ແມ່ນ admin (ເຊັ່ນ: /my-bookings, /my-rental-history)
                // ນີ້ໝາຍຄວາມວ່າບົດບາດຂອງຜູ້ໃຊ້ແມ່ນລູກຄ້າ ຫຼືບົດບາດອື່ນໆທີ່ບໍ່ແມ່ນ admin.
                console.log('ຜູ້ໃຊ້ໄດ້ເຂົ້າສູ່ລະບົບແລ້ວ. ອະນຸຍາດໃຫ້ເຂົ້າເຖິງເສັ້ນທາງທີ່ຖືກປ້ອງກັນທີ່ບໍ່ແມ່ນ admin.');
                next();
            }
        }
    } else {
        // ເສັ້ນທາງບໍ່ຕ້ອງການການຢືນຢັນຕົວຕົນ (ເສັ້ນທາງສາທາລະນະເຊັ່ນ: '/', '/cars', ຫຼື '/auth/login', '/auth/register')
        console.log('ເສັ້ນທາງບໍ່ຕ້ອງການການຢືນຢັນຕົວຕົນ. ອະນຸຍາດໃຫ້ເຂົ້າເຖິງ.');

        // ຖ້າຜູ້ໃຊ້ທີ່ເຂົ້າສູ່ລະບົບພະຍາຍາມເຂົ້າເຖິງໜ້າເຂົ້າສູ່ລະບົບ, ໃຫ້ປ່ຽນເສັ້ນທາງໄປຫາ dashboard ຂອງພວກເຂົາ
        if (to.name === 'auth.login') {
            if (isAuthenticated()) {
                const store = useStore(); // ເຂົ້າເຖິງ store ເພື່ອເອົາບົດບາດຂອງຜູ້ໃຊ້
                if (store.user && store.user.role === 'admin') {
                    console.log('Admin ທີ່ເຂົ້າສູ່ລະບົບພະຍາຍາມເຂົ້າເຖິງໜ້າເຂົ້າສູ່ລະບົບ, ກຳລັງປ່ຽນເສັ້ນທາງໄປ dashboard admin.');
                    next({ name: 'admin.dashboard' });
                } else { // ສົມມຸດວ່າເປັນລູກຄ້າ ຫຼືຜູ້ໃຊ້ທີ່ເຂົ້າສູ່ລະບົບອື່ນໆທີ່ບໍ່ແມ່ນ admin
                    console.log('ລູກຄ້າທີ່ເຂົ້າສູ່ລະບົບພະຍາຍາມເຂົ້າເຖິງໜ້າເຂົ້າສູ່ລະບົບ, ກຳລັງປ່ຽນເສັ້ນທາງໄປໜ້າຫຼັກ.');
                    next({ name: 'home' });
                }
            } else {
                // ຜູ້ໃຊ້ທີ່ບໍ່ໄດ້ເຂົ້າສູ່ລະບົບສາມາດດຳເນີນການໄປໜ້າເຂົ້າສູ່ລະບົບໄດ້
                next();
            }
        } else {
            // ອະນຸຍາດໃຫ້ເຂົ້າເຖິງເສັ້ນທາງສາທາລະນະອື່ນໆ
            next();
        }
    }
});

export default router;