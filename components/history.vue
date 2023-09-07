<template>
<div class="history">
    <div class="card_form">
        <div class="card_title">Consultation History</div>
        <div class="card_desc">You can choose dates to display your consultation history.</div>

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
        selected_date: "",
        date_from: moment().format('MMM D, YYYY'),
        date_to: moment().format('MMM D, YYYY'),
        showOption: false,
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
},
watch: {
    selected_date(val) {
        localStorage.selected_date = JSON.stringify(val);
    },
    date_from(val) {
        localStorage.date_from = JSON.stringify(val);
    },
    date_to(val) {
        localStorage.date_to = JSON.stringify(val);
    },
},
methods: {
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

        this.showOption = false;
    },
}

}
</script>

<style>

</style>