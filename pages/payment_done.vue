<template>
<div class="payment_bg">
<!-- Thank you very much for puchasing {{ utm_content }} credits with our {{ utm_source }} Plan -->
    <div class="payment_bot"></div>
    <div class="content_holder">
        <div class="payment_title">
            Thank you for your purchase!
        </div>
        <div class="payment_sub">
            Save this emergency backup code and store it somewhere safe. <br><br>
            This code holds your payment details and can be used to verify your purchase.
        </div>
        <div class="payment_code_container">
            <div class="payment_code">{{ checkout_session_id }}</div>
            <button class="payment_copy_code" @click="copyToClipboard()">
                <fa :icon="['fa', 'copy']" />
            </button>
        </div>
        <div class="small_label">
            <div v-show="copied">
                Copied to clipboard!
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
data() {
    return {
        checkout_session_id: '',
        payment_details: [],
        selected_plan: [],
        copied: false,
    }
},
mounted() {
    this.getdata()
},
methods: {
    copyToClipboard() {
        const textArea = document.createElement("textarea");
        textArea.value = this.checkout_session_id; 
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        this.copied = true;
    },
    async getdata() {

        this.checkout_session_id = this.$route.query.checkout_session_id;

        // GET SELECTED PLAN
        try {
            await new Promise((resolve) => {
                this.selected_plan = JSON.parse(localStorage.getItem('selectedPlan'));
                
                resolve();
            });

        } catch (error) {
            console.log('Getting selected plan error: ',error);
        }

        // PUT ALL PAYMENT DETAILS PLAN
        try {
            await new Promise((resolve) => {
                if(this.$route.query.checkout_session_id) {
                    // SAVE PAYMENT DETAILS
                    this.payment_details.push([
                        {
                            user_id: localStorage.userId,
                            checkout_session_id: this.$route.query.checkout_session_id,
                            purchased_plan: this.selected_plan.title,
                            purchased_credits: this.selected_plan.credit,
                            purchase_amount: this.selected_plan.price,
                        }
                    ]);
                }
                resolve();
            });

        } catch (error) {
            console.log('Payment Details error: ',error);
        }

        console.log(this.payment_details);

        // SAVE PAYMENT DETAILS ON LOCAL STORAGE
        localStorage.paymentDetails = JSON.stringify(this.payment_details[0]);

        // RECORD TO  DB

    }
}
}
</script>

<style>

</style>