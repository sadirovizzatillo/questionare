<template>
    <div class="common-layout">
        <el-container>
            <el-header class="user-header">
                <div class="user-header__wrapper">
                    <h3>Questionare</h3>
                    <div class="header-right">
                        <p>{{ userData?.username }}</p>
                        <el-button type="primary" @click="logout">Logout</el-button>
                    </div>
                </div>
            </el-header>
            <el-container>
                <el-aside class="user-aside" width="200px">
                    <el-row class="tac">
                        <el-col>
                            <el-menu
                            active-text-color="#ffd04b"
                            background-color="#545c64"
                            class="el-menu-vertical-demo"
                            text-color="#fff"
                            >
                            <el-sub-menu index="1">
                                <template #title>
                                    <span>Savollar</span>
                                </template>
                                <el-menu-item-group v-for="(type, id) in types" :key="id" >
                                    <el-menu-item :index="id + 1" @click="goQuestion(type)">
                                        {{type?.name}}
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                            <el-menu-item index="3">
                                <span>Navigator Three</span>
                            </el-menu-item>
                            <el-sub-menu index="2">
                                <template #title>
                                    <span>Users</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="1-1">Top answer</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group>
                                    <el-menu-item index="1-2">All Users</el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                            <el-menu-item index="4">
                                <span>Navigator Four</span>
                            </el-menu-item>
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
// import router from '@/router'
export default{
    name:"AuthLayout",
    data(){
        return{
            user:null
        }
    },
    async mounted(){
        await store.dispatch("questions/getQuestionsType")
    },
    computed:{
        userData(){
            return store.state.register?.user ?? JSON.parse(localStorage.getItem("user")) 
        },
        types(){
            return store.state.questions?.types
        }
    },
    methods:{
        logout(){
            store.dispatch("register/logout")
        },
        goQuestion(data){
            store.dispatch("questions/getSingleQuestions", data._id)
            this.$router.push({ name: "QuestionsView", params: { id: data._id }}) 
        }
    }
}
</script>



<style >
.user-header{
    background-color: #545c64;
}
.el-menu-item-group__title{
    display: none !important;
}
.header-right{
    display: flex;
    align-items: center;
}
.header-right p{
    margin-right: 12px;
}
.el-menu{
    border-right: none;
}
.user-aside{
    background-color: #545c64;
    color: #fff;
    height: 100vh;
}
.user-header__wrapper{
    display: flex;
    justify-content: space-between;
    color: #fff;
}
</style>