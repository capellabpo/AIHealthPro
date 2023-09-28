<template>
  <div class="chatbox">
      <div class="chat">
        <div class="chat_scroll" ref="container">
          
          <div class="messages">
            
            <div class="message" v-for="(message, id) in messages" :key="id" :id="id">
              
              <div class="msg_user" v-if="message.role === 'user'">
                <div class="msg_box_user">
                  <!-- {{ id+" - "+ message.text}} -->
                  {{ message.content }}
                </div>
              </div>
              <div class="msg_ai" v-else-if="message.role === 'system'">
                <div class="ai_img">
                  <div class="ai_icon"></div>
                </div>
                <div class="msg_box_ai">
                  <!-- {{ id+" - "+ message.text}} -->
                  <!-- {{ message.text}} -->
                  <div v-html="formattedString(message.content)"></div>
                </div>
              </div>
                  
            </div>
  
            <div class="typing_indicator chat_typing" v-show="loader">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
  
                
          </div>
  
        </div>
  
      </div>
      <div class="msg_box">
          <div class="message_box">
              <input type="text" class="box" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Ask your question here">
              <button class="msg_btn" @click="sendMessage">
                  <fa :icon="['fa', 'paper-plane']" /> &nbsp; Send
              </button>
          </div>
      </div>
      <div class="foot">

        <div v-if="!current_token">
          You have <b> {{ chatLimit }} credits</b> left. Sign up now to send more messages. Read our &nbsp;<a href="#">Terms & Policy</a>
        </div>
        <div v-else>
          You have <b> {{ chatLimit }} credits</b> left. Get more credits <b>NOW!</b>
        </div>
  
      </div>
  </div>
  </template>
  
  <script>
  import moment from 'moment';

  export default {
  data() {
      return {
        messages: [],
        patient_form: [],
        newMessage: '',
        loader: false,
        today: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        current_token: ''
      }
  },
  mounted() {
    // SET TOKEN TO STATE
    if (localStorage.token) {
      this.current_token = String(localStorage.token);
    }
    // GET MESSAGES FROM LOCALSTORAGE
    if (localStorage.messages) {
      this.messages = JSON.parse(localStorage.messages);
    }
    // GET MESSAGES FROM LOCALSTORAGE
    if (localStorage.patient_form) {
      this.patient_form = JSON.parse(localStorage.patient_form);
    }
    // Scroll to top (delayed)
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  
  },
  watch: {
    messages(newName) {
      localStorage.messages = JSON.stringify(newName);
    },
    '$store.state.diagnosisData':function(newValue, oldValue) {
      this.addDiag(newValue, oldValue);
    },
    '$store.state.clearAll':function(newValue, oldValue) {
      // console.log('Watcher triggered:', newValue, oldValue);
      if(newValue == true) {
        this.messages = [];
      }
    },
  },
  computed: {
    chatLimit() {
      return this.$store.state.current_chat_limit;
    },
  },
  methods: {
      formattedString(str) {
        if (str) {
          return str.replace(/\n/g, "<br>");
        }
        return ""; // Return an empty string if str is undefined or null
      },
      login() {
          this.$router.push({ path: "../dashboard" });
      },
      async addDiag(newval, oldVal) {
        // Add the bot's response to the chat
        this.messages.push(
          { content: this.$store.state.diagnosisData, role: 'system',  createDate: this.today}
        );

        // SAVE CHAT
        const response = await this.$store.dispatch('saveChats', { 
          token: localStorage.token,
          consulation_id: localStorage.consultationID,
          user_id: localStorage.userId,
          user_role: 'user',
          chat_content: this.newMessage
        });

        // console.log(response);

        // Scroll to top (delayed)
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      },
      async sendMessage() {
        if (this.newMessage.trim() === '') return;

        // Add the user's message to the chat
        this.messages.push({ content: this.newMessage, role: 'user', createDate: this.today});

        // EMPTY NEW MESSAGE
        this.newMessage = '';
  
        // Loader should start here
        this.loader = true;
        // console.log(this.loader);
  
        // Scroll to top (delayed)
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);

        // SAVE CHAT 
        const response = await this.$store.dispatch('saveChats', { 
          token: localStorage.token,
          consulation_id: localStorage.consultationID,
          user_id: localStorage.userId,
          user_role: 'user',
          chat_content: this.newMessage
        });
        
        try {
          var patient_data = JSON.stringify(this.patient_form[this.patient_form.length - 1]);
  
          // console.log(patient_data);
          // console.log(this.messages);
  
          const response = await this.$store.dispatch('sendChat', { 
            patient_data, 
            messages: this.messages,
            type: "Chat"
          });

          // EMPTY MESSAGE
          // this.newMessage = '';
  
          // Add the bot's response to the chat
          // console.log(response);
          // console.log(response.data);
          var reply = response.response;
          this.messages.push({ content: reply, role: 'system',  createDate: this.today});
          if(localStorage.token) { //CHECK IF USER IS LOGGED IN
          // SAVE RESPONSE TO DB
            const response = await this.$store.dispatch('saveChats', { 
              token: localStorage.token,
              consulation_id: localStorage.consultationID,
              user_id: localStorage.userId,
              user_role: 'bot',
              chat_content: reply
            });
          }
          setTimeout(() => {
            this.scrollToBottom();
          }, 100);
          // Loader should stop here
          this.loader = false;
  
        } catch (error) {
          console.error('Error sending message to ChatGPT:', error);
        }
        
      },
      scrollToBottom() {
        // Get a reference to the container
        const container = this.$refs.container;
        // Calculate the maximum scroll position
        var maxScrollPosition = container.scrollHeight - container.clientHeight;
        // Scroll to the maximum position
        container.scrollTop = maxScrollPosition;
      },
  },
  }
  </script>
  
  <style scoped>
  /* Add your CSS styles for chat boxes here */
  .chat-interface {
    width: 300px;
    margin: 0 auto;
  }
  
  .chat-box {
    height: 300px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    padding: 10px;
  }
  
  .message {
    margin: 5px;
    padding: 10px;
    border-radius: 5px;
  }
  
  .message-content {
    word-wrap: break-word;
  }
  
  .input-box {
    display: flex;
    margin-top: 10px;
  }
  
  input {
    flex-grow: 1;
    padding: 5px;
  }
  
  button {
    margin-left: 10px;
  }
  </style>