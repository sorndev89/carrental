<template lang="">
    <div class="page-header">
        <div class="add-item d-flex">
            <div class="page-title">
                <h4>ບົດບາດ ແລະ ສິດທິ</h4>
                <h6>ຈັດການບົດບາດຂອງທ່ານ</h6>
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
            <a href="#" class="btn btn-primary" @click="addRole()"><i class="ti ti-circle-plus me-1"></i>ເພີ່ມບົດບາດ</a>
            <a href="#" class="btn btn-secondary ms-2" @click="addPermissionGroup()"><i class="ti ti-plus me-1"></i>ເພີ່ມກຸ່ມສິດ</a>
            
        </div>
    </div>

    <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div class="search-set">
                <div class="search-input">
                    <span class="btn-searchset"><i class="ti ti-search fs-14 feather-search"></i></span>
                    <div class="dataTables_filter"><label> <input type="search" v-model="searchQuery" class="form-control form-control-sm" @keyup.enter="getRoles()" placeholder="ຄົ້ນຫາ..."></label></div>
                </div>
            </div>
            <div class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div class="dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
                        {{ status === 'active' ? 'ເຄື່ອນໄຫວ' : 'ບໍ່ເຄື່ອນໄຫວ' }}
                    </a>
                    <ul class="dropdown-menu  dropdown-menu-end p-3">
                        <li>
                            <a href="javascript:void(0);" @click="status='active'" class="dropdown-item rounded-1">ເຄື່ອນໄຫວ</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" @click="status='inactive'" class="dropdown-item rounded-1">ບໍ່ເຄື່ອນໄຫວ</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table datatable dataTable no-footer">
                    <thead class="thead-light">
                        <tr>
                            <th>ບົດບາດ</th>
                            <th>ວັນທີສ້າງ</th>
                            <th>ສະຖານະ</th>
                            <th>ການກະທຳ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="role in roles.data" :key="role.id">
                            <td>{{ role.name }}</td>
                            <td>{{ role.created_at }}</td>
                            <td>
                                <span :class="['badge', role.status === 'active' ? 'badge-success' : 'badge-danger', 'd-inline-flex', 'align-items-center', 'badge-xs']">
                                    <i class="ti ti-point-filled me-1"></i>{{ role.status === 'active' ? 'ເຄື່ອນໄຫວ' : 'ບໍ່ເຄື່ອນໄຫວ' }}
                                </span>
                            </td>
                            <td>
                                <div class="action-icon d-inline-flex">
                                    <a href="javascript:void(0);" class="me-2 d-flex align-items-center p-2 border rounded" @click="editRole(role.id)"><i class="ti ti-edit"></i></a>
                                    <a href="javascript:void(0);" class="d-flex align-items-center p-2 border rounded" @click="deleteRole(role.id)"><i class="ti ti-trash"></i></a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Pagination :pagination="roles" @change-per-page="changePerPage" @go-to-page="goToPage" />
        </div>
    </div>

    <div class="card mt-4">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div class="page-title">
                <h4>ກຸ່ມສິດ</h4>
                <h6>ຈັດການກຸ່ມສິດຂອງທ່ານ</h6>
            </div>
            <div class="search-set">
                <div class="search-input">
                    <span class="btn-searchset"><i class="ti ti-search fs-14 feather-search"></i></span>
                    <div class="dataTables_filter"><label> <input type="search" v-model="searchQueryPermission" class="form-control form-control-sm" @keyup.enter="getPermissions()" placeholder="ຄົ້ນຫາກຸ່ມສິດ..."></label></div>
                </div>
            </div>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table datatable dataTable no-footer">
                    <thead class="thead-light">
                        <tr>
                            <th>ຊື່ກຸ່ມ</th>
                            <th>Key ສິດທິ</th>
                            <th>ການກະທຳ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="permissionGroup in allPermissions" :key="permissionGroup.id">
                            <td>{{ permissionGroup.name }}</td>
                            <td>
                                <span v-for="(key, kIndex) in permissionGroup.key" :key="kIndex" class="badge bg-primary me-1 mb-1">
                                    {{ key.name }}
                                </span>
                            </td>
                            <td>
                                <div class="action-icon d-inline-flex">
                                    <a href="javascript:void(0);" class="me-2 d-flex align-items-center p-2 border rounded" @click="editPermissionGroup(permissionGroup.id)"><i class="ti ti-edit"></i></a>
                                    <a href="javascript:void(0);" class="d-flex align-items-center p-2 border rounded" @click="deletePermissionGroup(permissionGroup.id)"><i class="ti ti-trash"></i></a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Add/Edit Role Modal -->
    <div class="modal fade" id="add-role">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="page-title">
                        <h4>{{ form_type ? 'ສ້າງບົດບາດ' : 'ແກ້ໄຂບົດບາດ' }}</h4>
                    </div>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
				 <!-- {{role}} -->
                <form @submit.prevent="saveRole">
                    <div class="modal-body">
                        <div class="row">
							<div class="mb-3 col-md-6">
								<label class="form-label">ຊື່ບົດບາດ<span class="text-danger ms-1">*</span></label>
								<input type="text" v-model="role.name" class="form-control">
							</div>
							<div class="col-md-6 d-flex align-items-center  mb-3">
								<label class="form-label me-3 mb-0">ສະຖານະ:</label>
								<label class="switch">
									<input type="checkbox" v-model="role.status" true-value="active" false-value="inactive">
									<span class="slider round"></span>
								</label>
							</div>
						</div>

                        <div class="mb-3">
                            <label class="form-label">ສິດທິ</label> 
							<div class=" d-flex mb-2 border-bottom" v-for="(permission,pindex) in allPermissions" :key="permission.id">
								<div style=" width:180px">
									{{ permission.name }}
								</div>
								<div class=" d-flex mb-2  align-items-center" >
									<div class="me-2" v-for="(permissionKey,index) in permission.key" :key="permissionKey">
										<input type="checkbox" class="me-1" :id="'rd'+index+pindex" :checked="isPermissionChecked(permission, permissionKey)" @change="handlePermissionChange($event.target.checked, permission, permissionKey)"> 
									    <label :for="'rd'+index+pindex"> {{ permissionKey.name }} </label>	
									</div>
								</div>
							</div>
                        </div>
                        <div v-if="validationError" class="alert alert-danger d-flex align-items-center" role="alert">
                            <vue-feather type="alert-triangle" class="me-2"></vue-feather>
                            <div>
                                {{ validationError }}
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

    <!-- Add/Edit Permission Group Modal -->
    <div class="modal fade" id="add-permission-group">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="page-title">
                        <h4>{{ form_type_permission_group ? 'ສ້າງກຸ່ມສິດ' : 'ແກ້ໄຂກຸ່ມສິດ' }}</h4>
                    </div>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="savePermissionGroup">
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">ຊື່ກຸ່ມ<span class="text-danger ms-1">*</span></label>
                            <input type="text" v-model="newPermissionGroup.name" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Key ສິດທິ</label>
                            <div v-for="(keyField, index) in newPermissionGroup.key" :key="index" class="d-flex mb-2 align-items-center">
                                <input type="text" v-model="keyField.name" class="form-control me-2" placeholder="ຊື່ສິດ">
                                <input type="text" v-model="keyField.key" class="form-control me-2" placeholder="Key ສິດ (ຕົວຢ່າງ: booking-view)">
                                <button type="button" class="btn btn-danger btn-sm" @click="removePermissionKeyField(index)">
                                    <i class="ti ti-minus"></i>
                                </button>
                            </div>
                            <button type="button" class="btn btn-primary btn-sm" @click="addPermissionKeyField()">
                                <i class="ti ti-plus me-1"></i>ເພີ່ມ Key
                            </button>
                        </div>
                        <div v-if="permissionGroupValidationError" class="alert alert-danger d-flex align-items-center" role="alert">
                            <vue-feather type="alert-triangle" class="me-2"></vue-feather>
                            <div>
                                {{ permissionGroupValidationError }}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary me-2" :disabled="!isPermissionGroupFormValid">ບັນທຶກ</button>
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

export default {
    components: {
        Pagination
    },
    data() {
     
        return {
            url: window.location.origin, // URL ຫຼັກຂອງແອັບພລິເຄຊັນ
            form_type: true, // ໃຊ້ເພື່ອກໍານົດວ່າຟອມແມ່ນສໍາລັບການສ້າງ (true) ຫຼືແກ້ໄຂ (false) ບົດບາດ
            form_type_permission_group: true, // ໃຊ້ເພື່ອກໍານົດວ່າຟອມແມ່ນສໍາລັບການສ້າງ (true) ຫຼືແກ້ໄຂ (false) ກຸ່ມສິດ
            edit_id: '', // ID ຂອງບົດບາດທີ່ກໍາລັງແກ້ໄຂ
            edit_permission_group_id: '', // ID ຂອງກຸ່ມສິດທີ່ກໍາລັງແກ້ໄຂ
            roles: {
                data: [], // ຂໍ້ມູນບົດບາດທີ່ໄດ້ຮັບຈາກ API
            },
            role: {
                name: '', // ຊື່ບົດບາດ
                status: 'active', // ສະຖານະຂອງບົດບາດ (active/inactive)
                permissions: [], // Array ຂອງສິດທິທີ່ກ່ຽວຂ້ອງກັບບົດບາດ
            },
            allPermissions: [], // ຂໍ້ມູນສິດທິທັງໝົດທີ່ໄດ້ຮັບຈາກ API
            searchQuery: '', // ຄໍາຄົ້ນຫາສໍາລັບບົດບາດ
            currentPage: 1, // ໜ້າປັດຈຸບັນຂອງການແບ່ງໜ້າບົດບາດ
            perPage: 10, // ຈໍານວນລາຍການຕໍ່ໜ້າສໍາລັບບົດບາດ
            status: 'active', // ຕົວກອງສະຖານະສໍາລັບບົດບາດ
            modal: null, // Instance ຂອງ Modal ສໍາລັບບົດບາດ
            permissionGroupModal: null, // Instance ຂອງ Modal ສໍາລັບກຸ່ມສິດ
            newPermissionGroup: {
                name: '', // ຊື່ກຸ່ມສິດໃໝ່
                key: [{ name: '', key: '' }], // Array ຂອງວັດຖຸ { name: '', key: '' } ສໍາລັບ Key ສິດທິ
            },
            searchQueryPermission: '', // ຄໍາຄົ້ນຫາສໍາລັບກຸ່ມສິດ
        }
    },
  

    setup() {
        // ໃຊ້ Pinia store ສໍາລັບການຮ້ອງຂໍ API
        const requestApi = useRequestApiStore();
        return { requestApi };
    },
    computed: {
        // ກວດສອບຄວາມຜິດພາດໃນການປ້ອນຂໍ້ມູນຊື່ບົດບາດ
        validationError() {
            if (!this.role.name) {
                return 'ຊື່ບົດບາດຕ້ອງບໍ່ຫວ່າງ!';
            }
            return '';
        },
        // ກວດສອບວ່າຟອມບົດບາດຖືກຕ້ອງຕາມກົດເກນຫຼືບໍ່
        isFormValid() {
            return !!this.role.name;
        },
        // ກວດສອບຄວາມຜິດພາດໃນການປ້ອນຂໍ້ມູນສໍາລັບກຸ່ມສິດ
        permissionGroupValidationError() {
            if (!this.newPermissionGroup.name) {
                return 'ຊື່ກຸ່ມສິດ ຕ້ອງບໍ່ຫວ່າງ!';
            }
            for (const keyField of this.newPermissionGroup.key) {
                if (!keyField.name || !keyField.key) {
                    return 'ຊື່ສິດ ແລະ Key ຕ້ອງບໍ່ຫວ່າງ!';
                }
                // ກວດສອບຮູບແບບຂອງ Key ສິດທິ (ຕ້ອງເປັນຕົວອັກສອນພາສາອັງກິດ, ຕົວເລກ, ຫຼືເຄື່ອງໝາຍຂີດກາງເທົ່ານັ້ນ)
                if (!keyField.key.match(/^[a-zA-Z0-9-]+$/)) {
                    return 'Key ສິດທິ ຕ້ອງເປັນຕົວອັກສອນພາສາອັງກິດ, ຕົວເລກ, ຫຼືເຄື່ອງໝາຍຂີດກາງເທົ່ານັ້ນ!';
                }
            }
            return '';
        },
        // ກວດສອບວ່າຟອມກຸ່ມສິດຖືກຕ້ອງຕາມກົດເກນຫຼືບໍ່
        isPermissionGroupFormValid() {
            return !!this.newPermissionGroup.name && this.newPermissionGroup.key.length > 0 && !this.permissionGroupValidationError;
        }
    },
    methods: {
        // ກວດສອບວ່າສິດທິໃດໜຶ່ງຖືກເລືອກໄວ້ແລ້ວໃນບົດບາດປັດຈຸບັນ
        isPermissionChecked(permissionGroup, permissionKey) {
            const foundGroup = this.role.permissions.find(
                (group) => group.name === permissionGroup.name
            );
            return foundGroup && foundGroup.key.some(k => k.key === permissionKey.key);
        },
        // ຈັດການການປ່ຽນແປງຂອງ checkbox ສິດທິ
        handlePermissionChange(isChecked, permissionGroup, permissionKey) {
            let foundGroup = this.role.permissions.find(
                (group) => group.name === permissionGroup.name
            );

            if (isChecked) {
                // ຖ້າຖືກເລືອກ: ເພີ່ມກຸ່ມສິດຖ້າບໍ່ມີ, ແລ້ວເພີ່ມ Key ສິດທິ
                if (!foundGroup) {
                    foundGroup = { name: permissionGroup.name, key: [] };
                    this.role.permissions.push(foundGroup);
                }
                if (!foundGroup.key.some(k => k.key === permissionKey.key)) {
                    foundGroup.key.push(permissionKey);
                }
            } else {
                // ຖ້າບໍ່ຖືກເລືອກ: ລົບ Key ສິດທິອອກ, ຖ້າກຸ່ມສິດບໍ່ມີ Key ແລ້ວ, ລົບກຸ່ມສິດອອກ
                if (foundGroup) {
                    foundGroup.key = foundGroup.key.filter(
                        (keyObj) => keyObj.key !== permissionKey.key
                    );
                    if (foundGroup.key.length === 0) {
                        this.role.permissions = this.role.permissions.filter(
                            (group) => group.name !== permissionGroup.name
                        );
                    }
                }
            }
        },
        // ເປີດ Modal ສໍາລັບການເພີ່ມບົດບາດໃໝ່
        addRole() {
            this.form_type = true; // ຕັ້ງຄ່າເປັນໂໝດສ້າງ
            this.role = { // ລ້າງຂໍ້ມູນຟອມ
                name: '',
                status: 'active',
                permissions: [],
            };
            this.modal.show(); // ສະແດງ Modal
        },
        // ເປີດ Modal ສໍາລັບການເພີ່ມກຸ່ມສິດໃໝ່
        addPermissionGroup() {
            this.form_type_permission_group = true; // ຕັ້ງຄ່າເປັນໂໝດສ້າງ
            this.newPermissionGroup = { // ລ້າງຂໍ້ມູນຟອມ
                name: '',
                key: [{ name: '', key: '' }], // ເລີ່ມຕົ້ນດ້ວຍໜຶ່ງຊ່ອງ Key ເປົ່າ
            };
            this.permissionGroupModal.show(); // ສະແດງ Modal
        },
        // ເພີ່ມຊ່ອງປ້ອນຂໍ້ມູນ Key ສິດທິໃໝ່ໃນຟອມກຸ່ມສິດ
        addPermissionKeyField() {
            this.newPermissionGroup.key.push({ name: '', key: '' });
        },
        // ລົບຊ່ອງປ້ອນຂໍ້ມູນ Key ສິດທິອອກຈາກຟອມກຸ່ມສິດ
        removePermissionKeyField(index) {
            this.newPermissionGroup.key.splice(index, 1);
        },
        // ດຶງຂໍ້ມູນບົດບາດຈາກ API
        async getRoles() {
            try {
                const response = await this.requestApi.getData(`admin/roles?page=${this.currentPage}&per_page=${this.perPage}&search=${this.searchQuery}&status=${this.status}`);
                this.roles = response.roles; // ກໍານົດຂໍ້ມູນບົດບາດ
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        },
        // ດຶງຂໍ້ມູນສິດທິທັງໝົດຈາກ API
        async getPermissions() {
            try {
                const response = await this.requestApi.getData(`admin/permissions?search=${this.searchQueryPermission}`);
                this.allPermissions = response.permissions.data; // ກໍານົດຂໍ້ມູນສິດທິ
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        },
        // ດຶງຂໍ້ມູນບົດບາດເພື່ອແກ້ໄຂ ແລະເປີດ Modal
        async editRole(id) {
            this.form_type = false; // ຕັ້ງຄ່າເປັນໂໝດແກ້ໄຂ
            this.edit_id = id; // ກໍານົດ ID ບົດບາດທີ່ຈະແກ້ໄຂ
            try {
                let data = await this.requestApi.getDataByID('admin/roles', id);
                let structuredPermissions = [];
                // ຈັດໂຄງສ້າງສິດທິທີ່ໄດ້ຮັບໃຫ້ເຂົ້າກັບຮູບແບບຂອງຟອມ
                if (data.role.permissions && Array.isArray(data.role.permissions)) {
                    data.role.permissions.forEach(grantedPermKey => {
                        const group = this.allPermissions.find(ap => ap.key && ap.key.some(k => k.key === grantedPermKey));
						
                        if (group) {
                            let existingGroupInStructured = structuredPermissions.find(sp => sp.name === group.name);
                            if (!existingGroupInStructured) {
                                existingGroupInStructured = { name: group.name, key: [] };
                                structuredPermissions.push(existingGroupInStructured);
                            }
                            const actualPermission = group.key.find(k => k.key === grantedPermKey);
                            if (actualPermission && !existingGroupInStructured.key.some(k => k.key === actualPermission.key)) {
                                existingGroupInStructured.key.push(actualPermission);
                            }
                        }
                    });
                }
                this.role = { // ກໍານົດຂໍ້ມູນບົດບາດໃນຟອມ
                    name: data.role.name,
                    status: data.role.status,
                    permissions: structuredPermissions,
                };
                this.modal.show(); // ສະແດງ Modal
            } catch (error) {
                console.error("Error fetching role for edit:", error);
            }
        },
        // ບັນທຶກ (ສ້າງ/ແກ້ໄຂ) ບົດບາດ
        async saveRole() {
            try {
				// ດຶງສະເພາະ Key ຂອງສິດທິທີ່ຖືກເລືອກ
				const permissionKeys = this.role.permissions.flatMap(group => group.key.map(k => k.key));
                const payload = { // ສ້າງ payload ສໍາລັບການຮ້ອງຂໍ API
                    name: this.role.name,
                    status: this.role.status,
                    permissions: JSON.stringify(permissionKeys), // ແປງ Array ຂອງ Key ສິດທິເປັນ JSON string
                };

			
                if (this.form_type) {
                    await this.requestApi.postData('admin/roles', payload); // ສົ່ງຂໍ້ມູນເພື່ອສ້າງບົດບາດໃໝ່
                } else {
                    await this.requestApi.updateData('admin/roles', this.edit_id, payload); // ສົ່ງຂໍ້ມູນເພື່ອແກ້ໄຂບົດບາດທີ່ມີຢູ່
                }
                this.getRoles(); // ໂຫຼດຂໍ້ມູນບົດບາດຄືນໃໝ່
                this.modal.hide(); // ເຊື່ອງ Modal
            } catch (error) {
                console.error("Error saving role:", error);
            }
        },
        // ດຶງຂໍ້ມູນກຸ່ມສິດເພື່ອແກ້ໄຂ ແລະເປີດ Modal
        async editPermissionGroup(id) {
            this.form_type_permission_group = false; // ຕັ້ງຄ່າເປັນໂໝດແກ້ໄຂ
            this.edit_permission_group_id = id; // ກໍານົດ ID ກຸ່ມສິດທີ່ຈະແກ້ໄຂ
            try {
                let data = await this.requestApi.getDataByID('admin/permissions', id);
				this.newPermissionGroup = data.permission; // ກໍານົດຂໍ້ມູນກຸ່ມສິດໃນຟອມ

                this.permissionGroupModal.show(); // ສະແດງ Modal
            } catch (error) {
                console.error("Error fetching permission group for edit:", error);
            }
        },
        // ບັນທຶກ (ສ້າງ/ແກ້ໄຂ) ກຸ່ມສິດ
        async savePermissionGroup() {
            try {
                if (this.form_type_permission_group) {
                    await this.requestApi.postData('admin/permissions', this.newPermissionGroup); // ສົ່ງຂໍ້ມູນເພື່ອສ້າງກຸ່ມສິດໃໝ່
                } else {
					// ແປງ Array ຂອງ Key ສິດທິເປັນ JSON string ກ່ອນສົ່ງ
					this.newPermissionGroup.key_new = JSON.stringify(this.newPermissionGroup.key);
                    await this.requestApi.updateData('admin/permissions', this.edit_permission_group_id, this.newPermissionGroup); // ສົ່ງຂໍ້ມູນເພື່ອແກ້ໄຂກຸ່ມສິດທີ່ມີຢູ່
                }
                this.getPermissions(); // ໂຫຼດຂໍ້ມູນກຸ່ມສິດຄືນໃໝ່
                this.permissionGroupModal.hide(); // ເຊື່ອງ Modal

            } catch (error) {
                console.error("Error saving permission group:", error);
            }
        },
        // ລົບກຸ່ມສິດ
        async deletePermissionGroup(id) {
            try {
                await this.requestApi.deleteData('admin/permissions', id); // ສົ່ງຄໍາຮ້ອງຂໍລົບກຸ່ມສິດ
                this.getPermissions(); // ໂຫຼດຂໍ້ມູນກຸ່ມສິດຄືນໃໝ່
            } catch (error) {
                console.error("Error deleting permission group:", error);
            }
        },
        // ປ່ຽນຈໍານວນລາຍການຕໍ່ໜ້າສໍາລັບບົດບາດ
        changePerPage(newPerPage) {
            this.perPage = newPerPage;
            this.currentPage = 1; // ຕັ້ງຄ່າໜ້າປັດຈຸບັນເປັນ 1
            this.getRoles(); // ໂຫຼດຂໍ້ມູນບົດບາດຄືນໃໝ່
        },
        // ໄປໜ້າທີ່ລະບຸສໍາລັບບົດບາດ
        goToPage(page) {
            this.currentPage = page;
            this.getRoles(); // ໂຫຼດຂໍ້ມູນບົດບາດຄືນໃໝ່
        },
    },
    mounted() {
        // ເມື່ອ component ຖືກ mount, ດຶງຂໍ້ມູນບົດບາດແລະສິດທິ
        this.getRoles();
        this.getPermissions();
        // ສ້າງ instances ຂອງ Bootstrap Modal
        this.modal = new bootstrap.Modal(document.getElementById('add-role'));
        this.permissionGroupModal = new bootstrap.Modal(document.getElementById('add-permission-group'));
    },
    watch: {
        // ຕິດຕາມການປ່ຽນແປງຂອງຄໍາຄົ້ນຫາສໍາລັບບົດບາດ
        searchQuery(val) {
            if (val.length === 0 || val.length > 2) { // ດໍາເນີນການຄົ້ນຫາເມື່ອຄໍາຄົ້ນຫາຫວ່າງເປົ່າ ຫຼືມີຫຼາຍກວ່າ 2 ຕົວອັກສອນ
                this.getRoles();
            }
        },
        // ຕິດຕາມການປ່ຽນແປງຂອງສະຖານະຕົວກອງສໍາລັບບົດບາດ
        status() {
            this.getRoles();
        },
        // ຕິດຕາມການປ່ຽນແປງຂອງຄໍາຄົ້ນຫາສໍາລັບກຸ່ມສິດ
        searchQueryPermission(val) {
            if (val.length === 0 || val.length > 2) {
                this.getPermissions();
            }
        }
    }
}
</script>
<style lang="">
    /* Add any specific styles here if needed */
</style>
