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
            menuData: [
                {
                    header: 'Main',
                    items: [
                        {
                            title: 'Dashboard',
                            link: 'javascript:void(0);', // This is a toggle parent
                            icon: 'ti ti-layout-grid fs-16 me-2',
                            submenu: [
                                { title: 'Admin Dashboard', link: '/' }, // Assuming '/' is your root dashboard
                                { title: 'Admin Dashboard 2', link: '/admin-dashboard-2' },
                                { title: 'Sales Dashboard', link: '/sales-dashboard' },
                            ]
                        },
                        {
                            title: 'Super Admin',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-user-edit fs-16 me-2',
                            submenu: [
                                { title: 'Dashboard', link: '/dashboard' },
                                { title: 'Companies', link: '/companies' },
                                { title: 'Subscriptions', link: '/subscription' },
                                { title: 'Packages', link: '/packages' },
                                { title: 'Domain', link: '/domain' },
                                { title: 'Purchase Transaction', link: '/purchase-transaction' },
                            ]
                        },
                        {
                            title: 'Application',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-brand-apple-arcade fs-16 me-2',
                            submenu: [
                                { title: 'Chat', link: '/chat' },
                                {
                                    title: 'Call',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Video Call', link: '/video-call' },
                                        { title: 'Audio Call', link: '/audio-call' },
                                        { title: 'Call History', link: '/call-history' },
                                    ]
                                },
                                { title: 'Calendar', link: '/calendar' },
                                { title: 'Contacts', link: '/contacts' },
                                { title: 'Email', link: '/email' },
                                { title: 'To Do', link: '/todo' },
                                { title: 'Notes', link: '/notes' },
                                { title: 'File Manager', link: '/file-manager' },
                                { title: 'Projects', link: '/projects' },
                                {
                                    title: 'Ecommerce',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Products', link: '/products' },
                                        { title: 'Orders', link: '/orders' },
                                        { title: 'Customers', link: '/customers' },
                                        { title: 'Cart', link: '/cart' },
                                        { title: 'Checkout', link: '/checkout' },
                                        { title: 'Wishlist', link: '/wishlist' },
                                        { title: 'Reviews', link: '/reviews' },
                                    ]
                                },
                                { title: 'Social Feed', link: '/social-feed' },
                                { title: 'Search List', link: '/search-list' },
                            ]
                        },
                        {
                            title: 'Layouts',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-layout-sidebar-right-collapse fs-16 me-2',
                            submenu: [
                                { title: 'Horizontal', link: '/layout-horizontal' },
                                { title: 'Detached', link: '/layout-detached' },
                                { title: 'Two Column', link: '/layout-two-column' },
                                { title: 'Hovered', link: '/layout-hovered' },
                                { title: 'Boxed', link: '/layout-boxed' },
                                { title: 'RTL', link: '/layout-rtl' },
                                { title: 'Dark', link: '/layout-dark' },
                            ]
                        },
                    ]
                },
                {
                    header: 'Inventory',
                    items: [
                        { title: 'Products', link: '/product-list', icon: 'ti ti-box fs-16 me-2' },
                        { title: 'Create Product', link: '/add-product', icon: 'ti ti-table-plus fs-16 me-2' },
                        { title: 'Expired Products', link: '/expired-products', icon: 'ti ti-progress-alert fs-16 me-2' },
                        { title: 'Low Stocks', link: '/low-stocks', icon: 'ti ti-trending-up-2 fs-16 me-2' },
                        { title: 'Category', link: '/category-list', icon: 'ti ti-list-details fs-16 me-2' },
                        { title: 'Sub Category', link: '/sub-categories', icon: 'ti ti-carousel-vertical fs-16 me-2' },
                        { title: 'Brands', link: '/brand-list', icon: 'ti ti-triangles fs-16 me-2' },
                        { title: 'Units', link: '/units', icon: 'ti ti-brand-unity fs-16 me-2' },
                        { title: 'Variant Attributes', link: '/varriant-attributes', icon: 'ti ti-checklist fs-16 me-2' },
                        { title: 'Warranties', link: '/warranty', icon: 'ti ti-certificate fs-16 me-2' },
                        { title: 'Print Barcode', link: '/barcode', icon: 'ti ti-barcode fs-16 me-2' },
                        { title: 'Print QR Code', link: '/qrcode', icon: 'ti ti-qrcode fs-16 me-2' },
                    ]
                },
                {
                    header: 'Stock',
                    items: [
                        { title: 'Manage Stock', link: '/manage-stocks', icon: 'ti ti-stack-3 fs-16 me-2' },
                        { title: 'Stock Adjustment', link: '/stock-adjustment', icon: 'ti ti-stairs-up fs-16 me-2' },
                        { title: 'Stock Transfer', link: '/stock-transfer', icon: 'ti ti-stack-pop fs-16 me-2' },
                    ]
                },
                {
                    header: 'Sales',
                    items: [
                        {
                            title: 'Sales',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-layout-grid fs-16 me-2',
                            submenu: [
                                { title: 'Online Orders', link: '/online-orders' },
                                { title: 'POS Orders', link: '/pos-orders' },
                            ]
                        },
                        { title: 'Invoices', link: '/invoice', icon: 'ti ti-file-invoice fs-16 me-2' },
                        { title: 'Sales Return', link: '/sales-returns', icon: 'ti ti-receipt-refund fs-16 me-2' },
                        { title: 'Quotation', link: '/quotation-list', icon: 'ti ti-files fs-16 me-2' },
                        {
                            title: 'POS',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-device-laptop fs-16 me-2',
                            submenu: [
                                { title: 'POS 1', link: '/pos' },
                                { title: 'POS 2', link: '/pos-2' },
                                { title: 'POS 3', link: '/pos-3' },
                                { title: 'POS 4', link: '/pos-4' },
                                { title: 'POS 5', link: '/pos-5' },
                            ]
                        },
                    ]
                },
                {
                    header: 'Promo',
                    items: [
                        { title: 'Coupons', link: '/coupons', icon: 'ti ti-ticket fs-16 me-2' },
                        { title: 'Gift Cards', link: '/gift-cards', icon: 'ti ti-cards fs-16 me-2' },
                        {
                            title: 'Discount',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-file-percent fs-16 me-2',
                            submenu: [
                                { title: 'Discount Plan', link: '/discount-plan' },
                                { title: 'Discount', link: '/discount' },
                            ]
                        },
                    ]
                },
                {
                    header: 'Purchases',
                    items: [
                        { title: 'Purchases', link: '/purchase-list', icon: 'ti ti-shopping-bag fs-16 me-2' },
                        { title: 'Purchase Order', link: '/purchase-order-report', icon: 'ti ti-file-unknown fs-16 me-2' },
                        { title: 'Purchase Return', link: '/purchase-returns', icon: 'ti ti-file-upload fs-16 me-2' },
                    ]
                },
                {
                    header: 'Finance & Accounts',
                    items: [
                        {
                            title: 'Expenses',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-file-stack fs-16 me-2',
                            submenu: [
                                { title: 'Expenses', link: '/expense-list' },
                                { title: 'Expense Category', link: '/expense-category' },
                            ]
                        },
                        {
                            title: 'Income',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-file-pencil fs-16 me-2',
                            submenu: [
                                { title: 'Income', link: '/income' },
                                { title: 'Income Category', link: '/income-category' },
                            ]
                        },
                        { title: 'Bank Accounts', link: '/account-list', icon: 'ti ti-building-bank fs-16 me-2' },
                        { title: 'Money Transfer', link: '/money-transfer', icon: 'ti ti-moneybag fs-16 me-2' },
                        { title: 'Balance Sheet', link: '/balance-sheet', icon: 'ti ti-report-money fs-16 me-2' },
                        { title: 'Trial Balance', link: '/trial-balance', icon: 'ti ti-alert-circle fs-16 me-2' },
                        { title: 'Cash Flow', link: '/cash-flow', icon: 'ti ti-zoom-money fs-16 me-2' },
                        { title: 'Account Statement', link: '/account-statement', icon: 'ti ti-file-infinity fs-16 me-2' },
                    ]
                },
                {
                    header: 'Peoples',
                    items: [
                        { title: 'Customers', link: '/customers', icon: 'ti ti-users-group fs-16 me-2' },
                        { title: 'Billers', link: '/billers', icon: 'ti ti-user-up fs-16 me-2' },
                        { title: 'Suppliers', link: '/suppliers', icon: 'ti ti-user-dollar fs-16 me-2' },
                        { title: 'Stores', link: '/store-list', icon: 'ti ti-home-bolt fs-16 me-2' },
                        { title: 'Warehouses', link: '/warehouse', icon: 'ti ti-archive fs-16 me-2' },
                    ]
                },
                {
                    header: 'HRM',
                    items: [
                        { title: 'Employees', link: '/employees-grid', icon: 'ti ti-user fs-16 me-2' },
                        { title: 'Departments', link: '/department-grid', icon: 'ti ti-compass fs-16 me-2' },
                        { title: 'Designation', link: '/designation', icon: 'ti ti-git-merge fs-16 me-2' },
                        { title: 'Shifts', link: '/shift', icon: 'ti ti-arrows-shuffle fs-16 me-2' },
                        {
                            title: 'Attendence',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-user-cog fs-16 me-2',
                            submenu: [
                                { title: 'Employee', link: '/attendance-employee' },
                                { title: 'Admin', link: '/attendance-admin' },
                            ]
                        },
                        {
                            title: 'Leaves',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-calendar fs-16 me-2',
                            submenu: [
                                { title: 'Admin Leaves', link: '/leaves-admin' },
                                { title: 'Employee Leaves', link: '/leaves-employee' },
                                { title: 'Leave Types', link: '/leave-types' },
                            ]
                        },
                        { title: 'Holidays', link: '/holidays', icon: 'ti ti-calendar-share fs-16 me-2' },
                        {
                            title: 'Payroll',
                            link: 'javascript:void(0);', // Changed to be a toggle
                            icon: 'ti ti-file-dollar fs-16 me-2',
                            submenu: [
                                { title: 'Employee Salary', link: '/employee-salary' },
                                { title: 'Payslip', link: '/payslip' },
                            ]
                        },
                    ]
                },
                {
                    header: 'Reports',
                    items: [
                        {
                            title: 'Sales Report',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-chart-bar fs-16 me-2',
                            submenu: [
                                { title: 'Sales Report', link: '/sales-report' },
                                { title: 'Best Seller', link: '/best-seller' },
                            ]
                        },
                        { title: 'Purchase report', link: '/purchase-report', icon: 'ti ti-chart-pie-2 fs-16 me-2' },
                        {
                            title: 'Inventory Report',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-triangle-inverted fs-16 me-2',
                            submenu: [
                                { title: 'Inventory Report', link: '/inventory-report' },
                                { title: 'Stock History', link: '/stock-history' },
                                { title: 'Sold Stock', link: '/sold-stock' },
                            ]
                        },
                        { title: 'Invoice Report', link: '/invoice-report', icon: 'ti ti-businessplan fs-16 me-2' },
                        {
                            title: 'Supplier Report',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-user-star fs-16 me-2',
                            submenu: [
                                { title: 'Supplier Report', link: '/supplier-report' },
                                { title: 'Supplier Due Report', link: '/supplier-due-report' },
                            ]
                        },
                        {
                            title: 'Customer Report',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-report fs-16 me-2',
                            submenu: [
                                { title: 'Customer Report', link: '/customer-report' },
                                { title: 'Customer Due Report', link: '/customer-due-report' },
                            ]
                        },
                        {
                            title: 'Product Report',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-report-analytics fs-16 me-2',
                            submenu: [
                                { title: 'Product Report', link: '/product-report' },
                                { title: 'Product Expiry Report', link: '/product-expiry-report' },
                                { title: 'Product Quantity Alert', link: '/product-quantity-alert' },
                            ]
                        },
                        { title: 'Expense Report', link: '/expense-report', icon: 'ti ti-file-vector fs-16 me-2' },
                        { title: 'Income Report', link: '/income-report', icon: 'ti ti-chart-ppf fs-16 me-2' },
                        { title: 'Tax Report', link: '/tax-reports', icon: 'ti ti-chart-dots-2 fs-16 me-2' },
                        { title: 'Profit & Loss', link: '/profit-and-loss', icon: 'ti ti-chart-donut fs-16 me-2' },
                        { title: 'Annual Report', link: '/annual-report', icon: 'ti ti-report-search fs-16 me-2' },
                    ]
                },
                {
                    header: 'Content (CMS)',
                    items: [
                        {
                            title: 'Pages',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-page-break fs-16 me-2',
                            submenu: [
                                { title: 'Pages', link: '/pages' },
                            ]
                        },
                        {
                            title: 'Blog',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-wallpaper fs-16 me-2',
                            submenu: [
                                { title: 'All Blog', link: '/all-blog' },
                                { title: 'Blog Tags', link: '/blog-tag' },
                                { title: 'Categories', link: '/blog-categories' },
                                { title: 'Blog Comments', link: '/blog-comments' },
                            ]
                        },
                        {
                            title: 'Location',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-map-pin fs-16 me-2',
                            submenu: [
                                { title: 'Countries', link: '/countries' },
                                { title: 'States', link: '/states' },
                                { title: 'Cities', link: '/cities' },
                            ]
                        },
                        { title: 'Testimonials', link: '/testimonials', icon: 'ti ti-star fs-16 me-2' },
                        { title: 'FAQ', link: '/faq', icon: 'ti ti-help-circle fs-16 me-2' },
                    ]
                },
                {
                    header: 'User Management',
                    items: [
                        { title: 'Users', link: '/users', icon: 'ti ti-shield-up fs-16 me-2' },
                        { title: 'Roles & Permissions', link: '/roles-permissions', icon: 'ti ti-jump-rope fs-16 me-2' },
                        { title: 'Delete Account Request', link: '/delete-account', icon: 'ti ti-trash-x fs-16 me-2' },
                    ]
                },
                {
                    header: 'Pages',
                    items: [
                        { title: 'Profile', link: '/profile', icon: 'ti ti-user-circle fs-16 me-2' },
                        {
                            title: 'Authentication',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-shield fs-16 me-2',
                            submenu: [
                                {
                                    title: 'Login',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Cover', link: '/signin' },
                                        { title: 'Illustration', link: '/signin-2' },
                                        { title: 'Basic', link: '/signin-3' },
                                    ]
                                },
                                {
                                    title: 'Register',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Cover', link: '/register' },
                                        { title: 'Illustration', link: '/register-2' },
                                        { title: 'Basic', link: '/register-3' },
                                    ]
                                },
                                {
                                    title: 'Forgot Password',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Cover', link: '/forgot-password' },
                                        { title: 'Illustration', link: '/forgot-password-2' },
                                        { title: 'Basic', link: '/forgot-password-3' },
                                    ]
                                },
                                {
                                    title: 'Reset Password',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Cover', link: '/reset-password' },
                                        { title: 'Illustration', link: '/reset-password-2' },
                                        { title: 'Basic', link: '/reset-password-3' },
                                    ]
                                },
                                {
                                    title: 'Email Verification',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Cover', link: '/email-verification' },
                                        { title: 'Illustration', link: '/email-verification-2' },
                                        { title: 'Basic', link: '/email-verification-3' },
                                    ]
                                },
                                {
                                    title: '2 Step Verification',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Cover', link: '/two-step-verification' },
                                        { title: 'Illustration', link: '/two-step-verification-2' },
                                        { title: 'Basic', link: '/two-step-verification-3' },
                                    ]
                                },
                                { title: 'Lock Screen', link: '/lock-screen' },
                            ]
                        },
                        {
                            title: 'Error Pages',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-file-x fs-16 me-2',
                            submenu: [
                                { title: '404 Error', link: '/error-404' },
                                { title: '500 Error', link: '/error-500' },
                            ]
                        },
                        { title: 'Blank Page', link: '/blank-page', icon: 'ti ti-file fs-16 me-2' },
                        { title: 'Pricing', link: '/pricing', icon: 'ti ti-currency-dollar fs-16 me-2' },
                        { title: 'Coming Soon', link: '/coming-soon', icon: 'ti ti-send fs-16 me-2' },
                        { title: 'Under Maintenance', link: '/under-maintenance', icon: 'ti ti-alert-triangle fs-16 me-2' },
                    ]
                },
                {
                    header: 'Settings',
                    items: [
                        {
                            title: 'General Settings',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-settings fs-16 me-2',
                            submenu: [
                                { title: 'Profile', link: '/general-settings' },
                                { title: 'Security', link: '/security-settings' },
                                { title: 'Notifications', link: '/notification' },
                                { title: 'Connected Apps', link: '/connected-apps' },
                            ]
                        },
                        {
                            title: 'Website Settings',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-world fs-16 me-2',
                            submenu: [
                                { title: 'System Settings', link: '/system-settings' },
                                { title: 'Company Settings', link: '/company-settings' },
                                { title: 'Localization', link: '/localization-settings' },
                                { title: 'Prefixes', link: '/prefixes' },
                                { title: 'Preference', link: '/preference' },
                                { title: 'Appearance', link: '/appearance' },
                                { title: 'Social Authentication', link: '/social-authentication' },
                                { title: 'Language', link: '/language-settings' },
                            ]
                        },
                        {
                            title: 'App Settings',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-device-mobile fs-16 me-2',
                            submenu: [
                                {
                                    title: 'Invoice',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Invoice Settings', link: '/invoice-settings' },
                                        { title: 'Invoice Template', link: '/invoice-template' },
                                    ]
                                },
                                { title: 'Printer', link: '/printer-settings' },
                                { title: 'POS', link: '/pos-settings' },
                                { title: 'Custom Fields', link: '/custom-fields' },
                            ]
                        },
                        {
                            title: 'System Settings',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-device-desktop fs-16 me-2',
                            submenu: [
                                {
                                    title: 'Email',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Email Settings', link: '/email-settings' },
                                        { title: 'Email Template', link: '/email-template' },
                                    ]
                                },
                                {
                                    title: 'SMS',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'SMS Settings', link: '/sms-settings' },
                                        { title: 'SMS Template', link: '/sms-template' },
                                    ]
                                },
                                { title: 'OTP', link: '/otp-settings' },
                                { title: 'GDPR Cookies', link: '/gdpr-settings' },
                            ]
                        },
                        {
                            title: 'Financial Settings',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-settings-dollar fs-16 me-2',
                            submenu: [
                                { title: 'Payment Gateway', link: '/payment-gateway-settings' },
                                { title: 'Bank Accounts', link: '/bank-settings-grid' },
                                { title: 'Tax Rates', link: '/tax-rates' },
                                { title: 'Currencies', link: '/currency-settings' },
                            ]
                        },
                        {
                            title: 'Other Settings',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-settings-2 fs-16 me-2',
                            submenu: [
                                { title: 'Storage', link: '/storage-settings' },
                                { title: 'Ban IP Address', link: '/ban-ip-address' },
                            ]
                        },
                        { title: 'Logout', link: '/signin', icon: 'ti ti-logout fs-16 me-2' },
                    ]
                },
                {
                    header: 'UI Interface',
                    items: [
                        {
                            title: 'Base UI',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-vector-bezier fs-16 me-2',
                            submenu: [
                                { title: 'Alerts', link: '/ui-alerts' },
                                { title: 'Accordion', link: '/ui-accordion' },
                                { title: 'Avatar', link: '/ui-avatar' },
                                { title: 'Badges', link: '/ui-badges' },
                                { title: 'Border', link: '/ui-borders' },
                                { title: 'Buttons', link: '/ui-buttons' },
                                { title: 'Button Group', link: '/ui-buttons-group' },
                                { title: 'Breadcrumb', link: '/ui-breadcrumb' },
                                { title: 'Card', link: '/ui-cards' },
                                { title: 'Carousel', link: '/ui-carousel' },
                                { title: 'Colors', link: '/ui-colors' },
                                { title: 'Dropdowns', link: '/ui-dropdowns' },
                                { title: 'Grid', link: '/ui-grid' },
                                { title: 'Images', link: '/ui-images' },
                                { title: 'Lightbox', link: '/ui-lightbox' },
                                { title: 'Media', link: '/ui-media' },
                                { title: 'Modals', link: '/ui-modals' },
                                { title: 'Offcanvas', link: '/ui-offcanvas' },
                                { title: 'Pagination', link: '/ui-pagination' },
                                { title: 'Popovers', link: '/ui-popovers' },
                                { title: 'Progress', link: '/ui-progress' },
                                { title: 'Placeholders', link: '/ui-placeholders' },
                                { title: 'Range Slider', link: '/ui-rangeslider' },
                                { title: 'Spinner', link: '/ui-spinner' },
                                { title: 'Sweet Alerts', link: '/ui-sweetalerts' },
                                { title: 'Tabs', link: '/ui-nav-tabs' },
                                { title: 'Toasts', link: '/ui-toasts' },
                                { title: 'Tooltips', link: '/ui-tooltips' },
                                { title: 'Typography', link: '/ui-typography' },
                                { title: 'Video', link: '/ui-video' },
                                { title: 'Sortable', link: '/ui-sortable' },
                                { title: 'Swiperjs', link: '/ui-swiperjs' },
                            ]
                        },
                        {
                            title: 'Advanced UI',
                            link: 'javascript:void(0);',
                            icon: 'feather-layers',
                            submenu: [
                                { title: 'Ribbon', link: '/ui-ribbon' },
                                { title: 'Clipboard', link: '/ui-clipboard' },
                                { title: 'Drag & Drop', link: '/ui-drag-drop' },
                                { title: 'Range Slider', link: '/ui-rangeslider' },
                                { title: 'Rating', link: '/ui-rating' },
                                { title: 'Text Editor', link: '/ui-text-editor' },
                                { title: 'Counter', link: '/ui-counter' },
                                { title: 'Scrollbar', link: '/ui-scrollbar' },
                                { title: 'Sticky Note', link: '/ui-stickynote' },
                                { title: 'Timeline', link: '/ui-timeline' },
                            ]
                        },
                        {
                            title: 'Charts',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-chart-infographic fs-16 me-2',
                            submenu: [
                                { title: 'Apex Charts', link: '/chart-apex' },
                                { title: 'Chart C3', link: '/chart-c3' },
                                { title: 'Chart Js', link: '/chart-js' },
                                { title: 'Morris Charts', link: '/chart-morris' },
                                { title: 'Flot Charts', link: '/chart-flot' },
                                { title: 'Peity Charts', link: '/chart-peity' },
                            ]
                        },
                        {
                            title: 'Icons',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-icons fs-16 me-2',
                            submenu: [
                                { title: 'Fontawesome Icons', link: '/icon-fontawesome' },
                                { title: 'Feather Icons', link: '/icon-feather' },
                                { title: 'Ionic Icons', link: '/icon-ionic' },
                                { title: 'Material Icons', link: '/icon-material' },
                                { title: 'Pe7 Icons', link: '/icon-pe7' },
                                { title: 'Simpleline Icons', link: '/icon-simpleline' },
                                { title: 'Themify Icons', link: '/icon-themify' },
                                { title: 'Weather Icons', link: '/icon-weather' },
                                { title: 'Typicon Icons', link: '/icon-typicon' },
                                { title: 'Flag Icons', link: '/icon-flag' },
                                { title: 'Tabler Icons', link: '/icon-tabler' },
                                { title: 'Bootstrap Icons', link: '/icon-bootstrap' },
                                { title: 'Remix Icons', link: '/icon-remix' },
                            ]
                        },
                        {
                            title: 'Forms',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-input-search fs-16 me-2',
                            submenu: [
                                {
                                    title: 'Form Elements',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Basic Inputs', link: '/form-basic-inputs' },
                                        { title: 'Checkbox & Radios', link: '/form-checkbox-radios' },
                                        { title: 'Input Groups', link: '/form-input-groups' },
                                        { title: 'Grid & Gutters', link: '/form-grid-gutters' },
                                        { title: 'Form Select', link: '/form-select' },
                                        { title: 'Input Masks', link: '/form-mask' },
                                        { title: 'File Uploads', link: '/form-fileupload' },
                                    ]
                                },
                                {
                                    title: 'Layouts',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Horizontal Form', link: '/form-horizontal' },
                                        { title: 'Vertical Form', link: '/form-vertical' },
                                        { title: 'Floating Labels', link: '/form-floating-labels' },
                                    ]
                                },
                                { title: 'Form Validation', link: '/form-validation' },
                                { title: 'Select2', link: '/form-select2' },
                                { title: 'Form Wizard', link: '/form-wizard' },
                                { title: 'Form Picker', link: '/form-pickers' },
                            ]
                        },
                        {
                            title: 'Tables',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-table fs-16 me-2',
                            submenu: [
                                { title: 'Basic Tables', link: '/tables-basic' },
                                { title: 'Data Table', link: '/data-tables' },
                            ]
                        },
                        {
                            title: 'Maps',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-map-pin-pin fs-16 me-2',
                            submenu: [
                                { title: 'Vector', link: '/maps-vector' },
                                { title: 'Leaflet', link: '/maps-leaflet' },
                            ]
                        },
                    ]
                },
                {
                    header: 'Help',
                    items: [
                        { title: 'Documentation', link: 'javascript:void(0);', icon: 'ti ti-file-text fs-16 me-2' },
                        { title: 'Changelog', link: 'javascript:void(0);', icon: 'ti ti-exchange fs-16 me-2', badge: { class: 'badge bg-primary badge-xs text-white fs-10 ms-2', text: 'v2.0.9' } },
                        {
                            title: 'Multi Level',
                            link: 'javascript:void(0);',
                            icon: 'ti ti-menu-2 fs-16 me-2',
                            submenu: [
                                { title: 'Level 1.1', link: 'javascript:void(0);' },
                                {
                                    title: 'Level 1.2',
                                    link: 'javascript:void(0);',
                                    submenuTwo: true,
                                    submenu: [
                                        { title: 'Level 2.1', link: 'javascript:void(0);' },
                                        {
                                            title: 'Level 2.2',
                                            link: 'javascript:void(0);',
                                            submenuTwo: true,
                                            submenuThree: true,
                                            submenu: [
                                                { title: 'Level 3.1', link: 'javascript:void(0);' },
                                                { title: 'Level 3.2', link: 'javascript:void(0);' },
                                            ]
                                        },
                                    ]
                                },
                            ]
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
