/* eslint-disable */ 
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      layout:"UserLayout"
    },
    children: [
      {
        path:"questions/:id",
        name:"PageQuestions",
        component: () => import("../views/PageQuestions.vue"),
        meta:{
          layout:"UserLayout"
        },
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AboutView.vue'),
    meta:{
      layout:"AdminLayout"
    },
    children: [
      {
        path:"question/:id",
        name:"QuestionsView",
        component: () => import("../views/Admin/QuestionsView.vue"),
        meta:{
          layout:"AdminLayout"
        },
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta:{
      layout:"AuthLayout"
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta:{
      layout:"AuthLayout"
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("user")
  console.log(to.meta.layout)
  if (to.meta.layout !== 'AuthLayout' && !isAuthenticated) next({ name: 'login' })
  else next()
})  

export default router
