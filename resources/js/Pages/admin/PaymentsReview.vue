<template>
    <div class="page-header">
        <div class="add-item d-flex">
            <div class="page-title">
                <h4 class="fw-bold">ກວດສອບການຊຳລະເງິນ</h4>
                <h6>ຈັດການຂໍ້ມູນການຊຳລະເງິນຂອງລູກຄ້າ</h6>
            </div>
        </div>
        <ul class="table-top-head">
            <li><a href="javascript:void(0);" @click="exportToPdf"><img :src="`${url}/assets/img/icons/pdf.svg`" alt="img"></a></li>
            <li><a href="javascript:void(0);" @click="exportToExcel"><img :src="`${url}/assets/img/icons/excel.svg`" alt="img"></a></li>
            <li><a href="javascript:void(0);" @click="fetchPayments(1)"><i class="ti ti-refresh"></i></a></li>
        </ul>
    </div>

    <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div class="search-set">
                <div class="search-input">
                    <span class="btn-searchset"><i class="ti ti-search fs-14 feather-search"></i></span>
                    <div class="dataTables_filter">
                        <label> <input type="search" class="form-control form-control-sm" placeholder="ຄົ້ນຫາ..." v-model="search" @input="fetchPayments(1)"></label>
                    </div>
                </div>
            </div>
            <div class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div class="dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
                        {{ filterStatus || 'ສະຖານະ' }}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end p-3">
                        <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="changeStatus('')">ທັງໝົດ</a></li>
                        <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="changeStatus('Pending')">ລໍຖ້າກວດສອບ</a></li>
                        <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="changeStatus('Paid')">ຊຳລະແລ້ວ</a></li>
                        <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="changeStatus('Failed')">ລົ້ມເຫຼວ</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table datatable">
                    <thead class="thead-light">
                        <tr>
                            <th>ເລກທີ່ການຈອງ</th>
                            <th>ຊື່ລູກຄ້າ</th>
                            <th>ລົດທີ່ເຊົ່າ</th>
                            <th>ວັນທີຊຳລະ</th>
                            <th>ຈຳນວນເງິນ</th>
                            <th>ຊ່ອງທາງ</th>
                            <th>ສະຖານະ</th>
                            <th class="no-sort">ການກະທຳ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="payments.data && payments.data.length === 0">
                            <td colspan="8" class="text-center">ບໍ່ມີຂໍ້ມູນ</td>
                        </tr>
                        <tr v-for="payment in payments.data" :key="payment.id">
                            <td>BK-{{ payment.booking_id }}</td>
                            <td>{{ payment.customer.first_name }} {{ payment.customer.last_name }}</td>
                            <td>{{ payment.booking.car.make }} {{ payment.booking.car.model }}</td>
                            <td>{{ new Date(payment.payment_date).toLocaleDateString() }}</td>
                            <td>{{ formatCurrency(payment.amount) }}</td>
                            <td>{{ payment.payment_method }}</td>
                            <td>
                                <span v-if="payment.status === 'Paid'" class="d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white bg-success fs-10"><i class="ti ti-point-filled me-1 fs-11"></i>ຊຳລະແລ້ວ</span>
                                <span v-else-if="payment.status === 'Pending'" class="d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white bg-warning fs-10"><i class="ti ti-point-filled me-1 fs-11"></i>ລໍຖ້າກວດສອບ</span>
                                <span v-else-if="payment.status === 'Failed'" class="d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white bg-danger fs-10"><i class="ti ti-point-filled me-1 fs-11"></i>ລົ້ມເຫຼວ</span>
                            </td>
                            <td class="action-table-data">
                                <div class="edit-delete-action">
                                    <a class="me-2 p-2 mb-0" href="javascript:void(0);" @click="showDetails(payment)" data-bs-toggle="modal" data-bs-target="#payment-details-modal">
                                        <i class="ti ti-eye"></i>
                                    </a>
                                    <a v-if="payment.status === 'Pending'" class="me-2 p-2 mb-0" href="javascript:void(0);" @click="approvePayment(payment.id)">
                                        <i class="ti ti-check text-success"></i>
                                    </a>
                                    <a v-if="payment.status === 'Pending'" class="p-2 mb-0" href="javascript:void(0);" @click="rejectPayment(payment.id)">
                                        <i class="ti ti-x text-danger"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
             <div class="d-flex justify-content-between p-2">
                <div>
                     <select v-model="perPage" @change="fetchPayments(1)" class="form-select form-select-sm">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div v-if="payments.meta">
                    <ul class="pagination">
                        <li class="paginate_button page-item" :class="{disabled: !payments.links.prev}">
                            <a href="#" @click.prevent="fetchPayments(payments.meta.current_page - 1)" class="page-link">ກ່ອນໜ້າ</a>
                        </li>
                        <li class="paginate_button page-item" v-for="page in payments.meta.last_page" :key="page" :class="{active: page === payments.meta.current_page}">
                            <a href="#" @click.prevent="fetchPayments(page)" class="page-link">{{ page }}</a>
                        </li>
                        <li class="paginate_button page-item" :class="{disabled: !payments.links.next}">
                            <a href="#" @click.prevent="fetchPayments(payments.meta.current_page + 1)" class="page-link">ຕໍ່ໄປ</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Payment Details Modal -->
    <div class="modal fade" id="payment-details-modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">ລາຍລະອຽດການຊຳລະເງິນ</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body" v-if="selectedPayment">
                    <p><strong>ເລກທີ່ການຈອງ:</strong> BK-{{ selectedPayment.booking_id }}</p>
                    <p><strong>ລູກຄ້າ:</strong> {{ selectedPayment.customer.first_name }} {{ selectedPayment.customer.last_name }}</p>
                    <p><strong>ຈຳນວນ:</strong> {{ formatCurrency(selectedPayment.amount) }}</p>
                    <p><strong>ເລກທີ່ອ້າງອີງ:</strong> {{ selectedPayment.transaction_id || '-' }}</p>
                    <p><strong>ຫຼັກຖານການຊຳລະ:</strong></p>
                    <img v-if="selectedPayment.slip_image_url" :src="selectedPayment.slip_image_url" class="img-fluid" alt="Payment Slip">
                    <p v-else>ບໍ່ມີຮູບພາບ</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ປິດ</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../../Stores/Auth';

export default {
    data() {
        return {
            url: window.location.origin, // URL ຫຼັກຂອງແອັບພລິເຄຊັນ
            payments: { data: [], links: {}, meta: {} }, // ຂໍ້ມູນການຊໍາລະເງິນ ແລະຂໍ້ມູນການແບ່ງໜ້າ
            selectedPayment: null, // ການຊໍາລະເງິນທີ່ຖືກເລືອກສໍາລັບລາຍລະອຽດ
            search: '', // ຄໍາຄົ້ນຫາ
            filterStatus: '', // ຕົວກອງສະຖານະ (Pending, Paid, Failed)
            perPage: 10, // ຈໍານວນລາຍການຕໍ່ໜ້າ
        }
    },
    mounted() {
        // ເມື່ອ component ຖືກ mount, ດຶງຂໍ້ມູນການຊໍາລະເງິນ
        this.fetchPayments();
    },
    methods: {
        // ດຶງຂໍ້ມູນການຊໍາລະເງິນຈາກ API
        async fetchPayments(page = 1) {
            const authStore = useAuthStore();
            try {
                const response = await axios.get(`/api/admin/payments`, {
                    params: {
                        page: page,
                        per_page: this.perPage,
                        search: this.search,
                        status: this.filterStatus
                    },
                    headers: { Authorization: `Bearer ${authStore.token}` }
                });
                this.payments = response.data.payments;
            } catch (error) {
                console.error('Error fetching payments:', error);
                this.$swal({
                    icon: 'error',
                    title: 'ເກີດຂໍ້ຜິດພາດ',
                    text: 'ບໍ່ສາມາດດຶງຂໍ້ມູນການຊຳລະເງິນໄດ້',
                });
            }
        },
        // ປ່ຽນຕົວກອງສະຖານະ
        changeStatus(status) {
            this.filterStatus = status;
            this.fetchPayments(1);
        },
        // ຈັດຮູບແບບສະກຸນເງິນ
        formatCurrency(value) {
            return parseFloat(value).toLocaleString('lo-LA', { style: 'currency', currency: 'LAK' });
        },
        // ສະແດງລາຍລະອຽດການຊໍາລະເງິນໃນ Modal
        showDetails(payment) {
            this.selectedPayment = payment;
        },
        // ອະນຸມັດການຊໍາລະເງິນ
        approvePayment(paymentId) {
            const authStore = useAuthStore();
            this.$swal({
                title: 'ຢືນຢັນການອະນຸມັດ?',
                text: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການອະນຸມັດລາຍການນີ້?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ແມ່ນ, ອະນຸມັດเลย!',
                cancelButtonText: 'ຍົກເລີກ'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.post(`/api/admin/payments/${paymentId}/approve`, {}, {
                            headers: { Authorization: `Bearer ${authStore.token}` }
                        });
                        this.$swal('ສຳເລັດ!', 'ການຊຳລະເງິນໄດ້ຮັບການອະນຸມັດແລ້ວ.', 'success');
                        this.fetchPayments(this.payments.meta.current_page);
                    } catch (error) {
                        console.error('Error approving payment:', error);
                        this.$swal('ຜິດພາດ!', 'ບໍ່ສາມາດອະນຸມັດການຊຳລະເງິນໄດ້.', 'error');
                    }
                }
            });
        },
        // ປະຕິເສດການຊໍາລະເງິນ
        rejectPayment(paymentId) {
            const authStore = useAuthStore();
            this.$swal({
                title: 'ຢືນຢັນການປະຕິເສດ?',
                text: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການປະຕິເສດລາຍການນີ້?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'ແມ່ນ, ປະຕິເສດเลย!',
                cancelButtonText: 'ຍົກເລີກ'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.post(`/api/admin/payments/${paymentId}/reject`, {}, {
                            headers: { Authorization: `Bearer ${authStore.token}` }
                        });
                        this.$swal('ສຳເລັດ!', 'ການຊຳລະເງິນຖືກປະຕິເສດແລ້ວ.', 'success');
                        this.fetchPayments(this.payments.meta.current_page);
                    } catch (error) {
                        console.error('Error rejecting payment:', error);
                        this.$swal('ຜິດພາດ!', 'ບໍ່ສາມາດປະຕິເສດການຊຳລະເງິນໄດ້.', 'error');
                    }
                }
            });
        },
        // ສົ່ງອອກເປັນ PDF (ຕົວຢ່າງ)
        exportToPdf() {
            alert('Exporting to PDF...');
            // ເພີ່ມ logic ການສົ່ງອອກ PDF ທີ່ນີ້
        },
        // ສົ່ງອອກເປັນ Excel (ຕົວຢ່າງ)
        exportToExcel() {
            alert('Exporting to Excel...');
            // ເພີ່ມ logic ການສົ່ງອອກ Excel ທີ່ນີ້
        }
    }
}
</script>

<style scoped>
    .action-table-data .p-2 {
        cursor: pointer;
    }
    .pagination {
        margin: 0;
    }
</style>