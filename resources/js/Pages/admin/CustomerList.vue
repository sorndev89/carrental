<template lang="">
    <div class="page-header">
        <div class="add-item d-flex">
            <div class="page-title">
                <h4 class="fw-bold">ລູກຄ້າ</h4>
                <h6>ຈັດການຂໍ້ມູນລູກຄ້າຂອງທ່ານ</h6>
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
            <a href="#" class="btn btn-primary" @click="addCustomer()"><i class="ti ti-circle-plus me-1"></i>ເພີ່ມລູກຄ້າ</a>
        </div>
    </div>

    <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div class="search-set">
                <div class="search-input">
                    <span class="btn-searchset"><i class="ti ti-search fs-14 feather-search"></i></span>
                    <div class="dataTables_filter"><label> <input type="search" v-model="searchQuery" class="form-control form-control-sm" @keyup.enter="getCustomers()" placeholder="ຄົ້ນຫາ..."></label></div>
                </div>
            </div>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table datatable">
                    <thead class="thead-light">
                        <tr>
                            <th>ຊື່ລູກຄ້າ</th>
                            <th>ອີເມວ</th>
                            <th>ເບີໂທ</th>
                            <th>ເລກບັດປະຈຳຕົວ</th>
                            <th>ການກະທຳ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="customer in customers.data" :key="customer.id">
                            <td>
                                <div class="d-flex align-items-center">
                                    <a href="javascript:void(0);" class="avatar avatar-md me-2">
                                        <img :src="url +'/'+ customer.profile_image_url" v-if="customer.profile_image_url">
                                        <img :src="url + '/assets/img/no-profile-picture-icon.png'" v-else>
                                    </a>
                                    <a href="javascript:void(0);">{{ customer.first_name }} {{ customer.last_name }}</a>
                                </div>
                            </td>
                            <td>{{ customer.email }}</td>
                            <td>{{ customer.phone_number }}</td>
                            <td>{{ customer.id_card_number }}</td>
                            <td class="action-table-data">
                                <div class="edit-delete-action">
                                    <a class="me-2 p-2 mb-0" @click="editCustomer(customer.id)" href="javascript:void(0);">
                                        ແກ້ໄຂ
                                    </a>
                                    <a class="p-2 mb-0" href="javascript:void(0);" @click="deleteCustomer(customer.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination :pagination="customers" @change-per-page="changePerPage" @go-to-page="goToPage" />
        </div>
    </div>

    <!-- Add/Edit Customer Modal -->
    <div class="modal fade" id="add-customer">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="page-wrapper-new p-0">
                    <div class="">
                        <div class="modal-header">
                            <div class="page-title">
                                <h4>{{ form_type ? 'ເພີ່ມລູກຄ້າ' : 'ແກ້ໄຂລູກຄ້າ' }}</h4>
                            </div>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form @submit.prevent="saveCustomer">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="new-employee-field">
                                            <div @click="this.$refs.img_customer.click()" class="profile-pic-upload mb-2 d-flex justify-content-center cursor-pointer">
                                                <img :src="image_preview" v-if="image_preview" class="img-customer">
                                                <div class="profile-pic" v-else>
                                                    <span><vue-feather type="image"></vue-feather> ເລືອກຮູບ</span>
                                                </div>
                                            </div>
                                            <input ref="img_customer" type="file" style="display:none;" @change="onselectFile">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ຊື່<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="customer.first_name" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ນາມສະກຸນ</label>
                                        <input type="text" v-model="customer.last_name" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ເພດ<span class="text-danger ms-1">*</span></label>
                                        <select v-model="customer.gender" class="form-select">
                                            <option value="Male">ຊາຍ</option>
                                            <option value="Female">ຍິງ</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ອີເມວ<span class="text-danger ms-1">*</span></label>
                                        <input type="email" v-model="customer.email" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ເບີໂທ<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="customer.phone_number" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ທີ່ຢູ່</label>
                                        <input type="text" v-model="customer.address" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ເລກບັດປະຈຳຕົວ</label>
                                        <input type="text" v-model="customer.id_card_number" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ເລກໃບຂັບຂີ່</label>
                                        <input type="text" v-model="customer.driver_license_number" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ວັນໝົດອາຍຸໃບຂັບຂີ່</label>
                                        <input type="date" v-model="customer.license_expiry_date" class="form-control">
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" class="btn btn-primary me-2" :disabled="!isFormValid">ບັນທຶກ</button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ຍົກເລີກ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useRequestApiStore } from "@/Stores/RequestAPI";
import Pagination from '@/Components/Pagination.vue';

export default {
    components: {
        Pagination
    },
    data() {
        return {
            url: window.location.origin, // URL ຫຼັກຂອງແອັບພລິເຄຊັນ
            form_type: true, // ໃຊ້ເພື່ອກໍານົດວ່າຟອມແມ່ນສໍາລັບການເພີ່ມ (true) ຫຼືແກ້ໄຂ (false) ລູກຄ້າ
            edit_id: '', // ID ຂອງລູກຄ້າທີ່ກໍາລັງແກ້ໄຂ
            customers: { // ຂໍ້ມູນລູກຄ້າທີ່ໄດ້ຮັບຈາກ API
                data: [],
            },
            customer: { // ວັດຖຸສໍາລັບຂໍ້ມູນລູກຄ້າ
                first_name: '',
                last_name: '',
                gender: 'Male',
                email: '',
                phone_number: '',
                address: '',
                id_card_number: '',
                driver_license_number: '',
                license_expiry_date: '',
                profile_image: null,
            },
            image_preview: null, // URL ຮູບພາບສໍາລັບການສະແດງຕົວຢ່າງ
            searchQuery: '', // ຄໍາຄົ້ນຫາສໍາລັບລູກຄ້າ
            currentPage: 1, // ໜ້າປັດຈຸບັນຂອງການແບ່ງໜ້າ
            perPage: 10, // ຈໍານວນລາຍການຕໍ່ໜ້າ
            modal: null, // Instance ຂອງ Modal
        }
    },
    setup() {
        // ໃຊ້ Pinia store ສໍາລັບການຮ້ອງຂໍ API
        const requestApi = useRequestApiStore();
        return { requestApi };
    },
    computed: {
        // ກວດສອບຄວາມຜິດພາດໃນການປ້ອນຂໍ້ມູນ
        validationError() {
            const emailRegex = /^[^@]+@[^@]+\.[^\s@]+$/;
            if (this.customer.email && !emailRegex.test(this.customer.email)) {
                return 'ອີເມວລ໌ບໍ່ຖືກຕ້ອງ!';
            }
            return '';
        },
        // ກວດສອບວ່າຟອມຖືກຕ້ອງຕາມກົດເກນຫຼືບໍ່
        isFormValid() {
            const hasBasicInfo = this.customer.first_name && this.customer.gender && this.customer.email && this.customer.phone_number;
            if (!hasBasicInfo || this.validationError) {
                return false;
            }
            return true;
        }
    },
    methods: {
        // ຈັດການການເລືອກໄຟລ໌ຮູບພາບ
        onselectFile(e) {
            const file = e.target.files[0];
            this.customer.profile_image = file;
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.image_preview = reader.result;
                }
            }
        },
        // ເປີດ Modal ສໍາລັບການເພີ່ມລູກຄ້າໃໝ່
        addCustomer() {
            this.form_type = true; // ຕັ້ງຄ່າເປັນໂໝດສ້າງ
            this.customer = { // ລ້າງຂໍ້ມູນຟອມ
                first_name: '',
                last_name: '',
                gender: 'Male',
                email: '',
                phone_number: '',
                address: '',
                id_card_number: '',
                driver_license_number: '',
                license_expiry_date: '',
                profile_image: null,
            };
            this.image_preview = null; // ລ້າງຮູບພາບສະແດງຕົວຢ່າງ
            this.modal.show(); // ສະແດງ Modal
        },
        // ດຶງຂໍ້ມູນລູກຄ້າຈາກ API
        async getCustomers() {
            try {
                const response = await this.requestApi.getData(`admin/customers?page=${this.currentPage}&per_page=${this.perPage}&search=${this.searchQuery}`);
                this.customers = response.customers;
            } catch (error) {
                console.error("Error fetching customers:", error);
            }
        },
        // ດຶງຂໍ້ມູນລູກຄ້າເພື່ອແກ້ໄຂ ແລະເປີດ Modal
        async editCustomer(id) {
            this.form_type = false; // ຕັ້ງຄ່າເປັນໂໝດແກ້ໄຂ
            this.edit_id = id; // ກໍານົດ ID ລູກຄ້າທີ່ຈະແກ້ໄຂ
            let data = await this.requestApi.getDataByID('admin/customers', id);
            this.customer = data.customer;
            this.image_preview = this.url + '/ '+ this.customer.profile_image_url; // ກໍານົດຮູບພາບສະແດງຕົວຢ່າງ
            this.modal.show(); // ສະແດງ Modal
        },
        // ບັນທຶກ (ເພີ່ມ/ແກ້ໄຂ) ລູກຄ້າ
        async saveCustomer() {
            // const formData = new FormData();
            // for (const key in this.customer) {
            //     formData.append(key, this.customer[key]);
            // }

            try {
                if (this.form_type) {
                    await this.requestApi.postData('admin/customers', this.customer);
                } else {
                    await this.requestApi.updateData('admin/customers', this.edit_id, this.customer);
                }
                this.getCustomers(); // ໂຫຼດຂໍ້ມູນລູກຄ້າຄືນໃໝ່
                this.modal.hide(); // ເຊື່ອງ Modal
            } catch (error) {
                console.error("Error saving customer:", error);
            }
        },
        // ລົບລູກຄ້າ
        async deleteCustomer(id) {
            try {
                await this.requestApi.deleteData('admin/customers', id);
                this.getCustomers(); // ໂຫຼດຂໍ້ມູນລູກຄ້າຄືນໃໝ່
            } catch (error) {
                console.error("Error deleting customer:", error);
            }
        },
        // ປ່ຽນຈໍານວນລາຍການຕໍ່ໜ້າ
        changePerPage(newPerPage) {
            this.perPage = newPerPage;
            this.currentPage = 1;
            this.getCustomers();
        },
        // ໄປໜ້າທີ່ລະບຸ
        goToPage(page) {
            this.currentPage = page;
            this.getCustomers();
        },
    },
    mounted() {
        // ເມື່ອ component ຖືກ mount, ດຶງຂໍ້ມູນລູກຄ້າ
        this.getCustomers();
        // ສ້າງ instance ຂອງ Bootstrap Modal
        this.modal = new bootstrap.Modal(document.getElementById('add-customer'));
    },
    watch: {
        // ຕິດຕາມການປ່ຽນແປງຂອງຄໍາຄົ້ນຫາເພື່ອໂຫຼດຂໍ້ມູນຄືນໃໝ່
        searchQuery(val) {
            if (val.length == 0) {
                this.getCustomers();
            }
        }
    }
}
</script>

<style>
.img-customer {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    border: 1px dashed #e1dfdf;
    padding: 3px;
    object-fit: cover;
    object-position: center;
}
</style>
