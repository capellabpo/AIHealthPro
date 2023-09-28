<template>
<div class="settings_content">
    <!-- ACCOUNT INFO -->
    <div class="card_title">Account Info</div>
    <div class="card_desc">Update your profile here.</div>

    <div class="input_container">
        <span class="sign_label_small2">Name</span>
        <input type="text" class="input_custom2" placeholder="Name" :value=username disabled>
    </div>
    <div class="input_container">
        <span class="sign_label_small2">Email Address</span>
        <input type="text" class="input_custom2" placeholder="Email" :value=email disabled>
    </div>

    <!-- ACCOUNT MEMBERS -->
    <div class="note_line"></div>
    <div class="card_title">Members</div>
    <div class="card_desc">List of members in this account</div>

    <div class="member_main">
        <div class="member_container" v-for="(mem, m) in members" :key="'mem'+m">
            <div class="member_circle">{{ nameFormat(mem.name) }}</div>
            <div class="member_Name">{{ mem.name }}</div>
        </div>
    </div>

    <!-- PASSWORDS -->
    <div class="note_line"></div>
    <div class="card_title2">Password</div>
    <div class="card_desc">Please enter your current password to change your password.</div>

    <div class="input_container">
        <span class="sign_label_small2">Current password</span>
        <div class="input_container2">    
            <input :type="show_current_pass ? 'text' : 'password'" class="input_custom2" placeholder="Current Password" v-model="current_password">
            <button :class="`input_custom2_btn ${show_current_pass ? 'btn_active' : ''}`" @click="show_current_pass = !show_current_pass">
                <fa :icon="['fa', show_current_pass ? 'eye-slash' : 'eye']" />
            </button>
        </div>
    </div>

    <div v-show="changePass">
        <div class="input_container">
            <span class="sign_label_small2">New password</span>
            <div class="input_container2">    
                <input :type="show_new_pass ? 'text' : 'password'" class="input_custom2" placeholder="New Password" v-model="new_password">
                <button :class="`input_custom2_btn ${show_new_pass ? 'btn_active' : ''}`" @click="show_new_pass = !show_new_pass">
                    <fa :icon="['fa', show_new_pass ? 'eye-slash' : 'eye']" />
                </button>
            </div>
            <div class="card_desc">Must be more then 8 characters</div>
        </div>

        <div class="input_container">
            <span class="sign_label_small2">Confirm password</span>
            <div class="input_container2">    
                <input :type="show_confirm_pass ? 'text' : 'password'" class="input_custom2" placeholder="Confirm Password" v-model="confirm_password">
                <button :class="`input_custom2_btn ${show_confirm_pass ? 'btn_active' : ''}`" @click="show_confirm_pass = !show_confirm_pass">
                    <fa :icon="['fa', show_confirm_pass ? 'eye-slash' : 'eye']" />
                </button>
            </div>
        </div>
    </div>

    <div class="input_container">
        <div class="btn_container_right">
            <button class="input_custom2_btn3" v-show="changePass" @click="cancelChangePass">
                Cancel
            </button>
            <button class="input_custom2_btn2" @click="changePassword">
                Change Password
            </button>
        </div>
    </div>

    <div class="note_line"></div>

</div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            email: '',
            current_password: '',
            new_password: '',
            confirm_password: '',
            account_members: [],
            show_current_pass: false,
            show_new_pass: false,
            show_confirm_pass: false,

            changePass: false
        }
    },
    mounted() {
        // GET USER'S NAME
        if (localStorage.username) {
            this.username = localStorage.username;
        }
        // GET USER'S EMAIL
        if (localStorage.email) {
            this.email = localStorage.email
        }
        // GET MEMBERS
        if(localStorage.members) {
            // I USE STATE TO REACTIVELY DISPLAY MEMBERS IN THE ACCOUNT
            this.$store.commit('setMembers', JSON.parse(localStorage.members));
        } 
    },
    computed: {
        members() {
            return this.$store.state.members;
        }
    },
    methods: {
        nameFormat(name) {
            if(name) {
                return name.charAt(0).toUpperCase();
            }
        },
        changePassword() {
            if(this.current_password) {
                this.changePass = true;
            }
        },
        cancelChangePass() {
            this.changePass = false;
            this.current_password = '';
        }
    }
}
</script>

<style>

</style>