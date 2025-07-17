<template lang="">
    <div class="page-header">
        <div class="add-item d-flex">
            <div class="page-title">
                <h4 class="fw-bold">ລາຍການຈອງ</h4>
                        <h6>ຈັດການລາຍການຈອງຂອງທ່ານ</h6>
            </div>
        </div>
        <ul class="table-top-head">
            <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Pdf" data-bs-original-title="Pdf"><img :src="url + '/assets/img/icons/pdf.svg'" alt="img"></a>
            </li>
            <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Excel" data-bs-original-title="Excel"><img :src="url + '/assets/img/icons/excel.svg'" alt="img"></a>
            </li>
            <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Refresh" data-bs-original-title="Refresh"><i class="ti ti-refresh"></i></a>
            </li>
            <li>
                <a data-bs-toggle="tooltip" data-bs-placement="top" id="collapse-header" aria-label="Collapse" data-bs-original-title="Collapse"><i class="ti ti-chevron-up"></i></a>
            </li>
        </ul>
        <div class="page-btn">
            <a href="#" class="btn btn-primary" @click="addBooking()"><i class="ti ti-circle-plus me-1"></i>ເພີ່ມການຈອງ</a>
        </div>
    </div>

    <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div class="search-set">
                <div class="search-input">
                    <span class="btn-searchset"><i class="ti ti-search fs-14 feather-search"></i></span>
                    <div class="dataTables_filter"><label> <input type="search" v-model="searchQuery" class="form-control form-control-sm" @keyup.enter="getBookings()" placeholder="ຄົ້ນຫາ..."></label></div>
                </div>
            </div>
            <div class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div class="dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
                        {{ bookingStatus === 'all' ? 'ທັງໝົດ' : getBookingStatusText(bookingStatus) }}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end p-3">
                        <li><a href="javascript:void(0);" @click="bookingStatus='all'" class="dropdown-item rounded-1">ທັງໝົດ</a></li>
                        <li><a href="javascript:void(0);" @click="bookingStatus='pending'" class="dropdown-item rounded-1">ລໍຖ້າ</a></li>
                        <li><a href="javascript:void(0);" @click="bookingStatus='confirmed'" class="dropdown-item rounded-1">ຢືນຢັນແລ້ວ</a></li>
                        <li><a href="javascript:void(0);" @click="bookingStatus='cancelled'" class="dropdown-item rounded-1">ຍົກເລີກ</a></li>
                        <li><a href="javascript:void(0);" @click="bookingStatus='completed'" class="dropdown-item rounded-1">ສຳເລັດ</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table datatable">
                    <thead class="thead-light">
                        <tr>
                            <th>ລູກຄ້າ</th>
                            <th>ລົດ</th>
                            <th>ວັນທີຮັບ</th>
                            <th>ວັນທີສົ່ງຄືນ</th>
                            <th>ລາຄາລວມ</th>
                            <th>ສະຖານະ</th>
                            <th>ການກະທຳ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="booking in bookings.data" :key="booking.id">
                            <td>{{ booking.customer.first_name }} {{ booking.customer.last_name }}</td>
                            <td>{{ booking.car.make }} {{ booking.car.model }} ({{ booking.car.license_plate }})</td>
                            <td>{{ booking.pickup_date }}</td>
                            <td>{{ booking.return_date }}</td>
                            <td>{{ booking.total_price }}</td>
                            <td><span class="d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white fs-10" :class="getStatusClass(booking.booking_status)"><i class="ti ti-point-filled me-1 fs-11"></i>{{ getBookingStatusText(booking.booking_status) }}</span></td>
                            <td class="action-table-data">
                                <div class="edit-delete-action">
                                    <a class="me-2 p-2 mb-0" @click="editBooking(booking.id)" href="javascript:void(0);">
                                        ແກ້ໄຂ
                                    </a>
                                    <a class="p-2 mb-0" href="javascript:void(0);" @click="deleteBooking(booking.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination :pagination="bookings" @change-per-page="changePerPage" @go-to-page="goToPage" />
        </div>
    </div>

    <!-- Add/Edit Booking Modal -->
    <div class="modal fade" id="add-booking">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="page-wrapper-new p-0">
                    <div class="">
                        <div class="modal-header">
                            <div class="page-title">
                                <h4>{{ form_type ? 'ເພີ່ມການຈອງ' : 'ແກ້ໄຂການຈອງ' }}</h4>
                            </div>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form @submit.prevent="saveBooking">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ລູກຄ້າ<span class="text-danger ms-1">*</span></label>
                                        <div v-if="booking.customer_id && selectedCustomer" class="d-flex align-items-center">
                                            <input type="text" :value="selectedCustomer.first_name + ' ' + selectedCustomer.last_name" class="form-control" disabled>
                                            <button type="button" @click.prevent="clearCustomerSelection" class="btn btn-sm btn-outline-danger ms-2">ປ່ຽນ</button>
                                        </div>
                                        <div v-else>
                                            <input type="text" v-model="customerSearchQuery" @input="searchCustomers" class="form-control" placeholder="ຄົ້ນຫາຊື່ ຫຼື ນາມສະກຸນ...">
                                            <div class="list-group position-absolute" style="z-index: 1000;" v-if="customerSearchResults.length > 0">
                                                <a href="#" v-for="customer in customerSearchResults" :key="customer.id" @click.prevent="selectCustomer(customer)" class="list-group-item list-group-item-action">
                                                    {{ customer.first_name }} {{ customer.last_name }}
                                                </a>
                                            </div>
                                            <div v-if="customerSearchQuery.length > 1 && customerSearchResults.length === 0" class="mt-2">
                                                <p class="text-muted">ບໍ່ພົບຂໍ້ມູນລູກຄ້າ. <a href="#" @click.prevent="openAddCustomerModal">ເພີ່ມລູກຄ້າໃໝ່</a></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ລົດ<span class="text-danger ms-1">*</span></label>
                                        <select v-model="booking.car_id" class="form-select">
                                            <option v-for="car in carsList" :key="car.id" :value="car.id">{{ car.make }} {{ car.model }} ({{ car.license_plate }})</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ວັນທີຮັບລົດ<span class="text-danger ms-1">*</span></label>
                                        <input type="date" v-model="booking.pickup_date" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ວັນທີສົ່ງຄືນ<span class="text-danger ms-1">*</span></label>
                                        <input type="date" v-model="booking.return_date" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ລາຄາລວມ<span class="text-danger ms-1">*</span></label>
                                        <input type="number" step="0.01" v-model="booking.total_price" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ສະຖານະການຈອງ<span class="text-danger ms-1">*</span></label>
                                        <select v-model="booking.booking_status" class="form-select">
                                            <option value="pending">ລໍຖ້າ</option>
                                            <option value="confirmed">ຢືນຢັນແລ້ວ</option>
                                            <option value="cancelled">ຍົກເລີກ</option>
                                            <option value="completed">ສຳເລັດ</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary me-2">ບັນທຶກ</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ຍົກເລີກ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Add Customer Modal -->
    <div class="modal fade" id="add-customer-modal" tabindex="-1" aria-labelledby="addCustomerModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addCustomerModalLabel">ເພີ່ມລູກຄ້າໃໝ່</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="saveCustomer">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">ຊື່<span class="text-danger ms-1">*</span></label>
                            <input type="text" v-model="newCustomer.first_name" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">ນາມສະກຸນ<span class="text-danger ms-1">*</span></label>
                            <input type="text" v-model="newCustomer.last_name" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">ເພດ<span class="text-danger ms-1">*</span></label>
                            <select v-model="newCustomer.gender" class="form-select" required>
                                <option value="">ເລືອກເພດ</option>
                                <option value="male">ຊາຍ</option>
                                <option value="female">ຍິງ</option>
                            </select>
                        </div>
                         <div class="mb-3">
                            <label class="form-label">ອີເມວ</label>
                            <input type="email" v-model="newCustomer.email" class="form-control">
                        </div>
                         <div class="mb-3">
                            <label class="form-label">ເບີໂທ</label>
                            <input type="text" v-model="newCustomer.phone_number" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">ບັນທຶກ</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ຍົກເລີກ</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { useRequestApiStore } from "@/Stores/RequestAPI";
import Pagination from '@/Components/Pagination.vue';
import { debounce } from 'lodash';

export default {
    components: {
        Pagination
    },
    data() {
        return {
            url: window.location.origin, // URL ຫຼັກຂອງແອັບພລິເຄຊັນ
            form_type: true, // ໃຊ້ເພື່ອກໍານົດວ່າຟອມແມ່ນສໍາລັບການເພີ່ມ (true) ຫຼືແກ້ໄຂ (false) ການຈອງ
            bookingStatus: 'all', // ຕົວກອງສະຖານະການຈອງ (all, pending, confirmed, cancelled, completed)
            edit_id: '', // ID ຂອງການຈອງທີ່ກໍາລັງແກ້ໄຂ
            bookings: {
                data: [], // ຂໍ້ມູນການຈອງທີ່ໄດ້ຮັບຈາກ API
            },
            booking: { // ວັດຖຸສໍາລັບຂໍ້ມູນການຈອງ
                customer_id: '',
                car_id: '',
                pickup_date: '',
                return_date: '',
                total_price: '',
                booking_status: 'pending',
            },
            carsList: [], // ລາຍຊື່ລົດທັງໝົດ
            searchQuery: '', // ຄໍາຄົ້ນຫາສໍາລັບການຈອງ
            currentPage: 1, // ໜ້າປັດຈຸບັນຂອງການແບ່ງໜ້າ
            perPage: 10, // ຈໍານວນລາຍການຕໍ່ໜ້າ
            modal: null, // Instance ຂອງ Modal ສໍາລັບການເພີ່ມ/ແກ້ໄຂການຈອງ
            customerModal: null, // Instance ຂອງ Modal ສໍາລັບການເພີ່ມລູກຄ້າ
            customerSearchQuery: '', // ຄໍາຄົ້ນຫາສໍາລັບລູກຄ້າ
            customerSearchResults: [], // ຜົນການຄົ້ນຫາລູກຄ້າ
            selectedCustomer: null, // ລູກຄ້າທີ່ຖືກເລືອກ
            newCustomer: { // ວັດຖຸສໍາລັບຂໍ້ມູນລູກຄ້າໃໝ່
                first_name: '',
                last_name: '',
                gender: '',
                email: '',
                phone_number: ''
            },
        }
    },
    setup() {
        // ໃຊ້ Pinia store ສໍາລັບການຮ້ອງຂໍ API
        const requestApi = useRequestApiStore();
        return { requestApi };
    },
    methods: {
        // ເປີດ Modal ສໍາລັບການເພີ່ມການຈອງໃໝ່
        addBooking() {
            this.form_type = true; // ຕັ້ງຄ່າເປັນໂໝດສ້າງ
            this.booking = { // ລ້າງຂໍ້ມູນຟອມ
                customer_id: '',
                car_id: '',
                pickup_date: '',
                return_date: '',
                total_price: '',
                booking_status: 'pending',
            };
            this.clearCustomerSelection(); // ລ້າງການເລືອກລູກຄ້າ
            this.modal = new bootstrap.Modal(document.getElementById('add-booking')); // ສ້າງ Modal instance
            this.modal.show(); // ສະແດງ Modal
        },
        // ດຶງຂໍ້ມູນການຈອງຈາກ API
        async getBookings() {
            try {
                let url = `admin/bookings?page=${this.currentPage}&per_page=${this.perPage}&search=${this.searchQuery}`;
                if (this.bookingStatus !== 'all') {
                    url += `&booking_status=${this.bookingStatus}`;
                }
                const response = await this.requestApi.getData(url);
                this.bookings = response.bookings;
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        },
        // ດຶງລາຍຊື່ລົດທັງໝົດຈາກ API
        async getCarsList() {
            try {
                const response = await this.requestApi.getData(`admin/cars?per_page=all`);
                this.carsList = response.cars.data;
            } catch (error) {
                console.error("Error fetching cars list:", error);
            }
        },
        // ດຶງຂໍ້ມູນການຈອງເພື່ອແກ້ໄຂ ແລະເປີດ Modal
        async editBooking(id) {
            this.form_type = false; // ຕັ້ງຄ່າເປັນໂໝດແກ້ໄຂ
            this.edit_id = id; // ກໍານົດ ID ການຈອງທີ່ຈະແກ້ໄຂ
            let data = await this.requestApi.getDataByID('admin/bookings', id);
            this.booking = data.booking;
            this.selectedCustomer = data.booking.customer;
            this.customerSearchQuery = `${data.booking.customer.first_name} ${data.booking.customer.last_name}`;
            this.customerSearchResults = [];
            this.modal = new bootstrap.Modal(document.getElementById('add-booking'));
            this.modal.show();
        },
        // ບັນທຶກ (ເພີ່ມ/ແກ້ໄຂ) ການຈອງ
        async saveBooking() {
            try {
                if (this.form_type) {
                    await this.requestApi.postData('admin/bookings', this.booking);
                } else {
                    await this.requestApi.updateData('admin/bookings', this.edit_id, this.booking);
                }
                this.getBookings(); // ໂຫຼດຂໍ້ມູນການຈອງຄືນໃໝ່
                this.modal.hide(); // ເຊື່ອງ Modal
            } catch (error){
                console.error("Error saving booking:", error);
            }
        },
        // ລົບການຈອງ
        async deleteBooking(id) {
            try {
                await this.requestApi.deleteData('admin/bookings', id);
                this.getBookings(); // ໂຫຼດຂໍ້ມູນການຈອງຄືນໃໝ່
            } catch (error) {
                console.error("Error deleting booking:", error);
            }
        },
        // ປ່ຽນຈໍານວນລາຍການຕໍ່ໜ້າ
        changePerPage(newPerPage) {
            this.perPage = newPerPage;
            this.currentPage = 1;
            this.getBookings();
        },
        // ໄປໜ້າທີ່ລະບຸ
        goToPage(page) {
            this.currentPage = page;
            this.getBookings();
        },
        // ໄດ້ຮັບ Class ສີສໍາລັບສະຖານະ
        getStatusClass(status) {
            switch (status) {
                case 'pending': return 'bg-warning';
                case 'confirmed': return 'bg-success';
                case 'cancelled': return 'bg-danger';
                case 'completed': return 'bg-info';
                default: return 'bg-secondary';
            }
        },
        // ໄດ້ຮັບຂໍ້ຄວາມສະຖານະເປັນພາສາລາວ
        getBookingStatusText(status){
            switch (status) {
                case 'pending': return 'ລໍຖ້າ';
                case 'confirmed': return 'ຢືນຢັນແລ້ວ';
                case 'cancelled': return 'ຍົກເລີກ';
                case 'completed': return 'ສຳເລັດ';
                default: return 'ທັງໝົດ';
            }

        },
        // ວິທີການທີ່ກ່ຽວຂ້ອງກັບລູກຄ້າ
        searchCustomers: debounce(async function() { // ຄົ້ນຫາລູກຄ້າດ້ວຍ debounce ເພື່ອຫຼຸດຜ່ອນການຮ້ອງຂໍ API
            if (this.customerSearchQuery.length < 2) {
                this.customerSearchResults = [];
                return;
            }
            try {
                console.log('sss')
                const response = await this.requestApi.getData(`admin/customers?search=${this.customerSearchQuery}`);
                this.customerSearchResults = response.customers.data;
            } catch (error) {
                console.error("Error searching customers:", error);
            }
        }, 300),
        // ເລືອກລູກຄ້າຈາກຜົນການຄົ້ນຫາ
        selectCustomer(customer) {
            this.selectedCustomer = customer;
            this.booking.customer_id = customer.id;
            this.customerSearchQuery = `${customer.first_name} ${customer.last_name}`;
            this.customerSearchResults = [];
        },
        // ລ້າງການເລືອກລູກຄ້າ
        clearCustomerSelection() {
            this.selectedCustomer = null;
            this.booking.customer_id = '';
            this.customerSearchQuery = '';
            this.customerSearchResults = [];
        },
        // ເປີດ Modal ເພີ່ມລູກຄ້າໃໝ່
        openAddCustomerModal() {
            this.newCustomer = { first_name: '', last_name: '', gender: '', email: '', phone_number: '' };
            if (this.modal) {
                this.modal.hide(); // ເຊື່ອງ Modal ການຈອງ
            }
            this.customerModal = new bootstrap.Modal(document.getElementById('add-customer-modal'));
            this.customerModal.show();

            // ຟັງເຫດການເມື່ອ Modal ລູກຄ້າຖືກເຊື່ອງ
            document.getElementById('add-customer-modal').addEventListener('hidden.bs.modal', () => {
                if (this.modal) {
                    this.modal.show(); // ສະແດງ Modal ການຈອງຄືນໃໝ່
                }
            }, { once: true }); // ໃຊ້ { once: true } ເພື່ອລົບ listener ຫຼັງຈາກມັນຖືກເອີ້ນໃຊ້ຄັ້ງດຽວ
        },
        // ບັນທຶກລູກຄ້າໃໝ່
        async saveCustomer() {
            try {
                const response = await this.requestApi.postData('admin/customers', this.newCustomer);
                if(response.customer){
                    this.selectCustomer(response.customer);
                    this.customerModal.hide();
                    // The 'hidden.bs.modal' listener will handle showing the booking modal
                }
            } catch (error) {
                console.error("Error saving customer:", error);
            }
        }
    },
    mounted() {
        // ເມື່ອ component ຖືກ mount, ດຶງຂໍ້ມູນການຈອງແລະລາຍຊື່ລົດ
        this.getBookings();
        this.getCarsList();
    },
    watch: {
        // ຕິດຕາມການປ່ຽນແປງຂອງສະຖານະການຈອງເພື່ອໂຫຼດຂໍ້ມູນຄືນໃໝ່
        bookingStatus() {
            this.getBookings();
        },
        // ຕິດຕາມການປ່ຽນແປງຂອງຄໍາຄົ້ນຫາເພື່ອໂຫຼດຂໍ້ມູນຄືນໃໝ່
        searchQuery(val) {
            if (val.length == 0) {
                this.getBookings();
            }
        },
        // ຕິດຕາມການປ່ຽນແປງຂອງຄໍາຄົ້ນຫາລູກຄ້າ
        customerSearchQuery(newValue) {
            if (!newValue) {
                this.clearCustomerSelection();
            }
             if (this.customerSearchQuery.length == 0) {
                this.customerSearchResults = [];
            }
        }
    }
}
</script>

<style>

</style>
