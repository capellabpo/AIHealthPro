<template>
<div class="chatbox">
    <div class="chat">
        <div class="messages">
            <!-- <div class="msg_ai">
                <div class="ai_icon"></div>
                <div class="ai_msg_box">
                    <div class="msg_tail"></div>
                </div>
            </div>
            <div class="msg_user">
                <div class="user_msg_box">
                    
                </div>
            </div> -->


            <div class="message" v-for="message in messages" :key="message.id">
                <div class="message-content">{{ message.text }}</div>
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
        You have &nbsp; <b> 12 messages</b> &nbsp; remaining. Sign up for free to send more messages. Read our &nbsp;<a href="#">Terms & Policy</a>
    </div>
</div>
</template>

<script>
export default {
data() {
    return {
        messages: [],
        newMessage: '',
    }
},
methods: {
    login() {
        this.$router.push({ path: "../dashboard" });
    },
    async sendMessage() {
      if (this.newMessage.trim() === '') return;

      // Add the user's message to the chat
      this.messages.push({ text: this.newMessage, type: 'user' });
      this.newMessage = '';

      try {
        // Make a request to the ChatGPT API
        const response = await this.$axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: this.messages.map((msg) => msg.text).join('\n') },
          ],
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        });

        // Add ChatGPT's response to the chat
        this.messages.push({ text: response.data.choices[0].message.content, type: 'bot' });
      } catch (error) {
        console.error('Error sending message to ChatGPT:', error);
      }
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