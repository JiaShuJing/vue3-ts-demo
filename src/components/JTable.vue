<template>
  <div class="el-table-container">
    <jsearch
             v-if="formOptions"
             ref="searchForm"
             :forms="formOptions.forms"
             :size="formOptions.size"
             :label-width="formOptions.labelWidth"
             :item-width="formOptions.itemWidth"
             :before-search="beforeSearch"
             :before-new="beforeNew"
             :submit-loading="loading"
             :showResetBtn="formOptions.showResetBtn"
             :submitBtnText="formOptions.submitBtnText"
             :resetBtnText="formOptions.resetBtnText"
             :newBtnText="formOptions.newBtnText"
             :form-style="formOptions.formStyle"
             :form-item-style="formOptions.formItemStyle"
             :btn-style="formOptions.btnStyle"
             :addHandler="formOptions.addHandler"
             @searchHandler="searchHandler" />
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
              :size="size">
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
        <el-table-column :key="index"
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
                         :header-align="column.align"
                         :class-name="column.className"
                         :label-class-name="labelClassName"
                         :selectable="column.selectable"
                         :reverse-selection="column.reverseSelection"
                         :filters="column.filters"
                         :filter-placement="column.filterPlacement"
                         :filter-multiple="column.filterMultiple"
                         :filtered-value="column.filteredValue">
          <template v-slot='scope'>
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
                    class="cmd-item">
                <span
                      class="operation-span" v-if="cmd.showCondition==undefined || cmd.showCondition(scope.row)">
                  <el-dropdown
                               @command="cmd.cmd"
                               v-if="cmd.type == 'dropdown'"
                               size="small">
                    <el-button type='text' size='small' :disabled="!(cmd.auth == undefined ?true:cmd.auth)">
                      {{cmd.label}}
                      <i class="el-icon-arrow-down el-icon-right"></i>
                    </el-button>
                    <el-dropdown-item
                                      v-for="(children,childrenIndex) in cmd.children"
                                      :key="childrenIndex"
                                      :disabled="chidlren.disableMethod && children.disableMethod(scope.row)"
                                      :command=" cmdChildren(scope.row,children.command)">
                      {{children.commandText}}
                    </el-dropdown-item>
                  </el-dropdown>
                  <el-button
                             v-else
                             size="small"
                             :type="cmd.type"
                             :class="cmd.class"
                             @click="cmd.cmd(scope.row)">{{cmd.label}}</el-button>
                  <div class="border-left-line" :class="cmd.class"></div>
                </span>
              </span>
            </span>
            <span v-else>{{
            column.render?column.render(scope.row):initColValue(scope.row,column.prop)}}</span>
          </template>
        </el-table-column>

      </template>
    </el-table>
  </div>
</template>

<script lang='ts'>
  export default {
    name: "jtable",
    setup(prop: any, context: any) {
      let loading = false
      let newSlotScope = true
      const initColValue = (row: any, prop: any) => {
        let result = row
        if (prop && prop.indexOf(".") !== -1) {
          prop.split(".").forEach((vv: any) => {
            result = result[vv]
          })
        } else {
          result = result[prop]
        }
        return result
      }
      const cmdChidlren = (row: any, cmd: any) => {
        var tmpRow = Object.assign({}, row)
        tmpRow.command = cmd
        return tmpRow
      }
      const searchHandler = (params: any) => {
        console.log(2222)
        console.log("中间的组件接受的值", params)
      }
      return {
        loading,
        newSlotScope,
        initColValue,
        cmdChidlren,
        searchHandler
      }
    },
    props: {
      tableData: {
        type: Array,
        default: () => []
      },
      formOptions: {
        type: Object
      },
      searchHandler: {
        type: Function,
        default: () => {}
      },
      beforeSearch: Function,
      beforeNew: Function,
      saveParams: {
        type: Boolean,
        default: false
      },
      check: {
        type: Boolean,
        default: false
      },
      selectable: {
        type: Function,
        default: function () {
          return true
        }
      },
      no: {
        type: Boolean,
        default: true
      },
      height: [String, Number],
      maxHeight: [String, Number],
      stripe: { type: Boolean, default: false },
      border: { type: Boolean, default: false },
      fit: { type: Boolean, default: true },
      showHeader: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: "small"
      },
      headerAlign: {
        type: String,
        default: "center"
      },
      emptyText: {
        type: String,
        default: "暂无数据"
      },
      highlightCurrentRow: Boolean,
      currentRowKey: [String, Number],
      rowClassName: [String, Function],
      rowStyle: [String, Function],
      rowKey: [String, Function],
      defaultExpandAll: Boolean,
      expandRowKeys: Array,
      defaultSort: String,
      defaultSortFiled: String,
      tooltipEffect: String,
      showSummery: Boolean,
      sumText: String,
      sumMethod: Function,
      url: String,
      server: String,
      headers: {
        type: Object,
        default: () => {
          return {}
        }
      },
      totalFiled: {
        type: String,
        default: "data.totalCount"
      },
      params: {
        type: Object,
        default: () => {
          return {}
        }
      },
      autoLoad: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: "remote",
        validator(value: any) {
          const types = ["remote", "local"]
          const validType = types.indexOf(value) !== -1
          if (!validType) {
            throw new Error(
              `Invalid type of ${value},please set one type of 'remote' or 'local'`
            )
          }
          return validType
        }
      },
      data: {
        type: Array
      },
      dataHandler: {
        type: Function
      },
      columns: {
        type: Array,
        required: true
      },
      showPagination: {
        type: Boolean,
        default: true
      },
      pageSizes: {
        type: Array,
        default: () => {
          return [10, 15, 20, 50, 100]
        }
      },
      paginationLayout: {
        type: String,
        default: "total,sizes,prev,pager,next,jumper"
      },
      pageIndexKey: {
        type: String,
        default: "pageIndex"
      },
      pageSizeKey: {
        type: String,
        default: "pageSize"
      }
    }
  }
</script>

<style scoped>
  .operation-span {
    font-size: 12px;
    line-height: 12px;
  }
  .border-left-line {
    height: 12px;
    display: inline-block;
    border-left: 1px solid gray;
    margin: 0 10px;
    transform: translateY(2px);
  }
</style>
