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
                        <input class="input_custom" type="text" placeholder="Age">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Gender</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="Gender">
                    </div>
                </div>
            </div>
            <div class="card_col_gap"></div>
            <div class="card_col">
                <div class="input_container">
                    <div class="input_label">Height</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="Height">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Weight</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="Weight">
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
                    <input class="input_custom" type="text" placeholder="Tell us here">
                </div>
            </div>
            <div class="input_container">
                <div class="input_label">Have you had any surgeries?</div>
                <div class="input_border">
                    <input class="input_custom" type="text" placeholder="What was the surgery?">
                </div>
            </div>
            <div class="input_container">
                <div class="input_label">Do you have any allergies?</div>
                <div class="input_border">
                    <input class="input_custom" type="text" placeholder="Specify your allergies">
                </div>
            </div>
            <div class="input_container">
                <div class="input_label">Are you currently taking any medications?</div>
                <div class="input_border">
                    <input class="input_custom" type="text" placeholder="What are the medications?">
                </div>
            </div>
            <div class="input_container">
                <div class="input_label">Any hereditary medical conditions?</div>
                <div class="input_border">
                    <input class="input_custom" type="text" placeholder="Let us know here">
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
                        <input class="input_custom" type="text" placeholder="°F">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Respiratory Rate</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="BPM">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Waistline</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="in">
                    </div>
                </div>
            </div>
            <div class="card_col_gap"></div>
            <div class="card_col">
                <div class="input_container">
                    <div class="input_label">Heart Rate</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="BPM">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Oxygen Saturation</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="SaO2">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Hip Line</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="in">
                    </div>
                </div>
            </div>
        </div>
        <div class="card_col">
            <div class="input_container">
                <div class="input_label">Diastolic BP</div>
                <div class="input_border">
                    <input class="input_custom" type="text" placeholder="mmHg">
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
                        <input class="input_custom" type="text" placeholder="g/dL">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">AST</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="U/L">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Calcium</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="Calcium">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Glucose</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="mmHg">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Potassium</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="mEq/L">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Triglycerides</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="mg/dl">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">HDL</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="mg/dl">
                    </div>
                </div>
            </div>

            <div class="card_col_gap"></div>

            <div class="card_col">
                <div class="input_container">
                    <div class="input_label">ALT</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="U/L">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">BUN</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="mg/dL">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Creatinine</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="mg/dL">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">HbA1c</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="mmol/mol">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">Sodium</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="mEq/L">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">LDL</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="mg/dL">
                    </div>
                </div>
                <div class="input_container">
                    <div class="input_label">eGFR</div>
                    <div class="input_border">
                        <input class="input_custom" type="text" placeholder="mL/min/1.73m2">
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
                    <button class="btn_negative" @click="sendMessage">
                        <fa :icon="['fa', 'paper-plane']" /> &nbsp; Clear
                    </button>
                </div>
            </div>

            <div class="card_col_gap"></div>

            <div class="card_col">
                <div class="form_btns">
                    <button class="btn_positive" @click="sendMessage">
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

}
</script>

<style>

</style>