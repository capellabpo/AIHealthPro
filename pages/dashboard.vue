
<template>
  <div class="login_page">
    <button @click="login">
      Login
    </button>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',

  methods: {
    login() {
      this.$router.push({ path: "../dashboard" });
    }
  }
}
</script>