import api from "../../../api/api"
import store from "..";
// import router from "@/router";

export default{
    namespaced:true,
    state:{
        routeId:null,
        types:null,
        questions:null,
        singleType:null,
        textQuestion:null,
        textQuestionsType:null
    },
    mutations:{
        setRouteId(state, id){
            state.routeId = id
        },
        SET_QUESTIONS_TYPE(state, types){
            state.types = types
        },
        SET_TEXTQUESTIONS_TYPE(state, textQuestionsType){
            state.textQuestionsType = textQuestionsType
        },
        SET_SINGLE_QUESTION(state, question){
            state.questions = question,
            state.singleType = question.type[0]
        },
        SET_SINGLE_TEXTQUESTION(state, textQuestion){
            state.textQuestion = textQuestion.questions,
            state.textQuestionsSingleType = textQuestion.type[0]
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
                const { data: question } = await api.put(`/questions/${data._id}`, { 
                    title: data.title,
                    options: data.options
                }) 
                console.log(data, question)
                await _.dispatch("getQuestionsType")
                await _.dispatch("getSingleQuestions", data.type_id)
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
                const { data: textQuestion } = await api.get(`/textquestionstype/${id}`);
                if(textQuestion){
                    await _.commit("SET_SINGLE_TEXTQUESTION", textQuestion)
                } 
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async getTextQuestionsType(_){
            try{
                const { data } = await api.get("/textquestionstype")
                if(data){
                    await _.commit("SET_TEXTQUESTIONS_TYPE", data)
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async getPaginateQuestions(_, data){
            try {
                console.log(data)
                const { data: question } = await api.get(`/type/${data.data.route}?page=${data.data.val}&limit=3`);
                await _.commit("SET_SINGLE_QUESTION", question)
            } catch (err) {
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async addQuestion(_, payload){
            try{
                const { data } = await api.post("/questions", payload);
                console.log(data)
                await _.dispatch("getSingleQuestions", payload.type_id)
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
         setQuestionId(_, id){
            _.commit("setRouteId", id)
        }
    }
}