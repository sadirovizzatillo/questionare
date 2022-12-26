import store from ".."
import api from "../../../api/api"

export default {
    namespaced:true,
    state:{
        answers: null
    },
    mutations:{
        VIEW_ANSWERS(state, answers){
            state.answers = answers
        }
    },
    actions:{
        async sendAnswers({ commit }, form){
            try{
                const { data } = api.post("answer", form)
                if(data){
                    commit("VIEW_ANSWERS", data)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        }
    }
}