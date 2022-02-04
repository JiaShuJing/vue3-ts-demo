<template>
  <div class="home">
    <jtable
            ref="jtableList"
            class="jtable-list"
            type="remote"
            :url="url"
            :columns="columns"
            :formOptions="formOptions"
            :new="handleAdd">
      <el-button
                 slot="middle"
                 size="small"
                 class="jtable-middle operate-wrapper"
                 @click="handleAdd"
                 icon="icon iconfont icon-xiaojian02 font13">
        新增
      </el-button>
    </jtable>
  </div>
</template>
<script lang="ts">
  import { reactive, toRefs } from "@vue/reactivity"
  export default {
    name: "Home",
    components: {},
    setup() {
      const data = reactive({
        formOptions: {
          showSubmitBtn: true,
          submitBtnText: "查询",
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
              prop: "passoword",
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
            prop: "username",
            label: "用户名称"
          },
          {
            prop: "password",
            label: "密码"
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
                label: "编辑"
              },
              {
                type: "text",
                class: "a-blue jdt-blue",
                label: "删除"
              }
            ]
          }
        ]
      })
      return {
        ...toRefs(data)
      }
    }
  }
</script>
<style scoped>
</style>