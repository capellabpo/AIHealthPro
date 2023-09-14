<template>
<div class="settings_content">
    <div class="card_title">Account Settings</div>
    <div class="card_desc">Manage your history and notifications here..</div>

    <!-- ACCOUNT SETTINGS -->
    <div class="custom_toggle_container" v-for="(settings, s) in account_settings" :key="s+settings.id">
        <div class="toggle_icon_text">
            <div class="toggle_box" @click="toggle_settings(settings)">
                <div :class="`toggle_holder ${settings.status ? 'toggle_holder_active' : ''}`">
                    <div class="toggle_circle"></div>
                </div>
            </div>
            <div class="toggle_text">
                {{ settings.name }} <br>
                <div class="card_desc">
                    {{ settings.desc }}
                </div>
            </div>
        </div>
    </div>

    <div class="note_line"></div>
    <div class="card_title2">Account Deletion</div>
    <div class="card_desc">Your profile and data will be permanently deleted.</div>

    <div class="input_container">
        <div class="btn_container_right">
            <button class="input_custom2_btn4" @click="deleteAccount">
                Delete Account
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
            enable_history: true,
            enable_news: true,
            enable_reminders: true,

            account_settings: [
                {
                    id: 1,
                    name: "Chat History",
                    desc: "Save chat conversation on this browser to your history and help enhance our service. Unsaved chats will be deleted from our systems within 30 days.",
                    status: true
                },
                {
                    id: 2,
                    name: "News & Updates",
                    desc: "Receive notifications regarding our latest news, updates and helpful tips.",
                    status: true
                },
                {
                    id: 3,
                    name: "Reminders & Activity",
                    desc: "These are notifications to remind you of your billing, updates on your profile and plan.",
                    status: true
                },

            ]
        }
    },
    methods: {
        toggle_settings(toggled) {
            for (let i = 0; i < this.account_settings.length; i++) {
                if (this.account_settings[i].id === toggled.id) {
                    this.account_settings[i].status = !this.account_settings[i].status;
                    break;
                }
            }
        },
        deleteAccount() {}
    }
}
</script>

<style>

</style>