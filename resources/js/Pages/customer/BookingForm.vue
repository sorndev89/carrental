<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h4 class="fw-bold">ແບບຟອມການຈອງລົດ</h4>
                        <p>ກະລຸນາຕື່ມຂໍ້ມູນໃຫ້ຄົບຖ້ວນ</p>
                    </div>
                    <div class="card-body">
                        <!-- Car Details (Assuming car data is passed as a prop) -->
                        <div v-if="car" class="mb-4">
                            <h5>ຂໍ້ມູນລົດ</h5>
                            <p><strong>ລົດ:</strong> {{ car.make }} {{ car.model }}</p>
                            <p><strong>ປີ:</strong> {{ car.year }}</p>
                            <p><strong>ລາຄາ/ມື້:</strong> {{ formatCurrency(car.price_per_day) }}</p>
                        </div>

                        <form @submit.prevent="submitBooking">
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="pickup_date" class="form-label">ວັນທີຮັບລົດ</label>
                                    <input type="date" id="pickup_date" v-model="booking.pickup_date" class="form-control" required :min="today">
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="return_date" class="form-label">ວັນທີສົ່ງຄືນ</label>
                                    <input type="date" id="return_date" v-model="booking.return_date" class="form-control" required :min="booking.pickup_date">
                                </div>
                            </div>

                            <div v-if="totalPrice > 0" class="mt-3">
                                <h5><strong>ລາຄາລວມທັງໝົດ:</strong> {{ formatCurrency(totalPrice) }}</h5>
                                <p class="text-muted">({{ numberOfDays }} ມື້)</p>
                            </div>

                            <div class="mt-4">
                                <button type="submit" class="btn btn-primary w-100" :disabled="isSubmitting">
                                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ຢືນຢັນການຈອງ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../../Stores/Auth';
import { useRouter } from 'vue-router';

export default {
    props: {
        // In a real app, you would pass the selected car's data as a prop
        // For now, we'll use a dummy car object
        car: {
            type: Object,
            default: () => ({
                id: 1, // Dummy data
                make: 'Toyota',
                model: 'Vios',
                year: 2023,
                price_per_day: 250000
            })
        }
    },
    data() {
        return {
            booking: {
                pickup_date: '',
                return_date: '',
                car_id: this.car ? this.car.id : null,
                total_price: 0,
            },
            isSubmitting: false,
            today: new Date().toISOString().split('T')[0],
            router: useRouter(),
        };
    },
    computed: {
        numberOfDays() {
            if (this.booking.pickup_date && this.booking.return_date) {
                const pickup = new Date(this.booking.pickup_date);
                const ret = new Date(this.booking.return_date);
                if (ret >= pickup) {
                    const diffTime = Math.abs(ret - pickup);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    return diffDays + 1; // Inclusive of the pickup day
                }
            }
            return 0;
        },
        totalPrice() {
            const price = this.numberOfDays * (this.car ? this.car.price_per_day : 0);
            this.booking.total_price = price;
            return price;
        }
    },
    methods: {
        formatCurrency(value) {
            return parseFloat(value).toLocaleString('lo-LA', { style: 'currency', currency: 'LAK' });
        },
        async submitBooking() {
            if (!this.booking.pickup_date || !this.booking.return_date) {
                this.$swal('ຂໍ້ມູນບໍ່ຄົບຖ້ວນ', 'ກະລຸນາເລືອກວັນທີຮັບ ແລະ ສົ່ງຄືນ', 'warning');
                return;
            }

            this.isSubmitting = true;
            const authStore = useAuthStore();

            if (!authStore.isAuthenticated) {
                this.$swal({
                    icon: 'error',
                    title: 'ທ່ານຕ້ອງເຂົ້າສູ່ລະບົບກ່ອນ',
                    text: 'ກະລຸນາເຂົ້າສູ່ລະບົບເພື່ອດຳເນີນການຈອງ.',
                });
                this.router.push({ name: 'auth.login' });
                return;
            }

            try {
                const response = await axios.post('/api/customer/bookings', this.booking, {
                    headers: { Authorization: `Bearer ${authStore.token}` }
                });

                const newBooking = response.data.booking;
                this.$swal({
                    icon: 'success',
                    title: 'ການຈອງສຳເລັດ!',
                    text: 'ລະບົບກຳລັງນຳທ່ານໄປສູ່ໜ້າຊຳລະເງິນ.',
                    timer: 2000,
                    showConfirmButton: false,
                });

                // Redirect to the payment upload page with the new booking ID
                this.router.push({ name: 'payment.upload', params: { bookingId: newBooking.id } });

            } catch (error) {
                const errorMessage = error.response?.data?.message || 'ເກີດຂໍ້ຜິດພາດໃນການຈອງ';
                this.$swal({
                    icon: 'error',
                    title: 'ການຈອງຜິດພາດ',
                    text: errorMessage,
                });
            } finally {
                this.isSubmitting = false;
            }
        }
    }
}
</script>
