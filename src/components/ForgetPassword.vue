<template>
  <el-form
           ref="root"
           label-width="100px"
           class="loginForm sign-in-form">
    <el-form-item label="邮箱" prop="email">
      <el-input
                v-model="email"
                placeholder="Enter Email..."></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
                 @click="sendEmail"
                 type="primary"
                 class="submit-btn">发送重置密码邮件</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { useRouter } from "vue-router"
  export default {
    props: {
      email: {
        type: String,
        required: true
      }
    },
    setup(props: any) {
      // @ts-ignore
      const root = ref()
      const router = useRouter()
      const sendEmail = async () => {
        const res = await root.$axios
          .post("/api/v1/auth/forgotpassword", { email: props.email })
          .then((res: any) => {
            console.log("res", res)
          })
      }
      return {
        sendEmail
      }
    }
  }
</script>
<style scoped>
  /* form */
  .loginForm {
    width: 800px;
    margin-top: 200px;
    margin-left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    padding: 20px 40px 20px 20px;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #cccc;
  }

  .submit-btn {
    width: 100%;
  }
  .tiparea {
    text-align: right;
    font-size: 12px;
    color: #333;
  }
  .tiparea p a {
    color: #409eff;
  }
</style>