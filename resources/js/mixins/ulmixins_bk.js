// ນຳເຂົ້າໄລບຣາຣີທີ່ຈຳເປັນ
import axios from 'axios';
import axiosRetry from 'axios-retry'; // ນຳໃຊ້ axios-retry ເພື່ອຈັດການການລອງໃໝ່ຂອງ request
import { useStore } from '../Store/Auth';

// ຕັ້ງຄ່າ instance ຂອງ Axios
const apiClient = axios.create({
    // ໃຊ້ window.location.origin ເພື່ອດຶງ URL ພື້ນຖານຂອງ host ປັດຈຸບັນ
    // ຕົວຢ່າງ: ຖ້າແອັບ Vue ຂອງເຈົ້າເຮັດວຽກຢູ່ http://localhost:8080, baseURL ຈະເປັນ http://localhost:8080
    // ຖ້າແອັບ Vue ຂອງເຈົ້າເຮັດວຽກຢູ່ https://your-domain.com, baseURL ຈະເປັນ https://your-domain.com
    // ຂໍ້ສັງເກດ: ຖ້າ API ຂອງເຈົ້າຢູ່ໃຕ້ path ສະເພາະ (ເຊັ່ນ: your-domain.com/api), 
    // ເຈົ້າຈະຕ້ອງເພີ່ມ '/api' ຕໍ່ທ້າຍ: baseURL: window.location.origin + '/api',
    baseURL: window.location.origin, 
    headers: {
        'Content-Type': 'application/json', // ຕັ້ງຄ່າ header ສໍາລັບ JSON
        'Accept': 'application/json', // ຕັ້ງຄ່າ header ສໍາລັບການຍອມຮັບ JSON
    },
    timeout: 10000, // ຕັ້ງຄ່າ timeout ສໍາລັບ request (10 ວິນາທີ)
});

// Add a request interceptor to add the token to the headers
apiClient.interceptors.request.use((config) => {
    const store = useStore();
    const token = store.GetToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// ຕັ້ງຄ່າ axios-retry
axiosRetry(apiClient, {
    retries: 5, // ຈໍານວນຄັ້ງທີ່ຈະລອງໃໝ່
    retryDelay: (retryCount) => {
        return retryCount * 1000; // ການລໍຖ້າກ່ອນຈະລອງໃໝ່: 1 ວິນາທີ, 2 ວິນາທີ, 3 ວິນາທີ...
    },
    retryCondition: (error) => {
        // ລອງໃໝ່ຖ້າບໍ່ມີການຕອບກັບຈາກເຊີເວີ (Network Error, Timeout)
        // ຫຼືຖ້າຂໍ້ຜິດພາດແມ່ນ 5xx (Server Error)
        return axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error);
    },
    onRetry: (retryCount, error, requestConfig) => {
        console.warn(`ການຮ້ອງຂໍບໍ່ສຳເລັດ: ${error.message}. ກໍາລັງລອງໃໝ່ຄັ້ງທີ ${retryCount}...`);
        // ສາມາດເພີ່ມການແຈ້ງເຕືອນຜູ້ໃຊ້ຢູ່ບ່ອນນີ້ (ເຊັ່ນ: Toast notification)
    },
});

export default {
    data() {
        return {
            // ສາມາດເພີ່ມຂໍ້ມູນທີ່ໃຊ້ຮ່ວມກັນຢູ່ບ່ອນນີ້
        };
    },
    // ບໍ່ຈໍາເປັນຕ້ອງ import axios ຫຼື moment ໃນ components ນີ້
    // ເນື່ອງຈາກພວກເຮົາໃຊ້ axios instance ທີ່ກຳນົດເອງ
    methods: {
        /**
         * ສະແດງຂໍ້ຄວາມແຈ້ງເຕືອນຜູ້ໃຊ້ແບບ Toast ດ້ວຍ SweetAlert2
         * @param {string} type - ປະເພດຂອງຂໍ້ຄວາມ (success, error, warning, info, question)
         * @param {string} message - ຂໍ້ຄວາມທີ່ຈະສະແດງ
         */
        showUserMessage(type, message) {
            if (this.$swal) {
                this.$swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: type,
                    title: message,
                    showConfirmButton: false,
                    timer: 2500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', this.$swal.stopTimer);
                        toast.addEventListener('mouseleave', this.$swal.resumeTimer);
                    }
                });
            } else {
                // Fallback in case swal is not available
                console.warn('SweetAlert2 (this.$swal) is not available. Falling back to alert.');
                alert(`[${type.toUpperCase()}] ${message}`);
            }
        },

        /**
         * ສົ່ງຂໍ້ມູນ (POST request) ໄປຍັງ API
         * @param {string} url - ສ່ວນທ້າຍຂອງ URL API (ເຊັ່ນ: '/users')
         * @param {object} data - ຂໍ້ມູນທີ່ຈະສົ່ງ
         * @param {function} result - Callback function (error, data)
         */
        async PostData(url, data, result) {
            try {
                const response = await apiClient.post(url, data);
                if (response.status >= 200 && response.status < 300) {
                    this.showUserMessage('success', 'ຂໍ້ມູນຖືກສ້າງສຳເລັດແລ້ວ!');
                    result(null, response.data); // ສົ່ງຄືນຂໍ້ມູນທີ່ສຳເລັດ
                } else {
                    this.showUserMessage('error', `ເກີດຂໍ້ຜິດພາດໃນການສ້າງຂໍ້ມູນ: ${response.status}`);
                    result(new Error(`API Error: ${response.status}`), null);
                }
            } catch (error) {
                console.error('ຂໍ້ຜິດພາດໃນການ PostData:', error);
                this.handleApiError(error, result, 'ສ້າງຂໍ້ມູນ');
            }
        },

        /**
         * ດຶງຂໍ້ມູນທັງໝົດ (GET request) ຈາກ API
         * @param {string} url - ສ່ວນທ້າຍຂອງ URL API (ເຊັ່ນ: '/users')
         * @param {function} result - Callback function (error, data)
         */
        async GetData(url, result) {
            try {
                const response = await apiClient.get(url);
                if (response.status >= 200 && response.status < 300) {
                    this.showUserMessage('success', 'ດຶງຂໍ້ມູນສຳເລັດແລ້ວ!');
                    result(null, response.data);
                } else {
                    this.showUserMessage('error', `ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນ: ${response.status}`);
                    result(new Error(`API Error: ${response.status}`), null);
                }
            } catch (error) {
                console.error('ຂໍ້ຜິດພາດໃນການ GetData:', error);
                this.handleApiError(error, result, 'ດຶງຂໍ້ມູນ');
            }
        },

        /**
         * ດຶງຂໍ້ມູນອັນດຽວ (GET request) ຈາກ API ດ້ວຍ ID
         * @param {string} url - ສ່ວນທ້າຍຂອງ URL API (ເຊັ່ນ: '/users/1')
         * @param {function} result - Callback function (error, data)
         */
        async GetOneData(url, result) {
            try {
                const response = await apiClient.get(url);
                if (response.status >= 200 && response.status < 300) {
                    this.showUserMessage('success', 'ດຶງຂໍ້ມູນດຽວສຳເລັດແລ້ວ!');
                    result(null, response.data);
                } else if (response.status === 404) {
                    this.showUserMessage('warning', 'ບໍ່ພົບຂໍ້ມູນ.');
                    result(new Error('Not Found'), null);
                } else {
                    this.showUserMessage('error', `ເກີດຂໍ້ຜິດພາດໃນການດຶງຂໍ້ມູນ: ${response.status}`);
                    result(new Error(`API Error: ${response.status}`), null);
                }
            } catch (error) {
                console.error('ຂໍ້ຜິດພາດໃນການ GetOneData:', error);
                this.handleApiError(error, result, 'ດຶງຂໍ້ມູນດຽວ');
            }
        },

        /**
         * ອັບເດດຂໍ້ມູນ (PUT request) ໄປຍັງ API
         * @param {string} url - ສ່ວນທ້າຍຂອງ URL API (ເຊັ່ນ: '/users/1')
         * @param {object} data - ຂໍ້ມູນທີ່ຈະອັບເດດ
         * @param {function} result - Callback function (error, data)
         */
        async PutData(url, data, result) {
            try {
                const response = await apiClient.put(url, data);
                if (response.status >= 200 && response.status < 300) {
                    this.showUserMessage('success', 'ຂໍ້ມູນຖືກອັບເດດສຳເລັດແລ້ວ!');
                    result(null, response.data);
                } else {
                    this.showUserMessage('error', `ເກີດຂໍ້ຜິດພາດໃນການອັບເດດຂໍ້ມູນ: ${response.status}`);
                    result(new Error(`API Error: ${response.status}`), null);
                }
            } catch (error) {
                console.error('ຂໍ້ຜິດພາດໃນການ PutData:', error);
                this.handleApiError(error, result, 'ອັບເດດຂໍ້ມູນ');
            }
        },

        /**
         * ລຶບຂໍ້ມູນ (DELETE request) ຈາກ API
         * @param {string} url - ສ່ວນທ້າຍຂອງ URL API (ເຊັ່ນ: '/users/1')
         * @param {function} result - Callback function (error, data)
         */
        async DeleteData(url, result) {
            try {
                const response = await apiClient.delete(url);
                if (response.status >= 200 && response.status < 300) {
                    this.showUserMessage('success', 'ຂໍ້ມູນຖືກລຶບສຳເລັດແລ້ວ!');
                    result(null, response.data);
                } else {
                    this.showUserMessage('error', `ເກີດຂໍ້ຜິດພາດໃນການລຶບຂໍ້ມູນ: ${response.status}`);
                    result(new Error(`API Error: ${response.status}`), null);
                }
            } catch (error) {
                console.error('ຂໍ້ຜິດພາດໃນການ DeleteData:', error);
                this.handleApiError(error, result, 'ລຶບຂໍ້ມູນ');
            }
        },

        /**
         * ຈັດການຂໍ້ຜິດພາດຂອງ API ແລະແຈ້ງເຕືອນຜູ້ໃຊ້
         * @param {object} error - Object ຂໍ້ຜິດພາດຈາກ Axios
         * @param {function} result - Callback function (error, data)
         * @param {string} operation - ຊື່ຂອງການດໍາເນີນງານ (ເຊັ່ນ: 'ສ້າງຂໍ້ມູນ', 'ດຶງຂໍ້ມູນ')
         */
        handleApiError(error, result, operation) {
            if (error.response) {
                // ເຊີເວີຕອບກັບດ້ວຍ status code ທີ່ບໍ່ແມ່ນ 2xx
                console.error('Data:', error.response.data);
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
                this.showUserMessage('error', `ເກີດຂໍ້ຜິດພາດໃນການ ${operation}: ${error.response.status} - ${error.response.data.message || 'Server Error'}`);
                result(new Error(`API Error: ${error.response.status} - ${error.response.data.message || 'Unknown Error'}`), null);
            } else if (error.request) {
                // ການຮ້ອງຂໍຖືກສ້າງຂຶ້ນແຕ່ບໍ່ມີການຕອບກັບ (ເຊັ່ນ: network error, timeout)
                console.error('No response received:', error.request);
                this.showUserMessage('error', `ບໍ່ມີການຕອບກັບຈາກເຊີເວີໃນການ ${operation}. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.`);
                result(new Error('No response from server'), null);
            } else {
                // ສິ່ງອື່ນໆທີ່ເຮັດໃຫ້ເກີດຂໍ້ຜິດພາດ
                console.error('Error setting up request:', error.message);
                this.showUserMessage('error', `ເກີດຂໍ້ຜິດພາດໃນການຕັ້ງຄ່າການຮ້ອງຂໍສຳລັບການ ${operation}: ${error.message}`);
                result(new Error(`Request setup error: ${error.message}`), null);
            }
            // ຖ້າ axios-retry ລອງໃໝ່ຄົບແລ້ວ ແລະຍັງມີຂໍ້ຜິດພາດ, ມັນຈະຕົກມາທີ່ນີ້
            if (axiosRetry.isRetryableError(error) && error.config.__retryCount === 5) {
                this.showUserMessage('error', `ບໍ່ສາມາດ ${operation} ໄດ້ຫຼັງຈາກລອງໃໝ່ 5 ຄັ້ງ. ກະລຸນາກວດສອບການເຊື່ອມຕໍ່ອິນເຕີເນັດຂອງທ່ານ.`);
            }
        }
    }
};
