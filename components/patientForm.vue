<template>
<div class="patient_form">
    
    <!-- Basic Information -->
    <div class="card_form">
        <div class="card_title">Basic Information</div>
        <div class="card_desc">Provide your personal and medical details to receive results that are better suited to your interest and needs.</div>
        <div class="card_col_sec">
            <div class="card_col">
                <div class="input_container">
                    <div class="input_label">Age</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="Age" v-model="age">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Gender</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="Gender" v-model="gender">
                    </div>
                </div>
            </div>
            <div class="card_col_gap"></div>
            <div class="card_col">
                <div class="input_container">
                    <div class="input_label">Height</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="Height" v-model="height">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Weight</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="Weight" v-model="weight">
                    </div>
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
                        <input class="input_custom" type="text" placeholder="°F" v-model="temperature">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Respiratory Rate</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="BPM"  v-model="respiratory_rate">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Waistline</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="in"  v-model="waistline">
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
                        <input class="input_custom" type="text" placeholder="SaO2" v-model="oxygen_saturation">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Hip Line</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="in" v-model="hip_line">
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
    <div class="card_form">
        <div class="card_col_sec">
            <div class="card_col">
                <div class="form_btns">
                    <button class="btn_negative" @click="clearFields()">
                        <fa :icon="['fa', 'paper-plane']" /> &nbsp; Clear
                    </button>
                </div>
            </div>

            <div class="card_col_gap"></div>

            <div class="card_col">
                <div class="form_btns">
                    <button class="btn_positive" @click="submitForm()">
                        <fa :icon="['fa', 'paper-plane']" /> &nbsp; Submit Information
                    </button>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
data() {
    return {
        age: "",
        height: "",
        gender: "",
        weight: "",
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
    }
},
mounted() {
  if (localStorage.patient_form) {
    this.patient_form = JSON.parse(localStorage.patient_form);
  }
},
watch: {
    patient_form(patient_data) {
    localStorage.patient_form = JSON.stringify(patient_data);
  }
},
methods: {
    submitForm() {
        // Push Patient Information to Array
        this.patient_form.push({ 
            age: this.age,
            height: this.height,
            gender: this.gender,
            weight: this.weight,
            current_condition: this.current_condition,
            surgery: this.surgery,
            allergies: this.allergies,
            medications: this.medications,
            hereditary: this.hereditary,
            temperature: this.temperature,
            respiratory_rate: this.respiratory_rate,
            waistline: this.waistline,
            heart_rate: this.heart_rate,
            oxygen_saturation: this.oxygen_saturation,
            hip_line: this.hip_line,
            diastolic_bp: this.diastolic_bp,
            albumin: this.albumin,
            ast: this.ast,
            calcium: this.calcium,
            glucose: this.glucose,
            potassium: this.potassium,
            triglycerides: this.triglycerides,
            hdl: this.hdl,
            alt: this.alt,
            bun: this.bun,
            creatinine: this.creatinine,
            hba1c: this.hba1c,
            sodium: this.sodium,
            ldl: this.ldl,
            egfr: this.egfr,
        });
    }
}
}
</script>

<style>

</style>