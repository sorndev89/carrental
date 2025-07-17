<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h4 class="fw-bold">ຊຳລະເງິນ ແລະ ອັບໂຫຼດຫຼັກຖານ</h4>
                        <p>ເລກທີ່ການຈອງ: BK-{{ bookingId }}</p>
                    </div>
                    <div class="card-body">
                        <div class="alert alert-info">
                            <h5 class="alert-heading">ຂັ້ນຕອນການຊຳລະເງິນ</h5>
                            <p>1. ກະລຸນາໂອນເງິນມາທີ່ບັນຊີຂ້າງລຸ່ມນີ້.</p>
                            <p>2. ບັນທຶກໜ້າຈໍ ຫຼື ໃບບິນການໂອນເງິນໄວ້.</p>
                            <p>3. ອັບໂຫຼດຮູບໃບບິນໃນຟອມຂ້າງລຸ່ມນີ້ເພື່ອຢືນຢັນ.</p>
                        </div>

                        <!-- Bank Account Info -->
                        <div class="mb-4">
                            <h5>ຂໍ້ມູນບັນຊີທະນາຄານ</h5>
                            <p><strong>ທະນາຄານ:</strong> ທະນາຄານການຄ້າຕ່າງປະເທດລາວ (BCEL)</p>
                            <p><strong>ຊື່ບັນຊີ:</strong> ບໍລິສັດ ເຈົ້າລາສີ ຈຳກັດຜູ້ດຽວ</p>
                            <p><strong>ເລກບັນຊີ:</strong> 160-12-00-12345678-9</p>
                            <p class="text-danger fw-bold">ຈຳນວນເງິນທີ່ຕ້ອງໂອນ: {{ formatCurrency(amount) }}</p>
                        </div>

                        <hr>

                        <!-- Upload Form -->
                        <form @submit.prevent="submitSlip">
                            <div class="mb-3">
                                <label for="slipImage" class="form-label">ອັບໂຫຼດໃບບິນ/ຫຼັກຖານການໂອນ</label>
                                <input type="file" class="form-control" @change="handleFileUpload" accept="image/*" required>
                            </div>

                             <div v-if="previewUrl" class="mb-3">
                                <p>ຮູບຕົວຢ່າງ:</p>
                                <img :src="previewUrl" class="img-fluid img-thumbnail" style="max-height: 200px;" alt="Slip preview">
                            </div>

                            <div class="mb-3">
                                <label for="payment_date" class="form-label">ວັນທີ ແລະ ເວລາທີ່ຊຳລະ</label>
                                <input type="datetime-local" id="payment_date" v-model="payment_date" class="form-control" required>
                            </div>

                            <div class="mt-4">
                                <button type="submit" class="btn btn-success w-100" :disabled="isSubmitting">
                                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ຢືນຢັນການຊຳລະເງິນ
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
import { useRouter, useRoute } from 'vue-router';

export default {
    data() {
        return {
            bookingId: null,
            amount: 0, // Will be fetched from the server
            slipImage: null,
            previewUrl: null,
            payment_date: new Date().toISOString().slice(0, 16),
            isSubmitting: false,
            router: useRouter(),
            route: useRoute(),
        };
    },
    created() {
        this.bookingId = this.route.params.bookingId;
        if (this.bookingId) {
            this.fetchBookingDetails();
        }
    },
    methods: {
        formatCurrency(value) {
            return parseFloat(value).toLocaleString('lo-LA', { style: 'currency', currency: 'LAK' });
        },
        async fetchBookingDetails() {
            const authStore = useAuthStore();
            try {
                // We need an endpoint to get booking details, let's use the admin one for now
                const response = await axios.get(`/api/admin/bookings/${this.bookingId}`, {
                     headers: { Authorization: `Bearer ${authStore.token}` }
                });
                this.amount = response.data.booking.total_price;
            } catch (error) {
                console.error('Failed to fetch booking details:', error);
                this.$swal('ຜິດພາດ', 'ບໍ່ສາມາດດຶງຂໍ້ມູນການຈອງໄດ້', 'error');
                this.router.push({ name: 'home' });
            }
        },
        handleFileUpload(event) {
            this.slipImage = event.target.files[0];
            if (this.slipImage) {
                this.previewUrl = URL.createObjectURL(this.slipImage);
            }
        },
        async submitSlip() {
            if (!this.slipImage) {
                this.$swal('ຂໍ້ມູນບໍ່ຄົບຖ້ວນ', 'ກະລຸນາເລືອກຮູບພາບໃບບິນ', 'warning');
                return;
            }

            this.isSubmitting = true;
            const authStore = useAuthStore();
            const formData = new FormData();
            formData.append('slip_image', this.slipImage);
            formData.append('payment_date', this.payment_date);

            try {
                // We need a new endpoint for this
                await axios.post(`/api/customer/bookings/${this.bookingId}/upload-slip`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${authStore.token}`
                    }
                });

                this.$swal({
                    icon: 'success',
                    title: 'ອັບໂຫຼດສຳເລັດ!',
                    text: 'ຂອບໃຈ, ລະບົບກຳລັງກວດສອບການຊຳລະເງິນຂອງທ່ານ.',
                });

                this.router.push({ name: 'my.bookings' }); // Redirect to their bookings list

            } catch (error) {
                const errorMessage = error.response?.data?.message || 'ເກີດຂໍ້ຜິດພາດໃນການອັບໂຫຼດ';
                this.$swal('ຜິດພາດ', errorMessage, 'error');
            } finally {
                this.isSubmitting = false;
            }
        }
    }
}
</script>
