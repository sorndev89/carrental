<template>
    <div class="customer-main-wrapper">
        <header class="customer-header">
            <!-- Customer specific header/navbar goes here -->
            <h1>Car Rental Service</h1>
            <nav>
                <ul>
                    <li><router-link to="/">ໜ້າຫຼັກ</router-link></li>
                    <li><router-link to="/browse-cars">ເລືອກລົດ</router-link></li>
                    <li><router-link to="/my-bookings">ການຈອງຂອງຂ້ອຍ</router-link></li>
                    <li><router-link to="/my-rental-history">ປະຫວັດການໃຊ້ບໍລິການ</router-link></li>
                    <li><router-link to="/auth/login">ເຂົ້າສູ່ລະບົບ</router-link></li>
                </ul>
            </nav>
        </header>
        <main class="customer-content">
            <router-view></router-view>
        </main>
        <footer class="customer-footer">
            <p>&copy; 2025 Car Rental. All rights reserved.</p>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'CustomerLayout',
}
</script>

<style scoped>
.customer-main-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.customer-header {
    background-color: #007bff;
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.customer-header h1 {
    margin: 0;
    font-size: 24px;
}

.customer-header nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

.customer-header nav li {
    margin-left: 20px;
}

.customer-header nav a {
    color: white;
    text-decoration: none;
    font-weight: bold;
}

.customer-content {
    flex-grow: 1;
    padding: 20px;
    background-color: #f8f9fa;
}

.customer-footer {
    background-color: #343a40;
    color: white;
    padding: 15px 20px;
    text-align: center;
}
</style>
