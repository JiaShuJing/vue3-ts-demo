<template>
  <el-form
           ref="resetPasswordForm"
           :model="registerUser"
           :rules="registerRules"
           label-width="100px">
    <el-form-item label="密码" prop="password">
      <el-input
                v-model="password"
                type="password"
                placeholder="Enter Password..."></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
                 @click="handleReset()"
                 type="primary"
                 class="submit-btn">重置密码</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
  import { ref } from "vue"
  import { useRouter, useRoute } from "vue-router"
  export default {
    props: {
      password: {
        type: String,
        required: true
      }
    },
    setup(props: any) {
      // @ts-ignore
      const resetPasswordForm = <any>ref()
      const router = useRouter()
      const route = useRoute()
      const { token } = route.params
      const handleReset = () => {
        resetPasswordForm.$axios
          .put(`/api/v1/auth/resetpassword/${token}`, {
            password: props.password
          })
          .then((res: any) => {
            resetPasswordForm.$message({
              type: "success",
              message: "密码重置成功，请重新登录"
            })
            router.push("/login")
          })
      }
      return { handleReset }
    }
  }
</script>
<style scoped>
</style>