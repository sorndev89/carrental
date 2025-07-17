<template>
  <div class="bg-light min-vh-100 py-5">
    <div class="container px-4">
      <h1 class="h2 fw-bold text-center mb-5 text-dark">
        ລົດທັງໝົດທີ່ມີໃຫ້ເຊົ່າ
      </h1>

      <!-- Filter and Sort Section -->
      <div class="card shadow-lg p-4 mb-5 rounded-lg">
        <h3 class="h5 fw-bold mb-3 text-dark">ຕົວກອງ ແລະ ຈັດລຽງ</h3>
        <form @submit.prevent="applyFilters">
          <div class="row g-3 align-items-end">
            <div class="col-12 col-md-4">
              <label for="filterCarType" class="form-label fw-semibold">ປະເພດລົດ</label>
              <select id="filterCarType" class="form-select rounded-pill py-2 px-3" v-model="filters.car_type_id">
                <option value="">ທັງໝົດ</option>
                <option v-for="type in carTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <label for="filterMake" class="form-label fw-semibold">ຍີ່ຫໍ້</label>
              <input type="text" id="filterMake" class="form-control rounded-pill py-2 px-3" v-model="filters.make" placeholder="ຕົວຢ່າງ: Toyota" />
            </div>
            <div class="col-12 col-md-4">
              <label for="searchQuery" class="form-label fw-semibold">ຄົ້ນຫາ (ລຸ້ນ/ປ້າຍທະບຽນ)</label>
              <input type="text" id="searchQuery" class="form-control rounded-pill py-2 px-3" v-model="filters.searchQuery" placeholder="ຕົວຢ່າງ: Camry, ກກ 1234" />
            </div>
            <div class="col-12 col-md-4">
              <label for="sortBy" class="form-label fw-semibold">ຈັດລຽງຕາມ</label>
              <select id="sortBy" class="form-select rounded-pill py-2 px-3" v-model="sortBy">
                <option value="daily_rate_asc">ລາຄາ: ຕ່ຳສຸດຫາສູງສຸດ</option>
                <option value="daily_rate_desc">ລາຄາ: ສູງສຸດຫາຕ່ຳສຸດ</option>
                <option value="make_asc">ຍີ່ຫໍ້: A-Z</option>
                <option value="make_desc">ຍີ່ຫໍ້: Z-A</option>
              </select>
            </div>
            <div class="col-12 col-md-8 d-flex justify-content-end">
              <button type="submit" class="btn btn-primary rounded-pill px-4 me-2">ນຳໃຊ້ຕົວກອງ</button>
              <button type="button" class="btn btn-outline-secondary rounded-pill px-4" @click="clearFilters">ລ້າງຕົວກອງ</button>
            </div>
          </div>
        </form>
      </div>

      <!-- Car Listing Grid -->
      <div class="row g-4">
        <div v-if="paginatedCars.length === 0" class="col-12 text-center">
          <p class="lead text-secondary">ບໍ່ພົບລົດທີ່ກົງກັບການຄົ້ນຫາຂອງທ່ານ.</p>
        </div>
        <div v-for="car in paginatedCars" :key="car.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
          <div class="card rounded-lg shadow-lg overflow-hidden h-100 d-flex flex-column transform transition duration-300 hover:scale-105">
            <img
              :src="car.image_url"
              :alt="car.make + ' ' + car.model"
              class="w-100 object-fit-cover" style="height: 180px;"
            />
            <div class="card-body p-3 d-flex flex-column flex-grow-1">
              <h3 class="h6 fw-semibold text-dark mb-1">{{ car.make }} {{ car.model }}</h3>
              <p class="text-muted small mb-2">ປະເພດ: {{ getCarTypeName(car.car_type_id) }}</p>
              <p class="text-secondary mb-2 flex-grow-1">ປ້າຍທະບຽນ: {{ car.license_plate }}</p>
              <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                <span class="h5 fw-bold text-primary">{{ formatPrice(car.daily_rate) }} LAK/ມື້</span>
                <router-link
                  :to="`/car/${car.id}`"
                  class="btn btn-primary btn-sm rounded-pill transition duration-300"
                >
                  ເບິ່ງລາຍລະອຽດ
                </router-link>
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
  name: 'BrowseCars',
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
      allCars: [
        {
          id: 1,
          car_type_id: 1,
          make: 'Toyota',
          model: 'Camry',
          license_plate: 'ກກ 1234',
          daily_rate: 500000,
          image_url: 'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Sedan',
          status: 'available',
        },
        {
          id: 2,
          car_type_id: 5,
          make: 'Honda',
          model: 'CR-V',
          license_plate: 'ຂຂ 5678',
          daily_rate: 700000,
          image_url: 'https://via.placeholder.com/600x400/33FF57/FFFFFF?text=SUV',
          status: 'available',
        },
        {
          id: 3,
          car_type_id: 4,
          make: 'Mercedes-Benz',
          model: 'C-Class',
          license_plate: 'ຄຄ 9012',
          daily_rate: 1200000,
          image_url: 'https://via.placeholder.com/600x400/3357FF/FFFFFF?text=Luxury',
          status: 'available',
        },
        {
          id: 4,
          car_type_id: 2,
          make: 'Ford',
          model: 'Ranger',
          license_plate: 'ງງ 3456',
          daily_rate: 600000,
          image_url: 'https://via.placeholder.com/600x400/8A2BE2/FFFFFF?text=Pickup',
          status: 'available',
        },
        {
          id: 5,
          car_type_id: 3,
          make: 'Hyundai',
          model: 'H1',
          license_plate: 'ຈຈ 7890',
          daily_rate: 900000,
          image_url: 'https://via.placeholder.com/600x400/DAA520/FFFFFF?text=Van',
          status: 'available',
        },
        {
          id: 6,
          car_type_id: 5,
          make: 'BMW',
          model: 'X5',
          license_plate: 'ສສ 1122',
          daily_rate: 1500000,
          image_url: 'https://via.placeholder.com/600x400/DC143C/FFFFFF?text=Premium+SUV',
          status: 'available',
        },
        {
          id: 7,
          car_type_id: 1,
          make: 'Honda',
          model: 'Civic',
          license_plate: 'ຊຊ 3344',
          daily_rate: 450000,
          image_url: 'https://via.placeholder.com/600x400/4CAF50/FFFFFF?text=Civic',
          status: 'available',
        },
        {
          id: 8,
          car_type_id: 2,
          make: 'Chevrolet',
          model: 'Colorado',
          license_plate: 'ຍຍ 5566',
          daily_rate: 650000,
          image_url: 'https://via.placeholder.com/600x400/FF9800/FFFFFF?text=Colorado',
          status: 'rented',
        },
        {
          id: 9,
          car_type_id: 3,
          make: 'Kia',
          model: 'Carnival',
          license_plate: 'ດດ 7788',
          daily_rate: 1000000,
          image_url: 'https://via.placeholder.com/600x400/9C27B0/FFFFFF?text=Carnival',
          status: 'available',
        },
        {
          id: 10,
          car_type_id: 4,
          make: 'Audi',
          model: 'A6',
          license_plate: 'ຕຕ 9900',
          daily_rate: 1300000,
          image_url: 'https://via.placeholder.com/600x400/2196F3/FFFFFF?text=Audi',
          status: 'maintenance',
        },
      ],
      filters: {
        car_type_id: '',
        make: '',
        searchQuery: '',
      },
      sortBy: 'daily_rate_asc', // Default sort
      currentPage: 1,
      itemsPerPage: 8, // Number of cars to display per page
    };
  },
  computed: {
    filteredAndSortedCars() {
      let cars = [...this.allCars];

      // Apply filters
      if (this.filters.car_type_id) {
        cars = cars.filter(car => car.car_type_id == this.filters.car_type_id);
      }
      if (this.filters.make) {
        const makeQuery = this.filters.make.toLowerCase();
        cars = cars.filter(car => car.make.toLowerCase().includes(makeQuery));
      }
      if (this.filters.searchQuery) {
        const searchQuery = this.filters.searchQuery.toLowerCase();
        cars = cars.filter(car => 
          car.model.toLowerCase().includes(searchQuery) ||
          car.license_plate.toLowerCase().includes(searchQuery)
        );
      }

      // Apply sorting
      cars.sort((a, b) => {
        if (this.sortBy === 'daily_rate_asc') {
          return a.daily_rate - b.daily_rate;
        } else if (this.sortBy === 'daily_rate_desc') {
          return b.daily_rate - a.daily_rate;
        } else if (this.sortBy === 'make_asc') {
          return a.make.localeCompare(b.make);
        } else if (this.sortBy === 'make_desc') {
          return b.make.localeCompare(a.make);
        }
        return 0;
      });

      return cars;
    },
    paginatedCars() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredAndSortedCars.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredAndSortedCars.length / this.itemsPerPage);
    },
  },
  methods: {
    applyFilters() {
      this.currentPage = 1; // Reset to first page on filter change
    },
    clearFilters() {
      this.filters = {
        car_type_id: '',
        make: '',
        searchQuery: '',
      };
      this.sortBy = 'daily_rate_asc';
      this.currentPage = 1;
    },
    getCarTypeName(carTypeId) {
      const carType = this.carTypes.find(type => type.id === carTypeId);
      return carType ? carType.name : 'ບໍ່ລະບຸ';
    },
    formatPrice(price) {
      return price.toLocaleString(); // Formats number with local thousands separator
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
</style>
