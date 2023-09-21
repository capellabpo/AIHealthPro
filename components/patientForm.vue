<template>
    <div class="patient_form">
        <div class="form_scroll">

        <!-- Basic Information -->
        <div class="card_form">
            <div class="card_title">Basic Information</div>
            <div class="card_desc">Provide your personal and medical details to receive results that are better suited to your interest and needs.</div>
            <div class="card_col_sec">
                <div class="card_col">
                    <div class="input_container">
                        <div class="input_label">Age</div>
                        <div class="input_border">
                            <input class="input_custom" type="number" placeholder="Years" v-model="age">
                        </div>
                    </div>
                </div>
                <div class="card_col_gap"></div>
                <div class="card_col">
                    <div class="input_container">
                        <div class="input_label">Sex</div>
                        <div class="input_border">
                            <!-- <input class="input_custom" type="text" placeholder="Gender" v-model="gender"> -->
                    
                            <!-- SEX SELECT -->
                            <div class="select_settings_container_2">

                                <div class="select_settings" v-show="show_sex_options">
                                    <div class="options_container">
                                        <div class="settings_options" v-for="(sex_choice, x) in sex" :key="x+sex_choice.id" @click="chooseSex(sex_choice)">

                                        <span class="setting_icon">
                                            <fa :icon="['fa', sex_choice.icon]" /> &nbsp;
                                        </span>
                                        {{ sex_choice.name }}

                                        </div>
                                    </div>
                                </div>

                                <button class="selected_setting_2" @click="show_sex_options = !show_sex_options">
                                    <div class="button_div1">
                                        {{ gender }}
                                    </div>
                                    <div class="button_div2">
                                        <fa :icon="['fa', 'angle-down']" />
                                    </div>
                                </button>   
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="card_col">
                <div class="input_container">
                    <div class="input_label">Height</div>
                    <div class="input_border">
                        <input class="input_custom" type="number" :placeholder="unit_height" v-model="height">
                    </div>
                    <div class="input_unit_choices">
                        <button type="button" 
                        :class="`unit_choice ${unit_height == 'ft' ? 'unit_choice_actv' : ''}`"
                        @click="change_height_unit('ft')">
                            feet
                        </button>
                        <button type="button" 
                        :class="`unit_choice ${unit_height == 'in' ? 'unit_choice_actv' : ''}`"
                        @click="change_height_unit('in')">
                            inches
                        </button>
                        <button type="button" 
                        :class="`unit_choice ${unit_height == 'm' ? 'unit_choice_actv' : ''}`"
                        @click="change_height_unit('m')">
                            meters
                        </button>
                        <button type="button" 
                        :class="`unit_choice ${unit_height == 'cm' ? 'unit_choice_actv' : ''}`"
                        @click="change_height_unit('cm')">
                            centimeters
                        </button>
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Weight</div>
                    <div class="input_border">
                        <input class="input_custom" type="number" :placeholder="unit_weight" v-model="weight">
                    </div>
                    <div class="input_unit_choices">
                        <button type="button" 
                        :class="`unit_choice ${unit_weight == 'kg' ? 'unit_choice_actv' : ''}`"
                        @click="change_weight_unit('kg')">
                            kilogram
                        </button>
                        <button type="button" 
                        :class="`unit_choice ${unit_weight == 'lb' ? 'unit_choice_actv' : ''}`"
                        @click="change_weight_unit('lb')">
                            pounds
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Medical History -->
        <div class="card_form">
            <div class="card_title">Symptoms</div>
            <div class="card_desc">What are the symptoms that you are currently having?</div>
            <div class="card_col">
                <div class="input_container">
                    <div class="input_label">List your symptoms</div>
                    <div class="input_border">
                        <!-- <input class="input_custom" type="text" placeholder="Tell us here" v-model="current_condition"> -->
                        <textarea class="input_custom" placeholder="Tell us here" v-model="symptoms"></textarea>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Medical History -->
        <div class="card_form">
            <div class="card_title">Medical History</div>
            <div class="card_desc">You may leave the fields, blank if you don't have any of the following.</div>
            <div class="card_col">
                <div class="input_container">
                    <div class="input_label">Any past or current medical conditions?</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="Tell us here" v-model="current_condition">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Have you had any surgeries?</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="What was the surgery?" v-model="surgery">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Do you have any allergies?</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="Specify your allergies" v-model="allergies">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Are you currently taking any medications?</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="What are the medications?" v-model="medications">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Any hereditary medical conditions?</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="Let us know here" v-model="hereditary">
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Vitals -->
        <div class="card_form">
            <div class="card_title">Your Vitals</div>
            <div class="card_desc">You may leave the fields, blank if you don't have any of the following.</div>
            <div class="card_col_sec">
                <div class="card_col">
                    <div class="input_container">
                        <div class="input_label">Temperature</div>
                        <div class="input_border">
                            <input class="input_custom" type="number" placeholder="°F" v-model="temperature">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">Respiratory Rate</div>
                        <div class="input_border">
                            <input class="input_custom" type="number" placeholder="BPM"  v-model="respiratory_rate">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">Waistline</div>
                        <div class="input_border">
                            <input class="input_custom" type="number" placeholder="in"  v-model="waistline">
                        </div>
                    </div>
                </div>
                <div class="card_col_gap"></div>
                <div class="card_col">
                    <div class="input_container">
                        <div class="input_label">Heart Rate</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="BPM" v-model="heart_rate">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">Oxygen Saturation</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="SpO2" v-model="oxygen_saturation">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">Hip Line</div>
                        <div class="input_border">
                            <input class="input_custom" type="number" placeholder="in" v-model="hip_line">
                        </div>
                    </div>
                </div>
            </div>
            <div class="card_col">
                <div class="input_container">
                    <div class="input_label">Diastolic BP</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="mmHg" v-model="diastolic_bp">
                    </div>
                </div>
            </div>
        </div>
    
        <!-- Lab Test Results -->
        <div class="card_form">
            <div class="card_title">Lab Test Results</div>
            <div class="card_desc">You may leave the fields, blank if you don't have any of the following.</div>
            <div class="card_col_sec">
                <div class="card_col">
                    <div class="input_container">
                        <div class="input_label">Albumin</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="g/dL" v-model="albumin">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">AST</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="U/L" v-model="ast">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">Calcium</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="Calcium" v-model="calcium">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">Glucose</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="mmHg" v-model="glucose">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">Potassium</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="mEq/L" v-model="potassium">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">Triglycerides</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="mg/dl" v-model="triglycerides">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">HDL</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="mg/dl" v-model="hdl">
                        </div>
                    </div>
                </div>
    
                <div class="card_col_gap"></div>
    
                <div class="card_col">
                    <div class="input_container">
                        <div class="input_label">ALT</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="U/L" v-model="alt">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">BUN</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="mg/dL" v-model="bun">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">Creatinine</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="mg/dL" v-model="creatinine">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">HbA1c</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="mmol/mol" v-model="hba1c">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">Sodium</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="mEq/L" v-model="sodium">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">LDL</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="mg/dL" v-model="ldl">
                        </div>
                    </div>
                    <div class="input_container">
                        <div class="input_label">eGFR</div>
                        <div class="input_border">
                            <input class="input_custom" type="text" placeholder="mL/min/1.73m2" v-model="egfr">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- BUTTONS -->
        <div class="form_btns">
            <div class="card_col_sec" v-if="loader == false">
                <div class="card_col">
                    <div class="form_btns2">
                        <button class="btn_negative" @click="clearFields()">
                            <fa :icon="['fa', 'paper-plane']" /> &nbsp; Clear
                        </button>
                    </div>
                </div>
    
                <div class="card_col_gap"></div>
    
                <div class="card_col">
                    <div class="form_btns2">
                        <button class="btn_positive" @click="submitForm()">
                            <fa :icon="['fa', 'paper-plane']" /> &nbsp; Submit Information
                        </button>
                    </div>
                </div>
            </div>
    
            <div class="loader_container" v-else>
                <div class="typing_indicator loader">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>

        </div>

        </div>
    
        <!-- ALERT MESSAGE -->
        <div :class="`notify ${notif.type}`" v-show="notif.show">
            <fa :icon="['fa', notif.icon]" /> &nbsp;
            {{ notif.content }}
        </div>
    
    </div>
    </template>
    
    <script>
    import moment from 'moment';
    export default {
    data() {
        return {
            age: "",
            height: "",
            gender: "",
            weight: "",
            unit_height: "ft",
            unit_weight: "kg",
            symptoms: "",
            current_condition: "",
            surgery: "",
            allergies: "",
            medications: "",
            hereditary: "",
            temperature: "",
            respiratory_rate: "",
            waistline: "",
            heart_rate: "",
            oxygen_saturation: "",
            hip_line: "",
            diastolic_bp: "",
            albumin: "",
            ast: "",
            calcium: "",
            glucose: "",
            potassium: "",
            triglycerides: "",
            hdl: "",
            alt: "",
            bun: "",
            creatinine: "",
            hba1c: "",
            sodium: "",
            ldl: "",
            egfr: "",
            patient_form: [],
            sex: [
                { name: 'Male', id: 'sex_male', icon: 'mars'},
                { name: 'Female', id: 'sex_female', icon: 'venus'},
                { name: 'Transman', id: 'sex_transman', icon: 'transgender'},
                { name: 'Transwoman', id: 'sex_transwoman', icon: 'transgender'},
            ],
            show_sex_options: false,
            notif: {
                show: false,
                type: "success",
                icon: "circle-check",
                content: "Sample Content"
            },
            command: "Please summarize my information and tell me what you think I need to do base on my symtoms. My information is in the 'content' section",
            loader: false,
        }
    },
    mounted() {
      if (localStorage.patient_form) {
        this.patient_form = JSON.parse(localStorage.patient_form);
        // console.log(this.patient_form[this.patient_form.length - 1]);
        var form = this.patient_form[this.patient_form.length - 1];
        this.age = form.age;
        this.height = parseFloat(form.height);
        this.unit_height = form.height.split(" ")[1];
        this.gender = form.gender;
        this.weight = parseFloat(form.weight);
        this.weight = form.weight.split(" ")[1];
        this.symptoms = form.symptoms;
        this.current_condition = form.current_condition;
        this.surgery = form.surgery;
        this.allergies = form.allergies;
        this.medications = form.medications;
        this.hereditary = form.hereditary;
        this.temperaturethis = parseFloat(form.temperature);
        this.respiratory_rate = parseFloat(form.respiratory_rate);
        this.waistline = parseFloat(form.waistline);
        this.heart_rate = form.heart_rate;
        this.oxygen_saturation = form.oxygen_saturation;
        this.hip_line = parseFloat(form.hip_line);
        this.diastolic_bp = form.diastolic_bp;
        this.albumin = form.albumin;
        this.ast = form.ast;
        this.calcium = form.calcium;
        this.glucose = form.glucose;
        this.potassium = form.potassium;
        this.triglycerides = form.triglycerides;
        this.hdl = form.hdl;
        this.alt = form.alt;
        this.bun = form.bun;
        this.creatinine = form.creatinine;
        this.hba1c = form.hba1c;
        this.sodium = form.sodium;
        this.ldl = form.ldl;
        this.egfr = form.egfr;
      }
    },
    watch: {
        patient_form(patient_data) {
            localStorage.patient_form = JSON.stringify(patient_data);
        }
    },
    methods: {
        change_height_unit(unit) {
            this.unit_height = unit;
        },
        change_weight_unit(unit) {
            this.unit_weight = unit;
        },
        chooseSex(sex) {
            console.log(sex)
            this.gender = sex.name;
            this.show_sex_options = !this.show_sex_options;
        },
        async submitForm() {
            // Loader
            this.loader = true;
    
            // Push Patient Information to Array
            this.patient_form.push({ 
                age: this.age ? this.age : "",
                height: this.height ? this.height+" "+this.unit_height : "",
                gender: this.gender? this.gender : "",
                weight: this.weight? this.weight+" "+this.unit_weight : "",
                symptoms: this.symptoms? this.symptoms : "",
                current_condition: this.current_condition ? this.current_condition : "",
                surgery: this.surgery ? this.surgery : "",
                allergies: this.allergies ? this.allergies : "",
                medications: this.medications ? this.medications : "",
                hereditary: this.hereditary ? this.hereditary : "",
                temperature: this.temperaturethis ? this.temperature+ " °F" : "",
                respiratory_rate: this.respiratory_rate ? this.respiratory_rate+ " BPM" : "",
                waistline: this.waistline ? this.waistline+ " in" : "",
                heart_rate: this.heart_rate ? this.heart_rate+ " BPM" : "",
                oxygen_saturation: this.oxygen_saturation ? this.oxygen_saturation+ " SpO2" : "",
                hip_line: this.hip_line ? this.hip_line+ " in" : "",
                diastolic_bp: this.diastolic_bp ? this.diastolic_bp+ " mmHg" : "",
                albumin: this.albumin ? this.albumin+ " g/dL" : "",
                ast: this.ast ? this.ast+ " U/L" : "",
                calcium: this.calcium ? this.calcium+ " Calcium" : "",
                glucose: this.glucose ? this.glucose+ " mmHg" : "",
                potassium: this.potassium ? this.potassium+ " mEq/L" : "",
                triglycerides: this.triglycerides ? this.triglycerides+ " mg/dl" : "",
                hdl: this.hdl ? this.hdl+ " mg/dl" : "",
                alt: this.alt ? this.alt+ " U/L" : "",
                bun: this.bun ? this.bun+ " mg/dL" : "",
                creatinine: this.creatinine ? this.creatinine+ " mg/dL" : "",
                hba1c: this.hba1c ? this.hba1c+ " mmol/mol" : "",
                sodium: this.sodium ? this.sodium+ " mEq/L" : "",
                ldl: this.ldl ? this.ldl+ " mg/dL" : "",
                egfr: this.egfr ? this.egfr+ " mL/min/1.73m2" : "",
                created_date: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ')
            });
    
            var form = JSON.stringify(this.patient_form[this.patient_form.length - 1]);
    
            await this.$store.dispatch('sendChat', { 
                patient_data: form, 
                messages: this.command,
                type: "Diagnosis"
            });
            this.notify();
        },
        clearFields() {
            var form = "";
            this.age = "";
            this.height = "";
            this.gender = "";
            this.weight = "";
            this.symptoms = "";
            this.current_condition = "";
            this.surgery = "";
            this.allergies = "";
            this.medications = "";
            this.hereditary = "";
            this.temperaturethis = "";
            this.respiratory_rate = "";
            this.waistline = "";
            this.heart_rate = "";
            this.oxygen_saturation = "";
            this.hip_line = "";
            this.diastolic_bp = "";
            this.albumin = "";
            this.ast = "";
            this.calcium = "";
            this.glucose = "";
            this.potassium = "";
            this.triglycerides = "";
            this.hdl = "";
            this.alt = "";
            this.bun = "";
            this.creatinine = "";
            this.hba1c = "";
            this.sodium = "";
            this.ldl = "";
            this.egfr = "";
        },
        notify() {
            this.loader = false;
            this.notif = {
                show: true,
                type: "success",
                icon: "circle-check",
                content: "Your information has been submitted successfully!"
            }
    
            setTimeout(() => {
                this.notif.show = false;
            }, 5000);
        }
    }
    }
    </script>
    
    <style>
    
    </style>