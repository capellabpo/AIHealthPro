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
        <div class="sign_label_small" style="text-align: center;">{{ signUptext }}</div>
    </div>
    <div class="login_inputs">
        <span class="sign_label_small">Name</span>
        <input type="text" class="login_username" placeholder="Enter your name" v-model="newUsername">
    </div>
    <div class="login_inputs">
        <span class="sign_label_small">Email</span>
        <input type="text" class="login_username" placeholder="Enter your email" v-model="newEmail">
    </div>
    <div class="login_inputs">
        <span class="sign_label_small">Password</span>
        <div class="input_icon">
            <input :type="(password ? 'password' : 'text')" class="login_password" placeholder="Password"  v-model="newPassword" @keyup.enter="openDashboard">
            <button class="pass_icon" @click="password = !password">
                <fa :icon="['fa', (password ? 'eye' : 'eye-slash')]" />
            </button>
        </div>
    </div>
    <div class="login_inputs">
        <button class="login_btn" @click="openDashboard()" v-if="!loader">
            Get Started
        </button>

        <div class="loader_container" v-else>
            <div class="typing_indicator loader">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        </div>

        <div class="errorMess" v-show="showError">{{ showError }}</div>
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

            newUsername: '',
            newEmail: '',
            newPassword: '',

            signUptext: 'To get started, please create an account so you can access exclusive content and personalized recommendations.',

            loader: false,
            showError: '',
        }
    },
    watch: {
        '$store.state.limitReached':function(newVal, oldVal) {
            if(newVal == true) {
                this.signUptext = 'Seems like you have reached your credit limit. Sign up now and upgrade your experience!';
            }
        }
    },
    methods: {
        openLogin() {
            this.$store.dispatch('openLogin');
        },
        clearLocalStorage() {
            localStorage.removeItem("consultationID");
            localStorage.removeItem("messages");
            localStorage.removeItem("patient_form");
        },
        async openDashboard() {
            this.loader = true;
            this.showError = '';
            const response = await this.$store.dispatch('registerNewUser', { 
                user_name: this.newUsername,
                user_email: this.newEmail,
                user_password: this.newPassword
            });

            console.log(response);
            if(response == 1) {
                // Clear local storage
                this.clearLocalStorage();
                // SUCCESS
                window.location.reload();
            }
            else  {
                // FAILED
                this.loader = false;
                this.showError = response.response.data;
                console.log(response.response.data);
            }
        },
    }
    }
    </script>
    
    <style>
    
    </style>