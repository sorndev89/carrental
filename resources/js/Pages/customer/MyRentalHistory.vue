<template>
  <div class="bg-light min-vh-100 py-5">
    <div class="container px-4">
      <h1 class="h2 fw-bold text-center mb-5 text-dark">
        ປະຫວັດການເຊົ່າລົດຂອງຂ້ອຍ
      </h1>

      <!-- Filter and Sort Section -->
      <div class="card shadow-lg p-4 mb-5 rounded-lg">
        <h3 class="h5 fw-bold mb-3 text-dark">ຕົວກອງ ແລະ ຈັດລຽງ</h3>
        <form @submit.prevent="applyFilters">
          <div class="row g-3 align-items-end">
            <div class="col-12 col-md-4">
              <label for="filterStatus" class="form-label fw-semibold">ສະຖານະການຈອງ</label>
              <select id="filterStatus" class="form-select rounded-pill py-2 px-3" v-model="filters.booking_status">
                <option value="">ທັງໝົດ</option>
                <option value="pending">ລໍຖ້າ</option>
                <option value="confirmed">ຢືນຢັນແລ້ວ</option>
                <option value="cancelled">ຍົກເລີກ</option>
                <option value="completed">ສຳເລັດ</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <label for="filterPaymentStatus" class="form-label fw-semibold">ສະຖານະການຊຳລະ</label>
              <select id="filterPaymentStatus" class="form-select rounded-pill py-2 px-3" v-model="filters.payment_status">
                <option value="">ທັງໝົດ</option>
                <option value="Pending">ລໍຖ້າຊຳລະ</option>
                <option value="Paid">ຊຳລະແລ້ວ</option>
                <option value="Failed">ຊຳລະບໍ່ສຳເລັດ</option>
                <option value="Cancelled">ຍົກເລີກການຊຳລະ</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <label for="sortBy" class="form-label fw-semibold">ຈັດລຽງຕາມ</label>
              <select id="sortBy" class="form-select rounded-pill py-2 px-3" v-model="sortBy">
                <option value="pickup_date_desc">ວັນທີຮັບລົດ: ລ່າສຸດ</option>
                <option value="pickup_date_asc">ວັນທີຮັບລົດ: ເກົ່າສຸດ</option>
                <option value="total_price_desc">ລາຄາລວມ: ສູງສຸດ</option>
                <option value="total_price_asc">ລາຄາລວມ: ຕ່ຳສຸດ</option>
              </select>
            </div>
            <div class="col-12 text-md-end">
              <button type="submit" class="btn btn-primary rounded-pill px-4 me-2">ນຳໃຊ້ຕົວກອງ</button>
              <button type="button" class="btn btn-outline-secondary rounded-pill px-4" @click="clearFilters">ລ້າງຕົວກອງ</button>
            </div>
          </div>
        </form>
      </div>

      <!-- Rental History List -->
      <div v-if="paginatedHistory.length === 0" class="alert alert-info text-center" role="alert">
        ບໍ່ພົບປະຫວັດການເຊົ່າລົດທີ່ກົງກັບການຄົ້ນຫາຂອງທ່ານ.
      </div>

      <div v-else class="row g-4">
        <div v-for="booking in paginatedHistory" :key="booking.id" class="col-12">
          <div class="card shadow-lg rounded-lg overflow-hidden">
            <div class="card-body p-4">
              <div class="row align-items-center">
                <div class="col-12 col-md-3 mb-3 mb-md-0">
                  <img
                    :src="booking.car.image_url"
                    :alt="booking.car.make + ' ' + booking.car.model"
                    class="img-fluid rounded object-fit-cover w-100" style="height: 150px;"
                  />
                </div>
                <div class="col-12 col-md-6 mb-3 mb-md-0">
                  <h3 class="h5 fw-semibold text-dark mb-1">{{ booking.car.make }} {{ booking.car.model }}</h3>
                  <p class="text-muted mb-1">ປ້າຍທະບຽນ: {{ booking.car.license_plate }}</p>
                  <p class="text-muted mb-1">ປະເພດລົດ: {{ getCarTypeName(booking.car.car_type_id) }}</p>
                  <p class="text-secondary mb-0">ວັນທີຮັບລົດ: {{ formatDate(booking.pickup_date) }}</p>
                  <p class="text-secondary mb-0">ວັນທີສົ່ງລົດຄືນ: {{ formatDate(booking.return_date) }}</p>
                </div>
                <div class="col-12 col-md-3 text-md-end">
                  <p class="h4 fw-bold text-primary mb-2">ລາຄາລວມ: {{ formatPrice(booking.total_price) }} LAK</p>
                  <span :class="['badge', getStatusBadgeClass(booking.booking_status)]">{{ getStatusText(booking.booking_status) }}</span>
                  <span :class="['badge', getPaymentStatusBadgeClass(booking.payment_status)]" class="ms-2">{{ getPaymentStatusText(booking.payment_status) }}</span>
                  <router-link :to="`/booking/${booking.id}`" class="btn btn-outline-primary btn-sm rounded-pill mt-3 w-100">ເບິ່ງລາຍລະອຽດ</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <nav aria-label="Page navigation" class="mt-5" v-if="totalPages > 1">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="currentPage--">ກ່ອນໜ້າ</a>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
            <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="currentPage++">ຕໍ່ໄປ</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyRentalHistory',
  data() {
    return {
      carTypes: [
        { id: 1, name: 'ລົດເກ໋ງ' },
        { id: 2, name: 'ລົດກະບະ' },
        { id: 3, name: 'ລົດຕູ້' },
        { id: 4, name: 'ລົດຫຼູຫຼາ' },
        { id: 5, name: 'ລົດ SUV' },
        { id: 6, name: 'ລົດກະບະ 4x4' },
      ],
      allRentalHistory: [
        {
          id: 1,
          customer_id: 1,
          car_id: 1,
          pickup_date: '2025-07-20',
          return_date: '2025-07-25',
          total_price: 2500000,
          booking_status: 'completed',
          payment_status: 'Paid',
          car: {
            id: 1,
            car_type_id: 1,
            make: 'Toyota',
            model: 'Camry',
            license_plate: 'ກກ 1234',
            daily_rate: 500000,
            image_url: 'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Sedan',
          },
        },
        {
          id: 2,
          customer_id: 1,
          car_id: 2,
          pickup_date: '2025-08-01',
          return_date: '2025-08-03',
          total_price: 1400000,
          booking_status: 'confirmed',
          payment_status: 'Pending',
          car: {
            id: 2,
            car_type_id: 5,
            make: 'Honda',
            model: 'CR-V',
            license_plate: 'ຂຂ 5678',
            daily_rate: 700000,
            image_url: 'https://via.placeholder.com/600x400/33FF57/FFFFFF?text=SUV',
          },
        },
        {
          id: 3,
          customer_id: 1,
          car_id: 7,
          pickup_date: '2025-06-10',
          return_date: '2025-06-12',
          total_price: 900000,
          booking_status: 'completed',
          payment_status: 'Paid',
          car: {
            id: 7,
            car_type_id: 1,
            make: 'Honda',
            model: 'Civic',
            license_plate: 'ຊຊ 3344',
            daily_rate: 450000,
            image_url: 'https://via.placeholder.com/600x400/4CAF50/FFFFFF?text=Civic',
          },
        },
        {
          id: 4,
          customer_id: 1,
          car_id: 8,
          pickup_date: '2025-07-01',
          return_date: '2025-07-05',
          total_price: 2600000,
          booking_status: 'cancelled',
          payment_status: 'Failed',
          car: {
            id: 8,
            car_type_id: 2,
            make: 'Chevrolet',
            model: 'Colorado',
            license_plate: 'ຍຍ 5566',
            daily_rate: 650000,
            image_url: 'https://via.placeholder.com/600x400/FF9800/FFFFFF?text=Colorado',
          },
        },
        {
          id: 5,
          customer_id: 1,
          car_id: 3,
          pickup_date: '2025-05-15',
          return_date: '2025-05-18',
          total_price: 3600000,
          booking_status: 'completed',
          payment_status: 'Paid',
          car: {
            id: 3,
            car_type_id: 4,
            make: 'Mercedes-Benz',
            model: 'C-Class',
            license_plate: 'ຄຄ 9012',
            daily_rate: 1200000,
            image_url: 'https://via.placeholder.com/600x400/3357FF/FFFFFF?text=Luxury',
          },
        },
      ],
      filters: {
        booking_status: '',
        payment_status: '',
      },
      sortBy: 'pickup_date_desc', // Default sort
      currentPage: 1,
      itemsPerPage: 5, // Number of bookings to display per page
    };
  },
  computed: {
    filteredAndSortedHistory() {
      let history = [...this.allRentalHistory];

      // Apply filters
      if (this.filters.booking_status) {
        history = history.filter(booking => booking.booking_status === this.filters.booking_status);
      }
      if (this.filters.payment_status) {
        history = history.filter(booking => booking.payment_status === this.filters.payment_status);
      }

      // Apply sorting
      history.sort((a, b) => {
        if (this.sortBy === 'pickup_date_asc') {
          return new Date(a.pickup_date) - new Date(b.pickup_date);
        } else if (this.sortBy === 'pickup_date_desc') {
          return new Date(b.pickup_date) - new Date(a.pickup_date);
        } else if (this.sortBy === 'total_price_asc') {
          return a.total_price - b.total_price;
        } else if (this.sortBy === 'total_price_desc') {
          return b.total_price - a.total_price;
        }
        return 0;
      });

      return history;
    },
    paginatedHistory() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredAndSortedHistory.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredAndSortedHistory.length / this.itemsPerPage);
    },
  },
  methods: {
    applyFilters() {
      this.currentPage = 1; // Reset to first page on filter change
    },
    clearFilters() {
      this.filters = {
        booking_status: '',
        payment_status: '',
      };
      this.sortBy = 'pickup_date_desc';
      this.currentPage = 1;
    },
    getCarTypeName(carTypeId) {
      const carType = this.carTypes.find(type => type.id === carTypeId);
      return carType ? carType.name : 'ບໍ່ລະບຸ';
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('lo-LA', options);
    },
    formatPrice(price) {
      return price.toLocaleString(); // Formats number with local thousands separator
    },
    getStatusBadgeClass(status) {
      switch (status) {
        case 'pending':
          return 'bg-warning text-dark';
        case 'confirmed':
          return 'bg-success';
        case 'cancelled':
          return 'bg-danger';
        case 'completed':
          return 'bg-info';
        default:
          return 'bg-secondary';
      }
    },
    getStatusText(status) {
      switch (status) {
        case 'pending':
          return 'ລໍຖ້າ';
        case 'confirmed':
          return 'ຢືນຢັນແລ້ວ';
        case 'cancelled':
          return 'ຍົກເລີກ';
        case 'completed':
          return 'ສຳເລັດ';
        default:
          return status;
      }
    },
    getPaymentStatusBadgeClass(status) {
      switch (status) {
        case 'Pending':
          return 'bg-warning text-dark';
        case 'Paid':
          return 'bg-success';
        case 'Failed':
          return 'bg-danger';
        case 'Cancelled':
          return 'bg-secondary';
        default:
          return 'bg-secondary';
      }
    },
    getPaymentStatusText(status) {
      switch (status) {
        case 'Pending':
          return 'ລໍຖ້າຊຳລະ';
        case 'Paid':
          return 'ຊຳລະແລ້ວ';
        case 'Failed':
          return 'ຊຳລະບໍ່ສຳເລັດ';
        case 'Cancelled':
          return 'ຍົກເລີກການຊຳລະ';
        default:
          return status;
      }
    },
  },
};
</script>

<style scoped>
/* Re-using some styles from HomePage.vue for consistency */
.rounded-pill {
  border-radius: 50rem !important;
}

.transition {
  transition: all 0.3s ease-in-out;
}

.transform {
  transform: scale(1);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

.text-primary {
  color: #007bff !important;
}

.text-secondary {
  color: #6c757d !important;
}

.text-dark {
  color: #343a40 !important;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.bg-white {
  background-color: #ffffff !important;
}

.h-100 {
  height: 100%;
}

.object-fit-cover {
  object-fit: cover;
}

/* Custom styles for this page */
.card {
  border: none;
}

.badge {
  padding: 0.5em 0.75em;
  font-size: 0.875em;
  font-weight: 600;
  border-radius: 0.25rem;
}
</style>
