<template>
<div class="chatbox">
    <div class="chat">
      <div class="chat_scroll" ref="container">
        
        <div class="messages">
          
          <div class="message" v-for="(message, id) in messages" :key="id" :id="id">
            
            <div class="msg_user" v-if="message.type === 'user'">
              <div class="msg_box_user">
                <!-- {{ id+" - "+ message.text}} -->
                {{ message.text }}
              </div>
            </div>
            <div class="msg_ai" v-else-if="message.type === 'bot'">
              <div class="ai_img">
                <div class="ai_icon"></div>
              </div>
              <div class="msg_box_ai">
                <!-- {{ id+" - "+ message.text}} -->
                {{ message.text}}
                <!-- <div v-html="formattedString(message.text)"></div> -->
              </div>
            </div>
                
          </div>

          <div class="typing_indicator" v-show="loader">
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
        <!-- You have &nbsp; <b> 12 messages</b> &nbsp; remaining. Sign up for free to send more messages. Read our &nbsp;<a href="#">Terms & Policy</a> -->

        Sign up for free to send more messages. Read our &nbsp;<a href="#">Terms & Policy</a>
    </div>
</div>
</template>

<script>
export default {
data() {
    return {
      messages: [],
      patient_form: [],
      newMessage: '',
      loader: false,
      
    }
},
mounted() {
  if (localStorage.messages) {
    this.messages = JSON.parse(localStorage.messages);
  }
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

},
computed: {

},
methods: {
    formattedString(str) {
      return str.replace(/\n/g, "<br>");
    },
    login() {
        this.$router.push({ path: "../dashboard" });
    },
    async sendMessage() {
      if (this.newMessage.trim() === '') return;
      
      // Add the user's message to the chat
      this.messages.push({ text: this.newMessage, type: 'user' });
      this.newMessage = '';

      // Loader should start here
      this.loader = true;
      console.log(this.loader);

      // Scroll to top (delayed)
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);

      var patient_data = JSON.stringify(this.patient_form[this.patient_form.length - 1]);
      
      try {
        const response = await this.$store.dispatch('sendChat', { patient_data, messages: this.messages });

        // Add the bot's response to the chat
        this.messages.push(
          { text: response, type: 'bot' }
        );

        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
        // Loader should stop here
        this.loader = false;

        // SEND CHATS TO DB

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