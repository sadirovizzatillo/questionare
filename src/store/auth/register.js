import api from "../../../api/api"
import store from "..";
import router from "@/router";

export default{
    namespaced:true,
    state:{
        user:null
    },
    mutations:{
        SET_DATA(state, payload){
            state.user = payload
        }
    },
    actions:{
        async register(_, payload){
            try{
                const { data } = await api.post("/auth", payload);
                console.log(data)
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async login(_, payload){
            try{
                const { data } = await api.post("/login", payload);
                if(data){  
                    await localStorage.setItem("user", JSON.stringify(data.user)) 
                    await localStorage.setItem("accessToken", JSON.stringify(data.accessToken))
                    await _.commit("SET_DATA", data)
                    store.dispatch("toast/success", { title:"Tabriklaymiz!", message: `${data.user.username}, Savol-javob portaliga xush kelibsiz!!!`})
                    if(data.user.isAdmin){
                        await router.push({ name: "admin" });
                        return
                    }
                    await router.push({ name: 'home'})
                }
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        },
        async logout(){
            try{
                await localStorage.clear();
                await window.location.reload()
            }catch(err){
                store.dispatch("toast/error", { title: err.name, message: err.response.data })
            }
        }
    }
}