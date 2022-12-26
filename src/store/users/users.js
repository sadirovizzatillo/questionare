import store from ".."
import api from "../../../api/api"

export default {
    namespaced:true,
    
    state:{
        users:null
    },
    mutations:{
        SET_USERS(state, users){
            if(state.users){
                return
            }
            state.users = users
        },
        SET_EDIT_USERS(state, users){
            state.users = users
        }
    },
    actions:{
        async  getAllUsers({ commit }){
            try{
                const { data: users } = await api.get("auth")
                commit("SET_USERS", users)
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async getEditedUsers({commit}){
            try{
                const { data: users } = await api.get("auth")
                commit("SET_EDIT_USERS", users)
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async  editUser({ dispatch }, form){
            try{
                const { data: user } = await api.put(`auth/${form.id}`, form)
                if(user){
                   await dispatch("getEditedUsers")
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async  deleteUser({ dispatch }, id){
            try{
                const { data: user } = await api.delete(`auth/${id}`)
                if(user){
                    await dispatch("getEditedUsers")
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        }
    }
}