<template>
<div class="payment_bg">
<!-- Thank you very much for puchasing {{ utm_content }} credits with our {{ utm_source }} Plan -->
    <div class="payment_bot"></div>
    <div class="content_holder">
        <div class="payment_title">
            Thank you for your purchase!
        </div>
        <div class="payment_sub">
            <b>{{ formatNumber(credits) }}</b> credits have been added to your account.<br><br>
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
        credits: 0,
    }
},
mounted() {
    this.getdata()
},
methods: {
    formatNumber(cred) {
        if(cred) {
            return cred.toLocaleString("en-US");
        }
    },
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
        // GET CHECKOUT SESSION ID
        this.checkout_session_id = this.$route.query.checkout_session_id;

        // CHECK IF CHECKOUT SESSION ID EXISTS
        if(this.checkout_session_id = this.$route.query.checkout_session_id) {
            // GET SELECTED PLAN
            try {
                await new Promise((resolve) => {
                    this.selected_plan = JSON.parse(localStorage.getItem('selectedPlan'));
                    
                    resolve();
                });

                this.credits = this.selected_plan.credit;

            } catch (error) {
                console.log('Getting selected plan error: ',error);
            }

            // PUT ALL PAYMENT DETAILS PLAN
            try {
                await new Promise((resolve) => {
                    if(this.$route.query.checkout_session_id && localStorage.userId) {
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

                console.log(this.payment_details);

                // SAVE PAYMENT DETAILS ON LOCAL STORAGE
                localStorage.paymentDetails = JSON.stringify(this.payment_details[0]);

                // RECORD TO  DB savePayment
                if(localStorage.userId) { //SEE IF USER IS LOGGED IN
                    await this.$store.dispatch('loginUser', { 
                        userId: localStorage.userId,
                        checkoutSessionId: this.$route.query.checkout_session_id,
                        purchasedPlan: this.selected_plan.title,
                        purchasedCredits: this.selected_plan.credit,
                        purchasedAmount: this.selected_plan.price
                    });
                }

            } catch (error) {
                console.log('Payment Details error: ',error);
            }

        }
        else {
            // RETURN TO HOME PAGE
            this.$router.push("/");
        }

    }
}
}
</script>

<style>

</style>