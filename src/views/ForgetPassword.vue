<template>
  <div class="container">
    <!-- form表单容器 -->
    <div class="forms-container">
      <!-- 忘记密码 -->
      <ForgetPassword :email="email" />
    </div>
  </div>
</template>
<script lang="ts">
  import { ref } from "vue"
  import ForgetPassword from "@/components/ForgetPassword.vue"
  export default {
    name: "LoginRegister",
    components: { ForgetPassword },
    setup() {
      const email = ref<string>("")
      return {
        email
      }
    }
  }
</script>
<style scoped>
  .container {
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;
  }

  .forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>