<template>
<div class="login_card">
    <div class="login_logo">
        <div class="header_logo">
            <span style="color: #3C4041">AIHealth</span>Pro
        </div>
    </div>
    <div class="sign_label">
        <span style="color: #00B8A8; font-weight: bold;">Sign In</span> &nbsp; in to your account
    </div>
    <div class="login_inputs">
        <span class="sign_label_small">Email</span>
        <input type="text" class="login_username" placeholder="Email" v-model="user_email" autocomplete="username">
    </div>
    <div class="login_inputs">
        <span class="sign_label_small">Password</span>
        <div class="input_icon">
            <input :type="(password ? 'password' : 'text')" class="login_password" placeholder="Password" v-model="user_password" @keyup.enter="openDashboard">
            <button class="pass_icon" @click="password = !password">
                <fa :icon="['fa', (password ? 'eye' : 'eye-slash')]" />
            </button>
        </div>
    </div>
    <div class="login_inputs">
        <div class="login_row">
            <!-- <div class="input_half_1">
                <div class="checkbox_layout" @click="rememberMe()">
                    <div :class="`check_box ${remember ? 'check_box_act' : ''}`">
                        <fa :icon="['fa', 'check']" v-show="remember"/>
                    </div>
                    <div class="sign_label_small">Remember Me</div>
                </div>
            </div> -->
            <!-- <div class="input_half_2"> -->
                <div class="sign_label_small forgot_pass">Forgot Password</div>
            <!-- </div> -->
        </div>
    </div>
    <div class="login_inputs">
        <button class="login_btn" @click="openDashboard" v-if="!loader">
            Sign In
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
            <div class="sign_label_small">Don't have an account?</div> &nbsp;
            <div class="sign_label_small forgot_pass" @click="openRegister()">Sign Up</div>
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

        user_email: '',
        user_password: '',
        loader: false,
        showError: '',
    }
},
methods: {
    rememberMe() {
        this.remember = !this.remember;
    },
    openRegister() {
        this.$store.dispatch('openRegister');
    },
    clearLocalStorage() {
        localStorage.removeItem("consultationID");
        localStorage.removeItem("messages");
        localStorage.removeItem("patient_form");
    },
    async openDashboard() {
        this.loader = true;
        this.showError = '';
        const response = await this.$store.dispatch('loginUser', { 
            user_email: this.user_email,
            user_password: this.user_password
        });

        // console.log(response);
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