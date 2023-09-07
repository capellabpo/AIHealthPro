
<template>
  <div class="mainPage">
    <div class="page_header">
      <Header/>
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
import Header from "../components/header.vue";
import Chats from "../components/chatbox.vue";
import Form from "../components/patientForm.vue";
import History from "../components/history.vue";
export default {
  name: 'IndexPage',
  components: {
    Header,
    Chats,
    Form,
    History
  },
}
</script>
