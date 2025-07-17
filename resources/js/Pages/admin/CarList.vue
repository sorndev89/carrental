<template lang="">
    <div class="page-header">
        <div class="add-item d-flex">
            <div class="page-title">
                <h4 class="fw-bold">ລົດ</h4>
                <h6>ຈັດການລົດຂອງທ່ານ</h6>
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
            <a href="#" class="btn btn-primary" @click="addCar()"><i class="ti ti-circle-plus me-1"></i>ເພີ່ມລົດ</a>
        </div>
    </div>

    <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div class="search-set">
                <div class="search-input">
                    <span class="btn-searchset"><i class="ti ti-search fs-14 feather-search"></i></span>
                    <div class="dataTables_filter"><label> <input type="search" v-model="searchQuery" class="form-control form-control-sm" @keyup.enter="getCars()" placeholder="ຄົ້ນຫາ..."></label></div>
                </div>
            </div>
            <div class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div class="dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
                        {{ status.charAt(0).toUpperCase() + status.slice(1) }}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end p-3">
                        <li><a href="javascript:void(0);" @click="status='available'" class="dropdown-item rounded-1">Available</a></li>
                        <li><a href="javascript:void(0);" @click="status='rented'" class="dropdown-item rounded-1">Rented</a></li>
                        <li><a href="javascript:void(0);" @click="status='maintenance'" class="dropdown-item rounded-1">Maintenance</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table datatable">
                    <thead class="thead-light">
                        <tr>
                            <th>ລົດ</th>
                        <th>ປ້າຍທະບຽນ</th>
                        <th>ລາຄາຕໍ່ວັນ</th>
                        <th>ສະຖານະ</th>
                        <th>ການກະທຳ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="car in cars.data" :key="car.id">
                            <td>
                                <div class="d-flex align-items-center">
                                    <a href="javascript:void(0);" class="avatar avatar-md me-2">
                                        <img :src="url +'/'+ car.image_url" v-if="car.image_url">
                                        <img :src="url + '/assets/img/no-image.png'" v-else>
                                    </a>
                                    <a href="javascript:void(0);">{{ car.make }} {{ car.model }}</a>
                                </div>
                            </td>
                            <td>{{ car.license_plate }}</td>
                            <td>{{ car.daily_rate }}</td>
                            <td><span class="d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white fs-10" :class="getStatusClass(car.status)"><i class="ti ti-point-filled me-1 fs-11"></i>{{ getStatusText(car.status) }}</span></td>
                            <td class="action-table-data">
                                <div class="edit-delete-action">
                                    <a class="me-2 p-2 mb-0" @click="editCar(car.id)" href="javascript:void(0);">
                                        ແກ້ໄຂ
                                    </a>
                                    <a class="p-2 mb-0" href="javascript:void(0);" @click="deleteCar(car.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination :pagination="cars" @change-per-page="changePerPage" @go-to-page="goToPage" />
        </div>
    </div>

    <!-- Add/Edit Car Modal -->
    <div class="modal fade" id="add-car">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="page-wrapper-new p-0">
                    <div class="">
                        <div class="modal-header">
                            <div class="page-title">
                                <h4>{{ form_type ? 'ເພີ່ມລົດ' : 'ແກ້ໄຂລົດ' }}</h4>
                            </div>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form @submit.prevent="saveCar">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="new-employee-field">
                                            <div @click="this.$refs.img_car.click()" class="profile-pic-upload mb-2 d-flex justify-content-center cursor-pointer">
                                                <img :src="image_preview" v-if="image_preview" class="img-car">
                                                <div class="profile-pic" v-else>
                                                    <span><vue-feather type="image"></vue-feather> ກົດເພື່ອເລືອກຮູບ</span>
                                                </div>
                                            </div>
                                            <input ref="img_car" type="file" style="display:none;" @change="onselectFile">
                                        </div>
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ຍີ່ຫໍ້<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="car.make" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ລຸ້ນ<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="car.model" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ປ້າຍທະບຽນ<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="car.license_plate" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ລາຄາຕໍ່ວັນ<span class="text-danger ms-1">*</span></label>
                                        <input type="number" v-model="car.daily_rate" class="form-control">
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ປະເພດລົດ<span class="text-danger ms-1">*</span></label>
                                        <select v-model="car.car_type_id" class="form-select">
                                            <option v-for="type in carTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
                                        </select>
                                    </div>
                                    <div class="col-lg-6 mb-3">
                                        <label class="form-label">ສະຖານະ<span class="text-danger ms-1">*</span></label>
                                        <select v-model="car.status" class="form-select">
                                            <option value="available">ວ່າງ</option>
                                            <option value="rented">ຖືກເຊົ່າ</option>
                                            <option value="maintenance">ກຳລັງສ້ອມແປງ</option>
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
            form_type: true, // ໃຊ້ເພື່ອກໍານົດວ່າຟອມແມ່ນສໍາລັບການເພີ່ມ (true) ຫຼືແກ້ໄຂ (false) ລົດ
            status: 'available', // ຕົວກອງສະຖານະລົດ (available, rented, maintenance)
            edit_id: '', // ID ຂອງລົດທີ່ກໍາລັງແກ້ໄຂ
            cars: { // ຂໍ້ມູນລົດທີ່ໄດ້ຮັບຈາກ API
                data: [],
                // ... ຄຸນສົມບັດການແບ່ງໜ້າອື່ນໆ
            },
            car: { // ວັດຖຸສໍາລັບຂໍ້ມູນລົດ
                make: '',
                model: '',
                license_plate: '',
                daily_rate: '',
                car_type_id: '',
                status: 'available',
                image: null,
            },
            carTypes: [], // ລາຍຊື່ປະເພດລົດ
            image_preview: null, // URL ຮູບພາບສໍາລັບການສະແດງຕົວຢ່າງ
            searchQuery: '', // ຄໍາຄົ້ນຫາສໍາລັບລົດ
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
    methods: {
        // ຈັດການການເລືອກໄຟລ໌ຮູບພາບ
        onselectFile(e) {
            const file = e.target.files[0];
            this.car.image = file;
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.image_preview = reader.result;
                }
            }
        },
        // ເປີດ Modal ສໍາລັບການເພີ່ມລົດໃໝ່
        addCar() {
            this.form_type = true; // ຕັ້ງຄ່າເປັນໂໝດສ້າງ
            this.car = { // ລ້າງຂໍ້ມູນຟອມ
                make: '',
                model: '',
                license_plate: '',
                daily_rate: '',
                car_type_id: '',
                status: 'available',
                image: null,
            };
            this.image_preview = null; // ລ້າງຮູບພາບສະແດງຕົວຢ່າງ
            this.modal = new bootstrap.Modal(document.getElementById('add-car')); // ສ້າງ Modal instance
            this.modal.show(); // ສະແດງ Modal
        },
        // ດຶງຂໍ້ມູນລົດຈາກ API
        async getCars() {
            try {
                const response = await this.requestApi.getData(`admin/cars?page=${this.currentPage}&per_page=${this.perPage}&search=${this.searchQuery}&status=${this.status}`);
                this.cars = response.cars;
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        },
        // ດຶງຂໍ້ມູນປະເພດລົດຈາກ API
        async getCarTypes() {
            try {
                const response = await this.requestApi.getData(`admin/car-types?per_page=all`); // ດຶງປະເພດລົດທັງໝົດ
                this.carTypes = response.car_types.data; // ສົມມຸດວ່າ API ສົ່ງຄືນວັດຖຸທີ່ມີການແບ່ງໜ້າພ້ອມກັບ Array 'data'
            } catch (error) {
                console.error("Error fetching car types:", error);
            }
        },
        // ດຶງຂໍ້ມູນລົດເພື່ອແກ້ໄຂ ແລະເປີດ Modal
        async editCar(id) {
            this.form_type = false; // ຕັ້ງຄ່າເປັນໂໝດແກ້ໄຂ
            this.edit_id = id; // ກໍານົດ ID ລົດທີ່ຈະແກ້ໄຂ
            let data = await this.requestApi.getDataByID('admin/cars', id);
            this.car = data.car;
            this.image_preview = this.url + this.car.image_url; // ກໍານົດຮູບພາບສະແດງຕົວຢ່າງ
            this.modal = new bootstrap.Modal(document.getElementById('add-car'));
            this.modal.show();
        },
        // ບັນທຶກ (ເພີ່ມ/ແກ້ໄຂ) ລົດ
        async saveCar() {
            const formData = new FormData(); // ສ້າງ FormData ສໍາລັບການສົ່ງໄຟລ໌
            for (const key in this.car) {
                formData.append(key, this.car[key]);
            }

            try {
                if (this.form_type) {
                    await this.requestApi.postData('admin/cars', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                } else {
                    await this.requestApi.updateData('admin/cars', this.edit_id, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                }
                this.getCars(); // ໂຫຼດຂໍ້ມູນລົດຄືນໃໝ່
                this.modal.hide(); // ເຊື່ອງ Modal
            } catch (error) {
                console.error("Error saving car:", error);
            }
        },
        // ລົບລົດ
        async deleteCar(id) {
            try {
                await this.requestApi.deleteData('admin/cars', id);
                this.getCars(); // ໂຫຼດຂໍ້ມູນລົດຄືນໃໝ່
            } catch (error) {
                console.error("Error deleting car:", error);
            }
        },
        // ປ່ຽນຈໍານວນລາຍການຕໍ່ໜ້າ
        changePerPage(newPerPage) {
            this.perPage = newPerPage;
            this.currentPage = 1;
            this.getCars();
        },
        // ໄປໜ້າທີ່ລະບຸ
        goToPage(page) {
            this.currentPage = page;
            this.getCars();
        },
        // ໄດ້ຮັບ Class ສີສໍາລັບສະຖານະລົດ
        getStatusClass(status) {
            switch (status) {
                case 'available': return 'bg-success';
                case 'rented': return 'bg-warning';
                case 'maintenance': return 'bg-danger';
                default: return 'bg-secondary';
            }
        },
        // ໄດ້ຮັບຂໍ້ຄວາມສະຖານະລົດເປັນພາສາລາວ
        getStatusText(status) {
            switch (status) {
                case 'available': return 'ວ່າງ';
                case 'rented': return 'ຖືກເຊົ່າ';
                case 'maintenance': return 'ກຳລັງສ້ອມແປງ';
                default: return status;
            }
        }
    },
    mounted() {
        // ເມື່ອ component ຖືກ mount, ດຶງຂໍ້ມູນລົດແລະປະເພດລົດ
        this.getCars();
        this.getCarTypes();
    },
    watch: {
        // ຕິດຕາມການປ່ຽນແປງຂອງສະຖານະເພື່ອໂຫຼດຂໍ້ມູນຄືນໃໝ່
        status() {
            this.getCars();
        },
        // ຕິດຕາມການປ່ຽນແປງຂອງຄໍາຄົ້ນຫາເພື່ອໂຫຼດຂໍ້ມູນຄືນໃໝ່
        searchQuery(val) {
            if (val.length == 0) {
                this.getCars();
            }
        }
    }
}
</script>

<style>
.img-car {
    width: 120px;
    height: 120px;
    border-radius: 10px;
    border: 1px dashed #e1dfdf;
    padding: 3px;
    object-fit: cover;
    object-position: center;
}
</style>
