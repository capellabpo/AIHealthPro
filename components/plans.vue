<template>
<div class="settings_content">
    <!-- PLANS CARD -->
    <div class="card_title">Topup Offers</div>
    <!-- <div class="card_desc">Get more credits!</div> -->

    <div class="input_container">
        <div class="offer_card_container" v-for="plan in offer" :key="plan.id" :id="plan.id" @click="pick_offer(plan)">
            <div class="offer_card_row offer_title">{{ plan.title }}</div>
            <div class="offer_card_row offer_price">${{ plan.price }}</div>
            <div class="offer_card_row offer_credit">{{ plan.credit }} credits</div>
            <div class="offer_card_row offer_price_per_credit">${{ plan.price_per_credit }} per credit</div>
        </div>
    </div>

    <!-- PAYMENT HISTORY -->
    <div class="note_line"></div>
    <div class="card_title">Payment History</div>

    <!-- DATE RANGE -->
    <div class="dateRange">
        <button class="selected" @click="showOption = !showOption">
            <!-- {{selected_date+''+showOption}} -->
            {{selected_date}}
        </button>
        <div class="selection" v-show="showOption">
            <div class="select" v-for="(range, id) in dateRange" :key="id" :id="id" @click="select_date_range(range)">
            {{range.name}}
            </div>
        </div>
        <div class="dates">
            {{ date_from }} - {{ date_to }}
        </div>
    </div>

    <!-- LIST -->
    <div class="input_container">
        <div class="history_container" v-if="token && payment_history.length > 0">
            <div class="history_card" v-for="(his, x) in payment_history" :key="'his'+x">
                <div class="history_datetime">
                    <div class="history_date">{{dateFormat(his.createdAt)}}</div>
                    <div class="history_time">&nbsp;-&nbsp;{{timeFormat(his.createdAt)}}</div>
                </div>
                <div class="history_title2">{{his.purchasedPlan}} • {{ his.purchasedCredits }} credits • $20</div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import moment from 'moment';
export default {
data() {
    return {
        dateRange: [
            {id: 1, name: 'Today'},
            {id: 2, name: 'Yesterday'},
            {id: 3, name: '7 Days Ago'},
            {id: 4, name: '30 Days Ago'},
            {id: 5, name: 'This Month'}
        ],
        selected_date: "Today",
        date_from: moment().format('MMM D, YYYY'),
        date_to: moment().format('MMM D, YYYY'),
        showOption: false,
        payment_history: [],
        token: '',
        offer: [
            {
                id: "plan_starter",
                title: "Starter Splash",
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
mounted() {
    if (localStorage.selected_date) {
        this.selected_date = JSON.parse(localStorage.selected_date);
    }
    if (localStorage.date_from) {
        this.date_from = JSON.parse(localStorage.date_from);
    }
    if (localStorage.date_to) {
        this.date_to = JSON.parse(localStorage.date_to);
    }
    // GET PAYMENT HISTORY FROM LOCALSTORAGE
    if(localStorage.userId) {
        this.getPaymentHistpry();
    }
    // GET TOKEN
    if(localStorage.token) {
        this.token = localStorage.token;
    }
},
methods: {
    dateFormat(date) {
        if(date) {
            return moment(date).format('MMM D, YYYY');
        }
    },
    timeFormat(time) {
        if(time) {
            return moment(time).format('hh:mm A');
        }
    },
    // GET PAYMENT HISTORY
    async getPaymentHistpry() {
        // FETCH FROM DB
        const response = await this.$store.dispatch('getPaymentHistory', { 
            user_id: localStorage.userId,
            date_from: this.date_from,
            date_to: this.date_to
        });

        // GET PAYMENT HISTPRY FROM LOCAL STORAGE
        if(localStorage.paymentHistory) {
            this.payment_history = JSON.parse(localStorage.paymentHistory);
        }
        else {
            console.log("No payment history found from LocalStorage");
        }
    },
    select_date_range(val) {
        this.selected_date = val.name;

        if(val.id == 1) {
            this.date_from = moment().format('MMM D, YYYY');
            this.date_to = moment().format('MMM D, YYYY');
        }
        else if(val.id == 2) {
            this.date_from = moment().subtract(1, 'days').format('MMM D, YYYY');
            this.date_to = moment().subtract(1, 'days').format('MMM D, YYYY');
        }
        else if(val.id == 3) {
            this.date_from = moment().subtract(7, 'days').format('MMM D, YYYY');
            this.date_to = moment().format('MMM D, YYYY');
        }
        else if(val.id == 4) {
            this.date_from = moment().subtract(30, 'days').format('MMM D, YYYY');
            this.date_to = moment().format('MMM D, YYYY');
        }
        else if(val.id == 5) {
            this.date_from = moment().startOf('month').format('MMM D, YYYY');
            this.date_to = moment().endOf('month').format('MMM D, YYYY');
        }

        setTimeout(() => {
            this.getPaymentHistpry();
        }, 100);

        this.showOption = false;
    },
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