<template>
    <div class="d-flex">
        <div class="p-2 d-flex align-items-center">
            <label class="me-2">ສະແດງ</label>
            <select class="form-select form-select-sm w-auto me-2" v-model="selectedPerPage" @change="changePerPage">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </select>
            <div class="text-nowrap" role="status" aria-live="polite">
                {{ pagination.from }} - {{ pagination.to }} of {{ pagination.total }} items
            </div>
        </div>
        <div class="w-100">
            <div class="dataTables_paginate d-flex justify-content-end">
                <ul class="pagination">
                    <li class="page-item" :class="[back]">
                        <a
                            class="page-link"
                            href="javascript:void(0)"
                            tabindex="-1"
                            @click.prevent="changePage(pagination.current_page - 1)"
                        >
                            <i class='fa fa-angle-left'></i>
                        </a>
                    </li>
                    <li
                        class="page-item"
                        v-for="page in pagesNumber"
                        :key="page"
                        :class="{ active: page == pagination.current_page }"
                    >
                        <a
                            class="page-link"
                            href="javascript:void(0)"
                            @click.prevent="changePage(page)"
                            >{{ page }}</a
                        >
                    </li>
                    <li class="page-item" :class="[next]">
                        <a
                            class="page-link"
                            href="javascript:void(0)"
                            @click.prevent="changePage(pagination.current_page + 1)"
                        >
                            <i class='fa fa-angle-right'></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pagination: {
            type: Object,
            required: true,
            default: () => ({
                current_page: 1,
                data: [],
                from: 0,
                to: 0,
                total: 0,
                per_page: 10,
                last_page: 1, 
                links: [],
                prev_page_url: null,
                next_page_url: null,
            }),
        },
        offset: {
            type: Number,
            default: 4,
        },
    },
    data() {
        return {
            selectedPerPage: this.pagination.per_page,
            back: "disabled",
            next: "",
        };
    },
    computed: {
        pagesNumber() {
            if (!this.pagination.to) {
                return [];
            }
            let from = this.pagination.current_page - this.offset;
            if (from < 1) {
                from = 1;
            }
            let to = from + this.offset * 2;
            if (to >= this.pagination.last_page) {
                to = this.pagination.last_page;
            }
            let pagesArray = [];
            for (let page = from; page <= to; page++) {
                pagesArray.push(page);
            }
            return pagesArray;
        },
    },
    watch: {
        'pagination.per_page'(newVal) {
            this.selectedPerPage = newVal;
        },
        'pagination.current_page': {
            handler(newVal) {
                this.updateNavigationButtons(newVal);
            },
            immediate: true,
        },
        'pagination.last_page': {
            handler(newVal) {
                this.updateNavigationButtons(this.pagination.current_page);
            },
            immediate: true,
        }
    },
    methods: {
        changePerPage() {
            this.$emit('change-per-page', this.selectedPerPage);
        },
        changePage(page) {
            if (page >= 1 && page <= this.pagination.last_page) {
                this.$emit('go-to-page', page);
            }
        },
        updateNavigationButtons(currentPage) {
            if (currentPage > 1) {
                this.back = "";
            } else {
                this.back = "disabled";
            }
            if (currentPage < this.pagination.last_page) {
                this.next = "";
            } else {
                this.next = "disabled";
            }
        }
    },
    mounted() {
        this.updateNavigationButtons(this.pagination.current_page);
    }
};
</script>

<style scoped>
/* Add any specific styles for your pagination component here if needed */
</style>
