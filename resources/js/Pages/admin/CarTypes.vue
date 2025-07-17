<template lang="">
    <div class="page-header">
        <div class="add-item d-flex">
            <div class="page-title">
                <h4 class="fw-bold">ປະເພດລົດ</h4>
                <h6>ຈັດການປະເພດລົດຂອງທ່ານ</h6>
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
            <a href="#" class="btn btn-primary" @click="addCarType()"><i class="ti ti-circle-plus me-1"></i>ເພີ່ມປະເພດລົດ</a>
        </div>
    </div>

    <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div class="search-set">
                <div class="search-input">
                    <span class="btn-searchset"><i class="ti ti-search fs-14 feather-search"></i></span>
                    <div class="dataTables_filter"><label> <input type="search" v-model="searchQuery" class="form-control form-control-sm" @keyup.enter="getCarTypes()" placeholder="ຄົ້ນຫາ..."></label></div>
                </div>
            </div>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table datatable">
                    <thead class="thead-light">
                        <tr>
                            <th>ຊື່</th>
                            <th>ລາຍລະອຽດ</th>
                            <th>ການກະທຳ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="carType in carTypes.data" :key="carType.id">
                            <td>{{ carType.name }}</td>
                            <td>{{ carType.description }}</td>
                            <td class="action-table-data">
                                <div class="edit-delete-action">
                                    <a class="me-2 p-2 mb-0" @click="editCarType(carType.id)" href="javascript:void(0);">
                                        ແກ້ໄຂ
                                    </a>
                                    <a class="p-2 mb-0" href="javascript:void(0);" @click="deleteCarType(carType.id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination :pagination="carTypes" @change-per-page="changePerPage" @go-to-page="goToPage" />
        </div>
    </div>

    <!-- Add/Edit Car Type Modal -->
    <div class="modal fade" id="add-car-type">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="page-wrapper-new p-0">
                    <div class="">
                        <div class="modal-header">
                            <div class="page-title">
                                <h4>{{ form_type ? 'ເພີ່ມປະເພດລົດ' : 'ແກ້ໄຂປະເພດລົດ' }}</h4>
                            </div>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form @submit.prevent="saveCarType">
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-lg-12 mb-3">
                                        <label class="form-label">ຊື່<span class="text-danger ms-1">*</span></label>
                                        <input type="text" v-model="carType.name" class="form-control">
                                    </div>
                                    <div class="col-lg-12 mb-3">
                                        <label class="form-label">ລາຍລະອຽດ</label>
                                        <textarea v-model="carType.description" class="form-control"></textarea>
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
            form_type: true, // ໃຊ້ເພື່ອກໍານົດວ່າຟອມແມ່ນສໍາລັບການເພີ່ມ (true) ຫຼືແກ້ໄຂ (false) ປະເພດລົດ
            edit_id: '', // ID ຂອງປະເພດລົດທີ່ກໍາລັງແກ້ໄຂ
            carTypes: { // ຂໍ້ມູນປະເພດລົດທີ່ໄດ້ຮັບຈາກ API
                data: [],
                // ... ຄຸນສົມບັດການແບ່ງໜ້າອື່ນໆ
            },
            carType: { // ວັດຖຸສໍາລັບຂໍ້ມູນປະເພດລົດ
                name: '',
                description: '',
            },
            searchQuery: '', // ຄໍາຄົ້ນຫາສໍາລັບປະເພດລົດ
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
        // ເປີດ Modal ສໍາລັບການເພີ່ມປະເພດລົດໃໝ່
        addCarType() {
            this.form_type = true; // ຕັ້ງຄ່າເປັນໂໝດສ້າງ
            this.carType = { // ລ້າງຂໍ້ມູນຟອມ
                name: '',
                description: '',
            };
            this.modal = new bootstrap.Modal(document.getElementById('add-car-type')); // ສ້າງ Modal instance
            this.modal.show(); // ສະແດງ Modal
        },
        // ດຶງຂໍ້ມູນປະເພດລົດຈາກ API
        async getCarTypes() {
            try {
                const response = await this.requestApi.getData(`admin/car-types?page=${this.currentPage}&per_page=${this.perPage}&search=${this.searchQuery}`);
                this.carTypes = response.car_types;
            } catch (error) {
                console.error("Error fetching car types:", error);
            }
        },
        // ດຶງຂໍ້ມູນປະເພດລົດເພື່ອແກ້ໄຂ ແລະເປີດ Modal
        async editCarType(id) {
            this.form_type = false; // ຕັ້ງຄ່າເປັນໂໝດແກ້ໄຂ
            this.edit_id = id; // ກໍານົດ ID ປະເພດລົດທີ່ຈະແກ້ໄຂ
            let data = await this.requestApi.getDataByID('admin/car-types', id);
            this.carType = data.car_type;
            this.modal = new bootstrap.Modal(document.getElementById('add-car-type'));
            this.modal.show();
        },
        // ບັນທຶກ (ເພີ່ມ/ແກ້ໄຂ) ປະເພດລົດ
        async saveCarType() {
            try {
                if (this.form_type) {
                    await this.requestApi.postData('admin/car-types', this.carType);
                } else {
                    await this.requestApi.updateData('admin/car-types', this.edit_id, this.carType);
                }
                this.getCarTypes(); // ໂຫຼດຂໍ້ມູນປະເພດລົດຄືນໃໝ່
                this.modal.hide(); // ເຊື່ອງ Modal
            } catch (error) {
                console.error("Error saving car type:", error);
            }
        },
        // ລົບປະເພດລົດ
        async deleteCarType(id) {
            try {
                await this.requestApi.deleteData('admin/car-types', id);
                this.getCarTypes(); // ໂຫຼດຂໍ້ມູນປະເພດລົດຄືນໃໝ່
            } catch (error) {
                console.error("Error deleting car type:", error);
            }
        },
        // ປ່ຽນຈໍານວນລາຍການຕໍ່ໜ້າ
        changePerPage(newPerPage) {
            this.perPage = newPerPage;
            this.currentPage = 1;
            this.getCarTypes();
        },
        // ໄປໜ້າທີ່ລະບຸ
        goToPage(page) {
            this.currentPage = page;
            this.getCarTypes();
        },
    },
    mounted() {
        // ເມື່ອ component ຖືກ mount, ດຶງຂໍ້ມູນປະເພດລົດ
        this.getCarTypes();
        // ສ້າງ instance ຂອງ Bootstrap Modal
        this.modal = new bootstrap.Modal(document.getElementById('add-car-type'));
    },
    watch: {
        // ຕິດຕາມການປ່ຽນແປງຂອງຄໍາຄົ້ນຫາເພື່ອໂຫຼດຂໍ້ມູນຄືນໃໝ່
        searchQuery(val) {
            if (val.length == 0) {
                this.getCarTypes();
            }
        }
    }
}
</script>

<style>

</style>
