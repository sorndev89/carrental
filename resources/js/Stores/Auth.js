import { defineStore } from "pinia";
import Swal from "sweetalert2";
import axios from "axios";

export const useAuthStore = defineStore("main", {
    /**
     * @property {object|null} user - ຂໍ້ມູນຜູ້ໃຊ້ທີ່ເຂົ້າສູ່ລະບົບ, ເກັບໄວ້ໃນ Local Storage ຫຼື Session Storage.
     * @property {string|null} token - Token ການຢືນຢັນຕົວຕົນ (JWT) ຂອງຜູ້ໃຊ້, ເກັບໄວ້ໃນ Local Storage ຫຼື Session Storage.
     * @property {string|null} user_type - ປະເພດຂອງຜູ້ໃຊ້ (ເຊັ່ນ: 'admin', 'user'), ເກັບໄວ້ໃນ Local Storage ຫຼື Session Storage.
     * @property {Array<string>} permissions - ລາຍຊື່ສິດທິການເຂົ້າເຖິງຂອງຜູ້ໃຊ້, ເກັບໄວ້ໃນ Local Storage ຫຼື Session Storage.
     */
    state:()=>({
        user: JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
        user_type: localStorage.getItem('user_type') || sessionStorage.getItem('user_type') || null,

        // token:null,
        // user:null,
        permissions: JSON.parse(localStorage.getItem('permissions') || sessionStorage.getItem('permissions')) || [],
    }),
    getters:{
        /**
         * @method isAuthenticated
         * @description ກວດສອບວ່າຜູ້ໃຊ້ໄດ້ເຂົ້າສູ່ລະບົບແລ້ວຫຼືບໍ່ ໂດຍການກວດສອບວ່າມີ token ຢູ່ຫຼືບໍ່.
         * @returns {boolean} `true` ຖ້າມີ token, `false` ຖ້າບໍ່ມີ.
         */
        isAuthenticated: (state) => !!state.token, // ກວດສອບວ່າມີ token ບໍ່
        /**
         * @method getUser
         * @description ສົ່ງຄືນຂໍ້ມູນ Object ຂອງຜູ້ໃຊ້ທີ່ເຂົ້າສູ່ລະບົບ.
         * @returns {object|null} Object ຜູ້ໃຊ້ ຫຼື `null` ຖ້າບໍ່ມີຜູ້ໃຊ້ເຂົ້າສູ່ລະບົບ.
         */
        getUser: (state) => state.user, // ດຶງຂໍ້ມູນ user
        /**
         * @method getUserType
         * @description ສົ່ງຄືນປະເພດຂອງຜູ້ໃຊ້ທີ່ເຂົ້າສູ່ລະບົບ.
         * @returns {string|null} ປະເພດຜູ້ໃຊ້ ຫຼື `null` ຖ້າບໍ່ມີຜູ້ໃຊ້ເຂົ້າສູ່ລະບົບ.
         */
        getUserType: (state) => state.user_type, // ດຶງຂໍ້ມູນ user_type
        /**
         * @method getPermissions
         * @description ສົ່ງຄືນລາຍຊື່ສິດທິການເຂົ້າເຖິງຂອງຜູ້ໃຊ້ທີ່ເຂົ້າສູ່ລະບົບ.
         * @returns {Array<string>} Array ຂອງສິດທິການເຂົ້າເຖິງ.
         */
        getPermissions: (state) => state.permissions, // ດຶງຂໍ້ມູນ permissions

        // GetToken:state=>state.token,
        // GetUser:state=>state.user,
        // GetPermissions:state=>state.permissions,
    },
    actions:{
            
        async login(credentials) {
            /**
             * @method login
             * @description ຈັດການຂະບວນການເຂົ້າສູ່ລະບົບຂອງຜູ້ໃຊ້.
             * ມັນຈະສົ່ງຂໍ້ມູນຢືນຢັນຕົວຕົນ (credentials) ໄປຍັງ API `/api/auth/login`.
             * ຖ້າການເຂົ້າສູ່ລະບົບສຳເລັດ, ມັນຈະເກັບ `token`, `user`, `user_type`, ແລະ `permissions` ໄວ້ໃນ Pinia state ແລະ Local Storage/Session Storage ຕາມທີ່ຜູ້ໃຊ້ເລືອກ (remember me).
             * ຖ້າການເຂົ້າສູ່ລະບົບລົ້ມເຫຼວ (ເຊັ່ນ: ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ), ມັນຈະສະແດງຂໍ້ຄວາມຜິດພາດຜ່ານ SweetAlert2 ແລະ ທຳການ logout state ບາງສ່ວນ.
             * @param {object} credentials - Object ທີ່ບັນຈຸ `email` ແລະ `password` ຂອງຜູ້ໃຊ້, ພ້ອມທັງ `remember` (boolean).
             * @returns {Promise<boolean>} Promise ທີ່ສົ່ງຄືນ `true` ຖ້າການເຂົ້າສູ່ລະບົບສຳເລັດ.
             * @throws {Error} ຖ້າການຮ້ອງຂໍ API ລົ້ມເຫຼວ.
             */
                try {
                    const response = await axios.post('/api/auth/login', credentials);
                    this.token = response.data.access_token;
                    this.user = response.data.user;
                    this.user_type = response.data.user_type; // ປັບປຸງ
                    this.permissions = response.data.permissions; // ປັບປຸງ
                    
                    const storage = credentials.remember ? localStorage : sessionStorage;
                    storage.setItem('token', this.token);
                    storage.setItem('user', JSON.stringify(this.user));
                    storage.setItem('user_type', this.user_type); // ປັບປຸງ
                    storage.setItem('permissions', JSON.stringify(this.permissions)); // ປັບປຸງແລະ JSON.stringify()
                    // console.log('Login successful!')

                    return true;
                } catch (error) {
                    console.error(error.response.status);
                    if (error.response.status === 401) {
                        Swal.fire({
                            icon: 'error',
                            title: 'ບໍ່ສາມາດເຂົ້າສູ່ລະບົບ',
                            text: error.response.data.error,
                            
                        });
                    }
                    this.logout(); // ລຶບ state ບາງສ່ວນຖ້າມີ error
                    throw error; // ສົ່ງ error ຕໍ່ໄປ
                }
            },
            async logout() {
                /**
                 * @method logout
                 * @description ຈັດການຂະບວນການອອກຈາກລະບົບຂອງຜູ້ໃຊ້.
                 * ມັນຈະສົ່ງຄຳຮ້ອງຂໍໄປຍັງ API `/api/auth/logout` ເພື່ອຍົກເລີກ token ຢູ່ຝັ່ງ Server.
                 * ຫຼັງຈາກນັ້ນ, ມັນຈະລຶບ `token`, `user`, `user_type`, ແລະ `permissions` ອອກຈາກ Pinia state, Local Storage, ແລະ Session Storage.
                 */
                try {
                    if (this.token) {
                        // ຍິງ API logout ໄປຫາ backend
                        await axios.post('/api/auth/logout', {}, {
                            headers: {
                                Authorization: `Bearer ${this.token}`,
                            },
                        });
                    }
                } catch (error) {
                    console.error('Logout failed:', error);
                } finally {
                    // ລຶບ token ແລະ user ອອກຈາກ state ແລະ LocalStorage/SessionStorage
                    this.token = null;
                    this.user = null;
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('user');
                }
            },
            
            // Method ເພື່ອດຶງຂໍ້ມູນ user ຖ້າ token ມີແຕ່ user state ວ່າງເປົ່າ
            /**
             * @method fetchUser
             * @description ດຶງຂໍ້ມູນຜູ້ໃຊ້ຈາກ API ຖ້າ token ມີຢູ່ແຕ່ຂໍ້ມູນຜູ້ໃຊ້ໃນ state ວ່າງເປົ່າ.
             * ມັນຈະກວດສອບ token ທີ່ເກັບໄວ້ໃນ Local Storage ຫຼື Session Storage.
             * ຖ້າພົບ token ແລະ ບໍ່ມີຂໍ້ມູນຜູ້ໃຊ້ໃນ state, ມັນຈະຮ້ອງຂໍຂໍ້ມູນຜູ້ໃຊ້ຈາກ API `/api/auth/me`.
             * ຖ້າສຳເລັດ, ມັນຈະອັບເດດຂໍ້ມູນຜູ້ໃຊ້ໃນ state ແລະ storage.
             * ຖ້າລົ້ມເຫຼວ, ມັນຈະທຳການ logout ຜູ້ໃຊ້.
             */
            async fetchUser() {
                const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
                const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

                if (storedToken && !this.user) {
                    this.token = storedToken;
                    if (storedUser) {
                        this.user = JSON.parse(storedUser);
                    }
                    try {
                        const response = await axios.post('/api/auth/me', {}, {
                            headers: {
                                Authorization: `Bearer ${this.token}`,
                            },
                        });
                        this.user = response.data;
                        const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
                        storage.setItem('user', JSON.stringify(this.user));
                    } catch (error) {
                        console.error('Failed to fetch user:', error);
                        this.logout(); // ຖ້າດຶງຂໍ້ມູນ user ບໍ່ໄດ້, ໃຫ້ logout
                    }
                }
            },

    }
});