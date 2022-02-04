<template>
  <div class="container">
    <el-form
             :inline="true"
             :model="params"
             class="el-search-form"
             ref="form"
             @submit.native.prevent='searchHandler()'
             size='small'
             :label-width="labelWidth?labelWidth+'px':''"
             :style="formStyle">
      <el-form-item
                    v-for="(form,index) in forms"
                    :key="index"
                    :label='form.label'
                    :prop="form.itemType!='daterange'?form.prop:datePrefix+index"
                    :rules="form.rules||[]"
                    :label-width="form.labelWidth?form.labelWidth+'px':''"
                    :style="form.style?form.style:formItemStyle">
        <el-input
                  v-if="form.itemType==='input' || form.itemType===undefined"
                  v-model="params[form.modelValue]"></el-input>
      </el-form-item>
      <el-form-item label :style="btnStyle">
        <el-button
                   v-if="showSubmitBtn"
                   type="primary"
                   :size="size"
                   @click="searchHandler"
                   :loading="submitLoading">{{submitBtnText}}</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script lang="ts" setup>
  import { defineProps, reactive } from "vue"

  const props = defineProps({
    tableData: {
      type: Array,
      required: true
    },
    forms: {
      type: Array,
      default: () => {
        return []
      }
    },
    labelWidth: Number,
    formStyle: {
      type: Object,
      default: {}
    },
    formItemStyle: {
      type: Object,
      default: {}
    },
    showSubmitBtn: {
      type: Boolean,
      default: true
    },
    submitBtnText: {
      type: String,
      default: "查询"
    }
  })

  const onSubmit = () => {
    console.log("submit!")
  }
  const searchHandler = () => {
    console.log("searchHandler")
  }

  const params = reactive({})
  props.forms.forEach((v: any, i: number) => {
    const propType = typeof v.prop
    if (propType === "string") {
      v.modelValue = v.prop
      params[v.prop] = ""
    }
  })
</script>
