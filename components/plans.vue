<template>
<div class="settings_content">
    <!-- PLANS CARD -->
    <div class="card_title">Topup Offers</div>
    <div class="card_desc">Get more credits!</div>

    <div class="input_container">
        <div class="offer_card_container" v-for="plan in offer" :key="plan.id" :id="plan.id" @click="pick_offer(plan)">
            <div class="offer_card_row offer_title">{{ plan.title }}</div>
            <div class="offer_card_row offer_price">${{ plan.price }}</div>
            <div class="offer_card_row offer_credit">{{ plan.credit }} credits</div>
            <div class="offer_card_row offer_price_per_credit">${{ plan.price_per_credit }} per credit</div>
        </div>
    </div>

</div>
</template>

<script>
export default {
data() {
    return {
        offer: [
            {
                id: "plan_starter",
                title: "Start Splash",
                price: 20,
                credit: 1000,
                price_per_credit: 0.02,
                link: "test_bIY9Cj9Sv5wh9SEfYY",
            },
            {
                id: "plan_standard",
                title: "Super Saver",
                price: 35,
                credit: 2000,
                price_per_credit: 0.0175,
                link: "test_bIY9Cj9Sv5wh9SEfYY",
            },
            {
                id: "plan_premium",
                title: "Premium Power Up",
                price: 50,
                credit: 3000,
                price_per_credit: 0.0167,
                link: "test_bIY9Cj9Sv5wh9SEfYY",
            },
            {
                id: "plan_ulimate",
                title: "Ultimate Boost",
                price: 75,
                credit: 5000,
                price_per_credit: 0.015,
                link: "test_bIY9Cj9Sv5wh9SEfYY",
            },
        ]
    }
},
methods: {
    pick_offer(plan) {
        // STORE IN LOCALSTORAGE
        localStorage.selectedPlan = JSON.stringify(plan);
        if(plan.id == 'plan_starter') {
            window.open(`${process.env.STRIPE}${plan.link}?client_reference_id=${localStorage.userId}`);   
        }
        else if(plan.id == 'plan_standard') {
            window.open(`${process.env.STRIPE}${plan.link}?client_reference_id=${localStorage.userId}`);  
        }
        else if(plan.id == 'plan_premium') {
            window.open(`${process.env.STRIPE}${plan.link}?client_reference_id=${localStorage.userId}`);  
        }
        else if(plan.id == 'plan_ulimate') {
            window.open(`${process.env.STRIPE}${plan.link}?client_reference_id=${localStorage.userId}`);  
        }
    }
}
}
</script>

<style>

</style>