<template>
    <div class="common-layout">
        <el-container>
            <div style="height:60px"></div>
            <el-header class="user-header">
                <div class="user-header__wrapper">
                    <h3>Questionare</h3>
                    <div class="header-right">
                        <p>{{ user?.username }}</p>
                        <el-button type="primary" @click="logout">Logout</el-button>
                    </div>
                </div>
            </el-header>

            <el-container>
                <div style="width:230px"></div>
                <el-aside class="user-aside" width="230px">
                    <el-row class="tac">
                        <el-col>
                            <el-menu
                            active-text-color="#ffd04b"
                            background-color="#545c64"
                            class="el-menu-vertical-demo"
                            default-active="2"
                            text-color="#fff"
                            >
                            <el-sub-menu index="1">
                                <template #title>
                                    <span>Savollar</span>
                                </template>
                                <el-menu-item-group v-for="(type, id) in types" :key="id" >
                                    <el-menu-item :index="1 + (id + 1)" @click="goQuestion(type)">
                                        {{type?.name}}
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                            <el-sub-menu index="3">
                                <template #title>
                                    <span>Ko'p  Savollar</span>
                                </template>
                                <el-menu-item-group v-for="(type, id) in textTypes" :key="id" >
                                    <el-menu-item :index="id" @click="goQuestionText(type)">
                                        {{type?.name}}
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                            <el-sub-menu index="2">
                                <template #title>
                                    <span>Text Savollar</span>
                                </template>
                                <el-menu-item-group v-for="(type, id) in textTypes" :key="id" >
                                    <el-menu-item :index="id" @click="goQuestionText(type)">
                                        {{type?.name}}
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                            
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>


<script>
import store from '@/store'
export default{
    name:"UserLayout",
    async mounted(){
        await store.dispatch("questions/getQuestionsType")
        await store.dispatch("questions/getTextQuestionsType")
    },
    computed:{
        user(){
            return JSON.parse(localStorage.getItem("user"))
        },
        types(){
            return store.state.questions.types
        },
        textTypes(){
            return store.state.questions.textQuestionsType
        }
    },
    methods:{
        goQuestion(data){
            store.dispatch("questions/getSingleQuestions", data._id)
            this.$router.push({ name: "PageQuestions", params: { id: data._id }}) 
        },
        goQuestionText(data){
            store.dispatch("questions/getSingleQuestionsText", data._id)
            this.$router.push({ name: "PageQuestionsText", params: { id: data._id }}) 
        }
    }
}
</script>



<style scoped>
.user-header{
    background-color: #545c64;
    position: fixed;
    width: 100%;
    z-index: 99;
}
.user-aside{
    background-color: #545c64;
    color: #fff;
    position: fixed;
    top: 60px;
    z-index: 99;
}
.user-header__wrapper{
    display: flex;
    justify-content: space-between;
    color: #fff;
}
</style>