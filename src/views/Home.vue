<template>
  <div class="home" ref="homeRef">
    <jtable
            ref="jtableList"
            class="jtable-list"
            type="remote"
            :url="url"
            :tableData="tableData"
            :columns="columns"
            :formOptions="formOptions"
            :new="handleAdd"
            @searchHandler='searchHandler'>
      <el-button
                 slot="middle"
                 size="small"
                 class="jtable-middle operate-wrapper"
                 @click="handleAdd"
                 icon="icon iconfont icon-xiaojian02 font13">
        新增
      </el-button>
    </jtable>
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
      <el-form :model="form">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
  import { reactive, toRefs, ref, getCurrentInstance } from "vue"
  import {
    User,
    getUserList,
    delUser,
    addUser,
    updateUser
  } from "@/utils/cookieOperation"
  import { onMounted, watchEffect, watch } from "vue"

  export default {
    name: "Home",
    setup(prop: any, context: any) {
      const { proxy }: any = getCurrentInstance()
      let dialogFormVisible = ref(false)
      let userid = 0
      const editUser = (row: any): void => {
        console.log("edit user")
        dialogTitle.value = "更新用户信息"
        dialogFormVisible.value = true
        userid = row.id
      }
      const deleteUser = (row: any): void => {
        console.log("delete user")
        userid = row.id
        //确定要删除吗？
        delUser(userid)
        initUserList()
      }
      const data = reactive({
        formOptions: {
          showSubmitBtn: true,
          submitBtnText: "查询",
          addHandler: () => {
            dialogFormVisible.value = true
          },
          formStyle: {
            display: "flex",
            "flex-wrap": "nowrap"
            // "justify-content": "space-between"
          },
          btnStyle: {
            "padding-left": "40px"
          },
          labelWidth: 70,
          forms: [
            {
              prop: "username",
              label: "用户名称",
              itemType: "input",
              placeholder: "请输入",
              labelWidth: 80,
              style: {
                "padding-right": "10px"
              }
            },
            {
              prop: "password",
              label: "密码",
              itemType: "input",
              placeholder: "请输入",
              labelWidth: 80,
              style: {
                "padding-right": "10px"
              }
            }
          ]
        },
        columns: [
          {
            prop: "id",
            label: "用户id",
            align: "left"
          },
          {
            prop: "username",
            label: "用户名称",
            align: "left"
          },
          {
            prop: "password",
            label: "密码",
            align: "left"
          },
          {
            prop: "createtime",
            label: "创建时间",
            align: "left"
          },
          {
            prop: "updatetime",
            label: "更新时间",
            align: "left"
          },
          {
            prop: "",
            label: "操作",
            width: 300,
            align: "center",
            cmds: [
              {
                type: "text",
                class: "a-blue jdt-blue",
                label: "编辑",
                cmd: editUser
              },
              {
                type: "text",
                class: "a-blue jdt-blue",
                label: "删除",
                cmd: deleteUser
              }
            ]
          }
        ],
        form: {
          id: 0,
          username: "",
          password: "",
          formLabelWidth: "80"
        }
      })
      let tableData: any = ref([])
      const initUserList = (username?: string, password?: string) => {
        const userList = getUserList(username, password)
        userList.map((user: User) => {
          console.log(11111, proxy)
          user.createtime = proxy.$moment(user.createtime).format("YYYY-MM-DD HH:mm:ss")
          user.updatetime = proxy.$moment(user.updatetime).format("YYYY-MM-DD HH:mm:ss")
        })
        tableData.value = userList
      }
      initUserList()
      const dialogTitle = ref("新增用户")
      const form = reactive({
        id: 0,
        username: "",
        password: ""
      })
      const submit = () => {
        if (dialogTitle.value === "新增用户") {
          //生成时间戳作为用户id
          const userid = new Date().getTime()
          form.id = userid
          console.log("add user", form)
          const res = addUser(form)
        } else {
          form.id = userid
          updateUser(form)
        }
        dialogFormVisible.value = false
        initUserList()
      }
      const searchHandler = ({
        username,
        password
      }: {
        username: string
        password: string
      }) => {
        initUserList(username, password)
        console.log(2222, tableData)
      }
      return {
        ...toRefs(data),
        tableData,
        dialogFormVisible,
        dialogTitle,
        submit,
        form,
        editUser,
        deleteUser,
        searchHandler
      }
    }
  }
</script>
<style scoped>
</style>