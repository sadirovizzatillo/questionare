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
  },
  {
    path:"/questions",
    name:"Questions",
    meta:{
      layout:"UserLayout"
    },
    children:[
      {
        path:":id",
        name:"PageQuestions",
        component: () => import("../views/PageQuestions.vue"),
        meta:{
          layout:"UserLayout"
        },
      },
      {
        path:"textquestions/:id",
        name:"PageQuestionsText",
        component: () => import("../views/PageTextQuestions.vue"),
        meta:{
          layout:"UserLayout"
        },
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin/QuestionsView.vue'),
    meta:{
      layout:"AdminLayout"
    },
  },
  {
    path:"/admin/question/:id",
    name:"QuestionsView",
    component: () => import("../views/AboutView.vue"),
    meta:{
      layout:"AdminLayout"
    },
  },
  {
    path:"/users",
    name:"AllUsers",
    component: () => import("../views/Admin/UsersView.vue"),
    meta:{
      layout:"AdminLayout"
    },
  },
  {
    path:"/add-question",
    name:"addQuestion",
    component: () => import("../views/Admin/AddQuestions.vue"),
    meta:{
      layout:"AdminLayout"
    },
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
  // const { isAdmin } = JSON.parse(localStorage.getItem("user")) 
  if (to.meta.layout !== 'AuthLayout' && !isAuthenticated){
    next({ name: 'login' })
  } else {
    next()
  }
})  

export default router
