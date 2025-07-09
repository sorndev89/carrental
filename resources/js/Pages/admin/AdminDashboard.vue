<template>
  
        <!-- Page Header -->
        <div class="page-header">
            <div class="row">
                <div class="col-sm-12">
                    <h3 class="page-title">Welcome Admin!</h3>
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item active">Dashboard</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- /Page Header -->

        <!-- Dashboard Summary Cards (Row 1) -->
        <div class="row">
            <div class="col-lg-3 col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <div class="dash-widget-header">
                            <span class="dash-widget-icon bg-1">
                                <i class="ti ti-car"></i>
                            </span>
                            <div class="dash-count">
                                <div class="dash-title">Total Cars</div>
                                <div class="dash-counts">
                                    <p>100</p>
                                </div>
                            </div>
                        </div>
                        <div class="progress progress-sm mt-3">
                            <div class="progress-bar bg-5" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p class="text-muted mt-3 mb-0">
                            <span class="text-danger me-1"><i class="ti ti-arrow-down-right me-1"></i>1.15%</span> since last week
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6">
                <div class="card">
                    <div class="card-body">
                        <div class="dash-widget-header">
                            <span class="dash-widget-icon bg-2">
                                <i class="ti ti-users"></i>
                            </span>
                            <div class="dash-count">
                                <div class="dash-title">Total Customers</div>
                                <div class="dash-counts">
                                    <p>500</p>
                                </div>
                            </div>
                        </div>
                        <div class="progress progress-sm mt-3">
                            <div class="progress-bar bg-6" role="progressbar" style="width: 65%" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p class="text-muted mt-3 mb-0">
                            <span class="text-success me-1"><i class="ti ti-arrow-up-right me-1"></i>2.80%</span> since last week
                        </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="dash-widget-header">
                                    <span class="dash-widget-icon bg-3">
                                        <i class="ti ti-receipt-2"></i>
                                    </span>
                                    <div class="dash-count">
                                        <div class="dash-title">Total Bookings</div>
                                        <div class="dash-counts">
                                            <p>250</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="progress progress-sm mt-3">
                                    <div class="progress-bar bg-7" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <p class="text-muted mt-3 mb-0">
                                    <span class="text-success me-1"><i class="ti ti-arrow-up-right me-1"></i>5.00%</span> since last week
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="dash-widget-header">
                                    <span class="dash-widget-icon bg-4">
                                        <i class="ti ti-currency-dollar"></i>
                                    </span>
                                    <div class="dash-count">
                                        <div class="dash-title">Total Revenue</div>
                                        <div class="dash-counts">
                                            <p>$15,000</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="progress progress-sm mt-3">
                                    <div class="progress-bar bg-8" role="progressbar" style="width: 45%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <p class="text-muted mt-3 mb-0">
                                    <span class="text-danger me-1"><i class="ti ti-arrow-down-right me-1"></i>0.50%</span> since last week
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Dashboard Summary Cards (Row 1) -->

                <!-- Main Sales/Bookings Chart & Top Booked Cars (Row 2) -->
                <div class="row">
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Monthly Bookings Overview</h4>
                            </div>
                            <div class="card-body">
                                <!-- Placeholder for Chart -->
                                <div style="height: 300px; background-color: #f8f9fa; display: flex; align-items: center; justify-content: center; border: 1px dashed #ccc;">
                                    <p>Chart will be displayed here (e.g., using ApexCharts, Chart.js)</p>
                                </div>
                                <!-- /Placeholder for Chart -->
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Top Booked Cars</h4>
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Toyota Camry
                                        <span class="badge bg-primary rounded-pill">50 Bookings</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Honda Civic
                                        <span class="badge bg-info rounded-pill">45 Bookings</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Ford Focus
                                        <span class="badge bg-success rounded-pill">30 Bookings</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Mercedes-Benz C-Class
                                        <span class="badge bg-warning rounded-pill">25 Bookings</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        BMW 3 Series
                                        <span class="badge bg-danger rounded-pill">20 Bookings</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Main Sales/Bookings Chart & Top Booked Cars (Row 2) -->

                <!-- Recent Activities & Car Status Overview (Row 3) -->
                <div class="row">
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Recent Activities</h4>
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush activity-feed">
                                    <li class="list-group-item">
                                        <div class="activity-user">
                                            <img :src="url + '/assets/img/profiles/avatar-01.jpg'" alt="User Image" class="avatar-xs rounded-circle me-2">
                                            <strong>John Doe</strong> booked a <strong>Toyota Camry</strong>.
                                        </div>
                                        <span class="activity-time">2 hours ago</span>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="activity-user">
                                            <img :src="url + '/assets/img/profiles/avatar-02.jpg'" alt="User Image" class="avatar-xs rounded-circle me-2">
                                            <strong>Jane Smith</strong> registered as a new customer.
                                        </div>
                                        <span class="activity-time">1 day ago</span>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="activity-user">
                                            <img :src="url + '/assets/img/profiles/avatar-03.jpg'" alt="User Image" class="avatar-xs rounded-circle me-2">
                                            <strong>Admin</strong> updated car status for <strong>Honda Civic</strong> to 'Under Maintenance'.
                                        </div>
                                        <span class="activity-time">3 days ago</span>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="activity-user">
                                            <img :src="url + '/assets/img/profiles/avatar-04.jpg'" alt="User Image" class="avatar-xs rounded-circle me-2">
                                            <strong>Peter Jones</strong> completed a rental for <strong>Ford Focus</strong>.
                                        </div>
                                        <span class="activity-time">5 days ago</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Car Status Overview</h4>
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Available Cars
                                        <span class="badge bg-primary rounded-pill">80</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Rented Cars
                                        <span class="badge bg-info rounded-pill">15</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Under Maintenance
                                        <span class="badge bg-danger rounded-pill">5</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Recent Activities & Car Status Overview (Row 3) -->

                <!-- Main Data Tables (Row 4) -->
                <div class="row mt-4">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Recent Bookings</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>Booking ID</th>
                                                <th>Customer</th>
                                                <th>Car</th>
                                                <th>Pickup Date</th>
                                                <th>Return Date</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>#BKG001</td>
                                                <td>John Doe</td>
                                                <td>Toyota Camry</td>
                                                <td>2025-07-01</td>
                                                <td>2025-07-05</td>
                                                <td><span class="badge bg-success">Confirmed</span></td>
                                            </tr>
                                            <tr>
                                                <td>#BKG002</td>
                                                <td>Jane Smith</td>
                                                <td>Honda Civic</td>
                                                <td>2025-07-02</td>
                                                <td>2025-07-07</td>
                                                <td><span class="badge bg-warning">Pending</span></td>
                                            </tr>
                                            <tr>
                                                <td>#BKG003</td>
                                                <td>Peter Jones</td>
                                                <td>Ford Focus</td>
                                                <td>2025-07-03</td>
                                                <td>2025-07-08</td>
                                                <td><span class="badge bg-danger">Cancelled</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Main Data Tables (Row 4) -->

                <!-- Financial Overview & New Users (Row 5) -->
                <div class="row mt-4">
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">Recent Financial Transactions</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>Transaction ID</th>
                                                <th>Type</th>
                                                <th>Amount</th>
                                                <th>Date</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>#TRN001</td>
                                                <td>Income</td>
                                                <td>$500.00</td>
                                                <td>2025-06-29</td>
                                                <td>Car Rental Payment</td>
                                            </tr>
                                            <tr>
                                                <td>#TRN002</td>
                                                <td>Expense</td>
                                                <td>$50.00</td>
                                                <td>2025-06-29</td>
                                                <td>Fuel Refill</td>
                                            </tr>
                                            <tr>
                                                <td>#TRN003</td>
                                                <td>Income</td>
                                                <td>$300.00</td>
                                                <td>2025-06-30</td>
                                                <td>Late Return Fee</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-header">
                                <h4 class="card-title">New Users</h4>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-striped mb-0">
                                        <thead>
                                            <tr>
                                                <th>User ID</th>
                                                <th>Name</th>
                                                <th>Registered Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>#USR001</td>
                                                <td>Alice Wonderland</td>
                                                <td>2025-06-28</td>
                                            </tr>
                                            <tr>
                                                <td>#USR002</td>
                                                <td>Bob The Builder</td>
                                                <td>2025-06-29</td>
                                            </tr>
                                            <tr>
                                                <td>#USR003</td>
                                                <td>Charlie Chaplin</td>
                                                <td>2025-06-30</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /Financial Overview & New Users (Row 5) -->

    
</template>

<script>
export default {
    name: 'AdminDashboard',
    data() {
        return {
            url: window.location.origin
        }
    },
    mounted() {
        // Initialize any template-specific JS here if needed
        // For example, if the template uses jQuery for sidebar toggling or dropdowns,
        // you might need to re-initialize them or find Vue-compatible alternatives.
        // feather.replace() is already in app.js, so no need to call it here again unless specific to this component.
    }
}
</script>

<style scoped>

</style>