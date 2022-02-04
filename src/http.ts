import axios, { AxiosRequestConfig } from "axios"
//引入element-plus的loading组件
import { ElLoading } from "element-plus"
let loading: any
const startLoading = () => {
  interface Options {
    lock: boolean
    text: string
    background: string
  }
  const options: Options = {
    lock: true,
    text: "加载中...",
    background: "rgba(0,0,0,0.7)"
  }
  loading = ElLoading.service(options)
}

const endLoading = () => {
  loading.close()
}
axios.interceptors.request.use((config) => {
  //loading
  startLoading()
  return config
})

axios.interceptors.response.use(
  (response) => {
    endLoading()
    return response
  },
  (error) => {
    endLoading()
    //错误提醒
    return Promise.reject(error)
  }
)
export default axios
