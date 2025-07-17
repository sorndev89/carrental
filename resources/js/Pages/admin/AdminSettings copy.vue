<template lang="">
  
					<div class="page-header">
						<div class="add-item d-flex">
							<div class="page-title">
								<h4 class="fw-bold">ການຕັ້ງຄ່າ</h4>
								<h6>ຈັດການການຕັ້ງຄ່າຂອງທ່ານໃນລະບົບ</h6>
							</div>
						</div>
						<ul class="table-top-head">
							<li>
								<a data-bs-toggle="tooltip" data-bs-placement="top" aria-label="Refresh" data-bs-original-title="Refresh">
									<i class="ti ti-refresh"></i>
								</a>
							</li>
							<li>
								<a data-bs-toggle="tooltip" data-bs-placement="top" id="collapse-header" aria-label="Collapse" data-bs-original-title="Collapse">
									<i class="ti ti-chevron-up"></i>
								</a>
							</li>
						</ul>
					</div>
					<div class="row">
						<div class="col-xl-12">
							 <div class="settings-wrapper d-flex">
								<div class="settings-sidebar" id="sidebar2">
									<div class="slimScrollDiv" style="position: relative; overflow: hidden; width: 100%; height: 795px;"><div class="sidebar-inner slimscroll" style="overflow: hidden; width: 100%; height: 735px;">
										<div id="sidebar-menu5" class="sidebar-menu">
											<h4 class="fw-bold fs-18 mb-2 pb-2">ການຕັ້ງຄ່າ</h4>
											<ul>
												<li class="submenu-open">
													<ul>
														<li class="submenu">
															<a href="javascript:void(0);" class="active subdrop">
																<i class="ti ti-settings fs-18"></i>
																<span class="fs-14 fw-medium ms-2">ການຕັ້ງຄ່າທົ່ວໄປ</span>
																<span class="menu-arrow"></span>
															</a>
															<ul>
																<li><a href="general-settings.html" class="active">ໂປຣໄຟລ໌</a></li>
																<li><a href="security-settings.html">ຄວາມປອດໄພ</a></li>
																<li><a href="notification.html">ການແຈ້ງເຕືອນ</a></li>
																<li><a href="connected-apps.html">ແອັບທີ່ເຊື່ອມຕໍ່</a></li>
															</ul>
														</li>
														<li class="submenu">
															<a href="javascript:void(0);">
																<i class="ti ti-world fs-18"></i>
																<span class="fs-14 fw-medium ms-2">ການຕັ້ງຄ່າເວັບໄຊທ໌</span>
																<span class="menu-arrow"></span>
															</a>
															<ul>
																<li><a href="system-settings.html">ການຕັ້ງຄ່າລະບົບ</a></li>
																<li><a href="company-settings.html">ການຕັ້ງຄ່າບໍລິສັດ </a></li>
																<li><a href="localization-settings.html">ທ້ອງຖິ່ນ</a></li>
																<li><a href="prefixes.html">ຄຳນຳໜ້າ</a></li>
																<li><a href="preference.html">ຄວາມມັກ</a></li>
																<li><a href="appearance.html">ຮູບລັກສະນະ</a></li>
																<li><a href="social-authentication.html">ການຢືນຢັນຕົວຕົນທາງສັງຄົມ</a></li>
																<li><a href="language-settings.html">ພາສາ</a></li>
															</ul>
														</li>
														<li class="submenu">
															<a href="javascript:void(0);">
																<i class="ti ti-device-mobile fs-18"></i>
																<span class="fs-14 fw-medium ms-2">ການຕັ້ງຄ່າແອັບ</span>
																<span class="menu-arrow"></span>
															</a>
															<ul>
																<li><a href="invoice-settings.html">ການຕັ້ງຄ່າໃບແຈ້ງໜີ້</a></li>
																<li><a href="invoice-templates.html">ແມ່ແບບໃບແຈ້ງໜີ້</a></li>
																<li><a href="printer-settings.html">ເຄື່ອງພິມ </a></li>
																<li><a href="pos-settings.html">POS</a></li>
																<li><a href="signatures.html">ລາຍເຊັນ</a></li>
																<li><a href="custom-fields.html">ຊ່ອງຂໍ້ມູນກຳນົດເອງ</a></li>
															</ul>
														</li>
														<li class="submenu">
															<a href="javascript:void(0);">
																<i class="ti ti-device-desktop fs-18"></i>
																<span class="fs-14 fw-medium ms-2">ການຕັ້ງຄ່າລະບົບ</span>
																<span class="menu-arrow"></span>
															</a>
															<ul>
																<li class="submenu submenu-two"><a href="javascript:void(0);">Email<span class="menu-arrow inside-submenu"></span></a>
																	<ul>
																		<li><a href="email-settings.html">ການຕັ້ງຄ່າອີເມວ</a></li>
																		<li><a href="email-templates.html">ແມ່ແບບອີເມວ</a></li>
																	</ul>
																</li>
																<li class="submenu submenu-two"><a href="javascript:void(0);">SMS<span class="menu-arrow inside-submenu"></span></a>
																	<ul>
																		<li><a href="sms-settings.html">ການຕັ້ງຄ່າ SMS</a></li>
																		<li><a href="sms-templates.html">ແມ່ແບບ SMS</a></li>
																	</ul>
																</li>
																<li><a href="otp-settings.html">OTP</a></li>
																<li><a href="gdpr-settings.html">GDPR Cookies</a></li>
															</ul>
														</li>
														<li class="submenu">
															<a href="javascript:void(0);">
																<i class="ti ti-settings-dollar fs-18"></i>
																<span class="fs-14 fw-medium ms-2">Financial Settings</span>
																<span class="menu-arrow"></span>
															</a>
															<ul>
																<li><a href="payment-gateway-settings.html">Payment Gateway</a></li>
																<li><a href="bank-settings-grid.html">Bank Accounts </a></li>
																<li><a href="tax-rates.html">Tax Rates</a></li>
																<li><a href="currency-settings.html">Currencies</a></li>
															</ul>
														</li>
														<li class="submenu">
															<a href="javascript:void(0);">
																<i class="ti ti-settings-2 fs-18"></i>
																<span class="fs-14 fw-medium ms-2">Other Settings</span>
																<span class="menu-arrow"></span>
															</a>
															<ul>
																<li><a href="storage-settings.html">Storage</a></li>
																<li><a href="ban-ip-address.html">Ban IP Address </a></li>
															</ul>
														</li>
													</ul>								
												</li>
											</ul>
										</div>
									</div><div class="slimScrollBar" style="background: rgb(204, 204, 204); width: 7px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 735px;"></div><div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div></div>
								</div>
								<div class="card flex-fill mb-0">
									<div class="card-header">
										<h4 class="fs-18 fw-bold">ໂປຣໄຟລ໌</h4>
									</div>
									<div class="card-body">
										<form action="general-settings.html">
											<div class="card-title-head">
												<h6 class="fs-16 fw-bold mb-3">
													<span class="fs-16 me-2"><i class="ti ti-user"></i></span> 
													Basic Information
												</h6>
											</div>
											<div class="profile-pic-upload">
												<div class="profile-pic">
													<span>
														<i class="ti ti-circle-plus mb-1 fs-16"></i> Add Image
													</span>
												</div>
												<div class="new-employee-field">
													<div class="mb-0">
														<div class="image-upload mb-0">
															<input type="file">
															<div class="image-uploads">
																<h4>Upload Image</h4>
															</div>
														</div>
														<span class="fs-13 fw-medium mt-2">
															Upload an image below 2 MB, Accepted File format JPG, PNG
														</span>
													</div>
												</div>
											</div>
											<div class="row mb-3">
												<div class="col-md-4">
													<div class="mb-3">
														<label class="form-label">
															First Name <span class="text-danger">*</span>
														</label>
														<input type="text" class="form-control">
													</div>
												</div>
												<div class="col-md-4">
													<div class="mb-3">
														<label class="form-label">
															Last Name <span class="text-danger">*</span>
														</label>
														<input type="text" class="form-control">
													</div>
												</div>
												<div class="col-md-4">
													<div class="mb-3">
														<label class="form-label">
															User Name <span class="text-danger">*</span>
														</label>
														<input type="text" class="form-control">
													</div>
												</div>
												<div class="col-md-4">
													<div class="mb-3">
														<label class="form-label">
															Phone Number <span class="text-danger">*</span>
														</label>
														<input type="text" class="form-control">
													</div>
												</div>
												<div class="col-md-4">
													<div class="mb-3">
														<label class="form-label">
															Email <span class="text-danger">*</span>
														</label>
														<input type="email" class="form-control">
													</div>
												</div>
											</div>
											<div class="card-title-head">
												<h6 class="fs-16 fw-bold mb-3">
													<span class="fs-16 me-2"><i class="ti ti-map-pin"></i></span> 
													Address Information
												</h6>
											</div>
											<div class="row">
												<div class="col-md-12">
													<div class="mb-3">
														<label class="form-label">
															Address <span class="text-danger">*</span>
														</label>
														<input type="email" class="form-control">
													</div>
												</div>
												<div class="col-md-6">
													<div class="mb-3">
														<label class="form-label">
															Country <span class="text-danger">*</span>
														</label>
														<select class="select select2-hidden-accessible" data-select2-id="select2-data-1-9ids" tabindex="-1" aria-hidden="true">
															<option data-select2-id="select2-data-3-am4n">Select</option>
															<option>USA</option>
															<option>India</option>
															<option>French</option>
															<option>Australia</option>
														</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-2-oqdi" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-9evq-container" aria-controls="select2-9evq-container"><span class="select2-selection__rendered" id="select2-9evq-container" role="textbox" aria-readonly="true" title="Select">Select</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
													</div>
												</div>
												<div class="col-md-6">
													<div class="mb-3">
														<label class="form-label">
															State <span class="text-danger">*</span>
														</label>
														<select class="select select2-hidden-accessible" data-select2-id="select2-data-4-b8qj" tabindex="-1" aria-hidden="true">
															<option data-select2-id="select2-data-6-dc8k">Select</option>
															<option>Alaska</option>
															<option>Mexico</option>
															<option>Tasmania</option>
														</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-5-pko2" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-oz3y-container" aria-controls="select2-oz3y-container"><span class="select2-selection__rendered" id="select2-oz3y-container" role="textbox" aria-readonly="true" title="Select">Select</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
													</div>
												</div>
												<div class="col-md-6">
													<div class="mb-3">
														<label class="form-label">
															City <span class="text-danger">*</span>
														</label>
														<select class="select select2-hidden-accessible" data-select2-id="select2-data-7-5wxw" tabindex="-1" aria-hidden="true">
															<option data-select2-id="select2-data-9-068z">Select</option>
															<option>Anchorage</option>
															<option>Tijuana</option>
															<option>Hobart</option>
														</select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-8-61ok" style="width: 100%;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-cud4-container" aria-controls="select2-cud4-container"><span class="select2-selection__rendered" id="select2-cud4-container" role="textbox" aria-readonly="true" title="Select">Select</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
													</div>
												</div>
												<div class="col-md-6">
													<div class="mb-3">
														<label class="form-label">
															Postal Code <span class="text-danger">*</span>
														</label>
														<input type="text" class="form-control">
													</div>
												</div>
											</div>
											<div class="text-end settings-bottom-btn mt-0">
												<button type="button" class="btn btn-secondary me-2">Cancel</button>
												<button type="submit" class="btn btn-primary">Save Changes</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				
</template>
<script>
import { ref } from 'vue';

export default {
    setup() {
        // ກໍານົດຂໍ້ມູນກຸ່ມສິດທິໂດຍໃຊ້ ref ເພື່ອໃຫ້ມັນມີປະຕິກິລິຍາ (reactive)
        const permissionGroups = ref([
            {
                id: 1,
                name: 'ລາຍການຈອງ',
                key: [
                    { name: 'ເບິ່ງ', key: 'booking-view' },
                    { name: 'ສ້າງ', key: 'booking-create' },
                    { name: 'ແກ້ໄຂ', key: 'booking-edit' },
                    { name: 'ລົບ', key: 'booking-delete' }
                ]
            },
            {
                id: 2,
                name: 'ການຊຳລະເງິນ',
                key: [
                    { name: 'ເບິ່ງ', key: 'payment-view' },
                    { name: 'ແກ້ໄຂ', key: 'payment-edit' }
                ]
            },
            {
                id: 3,
                name: 'ການຈັດການລົດ',
                key: [
                    { name: 'ເບິ່ງ', key: 'car-view' },
                    { name: 'ສ້າງ', key: 'car-create' },
                    { name: 'ແກ້ໄຂ', key: 'car-edit' },
                    { name: 'ລົບ', key: 'car-delete' }
                ]
            },
            {
                id: 4,
                name: 'ປະເພດລົດ',
                key: [
                    { name: 'ເບິ່ງ', key: 'car-type-view' },
                    { name: 'ສ້າງ', key: 'car-type-create' },
                    { name: 'ແກ້ໄຂ', key: 'car-type-edit' },
                    { name: 'ລົບ', key: 'car-type-delete' }
                ]
            },
            {
                id: 5,
                name: 'ການຈັດການລູກຄ້າ',
                key: [
                    { name: 'ເບິ່ງ', key: 'customer-view' },
                    { name: 'ສ້າງ', key: 'customer-create' },
                    { name: 'ແກ້ໄຂ', key: 'customer-edit' },
                    { name: 'ລົບ', key: 'customer-delete' }
                ]
            },
            {
                id: 6,
                name: 'ການຈັດການຜູ້ໃຊ້',
                key: [
                    { name: 'ເບິ່ງ', key: 'user-view' },
                    { name: 'ສ້າງ', key: 'user-create' },
                    { name: 'ແກ້ໄຂ', key: 'user-edit' },
                    { name: 'ລົບ', key: 'user-delete' }
                ]
            },
            {
                id: 7,
                name: 'ບົດບາດ ແລະ ສິດ',
                key: [
                    { name: 'ເບິ່ງ', key: 'role-view' },
                    { name: 'ສ້າງ', key: 'role-create' },
                    { name: 'ແກ້ໄຂ', key: 'role-edit' },
                    { name: 'ລົບ', key: 'role-delete' }
                ]
            },
            {
                id: 8,
                name: 'ການຈັດການການເງິນ',
                key: [
                    { name: 'ເບິ່ງ', key: 'finance-view' },
                    { name: 'ສ້າງ', key: 'finance-create' },
                    { name: 'ແກ້ໄຂ', key: 'finance-edit' },
                    { name: 'ລົບ', key: 'finance-delete' }
                ]
            },
            {
                id: 9,
                name: 'ລາຍງານ',
                key: [
                    { name: 'ເບິ່ງ', key: 'report-view' }
                ]
            },
            {
                id: 10,
                name: 'ການຕັ້ງຄ່າລະບົບ',
                key: [
                    { name: 'ເບິ່ງ', key: 'setting-view' },
                    { name: 'ແກ້ໄຂ', key: 'setting-edit' }
                ]
            }
        ]);

        // ສົ່ງຄືນຂໍ້ມູນທີ່ຕ້ອງການໃຫ້ສາມາດເຂົ້າເຖິງໄດ້ໃນ template
        return {
            permissionGroups
        }
    }
}
</script>
<style lang="">
    
</style>