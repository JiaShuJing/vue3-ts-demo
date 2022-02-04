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
const app = createApp(App)
  .component("jsearch", Jsearch)
  .component("jtable", JTable)
  .component("expand", Expand)

// 全局挂载axios
app.config.globalProperties.$axios = axios

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount("#app")
