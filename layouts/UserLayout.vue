<template>
    <div class="common-layout">
        <el-container>
            <el-header class="user-header">
                <div class="user-header__wrapper">
                    <h3>Questionare</h3>
                    <p>{{ user?.username }}</p>
                </div>
            </el-header>
            <el-container>
                <el-aside class="user-aside" width="200px">Aside</el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script>
export default{
    name:"UserLayout",
    computed:{
        user(){
            return JSON.parse(localStorage.getItem("user"))
        }
    }
}
</script>



<style scoped>
    .user-header{
        background-color: blue;
    }
    .user-aside{
        background-color: blue;
        color: #fff;
        height: 100vh;
    }
    .user-header__wrapper{
        display: flex;
        justify-content: space-between;
        color: #fff;
    }
</style>