
<template>
  <div class="mainPage">
    <div class="page_header">
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
            <button class="head_btn" @click="openLogin()">
                <fa :icon="['fa', 'user']" /> &nbsp; Sign In
            </button>
            <button class="head_btn special_btn" @click="openSignUp()">
                <fa :icon="['fa', 'user-plus']" /> &nbsp; Sign Up
            </button>
        </div>
      </div>
    </div>
    <div class="page_body">
      <div class="page_left">
        <History/>
      </div>
      <div class="page_chat">
          <Chats/>
      </div>
      <div class="page_right">
        <Form/>
      </div>
    </div>
  </div>
</template>

<script>
import Chats from "../components/chatbox.vue";
import Form from "../components/patientForm.vue";
import History from "../components/history.vue";
export default {
  name: 'IndexPage',
  components: {
    Chats,
    Form,
    History
  },
  data() {
    return {

    }
  },
  methods: {
    openLogin() {
      this.$router.push({ path: "../login" });
    },
    openSignUp() {
      this.$router.push({ path: "../register" });
    } 
  }
}
</script>
