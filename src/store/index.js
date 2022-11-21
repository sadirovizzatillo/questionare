import { createStore } from 'vuex'
import toast from './toast'
import register from './auth/register'
import questions from './questions/question'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    register,
    toast,
    questions
  }
})
