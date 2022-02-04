<template>
  <div class="container">
    <!-- form表单容器 -->
    <div class="forms-container">
      <!-- 重置密码 -->
      <ResetPassword />
    </div>
  </div>
</template>
<script lang="ts">
  import { ref } from "vue"
  import ResetPassword from "@/components/ResetPassword.vue"
  export default {
    name: "LoginRegister",
    components: { ResetPassword },
    setup() {
     
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