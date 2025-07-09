// ນຳເຂົ້າໄລບຣາຣີທີ່ຈຳເປັນ
import axios from 'axios';
import { useStore } from '../Store/Auth';

// 1. ຕັ້ງຄ່າພື້ນຖານຂອງ Axios
const apiClient = axios.create({
    baseURL: window.location.origin, // ທີ່ຢູ່ຂອງ Laravel backend
    headers: {
        'Accept': 'application/json',
    },
    timeout: 30000,
});

// 2. ຕັ້ງຄ່າໃຫ້ Axios ສົ່ງ Token ໄປນຳທຸກຄັ້ງອັດຕະໂນມັດ
//    - Interceptor ເປັນຄືກັບ "ດ່ານກວດ" ທີ່ທຸກ request ຕ້ອງຜ່ານ
//    - ກ່ອນ request จะถูกส่งออกไป, เราจะแวะดึง Token จาก Pinia store มาใส่ใน Header ก่อน
apiClient.interceptors.request.use((config) => {
    const store = useStore();
    const token = store.GetToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default {
    methods: {
        /**
         * ຟັງຊັນສະແດງ Toast ແຈ້ງເຕືອນ (ໃຊ້ SweetAlert2)
         * @param {string} type - 'success' ຫຼື 'error'
         * @param {string} message - ຂໍ້ຄວາມທີ່ຈະສະແດງ
         */
        showToast(type, message) {
            if (this.$swal) {
                this.$swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: type,
                    title: message,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            } else {
                // ກໍລະນີບໍ່ມີ SweetAlert2, ໃຫ້ສະແດງໃນ console ແທນ
                console.log(`[${type}] ${message}`);
            }
        },

        /**
         * ດຶງຂໍ້ມູນຈາກ Server (GET)
         * @param {string} url - URL ທີ່ຈະດຶງຂໍ້ມູນ (ເຊັ່ນ: '/api/users')
         * @returns {Promise<any|null>} - ສົ່ງຄືນຂໍ້ມູນຖ້າສຳເລັດ, ສົ່ງຄືນ null ຖ້າລົ້ມເຫຼວ
         */
        async GetData(url) {
            try {
                const response = await apiClient.get(url);
                // ໂດຍທົ່ວໄປ GET request ບໍ່ຈຳເປັນຕ້ອງມີຂໍ້ຄວາມສຳເລັດ
                return response.data; // ສົ່ງຂໍ້ມູນກັບໄປໃຫ້ Component
            } catch (error) {
                console.error('GetData Error:', error);
                if (error.response) {
                    if (error.response.status === 404) {
                        this.showToast('error', 'ບໍ່ພົບຂໍ້ມູນທີ່ທ່ານຮ້ອງຂໍ.');
                    } else {
                        this.showToast('error', 'ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນ.');
                    }
                } else {
                    this.showToast('error', 'ບໍ່ສາມາດເຊື່ອມຕໍ່ກັບເຊີບເວີໄດ້.');
                }
                return null; // ສົ່ງຄືນ null ເພື່ອບອກວ່າການດຳເນີນການລົ້ມເຫຼວ
            }
        },

        /**
         * ສົ່ງຂໍ້ມູນໄປສ້າງໃໝ່ (POST)
         * @param {string} url - URL ທີ່ຈະສົ່ງຂໍ້ມູນໄປ
         * @param {object} data - Object ຂໍ້ມູນທີ່ຈະສົ່ງ
         * @returns {Promise<any|null>}
         */
        async PostData(url, data) {
            try {
                const response = await apiClient.post(url, data);
                if (response.data.success) {
                    this.showToast('success', response.data.message || 'ສ້າງຂໍ້ມູນສຳເລັດ!');
                    return response.data;
                } else {
                    this.showToast('error', response.data.message || 'ການສ້າງຂໍ້ມູນລົ້ມເຫຼວ.');
                    return null;
                }
            } catch (error) {
                console.error('PostData Error:', error);
                this.showToast('error', 'ເກີດຂໍ້ຜິດພາດໃນການສົ່ງຂໍ້ມູນ.');
                return null;
            }
        },

        /**
         * ສົ່ງຂໍ້ມູນ ແລະ ໄຟລ໌ (ອັບໂຫລດ)
         * @param {string} url - URL ທີ່ຈະສົ່ງຂໍ້ມູນໄປ
         * @param {FormData} formData - ຂໍ້ມູນ FormData ທີ່ມີທັງ Text ແລະ ໄຟລ໌
         * @returns {Promise<any|null>}
         */
        async PostDataWithFile(url, formData) {
            try {
                const response = await apiClient.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // ບອກ Server ວ່າເຮົາກຳລັງສົ່ງໄຟລ໌
                    },
                });
                if (response.data.success) {
                    this.showToast('success', response.data.message || 'ອັບໂຫລດສຳເລັດ!');
                    return response.data;
                } else {
                    this.showToast('error', response.data.message || 'ການອັບໂຫລດລົ້ມເຫຼວ.');
                    return null;
                }
            } catch (error) {
                console.error('PostDataWithFile Error:', error);
                this.showToast('error', 'ເກີດຂໍ້ຜິດພາດໃນການອັບໂຫລດໄຟລ໌.');
                return null;
            }
        },

        /**
         * ອັບເດດຂໍ້ມູນ (PUT)
         * @param {string} url - URL ຂອງຂໍ້ມູນທີ່ຈະອັບເດດ (ເຊັ່ນ: '/api/users/1')
         * @param {object} data - Object ຂໍ້ມູນໃໝ່
         * @returns {Promise<any|null>}
         */
        async PutData(url, data) {
            try {
                // Laravel ມັກຈະໃຊ້ POST ໃນການອັບເດດ, ແຕ່ເພີ່ມ `_method` ເຂົ້າໄປ
                // ແຕ່ຖ້າ API ເປັນ PUT ແທ້ໆ ກໍໃຊ້ apiClient.put(url, data) ໄດ້ເລີຍ
                const response = await apiClient.put(url, data);
                if (response.data.success) {
                    this.showToast('success', response.data.message || 'ອັບເດດຂໍ້ມູນສຳເລັດ!');
                    return response.data;
                } else {
                    this.showToast('error', response.data.message || 'ການອັບເດດຂໍ້ມູນລົ້ມເຫຼວ.');
                    return null;
                }
            } catch (error) {
                console.error('PutData Error:', error);
                this.showToast('error', 'ເກີດຂໍ້ຜິດພາດໃນການອັບເດດຂໍ້ມູນ.');
                return null;
            }
        },

        /**
         * ລຶບຂໍ້ມູນ (DELETE)
         * @param {string} url - URL ຂອງຂໍ້ມູນທີ່ຈະລຶບ (ເຊັ່ນ: '/api/users/1')
         * @returns {Promise<boolean>} - ສົ່ງຄືນ true ຖ້າສຳເລັດ, false ຖ້າລົ້ມເຫຼວ
         */
        async DeleteData(url) {
            try {
                const response = await apiClient.delete(url);
                if (response.data.success) {
                    this.showToast('success', response.data.message || 'ລຶບຂໍ້ມູນສຳເລັດ!');
                    return true;
                } else {
                    this.showToast('error', response.data.message || 'ການລຶບຂໍ້ມູນລົ້ມເຫຼວ.');
                    return false;
                }
            } catch (error) {
                console.error('DeleteData Error:', error);
                this.showToast('error', 'ເກີດຂໍ້ຜິດພາດໃນການລຶບຂໍ້ມູນ.');
                return false;
            }
        },
    },
};