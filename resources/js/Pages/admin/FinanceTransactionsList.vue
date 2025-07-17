<template>
    <div class="page-header">
        <div class="add-item d-flex">
            <div class="page-title">
                <h4 class="fw-bold">ລາຍການທຸລະກຳການເງິນ</h4>
                <h6>ຈັດການລາຍຮັບ ແລະ ລາຍຈ່າຍຂອງລະບົບ</h6>
            </div>
        </div>
        <ul class="table-top-head">
            <li><a href="javascript:void(0);" @click="exportToPdf"><img :src="`${url}/assets/img/icons/pdf.svg`" alt="img"></a></li>
            <li><a href="javascript:void(0);" @click="exportToExcel"><img :src="`${url}/assets/img/icons/excel.svg`" alt="img"></a></li>
            <li><a href="javascript:void(0);" @click="fetchTransactions(1)"><i class="ti ti-refresh"></i></a></li>
        </ul>
        <div class="page-btn">
            <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#add-transaction" @click="resetForm"><i class="ti ti-circle-plus me-1"></i>ເພີ່ມທຸລະກຳ</a>
        </div>
    </div>

    <div class="card">
        <div class="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div class="search-set">
                <div class="search-input">
                    <span class="btn-searchset"><i class="ti ti-search fs-14 feather-search"></i></span>
                    <div class="dataTables_filter">
                        <label> <input type="search" class="form-control form-control-sm" placeholder="ຄົ້ນຫາລາຍລະອຽດ..." v-model="search" @input="fetchTransactions(1)"></label>
                    </div>
                </div>
            </div>
            <div class="d-flex table-dropdown my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div class="dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
                        {{ filterType === 'income' ? 'ລາຍຮັບ' : (filterType === 'expense' ? 'ລາຍຈ່າຍ' : 'ປະເພດທັງໝົດ') }}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end p-3">
                        <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="changeTypeFilter('')">ປະເພດທັງໝົດ</a></li>
                        <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="changeTypeFilter('income')">ລາຍຮັບ</a></li>
                        <li><a href="javascript:void(0);" class="dropdown-item rounded-1" @click="changeTypeFilter('expense')">ລາຍຈ່າຍ</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table datatable">
                    <thead class="thead-light">
                        <tr>
                            <th>ວັນທີ</th>
                            <th>ປະເພດ</th>
                            <th>ຈຳນວນ</th>
                            <th>ລາຍລະອຽດ</th>
                            <th>ຜູ້ບັນທຶກ</th>
                            <th class="no-sort">ການກະທຳ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="transactions.data && transactions.data.length === 0">
                            <td colspan="6" class="text-center">ບໍ່ມີຂໍ້ມູນທຸລະກຳ</td>
                        </tr>
                        <tr v-for="transaction in transactions.data" :key="transaction.id">
                            <td>{{ new Date(transaction.transaction_date).toLocaleDateString() }}</td>
                            <td>
                                <span v-if="transaction.type === 'income'" class="badge bg-success">ລາຍຮັບ</span>
                                <span v-else class="badge bg-danger">ລາຍຈ່າຍ</span>
                            </td>
                            <td>{{ formatCurrency(transaction.amount) }}</td>
                            <td>{{ transaction.description }}</td>
                            <td>{{ transaction.recorded_by ? transaction.recorded_by.first_name + ' ' + transaction.recorded_by.last_name : 'N/A' }}</td>
                            <td class="action-table-data">
                                <div class="edit-delete-action">
                                    <a class="me-2 p-2 mb-0" href="#" data-bs-toggle="modal" data-bs-target="#add-transaction" @click="editTransaction(transaction)">
                                        <i class="ti ti-edit"></i>
                                    </a>
                                    <a class="p-2 mb-0" href="javascript:void(0);" @click="deleteTransaction(transaction.id)">
                                        <i class="ti ti-trash"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex justify-content-between p-2">
                <div>
                    <select v-model="perPage" @change="fetchTransactions(1)" class="form-select form-select-sm">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div v-if="transactions.meta">
                    <ul class="pagination">
                        <li class="paginate_button page-item" :class="{disabled: !transactions.links.prev}">
                            <a href="#" @click.prevent="fetchTransactions(transactions.meta.current_page - 1)" class="page-link">ກ່ອນໜ້າ</a>
                        </li>
                        <li class="paginate_button page-item" v-for="page in transactions.meta.last_page" :key="page" :class="{active: page === transactions.meta.current_page}">
                            <a href="#" @click.prevent="fetchTransactions(page)" class="page-link">{{ page }}</a>
                        </li>
                        <li class="paginate_button page-item" :class="{disabled: !transactions.links.next}">
                            <a href="#" @click.prevent="fetchTransactions(transactions.meta.current_page + 1)" class="page-link">ຕໍ່ໄປ</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Summary Section -->
    <div class="row mt-4">
        <div class="col-md-4">
            <div class="card bg-success text-white">
                <div class="card-body">
                    <h5 class="card-title">ລາຍຮັບລວມ</h5>
                    <p class="card-text fs-3 fw-bold">{{ formatCurrency(totalIncome) }}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card bg-danger text-white">
                <div class="card-body">
                    <h5 class="card-title">ລາຍຈ່າຍລວມ</h5>
                    <p class="card-text fs-3 fw-bold">{{ formatCurrency(totalExpense) }}</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card bg-info text-white">
                <div class="card-body">
                    <h5 class="card-title">ຍອດເຫຼືອ</h5>
                    <p class="card-text fs-3 fw-bold">{{ formatCurrency(balance) }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Add/Edit Transaction Modal -->
    <div class="modal fade" id="add-transaction">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="page-wrapper-new p-0">
                    <div class="">
                        <div class="modal-header">
                            <div class="page-title">
                                <h4>{{ isEditMode ? 'ແກ້ໄຂທຸລະກຳ' : 'ເພີ່ມທຸລະກຳ' }}</h4>
                            </div>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close" @click="resetForm">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form @submit.prevent="saveTransaction">
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label class="form-label">ປະເພດ<span class="text-danger ms-1">*</span></label>
                                    <select v-model="form.type" class="form-select" required>
                                        <option value="">ເລືອກປະເພດ</option>
                                        <option value="income">ລາຍຮັບ</option>
                                        <option value="expense">ລາຍຈ່າຍ</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">ຈຳນວນ<span class="text-danger ms-1">*</span></label>
                                    <input type="number" v-model="form.amount" class="form-control" step="0.01" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">ລາຍລະອຽດ</label>
                                    <textarea v-model="form.description" class="form-control"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label">ວັນທີທຸລະກຳ<span class="text-danger ms-1">*</span></label>
                                    <input type="datetime-local" v-model="form.transaction_date" class="form-control" required>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn me-2 btn-secondary" data-bs-dismiss="modal" @click="resetForm">ຍົກເລີກ</button>
                                <button type="submit" class="btn btn-primary" :disabled="isSubmitting">{{ isEditMode ? 'ບັນທຶກການແກ້ໄຂ' : 'ເພີ່ມທຸລະກຳ' }}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../../Stores/Auth';

export default {
    data() {
        return {
            url: window.location.origin, // URL ຫຼັກຂອງແອັບພລິເຄຊັນ
            transactions: { data: [], links: {}, meta: {} }, // ຂໍ້ມູນທຸລະກໍາ ແລະຂໍ້ມູນການແບ່ງໜ້າ
            search: '', // ຄໍາຄົ້ນຫາ
            filterType: '', // ຕົວກອງປະເພດ (income/expense)
            perPage: 10, // ຈໍານວນລາຍການຕໍ່ໜ້າ
            form: { // ວັດຖຸສໍາລັບຂໍ້ມູນຟອມການເພີ່ມ/ແກ້ໄຂທຸລະກໍາ
                id: null,
                type: '',
                amount: 0,
                description: '',
                transaction_date: new Date().toISOString().slice(0, 16), // ວັນທີທຸລະກໍາ (ຕັ້ງຄ່າເລີ່ມຕົ້ນເປັນວັນທີປັດຈຸບັນ)
            },
            isEditMode: false, // ໂໝດແກ້ໄຂ (true) ຫຼືເພີ່ມ (false)
            isSubmitting: false, // ສະຖານະການສົ່ງຟອມ
        }
    },
    computed: {
        // ຄິດໄລ່ລາຍຮັບລວມ
        totalIncome() {
            return this.transactions.data.filter(t => t.type === 'income').reduce((sum, t) => sum + parseFloat(t.amount), 0);
        },
        // ຄິດໄລ່ລາຍຈ່າຍລວມ
        totalExpense() {
            return this.transactions.data.filter(t => t.type === 'expense').reduce((sum, t) => sum + parseFloat(t.amount), 0);
        },
        // ຄິດໄລ່ຍອດເຫຼືອ
        balance() {
            return this.totalIncome - this.totalExpense;
        }
    },
    mounted() {
        // ເມື່ອ component ຖືກ mount, ດຶງຂໍ້ມູນທຸລະກໍາ
        this.fetchTransactions();
    },
    methods: {
        // ດຶງຂໍ້ມູນທຸລະກໍາຈາກ API
        async fetchTransactions(page = 1) {
            const authStore = useAuthStore();
            try {
                const response = await axios.get(`/api/admin/transactions`, {
                    params: {
                        page: page,
                        per_page: this.perPage,
                        search: this.search,
                        type: this.filterType
                    },
                    headers: { Authorization: `Bearer ${authStore.token}` }
                });
                this.transactions = response.data.transactions;
            } catch (error) {
                console.error('Error fetching transactions:', error);
                this.$swal({
                    icon: 'error',
                    title: 'ເກີດຂໍ້ຜິດພາດ',
                    text: 'ບໍ່ສາມາດດຶງຂໍ້ມູນທຸລະກຳໄດ້',
                });
            }
        },
        // ປ່ຽນຕົວກອງປະເພດທຸລະກໍາ
        changeTypeFilter(type) {
            this.filterType = type;
            this.fetchTransactions(1);
        },
        // ຈັດຮູບແບບສະກຸນເງິນ
        formatCurrency(value) {
            return parseFloat(value).toLocaleString('lo-LA', { style: 'currency', currency: 'LAK' });
        },
        // ລ້າງຟອມ
        resetForm() {
            this.form = {
                id: null,
                type: '',
                amount: 0,
                description: '',
                transaction_date: new Date().toISOString().slice(0, 16),
            };
            this.isEditMode = false;
        },
        // ຕັ້ງຄ່າຟອມສໍາລັບການແກ້ໄຂທຸລະກໍາ
        editTransaction(transaction) {
            this.form = {
                id: transaction.id,
                type: transaction.type,
                amount: parseFloat(transaction.amount),
                description: transaction.description,
                transaction_date: new Date(transaction.transaction_date).toISOString().slice(0, 16),
            };
            this.isEditMode = true;
        },
        // ບັນທຶກ (ເພີ່ມ/ແກ້ໄຂ) ທຸລະກໍາ
        async saveTransaction() {
            this.isSubmitting = true;
            const authStore = useAuthStore();
            try {
                if (this.isEditMode) {
                    await axios.put(`/api/admin/transactions/${this.form.id}`, this.form, {
                        headers: { Authorization: `Bearer ${authStore.token}` }
                    });
                    this.$swal('ສຳເລັດ!', 'ແກ້ໄຂທຸລະກຳສຳເລັດແລ້ວ.', 'success');
                } else {
                    await axios.post(`/api/admin/transactions`, this.form, {
                        headers: { Authorization: `Bearer ${authStore.token}` }
                    });
                    this.$swal('ສຳເລັດ!', 'ເພີ່ມທຸລະກຳສຳເລັດແລ້ວ.', 'success');
                }
                this.resetForm();
                this.fetchTransactions(this.transactions.meta.current_page);
                // ປິດ modal ດ້ວຍຕົນເອງ
                const modalElement = document.getElementById('add-transaction');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            } catch (error) {
                console.error('Error saving transaction:', error);
                const errorMessage = error.response?.data?.message || 'ເກີດຂໍ້ຜິດພາດໃນການບັນທຶກທຸລະກຳ';
                this.$swal('ຜິດພາດ!', errorMessage, 'error');
            } finally {
                this.isSubmitting = false;
            }
        },
        // ລົບທຸລະກໍາ
        async deleteTransaction(id) {
            const authStore = useAuthStore();
            this.$swal({
                title: 'ຢືນຢັນການລຶບ?',
                text: "ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການນີ້?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'ແມ່ນ, ລຶບเลย!',
                cancelButtonText: 'ຍົກເລີກ'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(`/api/admin/transactions/${id}`, {
                            headers: { Authorization: `Bearer ${authStore.token}` }
                        });
                        this.$swal('ສຳເລັດ!', 'ລຶບທຸລະກຳສຳເລັດແລ້ວ.', 'success');
                        this.fetchTransactions(this.transactions.meta.current_page);
                    } catch (error) {
                        console.error('Error deleting transaction:', error);
                        this.$swal('ຜິດພາດ!', 'ບໍ່ສາມາດລຶບທຸລະກຳໄດ້.', 'error');
                    }
                }
            });
        }
    }
}
</script>

<style scoped>
    .action-table-data .p-2 {
        cursor: pointer;
    }
    .pagination {
        margin: 0;
    }
</style>
