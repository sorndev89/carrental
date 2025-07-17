<template>
  <div class="bg-light min-vh-100 py-5">
    <div class="container px-4">
      <div v-if="car" class="card shadow-lg rounded-lg p-4 p-md-5">
        <div class="row g-4">
          <div class="col-12 col-lg-6">
            <img
              :src="car.image_url"
              :alt="car.make + ' ' + car.model"
              class="img-fluid rounded-lg object-fit-cover w-100" style="height: 400px;"
            />
          </div>
          <div class="col-12 col-lg-6">
            <h1 class="h2 fw-bold text-dark mb-2">{{ car.make }} {{ car.model }}</h1>
            <p class="lead text-muted mb-3">ປ້າຍທະບຽນ: {{ car.license_plate }}</p>

            <div class="d-flex align-items-center mb-3">
              <span class="h3 fw-bold text-primary me-3">{{ formatPrice(car.daily_rate) }} LAK/ມື້</span>
              <span :class="['badge', getStatusBadgeClass(car.status)]">{{ getStatusText(car.status) }}</span>
            </div>

            <p class="text-secondary mb-4">
              <span class="fw-semibold">ປະເພດລົດ:</span> {{ getCarTypeName(car.car_type_id) }}
            </p>
            <p class="text-secondary mb-4">
              <span class="fw-semibold">ລາຍລະອຽດ:</span> {{ car.description || 'ບໍ່ມີລາຍລະອຽດເພີ່ມເຕີມ.' }}
            </p>

            <hr class="my-4" />

            <h2 class="h4 fw-bold text-dark mb-3">ຈອງລົດຄັນນີ້</h2>
            <form @submit.prevent="bookCar">
              <div class="row g-3 mb-4">
                <div class="col-12 col-md-6">
                  <label for="pickupDate" class="form-label fw-semibold">ວັນທີຮັບລົດ</label>
                  <input type="date" id="pickupDate" class="form-control rounded-pill py-2 px-3" v-model="booking.pickup_date" required />
                </div>
                <div class="col-12 col-md-6">
                  <label for="returnDate" class="form-label fw-semibold">ວັນທີສົ່ງລົດຄືນ</label>
                  <input type="date" id="returnDate" class="form-control rounded-pill py-2 px-3" v-model="booking.return_date" required />
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-lg rounded-pill w-100">
                ຢືນຢັນການຈອງ
              </button>
            </form>
          </div>
        </div>
      </div>
      <div v-else class="alert alert-warning text-center" role="alert">
        ບໍ່ພົບຂໍ້ມູນລົດ.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarDetails',
  props: {
    carId: { // This prop would typically come from the router parameter
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      car: null, // This will hold the car details fetched from an API or dummy data
      carTypes: [
        { id: 1, name: 'ລົດເກ໋ງ' },
        { id: 2, name: 'ລົດກະບະ' },
        { id: 3, name: 'ລົດຕູ້' },
        { id: 4, name: 'ລົດຫຼູຫຼາ' },
        { id: 5, name: 'ລົດ SUV' },
        { id: 6, name: 'ລົດກະບະ 4x4' },
      ],
      dummyCars: [
        {
          id: 1,
          car_type_id: 1,
          make: 'Toyota',
          model: 'Camry',
          license_plate: 'ກກ 1234',
          daily_rate: 500000,
          image_url: 'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Sedan',
          status: 'available',
          description: 'ລົດເກັງທີ່ສະດວກສະບາຍ ແລະ ປະຢັດນ້ຳມັນ, ເໝາະສຳລັບການເດີນທາງໃນເມືອງ ແລະ ທາງໄກ.',
        },
        {
          id: 2,
          car_type_id: 5,
          make: 'Honda',
          model: 'CR-V',
          license_plate: 'ຂຂ 5678',
          daily_rate: 700000,
          image_url: 'https://via.placeholder.com/600x400/33FF57/FFFFFF?text=SUV',
          status: 'rented',
          description: 'ລົດ SUV ຂະໜາດກາງ, ເໝາະສຳລັບການເດີນທາງແບບຄອບຄົວ ແລະ ການຜະຈົນໄພ, ມີພື້ນທີ່ກວ້າງຂວາງ.',
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
          description: 'ປະສົບການການຂັບຂີ່ທີ່ຫຼູຫຼາ ແລະ ມີສະໄຕລ໌, ພ້ອມເຕັກໂນໂລຢີທີ່ທັນສະໄໝ.',
        },
        {
          id: 4,
          car_type_id: 2,
          make: 'Ford',
          model: 'Ranger',
          license_plate: 'ງງ 3456',
          daily_rate: 600000,
          image_url: 'https://via.placeholder.com/600x400/8A2BE2/FFFFFF?text=Pickup',
          status: 'maintenance',
          description: 'ລົດກະບະທີ່ແຂງແຮງສຳລັບທຸກສະພາບເສັ້ນທາງ, ເໝາະສຳລັບການບັນທຸກ ແລະ ການເດີນທາງທີ່ຫຍຸ້ງຍາກ.',
        },
      ],
      booking: {
        pickup_date: '',
        return_date: '',
      },
    };
  },
  created() {
    // In a real application, you would fetch car data from an API
    // based on this.carId (e.g., axios.get(`/api/cars/${this.carId}`))
    this.car = this.dummyCars.find(car => car.id == this.carId);
  },
  methods: {
    getCarTypeName(carTypeId) {
      const carType = this.carTypes.find(type => type.id === carTypeId);
      return carType ? carType.name : 'ບໍ່ລະບຸ';
    },
    formatPrice(price) {
      return price.toLocaleString(); // Formats number with local thousands separator
    },
    getStatusBadgeClass(status) {
      switch (status) {
        case 'available':
          return 'bg-success';
        case 'rented':
          return 'bg-warning text-dark';
        case 'maintenance':
          return 'bg-danger';
        default:
          return 'bg-secondary';
      }
    },
    getStatusText(status) {
      switch (status) {
        case 'available':
          return 'ວ່າງ';
        case 'rented':
          return 'ຖືກເຊົ່າ';
        case 'maintenance':
          return 'ຢູ່ໃນການບຳລຸງຮັກສາ';
        default:
          return status;
      }
    },
    bookCar() {
      // Implement booking logic here
      console.log('Booking car:', this.car.id, this.booking.pickup_date, this.booking.return_date);
      alert(`ທ່ານໄດ້ຈອງລົດ ${this.car.make} ${this.car.model} ສຳລັບວັນທີ ${this.booking.pickup_date} ຫາ ${this.booking.return_date} ສຳເລັດແລ້ວ!`);
      // In a real application, you would send this data to your backend API
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
