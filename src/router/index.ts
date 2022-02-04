import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginRegister.vue")
  },
  {
    path: "/forgetPassword",
    name: "ForgetPassword",
    component: () => import("../views/ForgetPassword.vue")
  },
  {
    path: "/resetpassword/:token",
    name: "ResetPassword",
    component: () => import("../views/ResetPassword.vue")
  },
  {
    path: "/demo",
    name: "Demo",
    component: () => import("../views/Demo.vue")
  },
  {
    path: "/:catchAll(.*)",
    name: "/404",
    component: () => import("../views/404.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
