<template>
  <div class="bg-light min-vh-100 py-5">
    <div class="container px-4">
      <h1 class="h2 fw-bold text-center mb-5 text-dark">
        ປະຫວັດການຊຳລະເງິນ
      </h1>

      <!-- Filter and Sort Section -->
      <div class="card shadow-lg p-4 mb-5 rounded-lg">
        <h3 class="h5 fw-bold mb-3 text-dark">ຕົວກອງ ແລະ ຈັດລຽງ</h3>
        <form @submit.prevent="applyFilters">
          <div class="row g-3 align-items-end">
            <div class="col-12 col-md-6">
              <label for="filterPaymentStatus" class="form-label fw-semibold">ສະຖານະການຊຳລະ</label>
              <select id="filterPaymentStatus" class="form-select rounded-pill py-2 px-3" v-model="filters.payment_status">
                <option value="">ທັງໝົດ</option>
                <option value="Pending">ລໍຖ້າຊຳລະ</option>
                <option value="Paid">ຊຳລະແລ້ວ</option>
                <option value="Failed">ຊຳລະບໍ່ສຳເລັດ</option>
                <option value="Cancelled">ຍົກເລີກການຊຳລະ</option>
              </select>
            </div>
            <div class="col-12 col-md-6">
              <label for="sortBy" class="form-label fw-semibold">ຈັດລຽງຕາມ</label>
              <select id="sortBy" class="form-select rounded-pill py-2 px-3" v-model="sortBy">
                <option value="payment_date_desc">ວັນທີຊຳລະ: ລ່າສຸດ</option>
                <option value="payment_date_asc">ວັນທີຊຳລະ: ເກົ່າສຸດ</option>
                <option value="amount_desc">ຈຳນວນເງິນ: ສູງສຸດ</option>
                <option value="amount_asc">ຈຳນວນເງິນ: ຕ່ຳສຸດ</option>
              </select>
            </div>
            <div class="col-12 text-md-end">
              <button type="submit" class="btn btn-primary rounded-pill px-4 me-2">ນຳໃຊ້ຕົວກອງ</button>
              <button type="button" class="btn btn-outline-secondary rounded-pill px-4" @click="clearFilters">ລ້າງຕົວກອງ</button>
            </div>
          </div>
        </form>
      </div>

      <div v-if="paginatedPayments.length === 0" class="alert alert-info text-center" role="alert">
        ບໍ່ພົບປະຫວັດການຊຳລະເງິນ.
      </div>

      <div v-else class="table-responsive">
        <table class="table table-striped table-hover shadow-sm rounded-lg overflow-hidden">
          <thead class="bg-primary text-white">
            <tr>
              <th scope="col">ເລກທີ່ຈອງ</th>
              <th scope="col">ລົດ</th>
              <th scope="col">ວັນທີຊຳລະ</th>
              <th scope="col">ຈຳນວນເງິນ</th>
              <th scope="col">ສະຖານະ</th>
              <th scope="col">ການກະທຳ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="payment in paginatedPayments" :key="payment.id">
              <td>#{{ payment.booking_id }}</td>
              <td>{{ payment.car.make }} {{ payment.car.model }}</td>
              <td>{{ formatDate(payment.payment_date) }}</td>
              <td>{{ formatPrice(payment.amount) }} LAK</td>
              <td>
                <span :class="['badge', getPaymentStatusBadgeClass(payment.payment_status)]">{{ getPaymentStatusText(payment.payment_status) }}</span>
              </td>
              <td>
                <button @click="showDetails(payment)" class="btn btn-outline-info btn-sm rounded-pill">ລາຍລະອຽດ</button>
              </td>
            </tr>
          </tbody>
        </table>
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

      <!-- Payment Details Modal -->
      <div v-if="isModalVisible" class="modal-backdrop fade show"></div>
      <div v-if="isModalVisible" class="modal fade show" style="display: block;" tabindex="-1" aria-labelledby="paymentDetailsModalLabel" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content" v-if="selectedPayment">
            <div class="modal-header">
              <h5 class="modal-title" id="paymentDetailsModalLabel">ລາຍລະອຽດການຊຳລະ #{{ selectedPayment.id }}</h5>
              <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-6">
                  <h6 class="fw-bold">ຂໍ້ມູນການຊຳລະ</h6>
                  <p><strong>ເລກທີ່ການຊຳລະ:</strong> #{{ selectedPayment.id }}</p>
                  <p><strong>ເລກທີ່ການຈອງ:</strong> #{{ selectedPayment.booking_id }}</p>
                  <p><strong>ວັນທີຈອງ:</strong> {{ formatDate(selectedPayment.booking_date) }}</p>
                  <p><strong>ວັນທີຊຳລະ:</strong> {{ formatDate(selectedPayment.payment_date) }}</p>
                  <p><strong>ວິທີຊຳລະ:</strong> {{ selectedPayment.payment_method }}</p>
                  <p v-if="selectedPayment.details"><strong>ລາຍລະອຽດ:</strong> {{ selectedPayment.details }}</p>
                  <p><strong>ສະຖານະ:</strong> <span :class="['badge', getPaymentStatusBadgeClass(selectedPayment.payment_status)]">{{ getPaymentStatusText(selectedPayment.payment_status) }}</span></p>
                  <p><strong>ຈຳນວນເງິນ:</strong> <span class="h5 fw-bold text-primary">{{ formatPrice(selectedPayment.amount) }} LAK</span></p>
                </div>
                <div class="col-md-6">
                  <h6 class="fw-bold">ຂໍ້ມູນລົດ</h6>
                  <img :src="selectedPayment.car.image_url" :alt="selectedPayment.car.make + ' ' + selectedPayment.car.model" class="img-fluid rounded mb-3" style="max-height: 150px; width: 100%; object-fit: cover;">
                  <p><strong>ລົດ:</strong> {{ selectedPayment.car.make }} {{ selectedPayment.car.model }}</p>
                  <p><strong>ປ້າຍທະບຽນ:</strong> {{ selectedPayment.car.license_plate }}</p>
                  <p><strong>ປະເພດ:</strong> {{ getCarTypeName(selectedPayment.car.car_type_id) }}</p>
                </div>
              </div>
              <div v-if="selectedPayment.payment_proof_url" class="mt-4">
                <h6 class="fw-bold">ຫຼັກຖານການຊຳລະ:</h6>
                <img :src="selectedPayment.payment_proof_url" alt="Payment Proof" class="img-fluid rounded" style="max-height: 300px;">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary rounded-pill px-4" @click="closeModal">ປິດ</button>
              <button type="button" class="btn btn-primary rounded-pill px-4" @click="printInvoice">ພິມໃບແຈ້ງໜີ້</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentHistory',
  data() {
    return {
      isModalVisible: false,
      selectedPayment: null,
      carTypes: [
        { id: 1, name: 'ລົດເກ໋ງ' },
        { id: 2, name: 'ລົດກະບະ' },
        { id: 3, name: 'ລົດຕູ້' },
        { id: 4, name: 'ລົດຫຼູຫຼາ' },
        { id: 5, name: 'ລົດ SUV' },
        { id: 6, name: 'ລົດກະບະ 4x4' },
      ],
      allPayments: [
        {
          id: 1,
          booking_id: 1,
          customer_id: 1,
          amount: 2500000,
          payment_date: '2025-07-18',
          payment_method: 'Bank Transfer',
          payment_status: 'Paid',
          details: 'ໂອນຜ່ານ BCEL One', 
          payment_proof_url: 'https://via.placeholder.com/300x200/007bff/FFFFFF?text=Payment+Proof+1',
          car: {
            id: 1,
            car_type_id: 1,
            make: 'Toyota',
            model: 'Camry',
            license_plate: 'ກກ 1234',
            image_url: 'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Sedan',
          },
          booking_date: '2025-07-15',
        },
        {
          id: 2,
          booking_id: 2,
          customer_id: 1,
          amount: 1400000,
          payment_date: '2025-07-17',
          payment_method: 'Credit Card',
          payment_status: 'Failed',
          details: 'ບັດຖືກປະຕິເສດ', 
          payment_proof_url: 'https://via.placeholder.com/300x200/dc3545/FFFFFF?text=Payment+Proof+2',
          car: {
            id: 2,
            car_type_id: 5,
            make: 'Honda',
            model: 'CR-V',
            license_plate: 'ຂຂ 5678',
            image_url: 'https://via.placeholder.com/600x400/33FF57/FFFFFF?text=SUV',
          },
          booking_date: '2025-07-10',
        },
        {
          id: 3,
          booking_id: 3,
          customer_id: 1,
          amount: 900000,
          payment_date: '2025-06-10',
          payment_method: 'Cash',
          payment_status: 'Paid',
          details: 'ຊຳລະດ້ວຍເງິນສົດທີ່ຮ້ານ', 
          payment_proof_url: 'https://via.placeholder.com/300x200/28a745/FFFFFF?text=Payment+Proof+3',
          car: {
            id: 7,
            car_type_id: 1,
            make: 'Honda',
            model: 'Civic',
            license_plate: 'ຊຊ 3344',
            image_url: 'https://via.placeholder.com/600x400/4CAF50/FFFFFF?text=Civic',
          },
          booking_date: '2025-06-08',
        },
      ],
      filters: {
        payment_status: '',
      },
      sortBy: 'payment_date_desc', // Default sort
      currentPage: 1,
      itemsPerPage: 5, // Number of payments to display per page
    };
  },
  computed: {
    filteredAndSortedPayments() {
      let payments = [...this.allPayments];

      // Apply filters
      if (this.filters.payment_status) {
        payments = payments.filter(payment => payment.payment_status === this.filters.payment_status);
      }

      // Apply sorting
      payments.sort((a, b) => {
        if (this.sortBy === 'payment_date_asc') {
          return new Date(a.payment_date) - new Date(b.payment_date);
        } else if (this.sortBy === 'payment_date_desc') {
          return new Date(b.payment_date) - new Date(a.payment_date);
        } else if (this.sortBy === 'amount_asc') {
          return a.amount - b.amount;
        } else if (this.sortBy === 'amount_desc') {
          return b.amount - a.amount;
        }
        return 0;
      });

      return payments;
    },
    paginatedPayments() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredAndSortedPayments.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredAndSortedPayments.length / this.itemsPerPage);
    },
  },
  methods: {
    showDetails(payment) {
      this.selectedPayment = payment;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedPayment = null;
    },
    applyFilters() {
      this.currentPage = 1; // Reset to first page on filter change
    },
    clearFilters() {
      this.filters = {
        payment_status: '',
      };
      this.sortBy = 'payment_date_desc';
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
    printInvoice() {
      const printableContent = this.$el.querySelector('.modal-body').innerHTML;
      const printWindow = window.open('', '_blank');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
        <head>
          <title>ໃບແຈ້ງໜີ້ການຊຳລະ</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css">
          <style>
            body { font-family: 'Phetsarath OT', sans-serif; }
            .fw-bold { font-weight: bold; }
            .text-primary { color: #007bff; }
            .badge { padding: 0.5em 0.75em; font-size: 0.875em; font-weight: 600; border-radius: 0.25rem; }
            .bg-warning { background-color: #ffc107 !important; }
            .text-dark { color: #212529 !important; }
            .bg-success { background-color: #28a745 !important; }
            .bg-danger { background-color: #dc3545 !important; }
            .bg-secondary { background-color: #6c757d !important; }
            img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <div class="container mt-5">
            ${printableContent}
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    },
  },
};
</script>

<style scoped>
.rounded-pill {
  border-radius: 50rem !important;
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

.object-fit-cover {
  object-fit: cover;
}

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
