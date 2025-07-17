<template>
  <div class="bg-light min-vh-100 py-5">
    <div class="container px-4">
      <h1 class="h2 fw-bold text-center mb-5 text-dark">
        ລາຍການຈອງຂອງຂ້ອຍ
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

      <div v-if="paginatedBookings.length === 0" class="alert alert-info text-center" role="alert">
        ທ່ານຍັງບໍ່ມີລາຍການຈອງໃດໆ.
      </div>

      <div v-else class="row g-4">
        <div v-for="booking in paginatedBookings" :key="booking.id" class="col-12">
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
                  <p class="text-secondary mb-0" v-if="booking.payment_method">ວິທີຊຳລະ: {{ booking.payment_method }}</p>
                  <p class="text-secondary mb-0" v-if="booking.details">ລາຍລະອຽດ: {{ booking.details }}</p>
                </div>
                <div class="col-12 col-md-3 text-md-end">
                  <p class="h4 fw-bold text-primary mb-2">ລາຄາລວມ: {{ formatPrice(booking.total_price) }} LAK</p>
                  <span :class="['badge', getStatusBadgeClass(booking.booking_status)]">{{ getStatusText(booking.booking_status) }}</span>
                  <span :class="['badge', getPaymentStatusBadgeClass(booking.payment_status)]" class="ms-2">{{ getPaymentStatusText(booking.payment_status) }}</span>
                  <button @click="showDetails(booking)" class="btn btn-outline-primary btn-sm rounded-pill mt-3 w-100">ເບິ່ງລາຍລະອຽດ</button>
                  <button
                    v-if="booking.booking_status === 'confirmed' && booking.payment_status === 'Pending'"
                    @click="showPaymentModal(booking)"
                    class="btn btn-success btn-sm rounded-pill mt-2 w-100"
                  >
                    ຊຳລະເງິນ
                  </button>
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

      <!-- Booking Details Modal -->
      <div v-if="isModalVisible" class="modal-backdrop fade show"></div>
      <div v-if="isModalVisible" class="modal fade show" style="display: block;" tabindex="-1" aria-labelledby="bookingDetailsModalLabel" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content" v-if="selectedBooking">
            <div class="modal-header">
              <h5 class="modal-title" id="bookingDetailsModalLabel">ລາຍລະອຽດການຈອງ #{{ selectedBooking.id }}</h5>
              <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <h6 class="fw-bold">ຂໍ້ມູນລົດ</h6>
                  <img :src="selectedBooking.car.image_url" :alt="selectedBooking.car.make + ' ' + selectedBooking.car.model" class="img-fluid rounded mb-3" style="max-height: 200px; width: 100%; object-fit: cover;">
                  <p><strong>ລົດ:</strong> {{ selectedBooking.car.make }} {{ selectedBooking.car.model }}</p>
                  <p><strong>ປ້າຍທະບຽນ:</strong> {{ selectedBooking.car.license_plate }}</p>
                  <p><strong>ປະເພດ:</strong> {{ getCarTypeName(selectedBooking.car.car_type_id) }}</p>
                  <p><strong>ລາຄາຕໍ່ມື້:</strong> {{ formatPrice(selectedBooking.car.daily_rate) }} LAK</p>
                </div>
                <div class="col-md-6">
                  <h6 class="fw-bold">ຂໍ້ມູນການຈອງ</h6>
                  <p><strong>ວັນທີຮັບລົດ:</strong> {{ formatDate(selectedBooking.pickup_date) }}</p>
                  <p><strong>ວັນທີສົ່ງລົດຄືນ:</strong> {{ formatDate(selectedBooking.return_date) }}</p>
                  <p><strong>ລາຄາລວມ:</strong> <span class="h5 fw-bold text-primary">{{ formatPrice(selectedBooking.total_price) }} LAK</span></p>
                  <hr>
                  <h6 class="fw-bold">ສະຖານະ</h6>
                  <p><strong>ສະຖານະການຈອງ:</strong> <span :class="['badge', getStatusBadgeClass(selectedBooking.booking_status)]">{{ getStatusText(selectedBooking.booking_status) }}</span></p>
                  <p><strong>ສະຖານະການຊຳລະ:</strong> <span :class="['badge', getPaymentStatusBadgeClass(selectedBooking.payment_status)]">{{ getPaymentStatusText(selectedBooking.payment_status) }}</span></p>
                  <p v-if="selectedBooking.payment_method"><strong>ວິທີຊຳລະ:</strong> {{ selectedBooking.payment_method }}</p>
                  <p v-if="selectedBooking.transaction_id"><strong>ເລກທຸລະກຳ:</strong> {{ selectedBooking.transaction_id }}</p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary rounded-pill px-4" @click="closeModal">ປິດ</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Modal -->
      <div v-if="isPaymentModalVisible" class="modal-backdrop fade show"></div>
      <div v-if="isPaymentModalVisible" class="modal fade show" style="display: block;" tabindex="-1" aria-labelledby="paymentModalLabel" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-md modal-dialog-centered">
          <div class="modal-content" v-if="bookingToPay">
            <div class="modal-header">
              <h5 class="modal-title" id="paymentModalLabel">ຊຳລະເງິນສຳລັບການຈອງ #{{ bookingToPay.id }}</h5>
              <button type="button" class="btn-close" @click="closePaymentModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p class="mb-3"><strong>ຈຳນວນທີ່ຕ້ອງຊຳລະ:</strong> <span class="h5 fw-bold text-primary">{{ formatPrice(bookingToPay.total_price) }} LAK</span></p>
              <form @submit.prevent="processPayment">
                <div class="mb-3">
                  <label for="paymentMethod" class="form-label">ວິທີຊຳລະ</label>
                  <select id="paymentMethod" class="form-select rounded-pill py-2 px-3" v-model="paymentForm.method" required>
                    <option value="">ເລືອກວິທີຊຳລະ</option>
                    <option value="Bank Transfer">ໂອນເງິນຜ່ານທະນາຄານ</option>
                    <option value="Credit Card">ບັດເຄຣດິດ</option>
                    <option value="Cash">ເງິນສົດ</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="details" class="form-label">ລາຍລະອຽດ (ຖ້າມີ)</label>
                  <input type="text" id="details" class="form-control rounded-pill py-2 px-3" v-model="paymentForm.details">
                </div>
                <div class="mb-3">
                  <label for="paymentProof" class="form-label">ແນບຫຼັກຖານການຊຳລະ (ຮູບພາບ)</label>
                  <input type="file" id="paymentProof" class="form-control rounded-pill py-2 px-3" @change="handleFileChange" accept="image/*">
                </div>
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-secondary rounded-pill px-4 me-2" @click="closePaymentModal">ຍົກເລີກ</button>
                  <button type="submit" class="btn btn-primary rounded-pill px-4">ຢືນຢັນການຊຳລະ</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'MyBookings',
  data() {
    return {
      isModalVisible: false,
      selectedBooking: null,
      isPaymentModalVisible: false,
      bookingToPay: null,
      paymentForm: {
        method: '',
        details: '',
        paymentProofFile: null,
      },
      carTypes: [
        { id: 1, name: 'ລົດເກ໋ງ' },
        { id: 2, name: 'ລົດກະບະ' },
        { id: 3, name: 'ລົດຕູ້' },
        { id: 4, name: 'ລົດຫຼູຫຼາ' },
        { id: 5, name: 'ລົດ SUV' },
        { id: 6, name: 'ລົດກະບະ 4x4' },
      ],
      allBookings: [
        {
          id: 1,
          customer_id: 1,
          car_id: 1,
          pickup_date: '2025-07-20',
          return_date: '2025-07-25',
          total_price: 2500000,
          booking_status: 'confirmed',
          payment_method: 'Credit Card',
          payment_status: 'Pending',
          transaction_id: 'TXN12345',
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
          booking_status: 'pending',
          payment_method: 'Bank Transfer',
          payment_status: 'Pending',
          transaction_id: 'TXN67890',
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
          payment_method: 'Cash',
          payment_status: 'Paid',
          transaction_id: 'TXN11223',
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
          payment_method: 'Credit Card',
          payment_status: 'Failed',
          transaction_id: 'TXN44556',
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
    filteredAndSortedBookings() {
      let bookings = [...this.allBookings];

      // Apply filters
      if (this.filters.booking_status) {
        bookings = bookings.filter(booking => booking.booking_status === this.filters.booking_status);
      }
      if (this.filters.payment_status) {
        bookings = bookings.filter(booking => booking.payment_status === this.filters.payment_status);
      }

      // Apply sorting
      bookings.sort((a, b) => {
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

      return bookings;
    },
    paginatedBookings() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredAndSortedBookings.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredAndSortedBookings.length / this.itemsPerPage);
    },
  },
  methods: {
    showDetails(booking) {
      this.selectedBooking = booking;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedBooking = null;
    },
    showPaymentModal(booking) {
      this.bookingToPay = booking;
      this.paymentForm.method = booking.payment_method || ''; // Pre-fill if exists
      this.paymentForm.details = booking.details || ''; // Pre-fill if exists
      this.paymentForm.paymentProofFile = null; // Reset file input
      this.isPaymentModalVisible = true;
    },
    closePaymentModal() {
      this.isPaymentModalVisible = false;
      this.bookingToPay = null;
      this.paymentForm.method = '';
      this.paymentForm.details = '';
      this.paymentForm.paymentProofFile = null;
    },
    handleFileChange(event) {
      this.paymentForm.paymentProofFile = event.target.files[0];
    },
    processPayment() {
      if (this.bookingToPay) {
        // Simulate API call to process payment
        console.log('Processing payment for booking:', this.bookingToPay.id);
        console.log('Payment Method:', this.paymentForm.method);
        console.log('Details:', this.paymentForm.details);
        console.log('Payment Proof File:', this.paymentForm.paymentProofFile);

        // Update the booking status (simulate successful payment)
        const index = this.allBookings.findIndex(b => b.id === this.bookingToPay.id);
        if (index !== -1) {
          this.allBookings[index].payment_status = 'Paid';
          this.allBookings[index].payment_method = this.paymentForm.method;
          this.allBookings[index].details = this.paymentForm.details;
          // In a real application, you would upload the file here
          // this.allBookings[index].payment_proof_url = 'uploaded_file_url';
        }
        this.closePaymentModal();
        alert('ການຊຳລະສຳເລັດ!'); // Provide user feedback
      }
    },
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

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  transition: opacity 0.15s linear;
}

.modal-backdrop.fade {
  opacity: 0;
}

.modal-backdrop.show {
  opacity: 0.5;
}

.modal.fade .modal-dialog {
  transition: transform .3s ease-out;
  transform: translate(0, -50px);
}

@media (prefers-reduced-motion: reduce) {
  .modal.fade .modal-dialog {
    transition: none;
  }
}

.modal.show .modal-dialog {
  transform: none;
}
</style>