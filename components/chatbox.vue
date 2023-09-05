<template>
<div class="chatbox">
    <div class="chat">
        <div class="messages">
            <div class="msg_ai">
                <div class="ai_icon"></div>
                <div class="ai_msg_box">
                    <div class="msg_tail"></div>
                </div>
            </div>
            <div class="msg_user">

            </div>
        </div>
    </div>
    <div class="msg_box">
        <div class="message_box">
            <input type="text" class="box" placeholder="Ask your question here">
            <button class="msg_btn">
                <fa :icon="['fa', 'paper-plane']" /> &nbsp; Send
            </button>
        </div>
    </div>
    <div class="foot">
        You have &nbsp; <b> 12 messages</b> &nbsp; remaining. Sign up for free to send more messages. Read our &nbsp;<a href="#">Terms & Policy</a>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>