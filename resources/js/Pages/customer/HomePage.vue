<template>
  <div class="bg-light min-vh-100">
    <!-- Hero Section (Banner) -->
    <section
      class="position-relative bg-cover bg-center d-flex align-items-center justify-content-center text-white"
      style="height: 96vh; background-image: url('https://via.placeholder.com/1920x1080/333333/FFFFFF?text=Car+Rental+Hero+Image');"
    >
      <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
      <div class="position-relative z-10 text-center px-4">
        <h1 class="display-4 display-md-1 fw-bold lh-tight mb-4 animate-fade-in-up">
          ສຳຫຼວດໂລກດ້ວຍລົດເຊົ່າທີ່ສົມບູນແບບຂອງທ່ານ
        </h1>
        <p class="lead mb-4 animate-fade-in-up animation-delay-200">
          ເລືອກຈາກລົດຫຼາກຫຼາຍຊະນິດເພື່ອການເດີນທາງທີ່ໜ້າຈົດຈຳ.
        </p>
        <a
          href="#car-search"
          class="btn btn-primary btn-lg rounded-pill transition duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up animation-delay-400"
        >
          ຊອກຫາລົດ
        </a>
      </div>
    </section>

    <!-- Car Search Section -->
    <section id="car-search" class="py-5 bg-white">
      <div class="container px-4">
        <h2 class="h3 h2-md fw-bold text-center mb-5 text-dark">
          ຄົ້ນຫາລົດເຊົ່າ
        </h2>
        <div class="card shadow-lg p-4 p-md-5 rounded-lg">
          <form @submit.prevent="searchCars">
            <div class="row g-3">
              <div class="col-12 col-md-4">
                <label for="carType" class="form-label fw-semibold">ປະເພດລົດ</label>
                <select id="carType" class="form-select rounded-pill py-2 px-3">
                  <option value="">ທັງໝົດ</option>
                  <option v-for="type in carTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
                </select>
              </div>
              <div class="col-12 col-md-4">
                <label for="pickupDate" class="form-label fw-semibold">ວັນທີຮັບລົດ</label>
                <input type="date" id="pickupDate" class="form-control rounded-pill py-2 px-3" />
              </div>
              <div class="col-12 col-md-4">
                <label for="returnDate" class="form-label fw-semibold">ວັນທີສົ່ງລົດຄືນ</label>
                <input type="date" id="returnDate" class="form-control rounded-pill py-2 px-3" />
              </div>
              <div class="col-12 text-center mt-4">
                <button type="submit" class="btn btn-primary btn-lg rounded-pill px-5 transition duration-300 ease-in-out transform hover:scale-105">
                  ຄົ້ນຫາ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- Promotion Slideshow Section -->
    <section class="py-5 bg-light">
      <div class="container px-4">
        <h2 class="h3 h2-md fw-bold text-center mb-5 text-dark">
          ໂປຼໂມຊັ່ນພິເສດ
        </h2>
        <div id="promotionCarousel" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner rounded-lg shadow-lg">
            <div class="carousel-item active">
              <div class="row g-3">
                <div class="col-12 col-md-4">
                  <img src="https://via.placeholder.com/400x250/007bff/FFFFFF?text=Promo+1" class="d-block w-100 object-fit-cover rounded" alt="Promotion 1" style="height: 250px;">
                </div>
                <div class="col-12 col-md-4">
                  <img src="https://via.placeholder.com/400x250/28a745/FFFFFF?text=Promo+2" class="d-block w-100 object-fit-cover rounded" alt="Promotion 2" style="height: 250px;">
                </div>
                <div class="col-12 col-md-4">
                  <img src="https://via.placeholder.com/400x250/ffc107/FFFFFF?text=Promo+3" class="d-block w-100 object-fit-cover rounded" alt="Promotion 3" style="height: 250px;">
                </div>
              </div>
            </div>
            <div class="carousel-item">
              <div class="row g-3">
                <div class="col-12 col-md-4">
                  <img src="https://via.placeholder.com/400x250/dc3545/FFFFFF?text=Promo+4" class="d-block w-100 object-fit-cover rounded" alt="Promotion 4" style="height: 250px;">
                </div>
                <div class="col-12 col-md-4">
                  <img src="https://via.placeholder.com/400x250/6f42c1/FFFFFF?text=Promo+5" class="d-block w-100 object-fit-cover rounded" alt="Promotion 5" style="height: 250px;">
                </div>
                <div class="col-12 col-md-4">
                  <img src="https://via.placeholder.com/400x250/20c997/FFFFFF?text=Promo+6" class="d-block w-100 object-fit-cover rounded" alt="Promotion 6" style="height: 250px;">
                </div>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#promotionCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#promotionCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Cars Section -->
    <section class="py-5 bg-white">
      <div class="container px-4">
        <h2 class="h3 h2-md fw-bold text-center mb-5 text-dark">
          ລົດຍອດນິຍົມ
        </h2>
        <div class="row g-4">
          <div v-for="car in featuredCars" :key="car.id" class="col-12 col-md-6 col-lg-4">
            <div class="card rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                :src="car.image_url"
                :alt="car.make + ' ' + car.model"
                class="w-100 h-48 object-fit-cover"
              />
              <div class="card-body p-4">
                <h3 class="h5 fw-semibold text-dark mb-2">{{ car.make }} {{ car.model }}</h3>
                <p class="text-secondary mb-4">{{ car.description }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="h4 fw-bold text-primary">{{ car.daily_rate }} LAK/ມື້</span>
                  <router-link
                    to="/book-car"
                    class="btn btn-primary btn-sm rounded-pill transition duration-300"
                  >
                    ຈອງດຽວນີ້
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-5 bg-light">
      <div class="container px-4 text-center">
        <h2 class="h3 h2-md fw-bold text-dark mb-5">
          ເປັນຫຍັງຕ້ອງເລືອກພວກເຮົາ?
        </h2>
        <div class="row g-4">
          <div class="col-12 col-md-4">
            <div class="card p-4 rounded-lg shadow-md">
              <div class="text-primary fs-1 mb-3">🚗</div>
              <h3 class="h5 fw-semibold text-dark mb-2">ລົດຫຼາກຫຼາຍຊະນິດ</h3>
              <p class="text-secondary">ເລືອກຈາກລົດເກັງ, SUV, ລົດຫຼູຫຼາ, ແລະອື່ນໆອີກ.</p>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="card p-4 rounded-lg shadow-md">
              <div class="text-primary fs-1 mb-3">💰</div>
              <h3 class="h5 fw-semibold text-dark mb-2">ລາຄາທີ່ດີທີ່ສຸດ</h3>
              <p class="text-secondary">ຮັບປະກັນລາຄາທີ່ແຂ່ງຂັນ ແລະ ໂປຣໂມຊັນພິເສດ.</p>
            </div>
          </div>
          <div class="col-12 col-md-4">
            <div class="card p-4 rounded-lg shadow-md">
              <div class="text-primary fs-1 mb-3">📞</div>
              <h3 class="h5 fw-semibold text-dark mb-2">ການຊ່ວຍເຫຼືອ 24/7</h3>
              <p class="text-secondary">ທີມງານຂອງພວກເຮົາພ້ອມໃຫ້ບໍລິການຕະຫຼອດ 24 ຊົ່ວໂມງ.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section class="py-5 bg-white">
      <div class="container px-4">
        <h2 class="h3 h2-md fw-bold text-center mb-5 text-dark">
          ກ່ຽວກັບພວກເຮົາ
        </h2>
        <div class="row align-items-center">
          <div class="col-12 col-md-6 mb-4 mb-md-0">
            <img src="https://via.placeholder.com/600x400/6c757d/FFFFFF?text=About+Us" alt="About Us" class="img-fluid rounded-lg shadow-md" />
          </div>
          <div class="col-12 col-md-6">
            <p class="lead text-secondary mb-4">
              ພວກເຮົາແມ່ນບໍລິສັດໃຫ້ເຊົ່າລົດຊັ້ນນຳທີ່ມຸ່ງໝັ້ນທີ່ຈະໃຫ້ບໍລິການທີ່ດີທີ່ສຸດແກ່ລູກຄ້າ.
              ດ້ວຍລົດຫຼາກຫຼາຍຊະນິດ ແລະ ການບໍລິການທີ່ເປັນມິດ, ພວກເຮົາຮັບປະກັນວ່າການເດີນທາງຂອງທ່ານຈະສະດວກສະບາຍ ແລະ ປອດໄພ.
            </p>
            <p class="text-secondary">
              ບໍ່ວ່າທ່ານຈະເດີນທາງເພື່ອທຸລະກິດ ຫຼື ການພັກຜ່ອນ, ພວກເຮົາກໍມີລົດທີ່ເໝາະສົມກັບຄວາມຕ້ອງການຂອງທ່ານ.
              ທີມງານຂອງພວກເຮົາພ້ອມທີ່ຈະຊ່ວຍເຫຼືອທ່ານຕະຫຼອດ 24 ຊົ່ວໂມງ.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-5 bg-primary text-white text-center">
      <div class="container px-4">
        <h2 class="h3 h2-md fw-bold mb-4">
          ພ້ອມທີ່ຈະເລີ່ມຕົ້ນການຜະຈົນໄພຂອງທ່ານແລ້ວບໍ?
        </h2>
        <router-link
          to="/browse-cars"
          class="btn btn-light text-primary hover:bg-gray-100 fw-bold py-3 px-8 rounded-pill transition duration-300 ease-in-out transform hover:scale-105"
        >
          ຊອກຫາລົດຂອງທ່ານດຽວນີ້
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      carTypes: [
        { id: 1, name: 'ລົດເກ໋ງ' },
        { id: 2, name: 'ລົດກະບະ' },
        { id: 3, name: 'ລົດຕູ້' },
        { id: 4, name: 'ລົດຫຼູຫຼາ' },
      ],
      featuredCars: [
        {
          id: 1,
          make: 'Toyota',
          model: 'Camry',
          description: 'ລົດເກັງທີ່ສະດວກສະບາຍ ແລະ ປະຢັດນ້ຳມັນ.',
          daily_rate: '500,000',
          image_url: 'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Sedan',
        },
        {
          id: 2,
          make: 'Honda',
          model: 'CR-V',
          description: 'ເໝາະສຳລັບການເດີນທາງແບບຄອບຄົວ ແລະ ການຜະຈົນໄພ.',
          daily_rate: '700,000',
          image_url: 'https://via.placeholder.com/600x400/33FF57/FFFFFF?text=SUV',
        },
        {
          id: 3,
          make: 'Mercedes-Benz',
          model: 'C-Class',
          description: 'ປະສົບການການຂັບຂີ່ທີ່ຫຼູຫຼາ ແລະ ມີສະໄຕລ໌.',
          daily_rate: '1,200,000',
          image_url: 'https://via.placeholder.com/600x400/3357FF/FFFFFF?text=Luxury',
        },
        {
          id: 4,
          make: 'Ford',
          model: 'Ranger',
          description: 'ລົດກະບະທີ່ແຂງແຮງສຳລັບທຸກສະພາບເສັ້ນທາງ.',
          daily_rate: '600,000',
          image_url: 'https://via.placeholder.com/600x400/8A2BE2/FFFFFF?text=Pickup',
        },
        {
          id: 5,
          make: 'Hyundai',
          model: 'H1',
          description: 'ລົດຕູ້ຂະໜາດໃຫຍ່ ເໝາະສຳລັບການເດີນທາງເປັນກຸ່ມ.',
          daily_rate: '900,000',
          image_url: 'https://via.placeholder.com/600x400/DAA520/FFFFFF?text=Van',
        },
        {
          id: 6,
          make: 'BMW',
          model: 'X5',
          description: 'ລົດ SUV ລະດັບພຣີມ້ຽມ ພ້ອມຄວາມສະດວກສະບາຍສູງສຸດ.',
          daily_rate: '1,500,000',
          image_url: 'https://via.placeholder.com/600x400/DC143C/FFFFFF?text=Premium+SUV',
        },
      ],
    };
  },
  methods: {
    searchCars() {
      // Implement car search logic here
      console.log('Searching for cars...');
      // You would typically get the values from the form fields
      // const carType = document.getElementById('carType').value;
      // const pickupDate = document.getElementById('pickupDate').value;
      // const returnDate = document.getElementById('returnDate').value;
      // Then make an API call to filter cars
    },
  },
};
</script>

<style scoped>
/* Custom animations for a modern feel */
@keyframes fadeInFromBottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInFromBottom 0.8s ease-out forwards;
  opacity: 0; /* Start hidden */
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

/* General styling for sections */
section {
  padding: 60px 0;
}

/* Card styling */
.card {
  border: none;
}

/* Responsive image height for car cards */
.h-48 {
  height: 12rem; /* 192px */
}

@media (min-width: 768px) {
  .h-md-64 {
    height: 16rem; /* 256px */
  }
}

@media (min-width: 992px) {
  .h-lg-80 {
    height: 20rem; /* 320px */
  }
}

/* Bootstrap overrides for rounded pills */
.rounded-pill {
  border-radius: 50rem !important;
}

/* Transitions for hover effects */
.transition {
  transition: all 0.3s ease-in-out;
}

.transform {
  transform: scale(1);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Text colors */
.text-primary {
  color: #007bff !important;
}

.text-secondary {
  color: #6c757d !important;
}

.text-dark {
  color: #343a40 !important;
}

/* Background colors */
.bg-light {
  background-color: #f8f9fa !important;
}

.bg-white {
  background-color: #ffffff !important;
}

.bg-primary {
  background-color: #007bff !important;
}

.bg-dark {
  background-color: #343a40 !important;
}

/* Font sizes for headings */
.h2-md {
  font-size: 2.5rem;
}

@media (min-width: 768px) {
  .h2-md {
    font-size: 3rem;
  }
}
</style>
