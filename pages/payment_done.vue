<template>
<div>
Thank you very much for puchasing {{ utm_content }} credits with our {{ utm_source }} Plan
</div>
</template>

<script>
export default {
data() {
    return {
        checkout_session_id: '',
        utm_source: '',
        utm_content: ''
    }
},
mounted() {
    this.getdata()
},
methods: {
    getdata() {
        this.checkout_session_id = this.$route.query.checkout_session_id;
        this.utm_source = this.$route.query.utm_source;
        this.utm_content = this.$route.query.utm_content;
        console.log(this.checkout_session_id);
        console.log(this.utm_source);
        console.log(this.utm_content);
        console.log(localStorage.getItem('user_id'));



        // http://localhost:3300/payment_done?checkout_session_id={CHECKOUT_SESSION_ID}

        // NO NEED FOR UTMs BECAUSE PLAN AND CREDITS CAN BE TAKEN FROM LOCALSTORAGE
        // http://localhost:3300/payment_done?checkout_session_id={CHECKOUT_SESSION_ID}&utm_source=aihealthplan1&utm_content=10000
    }
}
}
</script>

<style>

</style>