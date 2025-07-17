<template lang="">
   
					<div class="page-header">
						<div class="add-item d-flex">
							<div class="page-title">
								<h4 class="fw-bold">ຜູ້ໃຊ້</h4>
								<h6>ຈັດການຜູ້ໃຊ້ຂອງທ່ານ</h6>
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
							                                                        <a href="#" class="btn btn-primary" @click="addUser()"><i class="ti ti-circle-plus me-1"></i>ເພີ່ມຜູ້ໃຊ້</a>
						</div>
					</div>


					<!-- /product list -->
					<div class="card">
						<div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
							<div class="search-set">
								<div class="search-input">
									<span class="btn-searchset"><i class="ti ti-search fs-14 feather-search"></i></span>
								                                <div id="DataTables_Table_0_filter" class="dataTables_filter"><label> <input type="search" v-model="searchQuery" class="form-control form-control-sm" @keyup.enter="getUser()" placeholder="ຄົ້ນຫາ..." aria-controls="DataTables_Table_0"></label></div></div>
							</div>
							<div class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
										
								<div class="dropdown">
									<a href="javascript:void(0);" class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
										                                        {{ status==='active' ? 'ເຄື່ອນໄຫວ' : 'ບໍ່ເຄື່ອນໄຫວ' }}

									</a>
									<ul class="dropdown-menu  dropdown-menu-end p-3">
										                                        <li>
                                            <a href="javascript:void(0);" @click="status='active'" class="dropdown-item rounded-1">ເຄື່ອນໄຫວ</a>
                                        </li>
										<li>
											<a href="javascript:void(0);" @click="status='inactive'" class="dropdown-item rounded-1">Inactive</a>
										</li>
							
									</ul>
								</div>
							</div>
						</div>
						<div class="card-body p-0">
							<div class="table-responsive">
								<div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer table-responsive"><table class="table datatable dataTable no-footer" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info">
									<thead class="thead-light">
										<tr><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="User Name: activate to sort column ascending" style="width: 138.805px;">User Name</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Phone: activate to sort column ascending" style="width: 94.8047px;">Phone</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending" style="width: 144.555px;">Email</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Role: activate to sort column ascending" style="width: 91.3828px;">Role</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label="Status: activate to sort column ascending" style="width: 49.2734px;">Status</th><th class="no-sort sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-label=": activate to sort column ascending" style="width: 106px;"></th></tr>
									</thead>
									<tbody>					
									<tr class="odd" v-for="user in users.data" :key="user.id">
											<td>
												<div class="d-flex align-items-center">
													<a href="javascript:void(0);" class="avatar avatar-md me-2" v-if="user.profile_image_url">
														<img :src="url + '/'+user.profile_image_url" >
													</a>
													<a href="javascript:void(0);" class="avatar avatar-md me-2" v-else>
														<img :src="url + '/assets/img/no-profile-picture-icon.png'" >
													</a>
													<a href="javascript:void(0);"> {{ requestApi.getGender(user.gender) }} {{ user.first_name + ' ' + user.last_name }}</a>
												</div>
											</td>
											<td>{{ user.phone_number }}</td>
											<td>{{ user.email }}</td>
											<td>{{ user.role_name }}</td>
											<td>
												<span v-if="user.status === 'active'" class="d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white bg-success fs-10">
													<i class="ti ti-point-filled me-1 fs-11"></i>Active</span>
												<span v-else class="d-inline-flex align-items-center p-1 pe-2 rounded-1 text-white bg-danger fs-10">
													<i class="ti ti-point-filled me-1 fs-11"></i>InActive</span>
											</td>
											<td class="action-table-data">
												<div class="edit-delete-action">
													<a class="me-2 p-2 mb-0" href="javascript:void(0);">
														<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye action-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
													</a>
													<a class="me-2 p-2 mb-0" @click="editUser(user.id)" href="javascript:void(0);">
														ແກ້ໄຂ
													</a>
													<a class="p-2 mb-0" href="javascript:void(0);" @click="deleteUser(user.id)">
														<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
													</a>
												</div>
											</td>
										</tr>
										</tbody>
								</table>
                                </div>

                                <Pagination :pagination="users" @change-per-page="changePerPage" @go-to-page="goToPage" />

                                    
                            </div>
                                    
                                    
							
						</div>
					</div>
					<!-- /product list -->

                    <!-- Add User -->
		<div class="modal fade" id="add-user">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="page-wrapper-new p-0">
						<div class="">
							<div class="modal-header">
								<div class="page-title">
									<h4>Add User</h4>
								</div>
								<button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<form @submit.prevent="saveUser">
								<div class="modal-body">
									<div class="row">
										<div class="col-lg-12">
											<div class="new-employee-field">
												<div @click="this.$refs.img_user.click()" class="profile-pic-upload mb-2 d-flex justify-content-center cursor-pointer">
													<img :src="image_preview" v-if="user.profile_image_url" class="img-user">
													<div class="profile-pic" v-else> 
														<span >
															<vue-feather type="image" ></vue-feather>
														ກົເເພື່ອເລືອກຮູບ</span>
													</div>
													
													<!-- <p class="fs-13 mt-2">JPEG, PNG up to 2 MB</p> -->
												</div>
												<input ref="img_user" type="file" style="display:none;" @change="onselectFile">
												
											</div>
										</div> 
										<div class="row">
											<div class=" col-lg-6 mb-3">
												<label class="form-label">ຊື່:<span class="text-danger ms-1">*</span></label>
												<input type="text" v-model="user.first_name" class="form-control">
											</div>
											<div class=" col-lg-6 mb-3">
												<label class="form-label">ນາມສະກຸນ</label>
												<input type="text" v-model="user.last_name" class="form-control">
											</div>
										</div>
										<div class="col-lg-6">
											<div class="mb-3">
												<label class="form-label">ເພດ:<span class="text-danger ms-1">*</span></label>
												<select v-model="user.gender" class="select">
													<option value="">Select</option>
													<option value="Male">ຊາຍ</option>
													<option value="Female">ຍິງ</option>
												</select>
											</div>
										</div>
										<div class="col-lg-6">
											<div class="mb-3">
												<label class="form-label">Role:<span class="text-danger ms-1">*</span></label>
												<select v-model="user.role_id" class="select">
													<option value="">Select Role</option>
													<option v-for="role in rolesList" :key="role.id" :value="role.id">{{ role.name }}</option>
												</select>
											</div>
										</div>
										<div class="col-lg-12">
											<div class="mb-3">
												<label class="form-label">ອີເມວລ໌:<span class="text-danger ms-1">*</span></label>
												<input type="email" v-model="user.email" class="form-control">
											</div>
										</div>
										<div class="col-lg-6">
											<div class="mb-3">
												<label class="form-label">ລະຫັດຜ່ານ:<span class="text-danger ms-1">*</span></label>
												<div class="pass-group">
													<input :type="show_pass" v-model="user_password" class="pass-input form-control">
													<span  @click="show_pass = show_pass === 'password' ? 'text' : 'password'">
														<i class="ti ti-eye-off toggle-password" v-if="show_pass === 'password'"></i>
														<i class="ti ti-eye toggle-password" v-else></i>
													</span>
												</div>
											</div>
										</div>
										<div class="col-lg-6">
											<div class="mb-3">
												<label class="form-label">ຍືນຍັນ ລະຫັດຜ່ານ:<span class="text-danger ms-1">*</span></label>
												<div class="pass-group">
													<input :type="show_pass" v-model="user_confirm_password" class="pass-input form-control">
													<span  @click="show_pass = show_pass === 'password' ? 'text' : 'password'">
														<i class="ti ti-eye-off toggle-password" v-if="show_pass === 'password'" ></i>
														<i class="ti ti-eye toggle-password" v-else ></i>
													</span>
												</div>
											</div>
										</div>
										<div class="col-lg-6">
											<div class="mb-3">
												<label class="form-label">ເບີໂທ:<span class="text-danger ms-1">*</span></label>
												<input type="tel" v-model="user.phone_number" class="form-control">
											</div>
										</div>
										<div class="col-lg-6">
											<div class="mb-3">
												<label class="form-label">ສະຖານະ:</label>
												<select v-model="user.status" class="select">
													<option value="active">Active</option>
													<option value="inactive">InActive</option>
												</select>
											</div>
										</div>
										<!-- <div class="col-lg-12">
											<div class="status-toggle modal-status d-flex justify-content-between align-items-center">
												<span class="status-label">Status</span>
												<input type="checkbox" id="user1" class="check" checked="">
												<label for="user1" class="checktoggle">	</label>
											</div>
										</div> -->
										<div v-if="validationError" class="alert alert-danger d-flex align-items-center" role="alert">
											<vue-feather type="alert-triangle" class="me-2"></vue-feather>
											<div>
											 {{validationError}}
											</div>
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
		<!-- /Add User -->
		
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
            url:window.location.origin, // URL ຫຼັກຂອງແອັບພລິເຄຊັນ
			from_type:true, // ໃຊ້ເພື່ອກໍານົດວ່າຟອມແມ່ນສໍາລັບການເພີ່ມ (true) ຫຼືແກ້ໄຂ (false) ຜູ້ໃຊ້
			status:'active', // ຕົວກອງສະຖານະຜູ້ໃຊ້ (active/inactive)
			edit_id:'', // ID ຂອງຜູ້ໃຊ້ທີ່ກໍາລັງແກ້ໄຂ
            users: { // ຂໍ້ມູນຜູ້ໃຊ້ທີ່ໄດ້ຮັບຈາກ API
                current_page: 1,
                data: [],
                from: 0,
                to: 0,
                total: 0,
                per_page: 10,
                links: [],
                prev_page_url: null,
                next_page_url: null,
            },
            user: { // ວັດຖຸສໍາລັບຂໍ້ມູນຜູ້ໃຊ້
                first_name: '',
                last_name: '',
				gender: '',
                email: '',
                phone_number: '',
                profile_image_url: '',
                role_id: '', // ID ບົດບາດ
				status:'active'
            },
			user_password:'', // ລະຫັດຜ່ານ
			user_confirm_password:'', // ຢືນຢັນລະຫັດຜ່ານ
			image_preview: null, // URL ຮູບພາບສໍາລັບການສະແດງຕົວຢ່າງ
            searchQuery: '', // ຄໍາຄົ້ນຫາສໍາລັບຜູ້ໃຊ້
            currentPage: 1, // ໜ້າປັດຈຸບັນຂອງການແບ່ງໜ້າ
            perPage: 10, // ຈໍານວນລາຍການຕໍ່ໜ້າ
			modal: null, // Instance ຂອງ Modal
			show_pass:'password', // ຄວບຄຸມການສະແດງລະຫັດຜ່ານ
            rolesList: [], // ລາຍຊື່ບົດບາດ
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
			const emailRegex = /^[^@]+@[^@]+\.[^\n@]+$/;
			if (this.user.email && !emailRegex.test(this.user.email)) {
				return 'ອີເມວລ໌ບໍ່ຖືກຕ້ອງ!';
			}
			if (this.user_confirm_password && this.user_password !== this.user_confirm_password) {
				return 'ລະຫັດຜ່ານບໍ່ຕົງກັນ!';
			}
			return '';
		},
		// ກວດສອບວ່າຟອມຖືກຕ້ອງຕາມກົດເກນຫຼືບໍ່
		isFormValid() {
			const hasBasicInfo = this.user.first_name && this.user.gender && this.user.email && this.user.phone_number && this.user.role_id;
			if (!hasBasicInfo || this.validationError) {
				return false;
			}
			if (this.from_type && (!this.user_password || !this.user_confirm_password)) {
				return false;
			}
			if (this.user_password !== this.user_confirm_password) {
				return false;
			}
			return true;
		}
	},
    methods: {
		// ຈັດການການເລືອກໄຟລ໌ຮູບພາບ
		onselectFile(e){
			const file = e.target.files[0];
			this.user.profile_image_url = file;
			if(file){
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => {
					this.image_preview = reader.result;
					
				}
			}
		},
		// ເປີດ Modal ສໍາລັບການເພີ່ມຜູ້ໃຊ້ໃໝ່
		addUser(){
			// ລ້າງຂໍ້ມູນຜູ້ໃຊ້
			this.user = {
				first_name: '',
				last_name: '',
				gender:'Male',
				email: '',
				phone_number: '',
				profile_image_url: '',
                role_id: '', // ລ້າງ role_id
				status:'active'
			};
			
			this.user_password = '';
			this.user_confirm_password = '';
			this.image_preview = null;

			this.modal = new bootstrap.Modal(document.getElementById('add-user'));
			this.modal.show();
		},
        // ດຶງຂໍ້ມູນຜູ້ໃຊ້ຈາກ API
        async getUser() {
            try {
                const response = await this.requestApi.getData(`admin/users?page=${this.currentPage}&per_page=${this.perPage}&search=${this.searchQuery}&status=${this.status}`);
                this.users = response.users;
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
        // ດຶງຂໍ້ມູນບົດບາດຈາກ API
        async getRoles() {
            try {
                const response = await this.requestApi.getData(`admin/roles?per_page=all`);
                this.rolesList = response.roles;
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        },
       // ດຶງຂໍ້ມູນຜູ້ໃຊ້ເພື່ອແກ້ໄຂ ແລະເປີດ Modal
       async editUser(id) {
            let data = await this.requestApi.getDataByID('admin/users', id);
			this.user = data.user;
			this.user_password = '';
			this.user_confirm_password = '';
			this.from_type = false;
			this.edit_id = id;

			this.image_preview = this.url + '/' + this.user.profile_image_url;

			if(this.modal){
				this.modal.show();
			} else {
				this.modal = new bootstrap.Modal(document.getElementById('add-user'));
				this.modal.show();
			}
			
        },
		// ບັນທຶກ (ເພີ່ມ/ແກ້ໄຂ) ຜູ້ໃຊ້
		async saveUser() {
			if(this.from_type){
				// ເພີ່ມ
				// ຖ້າມີລະຫັດຜ່ານ, ເພີ່ມໃສ່ object ຜູ້ໃຊ້
				if(this.user_password){
					this.user.password = this.user_password;
				}
				await this.requestApi.postData('admin/users', this.user);
				this.getUser();
				// ປິດ modal

				
			} else {
				// ແກ້ໄຂ
				// ຖ້າມີລະຫັດຜ່ານ, ເພີ່ມໃສ່ object ຜູ້ໃຊ້
				if(this.user_password){
					this.user.password = this.user_password;
				}
				
				await this.requestApi.updateData('admin/users', this.edit_id, this.user);
				this.getUser();
				// ປິດ modal ຫຼືສະແດງຂໍ້ຄວາມສຳເລັດ
			}

			if(this.modal){
				this.modal.hide();
			}
		},
        // ລົບຜູ້ໃຊ້
        async deleteUser(id) {
            try {
                await this.requestApi.deleteData('admin/users', id);
                this.getUser();
                // ສະແດງຂໍ້ຄວາມສຳເລັດ
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        },
        // ປ່ຽນຈໍານວນລາຍການຕໍ່ໜ້າ
        changePerPage(newPerPage) {
            this.perPage = newPerPage;
            this.currentPage = 1; // ຕັ້ງຄ່າໜ້າທໍາອິດເມື່ອ perPage ປ່ຽນ
            this.getUser();
        },
        // ໄປໜ້າທີ່ລະບຸ
        goToPage(page) {
            this.currentPage = page;
            this.getUser();
        },
    },
    mounted() {
        // ເມື່ອ component ຖືກ mount, ດຶງຂໍ້ມູນຜູ້ໃຊ້ແລະບົດບາດ
        this.getUser();
        this.getRoles(); // ດຶງບົດບາດເມື່ອ component ຖືກ mount
    },
	watch:{
		// ຕິດຕາມການປ່ຽນແປງຂອງສະຖານະເພື່ອໂຫຼດຂໍ້ມູນຄືນໃໝ່
		status(){
			this.getUser();
		},
		// ຕິດຕາມການປ່ຽນແປງຂອງຄໍາຄົ້ນຫາເພື່ອໂຫຼດຂໍ້ມູນຄືນໃໝ່
		searchQuery(val){
			if(val.length==0){
				this.getUser();
			}
		}
	}
}
	
</script>
<style >
    .img-user{
		    width: 120px;
    height: 120px;
    border-radius: 10px;
    border: 1px dashed #e1dfdf;
    padding: 3px;
    object-fit: cover;
    object-position: center;
	}
</style>