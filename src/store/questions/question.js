import api from "../../../api/api"
import store from "..";
// import router from "@/router";

export default{
    namespaced:true,
    state:{
        types:null,
        questions:null,
        singleType:null
    },
    mutations:{
        SET_QUESTIONS_TYPE(state, types){
            state.types = types
        },
        SET_SINGLE_QUESTION(state, question){
            state.questions = question.questions,
            state.singleType = question.type[0]
        }
    },
    actions:{
        async getQuestionsType(_){
            try{
                const { data: types} = await api.get("/type")
                if(types){
                    _.commit("SET_QUESTIONS_TYPE", types)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async getSingleQuestions(_, id){
            try{
                const { data: questions } = await api.get(`/type/${id}`);
                if(questions){
                   await _.commit("SET_SINGLE_QUESTION", questions)
                } 
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async editQuestions(_, data){
            try{
                const { data: question } = await api.put(`/questions/${data.id}`, { 
                    title: data.title,
                    options: data.options
                }) 
                console.log(question)
                await _.dispatch("getQuestionsType")
                await _.dispatch("getSingleQuestions")
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async deleteQuestion(_, id){
            try{
                const { data } = await api.delete(`/questions/${id}`);
                console.log(data)
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async getSingleQuestionsText(_, id){
            try{
                const { data } = await api.delete(`/textquestions/${id}`);
                console.log(data)
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        }
    }
}