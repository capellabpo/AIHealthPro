<template>

<div class="login_card">
    <div class="login_logo">
        <div class="header_logo">
            <span style="color: #3C4041">AIHealth</span>Pro
        </div>
    </div>
    <div class="sign_label">
        <span style="color: #00B8A8; font-weight: bold;">Sign Up</span> &nbsp; a new account
    </div>
    <div class="sign_label">
        <div class="sign_label_small" style="text-align: center;">To get started, please create an account so you can access exclusive content and personalized recommendations.</div>
    </div>
    <div class="login_inputs">
        <span class="sign_label_small">Email</span>
        <input type="text" class="login_username" placeholder="Email">
    </div>
    <div class="login_inputs">
        <span class="sign_label_small">Password</span>
        <div class="input_icon">
            <input :type="(password ? 'password' : 'text')" class="login_password" placeholder="Password">
            <button class="pass_icon" @click="password = !password">
                <fa :icon="['fa', (password ? 'eye' : 'eye-slash')]" />
            </button>
        </div>
    </div>
    <div class="login_inputs">
        <button class="login_btn" @click="openDashboard()">
            Get Started
        </button>
    </div>
    <div class="login_inputs">
        <div class="label_notes">
            <div class="sign_label_small">Already have an account?</div> &nbsp;
            <div class="sign_label_small forgot_pass" @click="openLogin()">Sign In</div>
        </div>
    </div>
    
</div>

    </template>
    
    <script>
    export default {
    data() {
        return {
            password: true,
            remember: false,
        }
    },
    methods: {
        openLogin() {
            this.$store.dispatch('openLogin');
        },
        openDashboard() {
            // this.$router.push({ path: "/" });
        },
    }
    }
    </script>
    
    <style>
    
    </style>