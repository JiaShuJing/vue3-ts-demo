<template>
  <div class="el-table-container">
    <jsearch
             v-if="formOptions"
             ref="searchForm"
             :forms="formOptions.forms"
             :size="formOptions.size"
             :label-width="formOptions.labelWidth"
             :item-width="formOptions.itemWidth"
             :submit-handler="searchHandler"
             :before-search="beforeSearch"
             :before-new="beforeNew"
             :submit-loading="loading"
             :showResetBtn="formOptions.showResetBtn"
             :submitBtnText="formOptions.submitBtnText"
             :resetBtnText="formOptions.resetBtnText"
             :newBtnText="formOptions.newBtnText"
             :form-style="formOptions.formStyle"
             :form-item-style="formOptions.formItemStyle"
             :btn-style="formOptions.btnStyle" />
    <slot name="middle"></slot>
    <slot name="form" :loading="loading" :search="searchHandler"></slot>
    <el-table
              v-loading.lock='loading'
              ref="table"
              :data="tableData"
              :border="border"
              :stripe="stripe"
              :height="height"
              :max-height="maxHeight"
              :fit="fit"
              :show-header="showHeader"
              :highlight-current-row="highlightCurrentRow"
              :current-row-key="currentRowKey"
              :row-class-name="rowClassName"
              :row-style="rowStyle"
              :row-key="rowKey"
              :empty-text="emptyText"
              :default-expand-all="defaultExpandAll"
              :expand-row-keys="expand-row-keys"
              :default-sort="defaultSort"
              :tooltip-effect="tooltipEffect"
              :show-summery="showSummery"
              :sum-text="sumText"
              :summery-method="summerMethod"
              :size="size"></el-table>
    <slot name="prepend" />
    <el-table-column
                     v-if="check"
                     type='selection'
                     width='50'
                     :selectable='selectable'>
    </el-table-column>
    <el-table-column
                     v-if="no"
                     type='index'
                     :index='indexMethod'
                     width='60'
                     label='序号'
                     align='center'>

    </el-table-column>
    <template v-for="(column,index) in columns">
      <el-table-column :key="columnIndex"
                       v-if="column.show===undefined|| column.show"
                       :column-key="column.columnKey"
                       :prop="column.prop"
                       :label="column.label"
                       :width="column.width"
                       :min-width="column.minWidth"
                       :fixed="column.fixed"
                       :render-header="renderHeader"
                       :sortable="column.sortable"
                       :sort-method="sortMethod"
                       :resizable="column.resizable"
                       :formatter="column.formatter"
                       :show-overflow-tooltip="column.showOverflowTooltip"
                       :align="column.align"
                       :header-align="headerAlign"
                       :class-name="column.className"
                       :label-class-name="labelClassName"
                       :selectable="column.selectable"
                       :reverse-selection="column.reverseSelection"
                       :filters="column.filters"
                       :filter-placement="column.filterPlacement"
                       :filter-multiple="column.filterMultiple"
                       :filter-method="colum.filterMethod"
                       :filtered-value="column.filteredValue">
        <template slot-scope="scope" :scope="newSlotScope?'scope':false">
          <span v-if="column.filter">{{
            Vue.filter(column["filter"])(scope.row[column.prop])
            }}</span>
          <span v-else-if="column.slotName">
            <slot :name="column.slotName"
                  :row="scope.row"
                  :$index="scope.$index" />
          </span>
          <span v-else-if="column.cmds" class="col-cmds">
            <span
                  v-for="(cmd,cmdIndex) in column.cmds"
                  :key="cmdIndex"
                  class="cmd-item"></span>
          </span>
        </template>
      </el-table-column>

    </template>
  </div>
</template>

<script lang='ts'>
  export default {
    name: "jtable",
    setup() {
      let loading = false
      return {
        loading
      }
    },
    props: {
      formOptions: {
        type: Object
      },
      searchHandler: Function,
      beforeSearch: Function,
      beforeNew: Function
    }
  }
</script>
