import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementPlus from "element-plus"
import "element-plus/lib/theme-chalk/index.css"
import axios from "./http"
import Jsearch from "./components/JSearch.vue"
import JTable from "./components/JTable.vue"
import { Expand } from "@element-plus/icons"
import moment from "moment"
const app = createApp(App)
  .component("jsearch", Jsearch)
  .component("jtable", JTable)
  .component("expand", Expand)

// 全局挂载axios和moment
app.config.globalProperties.$axios = axios
app.config.globalProperties.$moment = moment

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount("#app")
