
<template>
  <div class="mainPage">
    <div class="page_header">
      <div class="header">
        <div class="header_left">
            <button class="icon_btn" @click="show_sidebar = !show_sidebar">
                <fa :icon="['fa', 'bars']" />
            </button>
            &ensp; 
            <div class="header_logo">
                <span style="color: white">AIHealth</span>Pro
            </div>
        </div>
        <div class="header_center">
            <!-- <button class="head_btn">
                <fa :icon="['fa', 'comment']" /> &nbsp; Chat
            </button>
            <button class="head_btn">
                <fa :icon="['fa', 'circle-plus']" /> &nbsp; My Record
            </button>
            <button class="head_btn">
                <fa :icon="['fa', 'newspaper']" /> &nbsp; Articles
            </button> -->
            <button class="head_btn_menu">
                <fa :icon="['fa', 'circle-plus']" /> &nbsp; New Consulation
            </button>
            <button class="head_btn_menu">
                <fa :icon="['fa', 'folder']" /> &nbsp; My Folders
            </button>
            <button class="head_btn_menu">
                <fa :icon="['fa', 'newspaper']" /> &nbsp; Articles
            </button>
            <button class="head_btn_menu">
                <fa :icon="['fa', 'trash']" /> &nbsp; Trash
            </button>
        </div>
        <div class="header_right">
            <button class="head_btn_menu" @click="openLogin()">
                Sign In
            </button>
            <button class="head_btn" @click="openSignUp()">
                <fa :icon="['fa', 'user-plus']" /> &nbsp; Sign Up
            </button>
        </div>
      </div>
    </div>
    <div class="page_body">
      <!-- HISTORY -->
      <div class="page_left">
        <History/>
      </div>
      <!-- CHATBOX -->
      <div class="page_chat">
          <Chats/>
      </div>
      <!-- PATIENT FORM -->
      <div class="page_right">
        <Form/>
      </div>
    </div>

    <!-- SIDEBAR -->
    <div class="sidebar">
      <div :class="`sidebar_bg ${show_sidebar ? 'show_sidebar_style' : 'hide_sidebar_style'}`"
      ref="side_bar">

        <div class="side_head">
          <button class="side_btn_head">
            <fa :icon="['fa', 'circle-plus']" /> &nbsp;
            New Consultation
          </button>
          <button class="side_btn_icon" @click="show_sidebar = !show_sidebar">
            <fa :icon="['fa', 'xmark']" />
          </button>
        </div>
        <div class="side_content">
          <SideMenu/>
        </div>
        <div class="side_foot">
          <button class="side_btn">
            Upgrade to Plus
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import Chats from "../components/chatbox.vue";
import Form from "../components/patientForm.vue";
import History from "../components/history.vue";
import SideMenu from "../components/sidemenu.vue";
export default {
  name: 'IndexPage',
  components: {
    Chats,
    Form,
    History,
    SideMenu
  },
  data() {
    return {
      show_sidebar: false,
      side_bar: null, // this.$refs.side_bar
    }
  },
  mounted() {
    // DEAFULT STATE OF SIDEBAR
    const element = this.$refs.side_bar;
    element.classList.remove('hide_sidebar_style');
  },
  methods: {
    openLogin() {
      this.$router.push({ path: "../login" });
    },
    openSignUp() {
      this.$router.push({ path: "../register" });
    },
  }
}
</script>
