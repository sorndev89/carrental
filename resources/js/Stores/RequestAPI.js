import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "./Auth.js";

/**
 * @function createAuthHeaders
 * @description ຟັງຊັນນີ້ມີໜ້າທີ່ສ້າງ Object Headers ທີ່ຈຳເປັນສຳລັບການຮ້ອງຂໍ API ທີ່ຕ້ອງການການຢືນຢັນຕົວຕົນ (Authentication).
 * ມັນຈະດຶງ Token ການຢືນຢັນຕົວຕົນ (JWT) ຈາກ Pinia Store (useAuthStore).
 * ຖ້າບໍ່ພົບ Token, ມັນຈະສະແດງຂໍ້ຜິດພາດໃນ Console ແລະ ທຳການ Logout ຜູ້ໃຊ້ໂດຍອັດຕະໂນມັດ.
 * @returns {object|null} Object ຂອງ Headers ທີ່ມີ Authorization Bearer Token ຫຼື null ຖ້າບໍ່ມີ Token.
 */
const createAuthHeaders = () => {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (!token) {
        console.error("Token not found. Logging out.");
        authStore.logout();
        return null;
    }

    return {
        Authorization: `Bearer ${token}`,
    };
};

/**
 * @function handleApiError
 * @description ຟັງຊັນນີ້ມີໜ້າທີ່ຈັດການກັບຂໍ້ຜິດພາດທີ່ເກີດຂຶ້ນຈາກການຮ້ອງຂໍ API ໂດຍໃຊ້ Axios.
 * ມັນຈະສະແດງຂໍ້ຄວາມຜິດພາດທີ່ເໝາະສົມໃຫ້ຜູ້ໃຊ້ເຫັນຜ່ານ SweetAlert2 ໂດຍອີງຕາມລະຫັດສະຖານະ (Status Code) ຂອງ HTTP.
 * ຕົວຢ່າງ: 401 (Unauthorized) ຈະນຳໄປສູ່ການ Logout, 403 (Forbidden) ຈະແຈ້ງວ່າບໍ່ມີສິດ, ແລະ 422 (Unprocessable Entity) ຈະສະແດງຂໍ້ຜິດພາດຈາກການກວດສອບຂໍ້ມູນ (Validation Errors).
 * @param {object} error - Object ຂໍ້ຜິດພາດທີ່ສົ່ງຄືນມາຈາກ Axios.
 * @param {string} context - ຂໍ້ຄວາມທີ່ອະທິບາຍເຖິງການກະທຳທີ່ເກີດຂໍ້ຜິດພາດ (ຕົວຢ່າງ: "ດຶງຂໍ້ມູນຜູ້ໃຊ້").
 */
const handleApiError = (error, context) => {
    console.error(`API Error (${context}):`, error);
    let title = `ເກີດຂໍ້ຜິດພາດ`;
    let errorMessage = "ມີບາງຢ່າງຜິດພາດ, ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.";

    if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
            title = "ການຢືນຢັນຕົວຕົນລົ້ມເຫຼວ";
            errorMessage = "ເຊດຊັນຂອງທ່ານໝົດອາຍຸ, ກະລຸນາເຂົ້າສູ່ລະບົບໃໝ່.";
            useAuthStore().logout();
        } else if (status === 403) {
            title = "ບໍ່ໄດ້ຮັບອະນຸຍາດ";
            errorMessage = data.message || "ທ່ານບໍ່ມີສິດໃນການດຳເນີນການນີ້.";
        } else if (status === 422 && data.errors) {
            title = "ຂໍ້ມູນບໍ່ຖືກຕ້ອງ";
            errorMessage = Object.values(data.errors).flat().join("\n");
        } else if (data && data.message) {
            errorMessage = data.message;
        }
    }

    Swal.fire({
        icon: "error",
        title: title,
        text: errorMessage,
    });
};

export const useRequestApiStore = defineStore("requestApi", {
    state: () => ({
        data: null,
        loading: false,
        error: null,
    }),

    actions: {
         /**
          * @method getGender
          * @description ຟັງຊັນນີ້ກວດສອບຄ່າ `user` ທີ່ສົ່ງເຂົ້າມາ ເພື່ອກຳນົດຄຳນຳໜ້າທີ່ເໝາະສົມ.
          * ຖ້າ `user` ເປັນ 'Male', ມັນຈະສົ່ງຄືນ 'ທ່ານ'.
          * ຖ້າ `user` ເປັນຄ່າອື່ນ (ເຊັ່ນ: 'Female'), ມັນຈະສົ່ງຄືນ 'ທ່ານ ນ'.
          * @param {string} user - ຄ່າທີ່ເປັນຕົວແທນຂອງເພດ (ຕົວຢ່າງ: 'Male', 'Female').
          * @returns {string} ຄຳນຳໜ້າທີ່ເໝາະສົມ ('ທ່ານ' ຫຼື 'ທ່ານ ນ').
          */
         getGender(user){
                if(user == 'Male'){
                    return 'ທ່ານ';
                } else {
                    return 'ທ່ານ ນ';
                }
             },
        /**
         * @method getData
         * @description ດຶງຂໍ້ມູນທັງໝົດຈາກ API Endpoint ທີ່ລະບຸ.
         * ມັນຈະກຳນົດຄ່າ `loading` ເປັນ `true` ໃນຂະນະທີ່ກຳລັງໂຫຼດຂໍ້ມູນ ແລະ `false` ເມື່ອສຳເລັດ.
         * ຖ້າມີຂໍ້ຜິດພາດເກີດຂຶ້ນ, ມັນຈະຖືກຈັດການໂດຍ `handleApiError`.
         * @param {string} endpoint - ຊື່ຂອງ API Endpoint (ຕົວຢ່າງ: 'users', 'products').
         * @returns {Promise<object>} Promise ທີ່ສົ່ງຄືນຂໍ້ມູນທີ່ໄດ້ຈາກ API.
         * @throws {Error} ຖ້າມີຂໍ້ຜິດພາດໃນການຮ້ອງຂໍ API.
         */
        async getData(endpoint) {
            this.loading = true;
            this.error = null;
            try {
                const headers = createAuthHeaders();
                if (!headers) return;

                const response = await axios.get(`/api/${endpoint}`, { headers });
                this.data = response.data;
                return response.data;
            } catch (error) {
                this.error = error;
                handleApiError(error, `ດຶງຂໍ້ມູນຈາກ ${endpoint}`);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        /**
         * @method getDataByID
         * @description ດຶງຂໍ້ມູນສະເພາະໂດຍໃຊ້ ID ຈາກ API Endpoint ທີ່ລະບຸ.
         * ມັນຈະກຳນົດຄ່າ `loading` ເປັນ `true` ໃນຂະນະທີ່ກຳລັງໂຫຼດຂໍ້ມູນ ແລະ `false` ເມື່ອສຳເລັດ.
         * ຖ້າມີຂໍ້ຜິດພາດເກີດຂຶ້ນ, ມັນຈະຖືກຈັດການໂດຍ `handleApiError`.
         * @param {string} endpoint - ຊື່ຂອງ API Endpoint (ຕົວຢ່າງ: 'users').
         * @param {string|number} id - ID ຂອງຂໍ້ມູນທີ່ຕ້ອງການດຶງ.
         * @returns {Promise<object>} Promise ທີ່ສົ່ງຄືນຂໍ້ມູນສະເພາະທີ່ໄດ້ຈາກ API.
         * @throws {Error} ຖ້າມີຂໍ້ຜິດພາດໃນການຮ້ອງຂໍ API.
         */
        async getDataByID(endpoint, id) {
            this.loading = true;
            this.error = null;
            try {
                const headers = createAuthHeaders();
                if (!headers) return;

                const response = await axios.get(`/api/${endpoint}/${id}`, { headers });
                this.data = response.data;
                return response.data;
            } catch (error) {
                this.error = error;
                handleApiError(error, `ດຶງຂໍ້ມູນ ${id} ຈາກ ${endpoint}`);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        /**
         * @method postData
         * @description ສ້າງຂໍ້ມູນໃໝ່ໃນ API Endpoint ທີ່ລະບຸ.
         * ຮອງຮັບການສົ່ງຂໍ້ມູນແບບປົກກະຕິ (JSON) ແລະ ການອັບໂຫລດໄຟລ໌ (multipart/form-data).
         * ມັນຈະກຳນົດຄ່າ `loading` ເປັນ `true` ໃນຂະນະທີ່ກຳລັງສົ່ງຂໍ້ມູນ ແລະ `false` ເມື່ອສຳເລັດ.
         * ຖ້າມີຂໍ້ຜິດພາດເກີດຂຶ້ນ, ມັນຈະຖືກຈັດການໂດຍ `handleApiError`.
         * @param {string} endpoint - ຊື່ຂອງ API Endpoint (ຕົວຢ່າງ: 'users').
         * @param {object} payload - Object ຂໍ້ມູນທີ່ຈະສ້າງ.
         * @returns {Promise<object>} Promise ທີ່ສົ່ງຄືນຂໍ້ມູນທີ່ສ້າງສຳເລັດຈາກ API.
         * @throws {Error} ຖ້າມີຂໍ້ຜິດພາດໃນການຮ້ອງຂໍ API.
         */
        async postData(endpoint, payload) {
            this.loading = true;
            this.error = null;
            try {
                const headers = createAuthHeaders();
                if (!headers) return;

                const hasFile = Object.values(payload).some(value => value instanceof File);
                let dataToSend = payload;

                if (hasFile) {
                    headers["Content-Type"] = "multipart/form-data";
                    const formData = new FormData();
                    for (const key in payload) {
                        if (payload[key] !== null && payload[key] !== undefined) {
                            formData.append(key, payload[key]);
                        }
                    }
                    dataToSend = formData;
                }

                const response = await axios.post(`/api/${endpoint}`, dataToSend, { headers });
                return response.data;
            } catch (error) {
                this.error = error;
                handleApiError(error, `ສ້າງຂໍ້ມູນໃນ ${endpoint}`);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        /**
         * @method updateData
         * @description ອັບເດດຂໍ້ມູນທີ່ມີຢູ່ແລ້ວໃນ API Endpoint ທີ່ລະບຸໂດຍໃຊ້ ID.
         * ຮອງຮັບການສົ່ງຂໍ້ມູນແບບປົກກະຕິ ແລະ ການອັບໂຫລດໄຟລ໌ (multipart/form-data).
         * ມັນຈະໃຊ້ `FormData` ເພື່ອຈັດການກັບຂໍ້ມູນ ແລະ ບັງຄັບໃຊ້ `_method` ເປັນ `PUT` ເພື່ອໃຫ້ Laravel ຮັບຮູ້ວ່າເປັນການຮ້ອງຂໍແບບ PUT.
         * ມັນຈະກຳນົດຄ່າ `loading` ເປັນ `true` ໃນຂະນະທີ່ກຳລັງສົ່ງຂໍ້ມູນ ແລະ `false` ເມື່ອສຳເລັດ.
         * ຖ້າມີຂໍ້ຜິດພາດເກີດຂຶ້ນ, ມັນຈະຖືກຈັດການໂດຍ `handleApiError`.
         * @param {string} endpoint - ຊື່ຂອງ API Endpoint (ຕົວຢ່າງ: 'users').
         * @param {string|number} id - ID ຂອງຂໍ້ມູນທີ່ຕ້ອງການອັບເດດ.
         * @param {object} payload - Object ຂໍ້ມູນທີ່ຈະອັບເດດ.
         * @returns {Promise<object>} Promise ທີ່ສົ່ງຄືນຂໍ້ມູນທີ່ອັບເດດສຳເລັດຈາກ API.
         * @throws {Error} ຖ້າມີຂໍ້ຜິດພາດໃນການຮ້ອງຂໍ API.
         */
        async updateData(endpoint, id, payload) {
            this.loading = true;
            this.error = null;
            try {
                const headers = createAuthHeaders();
                if (!headers) return;

                const formData = new FormData();
                for (const key in payload) {
                    if (payload[key] !== null && payload[key] !== undefined) {
                        formData.append(key, payload[key]);
                    }
                }
                // ສິ່ງສຳຄັນ: ບອກ Laravel ວ່ານີ້ຄືການ PUT
                formData.append("_method", "PUT");
                
                // ເມື່ອໃຊ້ FormData, ຕ້ອງຕັ້ງ Content-Type
                headers["Content-Type"] = "multipart/form-data";

                // ຕ້ອງໃຊ້ POST method ເພື່ອສົ່ງ multipart/form-data
                const response = await axios.post(`/api/${endpoint}/${id}`, formData, { headers });
                return response.data;
            } catch (error) {
                this.error = error;
                handleApiError(error, `ອັບເດດຂໍ້ມູນ ${id} ໃນ ${endpoint}`);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        /**
         * @method deleteData
         * @description ລຶບຂໍ້ມູນສະເພາະໂດຍໃຊ້ ID ຈາກ API Endpoint ທີ່ລະບຸ.
         * ກ່ອນທີ່ຈະລຶບ, ມັນຈະສະແດງ SweetAlert2 ເພື່ອຢືນຢັນການລຶບຈາກຜູ້ໃຊ້.
         * ຖ້າຜູ້ໃຊ້ຢືນຢັນ, ມັນຈະດຳເນີນການລຶບ ແລະ ສະແດງຂໍ້ຄວາມສຳເລັດ.
         * ມັນຈະກຳນົດຄ່າ `loading` ເປັນ `true` ໃນຂະນະທີ່ກຳລັງລຶບຂໍ້ມູນ ແລະ `false` ເມື່ອສຳເລັດ.
         * ຖ້າມີຂໍ້ຜິດພາດເກີດຂຶ້ນ, ມັນຈະຖືກຈັດການໂດຍ `handleApiError`.
         * @param {string} endpoint - ຊື່ຂອງ API Endpoint (ຕົວຢ່າງ: 'users').
         * @param {string|number} id - ID ຂອງຂໍ້ມູນທີ່ຕ້ອງການລຶບ.
         * @returns {Promise<object|undefined>} Promise ທີ່ສົ່ງຄືນຂໍ້ມູນທີ່ຖືກລຶບຈາກ API, ຫຼື `undefined` ຖ້າຜູ້ໃຊ້ຍົກເລີກການລຶບ.
         * @throws {Error} ຖ້າມີຂໍ້ຜິດພາດໃນການຮ້ອງຂໍ API.
         */
        async deleteData(endpoint, id) {
            try {
                const result = await Swal.fire({
                    title: 'ທ່ານແນ່ໃຈບໍ່?',
                    text: "ທ່ານຈະບໍ່ສາມາດກູ້ຄືນຂໍ້ມູນນີ້ໄດ້!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ແມ່ນ, ລຶບເລີຍ!',
                    cancelButtonText: 'ຍົກເລີກ'
                });

                if (result.isConfirmed) {
                    this.loading = true;
                    this.error = null;
                    const headers = createAuthHeaders();
                    if (!headers) return;

                    const response = await axios.delete(`/api/${endpoint}/${id}`, { headers });

                    Swal.fire(
                        'ລຶບສຳເລັດ!',
                        'ຂໍ້ມູນຂອງທ່ານໄດ້ຖືກລຶບອອກແລ້ວ.',
                        'success'
                    );

                    return response.data;
                }
            } catch (error) {
                this.error = error;
                handleApiError(error, `ລຶບຂໍ້ມູນ ${id} ຈາກ ${endpoint}`);
                throw error; // Re-throw the error so the calling component can handle it if needed
            } finally {
                this.loading = false;
            }
        },
    },
});
