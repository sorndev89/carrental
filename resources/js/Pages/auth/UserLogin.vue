<template lang="">
   <div class="main-wrapper">
			<div class="account-content">
				<div class="login-wrapper login-new">
                    <div class="row w-100">
                        <div class="col-lg-5 mx-auto">
                            <div class="login-content user-login">
                                <div class="login-logo">
                                    <!-- <img src="assets/img/logo.svg" alt="img"> -->
                                    <a href="index.html" class="login-logo logo-white">
                                        <!-- <img src="assets/img/logo-white.svg" alt="Img"> -->
                                    </a>
                                </div>
                                <form @submit.prevent="handleLogin">
                                    <div class="card">
                                        <div class="card-body p-5">
                                            <div class="login-userheading">
                                                <h3>Sign In</h3>
                                                <h4>Access the Dreamspos panel using your email and passcode.</h4>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Email <span class="text-danger"> *</span></label>
                                                <div class="input-group">
                                                    <input type="text" v-model="email" class="form-control border-end-0">
                                                    <span class="input-group-text border-start-0">
                                                        <i class="ti ti-mail"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Password <span class="text-danger"> *</span></label>
                                                <div class="pass-group">
                                                    <input type="password" v-model="password" class="pass-input form-control">
                                                    <span class="ti toggle-password ti-eye-off text-gray-9"></span>
                                                </div>
                                            </div>
                                            <div class="form-login authentication-check">
                                                <div class="row">
                                                    <div class="col-12 d-flex align-items-center justify-content-between">
                                                        <div class="custom-control custom-checkbox">
                                                            <label class="checkboxs ps-4 mb-0 pb-0 line-height-1 fs-16 text-gray-6">
                                                                <input type="checkbox" v-model="rememberMe" class="form-control">
                                                                <span class="checkmarks"></span>Remember me
                                                            </label>
                                                        </div>
                                                        <div class="text-end">
                                                            <a class="text-orange fs-16 fw-medium" href="forgot-password.html">Forgot Password?</a>
                                                        </div>
                                                    </div>                                    
                                                </div>
                                            </div>
                                            <div class="form-login">
                                                <button type="submit" class="btn btn-primary w-100">Sign In</button>
                                            </div>
                                            <div class="signinform">
                                                <h4>New on our platform?<a href="register.html" class="hover-a"> Create an account</a></h4>
                                            </div>
                                            <div class="form-setlogin or-text">
                                                <h4>OR</h4>
                                            </div>
                                            <div class="mt-2">
                                                <div class="d-flex align-items-center justify-content-center flex-wrap">
                                                    <div class="text-center me-2 flex-fill">
                                                        <a href="javascript:void(0);" class="br-10 p-2 btn btn-info d-flex align-items-center justify-content-center">
                                                            <img class="img-fluid m-1" :src="url + '/assets/img/icons/facebook-logo.svg'" alt="Facebook">
                                                        </a>
                                                    </div>
                                                    <div class="text-center me-2 flex-fill">
                                                        <a href="javascript:void(0);" class="btn btn-white br-10 p-2  border d-flex align-items-center justify-content-center">
                                                            <img class="img-fluid m-1" :src="url + '/assets/img/icons/google-logo.svg'" alt="Facebook">
                                                        </a>
                                                    </div>
                                                    <div class="text-center flex-fill">
                                                        <a href="javascript:void(0);" class="bg-dark br-10 p-2 btn btn-dark d-flex align-items-center justify-content-center">
                                                            <img class="img-fluid m-1" :src="url + '/assets/img/icons/apple-logo.svg'" alt="Apple">
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="my-4 d-flex justify-content-center align-items-center copyright-text">
                                <p>Copyright © 2025 DreamsPOS</p>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
        </div>
</template>
<script>
import { useAuthStore } from '@/Stores/Auth.js';

export default {
    data() {
        return {
            email: '',
            password: '',
            rememberMe: false,
            url: window.location.origin
        };
    },
    methods: {
        async handleLogin() {
            const authStore = useAuthStore();
            try {
                await authStore.login({
                    email: this.email,
                    password: this.password,
                    remember: this.rememberMe,
                });
                this.$router.push('/'); // Redirect to home or dashboard on successful login
            } catch (error) {
                console.error('Login failed:', error);
                // Optionally, display an error message to the user
            }
        },
    },
};
</script>
<style lang="">
    
</style>