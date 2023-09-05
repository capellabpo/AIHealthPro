<template>
<div class="header">
    <div class="header_left">
        <button class="icon_btn">
            <fa :icon="['fa', 'bars']" />
        </button>
        &ensp; 
        <div class="header_logo">
            <span style="color: white">AIHealth</span>Pro
        </div>
    </div>
    <div class="header_center">
        <button class="head_btn">
            <fa :icon="['fa', 'comment']" /> &nbsp; Chat
        </button>
        <button class="head_btn">
            <fa :icon="['fa', 'circle-plus']" /> &nbsp; My Record
        </button>
        <button class="head_btn">
            <fa :icon="['fa', 'newspaper']" /> &nbsp; Articles
        </button>
    </div>
    <div class="header_right">
        <button class="head_btn">
            <fa :icon="['fa', 'user']" /> &nbsp; Login
        </button>
        <button class="head_btn special_btn">
            <fa :icon="['fa', 'user-plus']" /> &nbsp; Sign Up
        </button>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>