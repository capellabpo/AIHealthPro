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

    <!-- <div class="notice_container" v-if="history.lenth <= 0"> -->
    <div class="notice_container" v-if="!token">
        <div class="notice_img"></div>
        <div class="notice_title">No History</div>
        <div class="notice_sub">Sign up now to record every consultations!</div>
    </div>
    <!-- <div class="history_container">
        <div class="history_card">
            <div class="history_datetime">
                <div class="history_date">Sep 23, 2023 </div>
                <div class="history_time">&nbsp;-&nbsp;06:32pm</div>
            </div>
            <div class="history_title">Sample consultation history that has long string for a title to test how long strings will apear in the design.</div>
        </div>
    </div> -->
    <div class="history_container" v-if="token && history.length > 0">
        <div class="history_card" v-for="(his, x) in history" :key="'his'+x">
            <div class="history_datetime">
                <div class="datetime_wrap">
                    <div class="history_date">{{dateFormat(his.createdAt)}}</div>
                    <div class="history_time">{{timeFormat(his.createdAt)}}</div>
                </div>
                <div :class="`history_title ${current_consultation_id == his.consulationId ? 'history_clicked' : ''}`" 
                @click="openHistory(his.consulationId)">
                    {{his.conversationTitle}}
                </div>
            </div>
        </div>
    </div>

    <div class="notice_container" v-else-if="token && history.length <= 0">
        <div class="notice_img"></div>
        <div class="notice_title">No History</div>
        <div class="notice_sub">All your consultations will appear here.</div>
    </div>

</div>
</template>

<script>
import moment from 'moment';
import { set } from 'vue';

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
        selected_date: "This Month",
        date_from: this.date_from = moment().startOf('month').format('MMM D, YYYY'),
        date_to: this.date_to = moment().endOf('month').format('MMM D, YYYY'),
        showOption: false,
        history: [],
        consultationHistory: [],
        token: '',
        current_consultation_id: '',
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
    // GET HISTORY FROM LOCALSTORAGE
    if(localStorage.userId) {
        this.getHistpry();
    }
    // GET TOKEN
    if(localStorage.token) {
        this.token = localStorage.token;
    } 
    // GET CONSULTATION ID
    if(localStorage.consultationID) {
        this.current_consultation_id = localStorage.consultationID;
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
    '$store.state.current_consultation':function(newVal, oldVal) {
        this.current_consultation_id = newVal;
    },
},
methods: {
    async openHistory(id) {

        // REUSE CONSULTATION HISTORY'S CONSULTATION ID 
        localStorage.consultationID = id;

        console.log("openHistory methdod id:", id);
        const res = await this.$store.dispatch('getConsultationHistoryById', {
            consulationId: id
        });

        try {
            // console.log(res);
            if(res >= 200 && res < 299) {
                // GET CONSULTATION HISTORY FROM LOCALSTORAGE
                this.consultationHistory = JSON.parse(localStorage.consultationHistory);

                //  GET MESSAGES
                localStorage.messages = JSON.stringify(this.consultationHistory.messages);

                // GET ONLY THE PATIENT FORMS
                var temp = [];
                temp = this.consultationHistory.patient_form;
                var temp2 = [];
                
                for(var x=0; x < temp.length; x++ ) {
                    // console.log(temp[x].patientInfo[0]);
                    temp2.push(temp[x].patientInfo[0]);   
                }
                // console.log(temp2);

                // SET NAME TO BE USED (note: USELESS)
                // if(!ocalStorage.patientName) {
                //     localStorage.patientName = localStorage.username;   
                // }

                // STORE TO LOCAL STORAGE
                localStorage.patient_form = JSON.stringify(temp2);
                
                // TRIGGER THE getPatientForm() METHOD THROUGH STATE
                this.$store.commit('triggerGetPatientForm', true);
            }
            else {
                console.log("openHistory methdod status code:", res);
            }

        } catch (error) {
            console.log("openHistory methdod error:", error);
        }
    },
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
    async getHistpry() {
        // FETCH FROM DB
        const response = await this.$store.dispatch('getHIstory', { 
            user_id: localStorage.userId,
            date_from: this.date_from,
            date_to: this.date_to
        });

        // STORE LOCALLY
        if(localStorage.history) {
            this.history = JSON.parse(localStorage.history);
        }
        else {
            console.log("No history found from LocalStorage");
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
            this.getHistpry();
        }, 100);

        this.showOption = false;
    },
}

}
</script>

<style>

</style>