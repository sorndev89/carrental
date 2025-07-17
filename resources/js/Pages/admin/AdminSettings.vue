<template>
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
          <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: 100%; height: 795px;">
            <div class="sidebar-inner slimscroll" style="overflow: hidden; width: 100%; height: 735px;">
              <div id="sidebar-menu5" class="sidebar-menu">
                <h4 class="fw-bold fs-18 mb-2 pb-2">ການຕັ້ງຄ່າ</h4>
                <ul>
                  <li class="submenu-open">
                    <ul>
                      <li class="submenu">
                        <a href="javascript:void(0);" :class="{ 'active subdrop': currentSection.startsWith('general') }" @click="toggleSubmenu('general')">
                          <i class="ti ti-settings fs-18"></i>
                          <span class="fs-14 fw-medium ms-2">ການຕັ້ງຄ່າທົ່ວໄປ</span>
                          <span class="menu-arrow"></span>
                        </a>
                        <ul :style="{ display: currentSection.startsWith('general') ? 'block' : 'none' }">
                          <li><a href="javascript:void(0);" :class="{ active: currentSection === 'general-profile' }" @click="currentSection = 'general-profile'">ໂປຣໄຟລ໌</a></li>
                          <li><a href="javascript:void(0);" :class="{ active: currentSection === 'general-security' }" @click="currentSection = 'general-security'">ຄວາມປອດໄພ</a></li>
                        </ul>
                      </li>
                      <li class="submenu">
                        <a href="javascript:void(0);" :class="{ 'active subdrop': currentSection.startsWith('system') }" @click="toggleSubmenu('system')">
                          <i class="ti ti-world fs-18"></i>
                          <span class="fs-14 fw-medium ms-2">ການຕັ້ງຄ່າລະບົບ</span>
                          <span class="menu-arrow"></span>
                        </a>
                        <ul :style="{ display: currentSection.startsWith('system') ? 'block' : 'none' }">
                          <li><a href="javascript:void(0);" :class="{ active: currentSection === 'system-general' }" @click="currentSection = 'system-general'">ຂໍ້ມູນທົ່ວໄປ</a></li>
                          <li><a href="javascript:void(0);" :class="{ active: currentSection === 'system-localization' }" @click="currentSection = 'system-localization'">ທ້ອງຖິ່ນ</a></li>
                          <li><a href="javascript:void(0);" :class="{ active: currentSection === 'system-maintenance' }" @click="currentSection = 'system-maintenance'">ການບຳລຸງຮັກສາ</a></li>
                        </ul>
                      </li>
                      <li class="submenu">
                        <a href="javascript:void(0);" :class="{ 'active subdrop': currentSection.startsWith('data') }" @click="toggleSubmenu('data')">
                          <i class="ti ti-database fs-18"></i>
                          <span class="fs-14 fw-medium ms-2">ການຈັດການຂໍ້ມູນ</span>
                          <span class="menu-arrow"></span>
                        </a>
                        <ul :style="{ display: currentSection.startsWith('data') ? 'block' : 'none' }">
                          <li><a href="javascript:void(0);" :class="{ active: currentSection === 'data-car-types' }" @click="currentSection = 'data-car-types'">ປະເພດລົດ</a></li>
                          <li><a href="javascript:void(0);" :class="{ active: currentSection === 'data-payment-methods' }" @click="currentSection = 'data-payment-methods'">ວິທີການຊຳລະເງິນ</a></li>
                        </ul>
                      </li>
                      <li class="submenu">
                        <a href="javascript:void(0);" :class="{ 'active subdrop': currentSection.startsWith('user-permission') }" @click="toggleSubmenu('user-permission')">
                          <i class="ti ti-users fs-18"></i>
                          <span class="fs-14 fw-medium ms-2">ການຈັດການຜູ້ໃຊ້ ແລະ ສິດ</span>
                          <span class="menu-arrow"></span>
                        </a>
                        <ul :style="{ display: currentSection.startsWith('user-permission') ? 'block' : 'none' }">
                          <li><a href="javascript:void(0);" :class="{ active: currentSection === 'user-permission-roles' }" @click="currentSection = 'user-permission-roles'">ບົດບາດ</a></li>
                          <li><a href="javascript:void(0);" :class="{ active: currentSection === 'user-permission-permissions' }" @click="currentSection = 'user-permission-permissions'">ສິດທິ</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="slimScrollBar" style="background: rgb(204, 204, 204); width: 7px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 735px;"></div>
            <div class="slimScrollRail" style="width: 7px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div>
          </div>
        </div>
        <div class="card flex-fill mb-0">
          <div class="card-header">
            <h4 class="fs-18 fw-bold">{{ getSectionTitle(currentSection) }}</h4>
          </div>
          <div class="card-body">
            <!-- General Settings - Profile Section -->
            <div v-if="currentSection === 'general-profile'">
              <form @submit.prevent="saveProfileSettings">
                <div class="card-title-head">
                  <h6 class="fs-16 fw-bold mb-3">
                    <span class="fs-16 me-2"><i class="ti ti-user"></i></span>
                    ຂໍ້ມູນພື້ນຖານ
                  </h6>
                </div>
                <div class="profile-pic-upload">
                  <div class="profile-pic">
                    <span>
                      <i class="ti ti-circle-plus mb-1 fs-16"></i> ເພີ່ມຮູບພາບ
                    </span>
                  </div>
                  <div class="new-employee-field">
                    <div class="mb-0">
                      <div class="image-upload mb-0">
                        <input type="file">
                        <div class="image-uploads">
                          <h4>ອັບໂຫລດຮູບພາບ</h4>
                        </div>
                      </div>
                      <span class="fs-13 fw-medium mt-2">
                        ອັບໂຫລດຮູບພາບຂະໜາດບໍ່ເກີນ 2 MB, ປະເພດໄຟລ໌ທີ່ຮອງຮັບ JPG, PNG
                      </span>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">
                        ຊື່ <span class="text-danger">*</span>
                      </label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">
                        ນາມສະກຸນ <span class="text-danger">*</span>
                      </label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">
                        ຊື່ຜູ້ໃຊ້ <span class="text-danger">*</span>
                      </label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">
                        ເບີໂທລະສັບ <span class="text-danger">*</span>
                      </label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="mb-3">
                      <label class="form-label">
                        ອີເມວ <span class="text-danger">*</span>
                      </label>
                      <input type="email" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="card-title-head">
                  <h6 class="fs-16 fw-bold mb-3">
                    <span class="fs-16 me-2"><i class="ti ti-map-pin"></i></span>
                    ຂໍ້ມູນທີ່ຢູ່
                  </h6>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <div class="mb-3">
                      <label class="form-label">
                        ທີ່ຢູ່ <span class="text-danger">*</span>
                      </label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">
                        ປະເທດ <span class="text-danger">*</span>
                      </label>
                      <select class="select form-control">
                        <option>ເລືອກ</option>
                        <option>ລາວ</option>
                        <option>ໄທ</option>
                        <option>ຫວຽດນາມ</option>
                        <option>ຈີນ</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">
                        ແຂວງ <span class="text-danger">*</span>
                      </label>
                      <select class="select form-control">
                        <option>ເລືອກ</option>
                        <option>ນະຄອນຫຼວງວຽງຈັນ</option>
                        <option>ຈຳປາສັກ</option>
                        <option>ຫຼວງພະບາງ</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">
                        ເມືອງ <span class="text-danger">*</span>
                      </label>
                      <select class="select form-control">
                        <option>ເລືອກ</option>
                        <option>ໄຊເສດຖາ</option>
                        <option>ປາກເຊ</option>
                        <option>ຫຼວງພະບາງ</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">
                        ລະຫັດໄປສະນີ <span class="text-danger">*</span>
                      </label>
                      <input type="text" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="text-end settings-bottom-btn mt-0">
                  <button type="button" class="btn btn-secondary me-2">ຍົກເລີກ</button>
                  <button type="submit" class="btn btn-primary">ບັນທຶກການປ່ຽນແປງ</button>
                </div>
              </form>
            </div>

            <!-- General Settings - Security Section -->
            <div v-if="currentSection === 'general-security'">
              <form @submit.prevent="saveSecuritySettings">
                <div class="card-title-head">
                  <h6 class="fs-16 fw-bold mb-3">
                    <span class="fs-16 me-2"><i class="ti ti-lock"></i></span>
                    ປ່ຽນລະຫັດຜ່ານ
                  </h6>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">ລະຫັດຜ່ານປັດຈຸບັນ <span class="text-danger">*</span></label>
                      <input type="password" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">ລະຫັດຜ່ານໃໝ່ <span class="text-danger">*</span></label>
                      <input type="password" class="form-control">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">ຢືນຢັນລະຫັດຜ່ານໃໝ່ <span class="text-danger">*</span></label>
                      <input type="password" class="form-control">
                    </div>
                  </div>
                </div>
                <div class="text-end settings-bottom-btn mt-0">
                  <button type="button" class="btn btn-secondary me-2">ຍົກເລີກ</button>
                  <button type="submit" class="btn btn-primary">ບັນທຶກການປ່ຽນແປງ</button>
                </div>
              </form>
            </div>

            <!-- System Settings - General Info Section -->
            <div v-if="currentSection === 'system-general'">
              <form @submit.prevent="saveSystemGeneralSettings">
                <div class="card-title-head">
                  <h6 class="fs-16 fw-bold mb-3">
                    <span class="fs-16 me-2"><i class="ti ti-info-circle"></i></span>
                    ຂໍ້ມູນທົ່ວໄປຂອງລະບົບ
                  </h6>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">ຊື່ລະບົບ <span class="text-danger">*</span></label>
                      <input type="text" class="form-control" value="ລະບົບເຊົ່າລົດ">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">URL ໂລໂກ້</label>
                      <input type="text" class="form-control" value="/assets/img/logo.png">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">ອີເມວຕິດຕໍ່ <span class="text-danger">*</span></label>
                      <input type="email" class="form-control" value="contact@carrental.com">
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">ເບີໂທຕິດຕໍ່</label>
                      <input type="text" class="form-control" value="+856 20 123 4567">
                    </div>
                  </div>
                </div>
                <div class="text-end settings-bottom-btn mt-0">
                  <button type="button" class="btn btn-secondary me-2">ຍົກເລີກ</button>
                  <button type="submit" class="btn btn-primary">ບັນທຶກການປ່ຽນແປງ</button>
                </div>
              </form>
            </div>

            <!-- System Settings - Localization Section -->
            <div v-if="currentSection === 'system-localization'">
              <form @submit.prevent="saveLocalizationSettings">
                <div class="card-title-head">
                  <h6 class="fs-16 fw-bold mb-3">
                    <span class="fs-16 me-2"><i class="ti ti-map"></i></span>
                    ການຕັ້ງຄ່າທ້ອງຖິ່ນ
                  </h6>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">ເຂດເວລາ <span class="text-danger">*</span></label>
                      <select class="select form-control">
                        <option>Asia/Vientiane</option>
                        <option>Asia/Bangkok</option>
                        <option>Asia/Ho_Chi_Minh</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">ຮູບແບບວັນທີ <span class="text-danger">*</span></label>
                      <select class="select form-control">
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label class="form-label">ສະກຸນເງິນເລີ່ມຕົ້ນ <span class="text-danger">*</span></label>
                      <select class="select form-control">
                        <option>LAK - ກີບລາວ</option>
                        <option>THB - ບາດໄທ</option>
                        <option>USD - ໂດລາສະຫະລັດ</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="text-end settings-bottom-btn mt-0">
                  <button type="button" class="btn btn-secondary me-2">ຍົກເລີກ</button>
                  <button type="submit" class="btn btn-primary">ບັນທຶກການປ່ຽນແປງ</button>
                </div>
              </form>
            </div>

            <!-- System Settings - Maintenance Section -->
            <div v-if="currentSection === 'system-maintenance'">
              <form @submit.prevent="saveMaintenanceSettings">
                <div class="card-title-head">
                  <h6 class="fs-16 fw-bold mb-3">
                    <span class="fs-16 me-2"><i class="ti ti-tool"></i></span>
                    ໂໝດບຳລຸງຮັກສາ
                  </h6>
                </div>
                <div class="row mb-3">
                  <div class="col-md-12">
                    <div class="form-check form-switch">
                      <input class="form-check-input" type="checkbox" id="maintenanceModeSwitch">
                      <label class="form-check-label" for="maintenanceModeSwitch">ເປີດໃຊ້ໂໝດບຳລຸງຮັກສາ</label>
                    </div>
                    <small class="form-text text-muted">ເມື່ອເປີດໃຊ້, ຜູ້ໃຊ້ທົ່ວໄປຈະບໍ່ສາມາດເຂົ້າເຖິງລະບົບໄດ້.</small>
                  </div>
                </div>
                <div class="text-end settings-bottom-btn mt-0">
                  <button type="button" class="btn btn-secondary me-2">ຍົກເລີກ</button>
                  <button type="submit" class="btn btn-primary">ບັນທຶກການປ່ຽນແປງ</button>
                </div>
              </form>
            </div>

            <!-- Data Management - Car Types Section -->
            <div v-if="currentSection === 'data-car-types'">
              <h5 class="mb-3">ຈັດການປະເພດລົດ</h5>
              <!-- Add form/table for Car Types CRUD here -->
              <p>ໜ້ານີ້ຈະໃຊ້ສຳລັບການເພີ່ມ, ແກ້ໄຂ, ລຶບປະເພດລົດ (ເຊັ່ນ: ລົດເກ໋ງ, ລົດກະບະ).</p>
            </div>

            <!-- Data Management - Payment Methods Section -->
            <div v-if="currentSection === 'data-payment-methods'">
              <h5 class="mb-3">ຈັດການວິທີການຊຳລະເງິນ</h5>
              <!-- Add form/table for Payment Methods CRUD here -->
              <p>ໜ້ານີ້ຈະໃຊ້ສຳລັບການເພີ່ມ, ແກ້ໄຂ, ລຶບວິທີການຊຳລະເງິນ (ເຊັ່ນ: ເງິນສົດ, ໂອນຜ່ານທະນາຄານ).</p>
            </div>

            <!-- User & Permission Management - Roles Section -->
            <div v-if="currentSection === 'user-permission-roles'">
              <h5 class="mb-3">ຈັດການບົດບາດ</h5>
              <!-- Add form/table for Roles CRUD here -->
              <p>ໜ້ານີ້ຈະໃຊ້ສຳລັບການເພີ່ມ, ແກ້ໄຂ, ລຶບບົດບາດຂອງຜູ້ໃຊ້ (ເຊັ່ນ: Admin, Staff, Customer).</p>
            </div>

            <!-- User & Permission Management - Permissions Section -->
            <div v-if="currentSection === 'user-permission-permissions'">
              <h5 class="mb-3">ຈັດການສິດທິ</h5>
              <!-- Add form/table for Permissions management here -->
              <p>ໜ້ານີ້ຈະໃຊ້ສຳລັບການກຳນົດສິດທິໃຫ້ກັບແຕ່ລະບົດບາດ.</p>
            </div>
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
    const currentSection = ref('general-profile'); // Default active section
    const openSubmenus = ref({
      general: true,
      system: false,
      data: false,
      'user-permission': false,
    });

    const toggleSubmenu = (menuKey) => {
      openSubmenus.value[menuKey] = !openSubmenus.value[menuKey];
      // Set the first item of the toggled submenu as current section if it's opened
      if (openSubmenus.value[menuKey]) {
        if (menuKey === 'general') currentSection.value = 'general-profile';
        else if (menuKey === 'system') currentSection.value = 'system-general';
        else if (menuKey === 'data') currentSection.value = 'data-car-types';
        else if (menuKey === 'user-permission') currentSection.value = 'user-permission-roles';
      }
    };

    const getSectionTitle = (section) => {
      switch (section) {
        case 'general-profile': return 'ໂປຣໄຟລ໌';
        case 'general-security': return 'ຄວາມປອດໄພ';
        case 'system-general': return 'ຂໍ້ມູນທົ່ວໄປຂອງລະບົບ';
        case 'system-localization': return 'ການຕັ້ງຄ່າທ້ອງຖິ່ນ';
        case 'system-maintenance': return 'ໂໝດບຳລຸງຮັກສາ';
        case 'data-car-types': return 'ຈັດການປະເພດລົດ';
        case 'data-payment-methods': return 'ຈັດການວິທີການຊຳລະເງິນ';
        case 'user-permission-roles': return 'ຈັດການບົດບາດ';
        case 'user-permission-permissions': return 'ຈັດການສິດທິ';
        default: return 'ການຕັ້ງຄ່າ';
      }
    };

    // Placeholder methods for saving settings
    const saveProfileSettings = () => {
      alert('ບັນທຶກການຕັ້ງຄ່າໂປຣໄຟລ໌');
    };
    const saveSecuritySettings = () => {
      alert('ບັນທຶກການຕັ້ງຄ່າຄວາມປອດໄພ');
    };
    const saveSystemGeneralSettings = () => {
      alert('ບັນທຶກການຕັ້ງຄ່າຂໍ້ມູນທົ່ວໄປຂອງລະບົບ');
    };
    const saveLocalizationSettings = () => {
      alert('ບັນທຶກການຕັ້ງຄ່າທ້ອງຖິ່ນ');
    };
    const saveMaintenanceSettings = () => {
      alert('ບັນທຶກການຕັ້ງຄ່າໂໝດບຳລຸງຮັກສາ');
    };

    return {
      currentSection,
      openSubmenus,
      toggleSubmenu,
      getSectionTitle,
      saveProfileSettings,
      saveSecuritySettings,
      saveSystemGeneralSettings,
      saveLocalizationSettings,
      saveMaintenanceSettings,
    };
  },
};
</script>

<style>
/* Add your styles here */
</style>
