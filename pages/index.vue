
<template>
  <div class="mainPage">

    <!-- LOGIN MODAL -->
    <div class="modal_bg" v-show="show_login">
      <div class="close_modal">
        <button type="button" class="close_modal_btn" @click="closeModals">
          <fa :icon="['fa', 'xmark']" />
        </button>
      </div>
      <div class="modal_container">
        <Login/>
      </div>
    </div>

    <!-- REGISTER -->
    <div class="modal_bg" v-show="show_register">
      <div class="close_modal">
        <button type="button" class="close_modal_btn" @click="closeModals">
          <fa :icon="['fa', 'xmark']" />
        </button>
      </div>
      <div class="modal_container">
        <Register/>
      </div>
    </div>

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
            <button class="head_btn_menu" @click="header_buttons('New')">
                <fa :icon="['fa', 'circle-plus']" /> &nbsp; New Consulation
            </button>
            <!-- <button class="head_btn_menu" @click="header_buttons('Folders')">
                <fa :icon="['fa', 'folder']" /> &nbsp; My Folders
            </button>
            <button class="head_btn_menu" @click="header_buttons('Articles')">
                <fa :icon="['fa', 'newspaper']" /> &nbsp; Articles
            </button> -->
            <!-- <button class="head_btn_menu" @click="header_buttons('Trash')">
                <fa :icon="['fa', 'trash']" /> &nbsp; Trash
            </button> -->
        </div>
        <div class="header_right">
          <div class="head_profile" v-if="!user_token">
            <button class="head_btn_menu" @click="openLogin()">
              Sign In
            </button>
            <button class="head_btn" @click="openSignUp()">
              <fa :icon="['fa', 'user-plus']" /> &nbsp; Sign Up
            </button>
          </div>
          <div class="head_profile" v-else>
            <div class="head_username">
                Hi, {{ username }}
            </div>
            <button class="profile_btn" @click="show_settings = !show_settings">
              {{ username ? username[0] : '' }}
            </button>
          </div>
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

    <!-- SETTINGS -->
    <div class="settings">
      <div :class="`settings_bar ${show_settings ? 'show_settings_style' : 'hide_settings_style'}`" ref="settings_bar">

        <!-- Selection -->
        <div class="select_settings_container">

          <div class="select_settings" v-show="show_setting_selection">
            <div class="options_container">
              <div class="settings_options" 
              v-for="(settings, x) in setting_options"
              :key="x+settings.id"
              @click="chooseSetting(settings)">

                <span class="setting_icon">
                  <fa :icon="['fa', settings.icon]" /> &nbsp;
                </span>
                {{ settings.setting }}

              </div>
            </div>
          </div>
          
          <button class="selected_setting" @click="show_setting_selection = !show_setting_selection">
            <div class="button_div1">
              {{ selected_setting.setting }}
            </div>
            <div class="button_div2">
              <fa :icon="['fa', 'angle-down']" />
            </div>
          </button>

          <button class="side_btn_icon_2" @click="show_settings = !show_settings">
            <fa :icon="['fa', 'xmark']" />
          </button>
          
        </div>

        <!-- SETTINGS COMPONENTS -->
        <div class="settings_component">
          
          <div class="components" v-if="selected_setting.id == 'setting1'">
            <Profile/>
          </div>
          <div class="components" v-else-if="selected_setting.id == 'setting2'">
            <Settings/>
          </div>
          <div class="components" v-else-if="selected_setting.id == 'setting3'">
            <Plan/>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Chats from "../components/chatbox";
import Form from "../components/patientForm";
import History from "../components/history";
import SideMenu from "../components/sidemenu";
import Login from "../pages/login";
import Register from "../pages/register";
import Plan from "../components/plans";
import Profile from "../components/profile";
import Settings from "../components/settings";
export default {
  name: 'IndexPage',
  components: {
    Chats,
    Form,
    History,
    SideMenu,
    Login,
    Register,
    Plan,
    Profile,
    Settings
  },
  data() {
    return {
      show_sidebar: false,
      side_bar: null, // this.$refs.side_bar
      show_login: false,
      show_register: false,
      loggedIn: false,
      username: '',
      show_settings: false,
      show_setting_selection: false,
      user_token: '',
      selected_setting: {},
      setting_options: [
        { setting: 'Profile', id: 'setting1', icon: 'user'},
        { setting: 'Settings', id: 'setting2', icon: 'gear'},
        { setting: 'Plan', id: 'setting3', icon: 'life-ring'},
        { setting: 'Help & FAQs', id: 'setting4', icon: 'circle-info'},
        { setting: 'Logout', id: 'setting5', icon: 'right-from-bracket'},
      ],
      current_consultation_id: '',
    }
  },
  mounted() {
    // GET CONSULTATION ID
    if (localStorage.consultationID) {
      this.current_consultation_id = String(localStorage.consultationID);
      this.$store.commit('setCurrentConsultation', this.current_consultation_id);
    }
    else {
      // GENERATE CONSULTATION ID
      const randomPart = Math.floor(Math.random() * 10000);
      const timestamp = new Date().getTime();
      const uniqueID = `${timestamp}-${randomPart}`;
      localStorage.setItem("consultationID", uniqueID);
      this.$store.commit('setCurrentConsultation', uniqueID);
    }

    // DEAFULT STATE OF SIDEBAR
    const sidebar = this.$refs.side_bar;
    sidebar.classList.remove('hide_sidebar_style');

    // DEAFULT STATE OF SETTINGS
    const settings = this.$refs.settings_bar;
    settings.classList.remove('hide_settings_style');
    this.selected_setting = {
      setting: 'Profile',
      id: 'setting1'
    };

    // GET TOKEN FROM LOCAL STORAGE
    if (localStorage.token) {
      this.user_token = String(localStorage.token);
    }
    // GET USER'S NAME
    if (localStorage.username) {
      const name = String(localStorage.username).split(' ')[0];
      this.username = name;
    }

    // TRIGGER IP ADDRESS GRABBER
    if(!localStorage.token) {
      this.$store.dispatch('ipGrabber');
    }
  },
  watch: {
    '$store.state.showLogin':function(newVal, oldVal) {
      this.show_login = newVal;
    },
    '$store.state.showRegister':function(newVal, oldVal) {
      // console.log(newVal);
      this.show_register = newVal;
    },
  },
  methods: {
    header_buttons(clicked) {
      if(this.user_token) {
        if(clicked == "New") {
          // alert("New Consultation");
          // GENERATE CONSULTATION ID
          const randomPart = Math.floor(Math.random() * 10000);
          const timestamp = new Date().getTime();
          const uniqueID = `${timestamp}-${randomPart}`;
          localStorage.setItem("consultationID", uniqueID);
          this.$store.commit('setCurrentConsultation', uniqueID);

          // REMOVE CURRENT MESSAGES AND PATIENT DATA
          localStorage.removeItem("messages");
          localStorage.removeItem("patient_form");

          // CLEAR CHATBOX & FORM
          this.$store.commit('clearChatbox', true);
        }
        // else if(clicked == "Folders") {
        //   alert("My Folders");
        // }
        // else if(clicked == "Articles") {
        //   alert("Articles");
        // }
        // else if(clicked == "Trash") {
        //   alert("Trash");
        // }
      }
      else {
        this.$store.dispatch('openRegister');
      }
      
    },
    openSettings() {
      this.show_settings = !this.show_settings;
    },
    openLogin() {
      this.$store.dispatch('openLogin');
    },
    openSignUp() {
      this.$store.dispatch('openRegister');
    },
    closeModals() {
      this.$store.dispatch('closeModals');
    },
    clearLocalStorage() {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("history");
      localStorage.removeItem("chatLimit");
      localStorage.removeItem("selectedPlan");
      localStorage.removeItem("paymentDetails");
      localStorage.removeItem("paymentHistory");
      localStorage.removeItem("members");
    },
    chooseSetting(val) {
      this.show_setting_selection = false;
      if(val.id == 'setting5') {
        this.clearLocalStorage();
        
        window.location.reload();

      }
      else if(val.id == 'setting4') {
        // NAVIGATE TO HELP PAGE
      }
      else {
        this.selected_setting = {
          setting: val.setting,
          id: val.id
        };
      }
    },

  }
}
</script>
