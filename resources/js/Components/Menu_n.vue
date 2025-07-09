<template>
    <div class="sidebar" id="sidebar" @mouseover="HoverSidebar()" @mouseout="HoverOutSidebar()">
        <!-- Logo -->
        <div class="sidebar-logo ">
            <router-link to="/" class="logo logo-normal">
                <img :src="url + '/assets/img/logo.svg'" alt="Img">
            </router-link>
            <router-link to="/" class="logo logo-white">
                <img :src="url + '/assets/img/logo-white.svg'" alt="Img">
            </router-link>
            <router-link to="/" class="logo-small">
                <img :src="url + '/assets/img/logo-small.png'" alt="Img">
            </router-link>
            <a id="toggle_btn" href="javascript:void(0);" @click="toggleSidebar()">
                <i data-feather="chevrons-left"></i>
            </a>
        </div>
        <!-- /Logo -->
        <div class="modern-profile p-3 pb-0">
            <div class="text-center rounded bg-light p-3 mb-4 user-profile">
                <div class="avatar avatar-lg online mb-3">
                    <img :src="url + '/assets/img/customer/customer15.jpg'" alt="Img" class="img-fluid rounded-circle">
                </div>
                <h6 class="fs-14 fw-bold mb-1">Adrian Herman</h6>
                <p class="fs-12 mb-0">System Admin</p>
            </div>
            <div class="sidebar-nav mb-3">
                <ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded nav-justified bg-transparent" role="tablist">
                    <li class="nav-item"><a class="nav-link active border-0" href="#">Data Menu</a></li>
                    <li class="nav-item"><router-link to="/chat" class="nav-link border-0" :class="{'active': $route.path === '/chat'}">Chats</router-link></li>
                    <li class="nav-item"><router-link to="/email" class="nav-link border-0" :class="{'active': $route.path === '/email'}">Inbox</router-link></li>
                </ul>
            </div>
        </div>
        <div class="sidebar-header p-3 pb-0 pt-2">
            <div class="text-center rounded bg-light p-2 mb-4 sidebar-profile d-flex align-items-center">
                <div class="avatar avatar-md onlin">
                    <img :src="url + '/assets/img/customer/customer15.jpg'" alt="Img" class="img-fluid rounded-circle">
                </div>
                <div class="text-start sidebar-profile-info ms-2">
                    <h6 class="fs-14 fw-bold mb-1">Adrian Herman</h6>
                    <p class="fs-12">System Admin</p>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between menu-item mb-3">
                <div>
                    <router-link to="/" class="btn btn-sm btn-icon bg-light" :class="{'active': $route.path === '/'}">
                        <i class="ti ti-layout-grid-remove"></i>
                    </router-link>
                </div>
                <div>
                    <router-link to="/chat" class="btn btn-sm btn-icon bg-light" :class="{'active': $route.path === '/chat'}">
                        <i class="ti ti-brand-hipchat"></i>
                    </router-link>
                </div>
                <div>
                    <router-link to="/email" class="btn btn-sm btn-icon bg-light position-relative" :class="{'active': $route.path === '/email'}">
                        <i class="ti ti-message"></i>
                    </router-link>
                </div>
                <div class="notification-item">
                    <router-link to="/activities" class="btn btn-sm btn-icon bg-light position-relative" :class="{'active': $route.path === '/activities'}">
                        <i class="ti ti-bell"></i>
                        <span class="notification-status-dot"></span>
                    </router-link>
                </div>
                <div class="me-0">
                    <router-link to="/general-settings" class="btn btn-sm btn-icon bg-light" :class="{'active': $route.path === '/general-settings'}">
                        <i class="ti ti-settings"></i>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="sidebar-inner slimscroll">
            <div id="sidebar-menu" class="sidebar-menu">
                <ul>
                    <!-- Iterate over top-level menu items (h6 headers or direct links) -->
                    <template v-for="(category, categoryIndex) in menuData" :key="categoryIndex">
                        <li v-if="category.header" class="submenu-open">
                            <h6 class="submenu-hdr">{{ category.header }}</h6>
                        </li>
                        <template v-for="(item, itemIndex) in category.items" :key="itemIndex">
                            <!-- Apply 'is-open' class to the parent li for arrow rotation/styling -->
                            <li :class="{'submenu': item.submenu, 'submenu-two': item.submenuTwo, 'submenu-three': item.submenuThree, 'is-open': item.submenu && isSubmenuOpen(item.title) }">
                                <!-- Use router-link for navigation links, a for non-navigation (submenu toggles) -->
                                <router-link v-if="item.link && item.link !== 'javascript:void(0);'" :to="item.link" :class="{'subdrop': isSubmenuOpen(item.title), 'active': isRouteActiveForMenuItem(item)}">
                                    <i v-if="item.icon" :class="item.icon"></i>
                                    <span v-if="item.title">{{ item.title }}</span>
                                    <span v-if="item.badge" :class="item.badge.class">{{ item.badge.text }}</span>
                                    <span v-if="item.submenu" :class="{'menu-arrow': true, 'inside-submenu': item.submenuTwo, 'inside-submenu-two': item.submenuThree}"></span>
                                </router-link>
                                <a v-else :href="item.link || 'javascript:void(0);'" @click="item.submenu ? toggleSubmenu($event, item.title) : null" :class="{'subdrop': isSubmenuOpen(item.title), 'active': isRouteActiveForMenuItem(item)}">
                                    <i v-if="item.icon" :class="item.icon"></i>
                                    <span v-if="item.title">{{ item.title }}</span>
                                    <span v-if="item.badge" :class="item.badge.class">{{ item.badge.text }}</span>
                                    <span v-if="item.submenu" :class="{'menu-arrow': true, 'inside-submenu': item.submenuTwo, 'inside-submenu-two': item.submenuThree}"></span>
                                </a>

                                <!-- Apply inline style for display -->
                                <ul v-if="item.submenu" :style="isSubmenuOpen(item.title) ? 'display: block;' : 'display: none;'">
                                    <template v-for="(subItem, subItemIndex) in item.submenu" :key="subItemIndex">
                                        <li :class="{'submenu': subItem.submenu, 'submenu-two': subItem.submenuTwo, 'submenu-three': subItem.submenuThree, 'is-open': subItem.submenu && isSubmenuOpen(subItem.title) }">
                                            <!-- Use router-link for navigation links, a for non-navigation (submenu toggles) -->
                                            <router-link v-if="subItem.link && subItem.link !== 'javascript:void(0);'" :to="subItem.link" :class="{'subdrop': isSubmenuOpen(subItem.title), 'active': isRouteActiveForMenuItem(subItem)}">
                                                <i v-if="subItem.icon" :class="subItem.icon"></i>
                                                <span v-if="subItem.title">{{ subItem.title }}</span>
                                                <span v-if="subItem.badge" :class="subItem.badge.class">{{ subItem.badge.text }}</span>
                                                <span v-if="subItem.submenu" :class="{'menu-arrow': true, 'inside-submenu': subItem.submenuTwo, 'inside-submenu-two': subItem.submenuThree}"></span>
                                            </router-link>
                                            <a v-else :href="subItem.link || 'javascript:void(0);'" @click.stop="subItem.submenu ? toggleSubmenu($event, subItem.title) : null" :class="{'subdrop': isSubmenuOpen(subItem.title), 'active': isRouteActiveForMenuItem(subItem)}">
                                                <i v-if="subItem.icon" :class="subItem.icon"></i>
                                                <span v-if="subItem.title">{{ subItem.title }}</span>
                                                <span v-if="subItem.badge" :class="subItem.badge.class">{{ subItem.badge.text }}</span>
                                                <span v-if="subItem.submenu" :class="{'menu-arrow': true, 'inside-submenu': subItem.submenuTwo, 'inside-submenu-two': subItem.submenuThree}"></span>
                                            </a>

                                            <!-- Apply inline style for display to nested submenu ul -->
                                            <ul v-if="subItem.submenu" :style="isSubmenuOpen(subItem.title) ? 'display: block;' : 'display: none;'">
                                                <li v-for="(subSubItem, subSubItemIndex) in subItem.submenu" :key="subSubItemIndex">
                                                    <!-- Use router-link for navigation links -->
                                                    <router-link v-if="subSubItem.link && subSubItem.link !== 'javascript:void(0);'" :to="subSubItem.link" :class="{'active': $route.path === subSubItem.link}">{{ subSubItem.title }}</router-link>
                                                    <a v-else :href="subSubItem.link || 'javascript:void(0);'" :class="{'active': $route.path === subSubItem.link}">{{ subSubItem.title }}</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </template>
                                </ul>
                            </li>
                        </template>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
feather.replace();
export default {
    data() {
        return {
            url: window.location.origin,
            openSubmenus: {}, // Object to keep track of open submenus
            // Updated menuData for the Car Rental System Backend
            menuData: [
                {
                    header: 'ຫຼັກ', // Main
                    items: [
                        {
                            title: 'ແຜງຄວບຄຸມ', // Dashboard
                            link: '/admin/dashboard', // Direct link for main dashboard
                            icon: 'ti ti-dashboard fs-16 me-2',
                        },
                    ]
                },
                {
                    header: 'ການຈັດການຫຼັກ', // Core Management
                    items: [
                        {
                            title: 'ການຈັດການການຈອງ', // Bookings Management
                            link: 'javascript:void(0);', // Parent item, acts as toggle
                            icon: 'ti ti-calendar-event fs-16 me-2',
                            submenu: [
                                { title: 'ລາຍການຈອງທັງໝົດ', link: '/admin/bookings/list' },
                                { title: 'ການກວດສອບການຊຳລະເງິນ', link: '/admin/bookings/payments' },
                            ]
                        },
                        {
                            title: 'ການຈັດການລົດ', // Car Management
                            link: 'javascript:void(0);', // Parent item, acts as toggle
                            icon: 'ti ti-car-side fs-16 me-2',
                            submenu: [
                                { title: 'ລາຍຊື່ລົດ', link: '/admin/cars/list' },
                                { title: 'ປະເພດລົດ', link: '/admin/cars/types' },
                                // 'ສະຖານະລົດ' could be a report or a feature on the car list page
                            ]
                        },
                        {
                            title: 'ການຈັດການຄົນຂັບ', // Driver Management
                            link: 'javascript:void(0);', // Parent item, acts as toggle
                            icon: 'ti ti-id-badge-2 fs-16 me-2',
                            submenu: [
                                { title: 'ລາຍຊື່ຄົນຂັບ', link: '/admin/drivers/list' },
                                // 'ສະຖານະຄົນຂັບ' could be a report or a feature on the driver list page
                            ]
                        },
                    ]
                },
                {
                    header: 'ການເງິນ', // Financial
                    items: [
                        {
                            title: 'ການຈັດການການເງິນ', // Financial Management
                            link: 'javascript:void(0);', // Parent item, acts as toggle
                            icon: 'ti ti-currency-dollar fs-16 me-2',
                            submenu: [
                                { title: 'ບັນທຶກລາຍຮັບ-ລາຍຈ່າຍ', link: '/admin/finance/add' },
                                { title: 'ລາຍການທຸລະກຳ', link: '/admin/finance/transactions' },
                            ]
                        },
                    ]
                },
                {
                    header: 'ຜູ້ໃຊ້ ແລະ ສິດ', // Users & Permissions
                    items: [
                        {
                            title: 'ການຈັດການຜູ້ໃຊ້', // User Management
                            link: 'javascript:void(0);', // Parent item, acts as toggle
                            icon: 'ti ti-users fs-16 me-2',
                            submenu: [
                                { title: 'ລາຍຊື່ຜູ້ໃຊ້', link: '/admin/users/list' },
                                { title: 'ກຳນົດບົດບາດ/ສິດ', link: '/admin/users/roles-permissions' },
                            ]
                        },
                    ]
                },
                {
                    header: 'ລາຍງານ', // Reports
                    items: [
                        {
                            title: 'ລາຍງານ', // Reports
                            link: 'javascript:void(0);', // Parent item, acts as toggle
                            icon: 'ti ti-chart-bar fs-16 me-2',
                            submenu: [
                                { title: 'ລາຍງານການຈອງ', link: '/admin/reports/bookings' },
                                { title: 'ລາຍງານສະຖານະລົດ', link: '/admin/reports/car-status' },
                                { title: 'ລາຍງານການຊຳລະເງິນ', link: '/admin/reports/payments' },
                                { title: 'ລາຍງານລາຍຮັບ-ລາຍຈ່າຍ', link: '/admin/reports/finance' },
                            ]
                        },
                    ]
                },
                {
                    header: 'ການຕັ້ງຄ່າ', // Settings
                    items: [
                        {
                            title: 'ຕັ້ງຄ່າລະບົບ', // System Settings
                            link: '/admin/settings', // Direct link for general settings
                            icon: 'ti ti-settings fs-16 me-2',
                            // 'ການຕັ້ງຄ່າທົ່ວໄປຂອງລະບົບ' is a detail on the settings page, not a submenu
                        },
                    ]
                },
            ]
        }
    },
    methods: {
        HoverSidebar(){
            let bodyClass = document.body.classList;
            bodyClass.add('expand-menu');
        },
        HoverOutSidebar(){
            let bodyClass = document.body.classList;
            bodyClass.remove('expand-menu');
        },
        toggleSidebar(){
            // check body class
            let bodyClass = document.body.classList;
            console.log(bodyClass);
            // if bodclass have "mini-sidebar" remove it
            if(bodyClass.contains('mini-sidebar')){
                bodyClass.remove('mini-sidebar');
                // set class "expand-menu"
                bodyClass.add('expand-menu');
            } else {
                bodyClass.add('mini-sidebar');
            }
        },
        toggleSubmenu(event, submenuKey = null) {
            // Find the immediate parent <li> that is a 'submenu'
            let targetLi = event.target.closest('li.submenu');
            if (!targetLi) return;

            // Get the text content of the <span> within the <a> or <router-link>, or use a provided key
            let menuText = submenuKey || (targetLi.querySelector('a > span')?.textContent.trim() || targetLi.querySelector('router-link > span')?.textContent.trim());

            // Check if menuText is valid before toggling
            if (menuText) {
                // Toggle the state for this submenu
                this.openSubmenus[menuText] = !this.openSubmenus[menuText];
            } else {
                console.warn('Could not determine menuText for toggling submenu.');
            }
        },
        isSubmenuOpen(key) {
            return this.openSubmenus[key];
        },
        // Recursively check if a menu item or any of its children are active based on the current route
        isRouteActiveForMenuItem(menuItem) {
            // If the current menu item's link directly matches the current route path
            if (menuItem.link && menuItem.link !== 'javascript:void(0);' && this.$route.path === menuItem.link) {
                return true;
            }

            // If the menu item has a submenu, recursively check its children
            if (menuItem.submenu && menuItem.submenu.length > 0) {
                return menuItem.submenu.some(subItem => this.isRouteActiveForMenuItem(subItem));
            }

            return false;
        },
        // Recursively traverse menuData to find the active path and mark its parents as open
        openRelevantSubmenus(currentPath) {
            // First, close all existing open submenus
            for (const key in this.openSubmenus) {
                this.openSubmenus[key] = false;
            }

            const findAndOpenParents = (items) => {
                if (!items) return false;

                for (const item of items) {
                    // If this item's link is active, or it has an active child, mark this parent as open
                    if (this.isRouteActiveForMenuItem(item)) {
                        if (item.submenu) { // Only mark as open if it's a submenu parent
                            this.openSubmenus[item.title] = true;
                        }
                        // Even if not a submenu, if it's active, its parent should be open
                        // This recursive call ensures all ancestors are opened if a child is active
                        if (item.submenu && item.submenu.length > 0) {
                           // No need to return here, just open parents. The true will bubble up.
                           findAndOpenParents(item.submenu);
                        }
                        return true; // Indicate that an active path was found in this branch
                    }
                }
                return false;
            };

            // Start the recursive search from the top-level menu categories
            this.menuData.forEach(category => {
                if (category.items) {
                    findAndOpenParents(category.items);
                }
            });
        }
    },
    mounted() {
        // Initial call to set active states and open relevant submenus based on the initial route
        this.openRelevantSubmenus(this.$route.path);
    },
    watch: {
        // Watch for route changes to update active states and open/close submenus
        '$route.path': {
            handler(newPath) {
                this.openRelevantSubmenus(newPath);
            },
            immediate: true // Run handler immediately on component mount
        }
    }
}
</script>
<style>
/* No specific display:none or display:block in CSS,
   as it's handled by inline styles now in the template. */

/* Style to make menu arrows rotate */
.submenu > a .menu-arrow,
.submenu > .router-link-active .menu-arrow {
    transition: transform 0.3s ease-in-out;
}

/* Rotate arrow when the submenu is open (i.e., when the parent li has 'is-open' class) */
.submenu.is-open > a .menu-arrow,
.submenu.is-open > .router-link-active .menu-arrow {
    transform: rotate(90deg); /* Or -90deg, depending on your arrow direction */
}

/* Custom CSS to enable scrollbar on the inner sidebar content */
.sidebar-inner {
    max-height: calc(100vh - 65px); /* Adjust this value based on your header/profile sections' heights */
    overflow-y: auto; /* Show vertical scrollbar only when content overflows */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

/* Hide scrollbar for Webkit browsers (Chrome, Safari) */
.sidebar-inner::-webkit-scrollbar {
    display: none;
}
</style>
