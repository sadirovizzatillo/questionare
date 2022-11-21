<template>
    <div class="register">
        <el-form
        ref="form"
        :model="formRule"
        status-icon
        :rules="rules"
        >
        <el-form-item label="Username">
            <el-input v-model="formRule.username" />
        </el-form-item>
        <el-form-item label="Password">
            <el-input v-model="formRule.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item class="btn-list">
            <el-button type="primary" @click="onSubmit">Login</el-button>
            <el-button type="primary" @click="$router.push({ name: 'register' })">Register</el-button>
        </el-form-item>
    </el-form>
</div>

</template>


<script setup>
import { reactive } from 'vue'
import { useStore } from "vuex"
const store = useStore()
const formRule = reactive({
    username: "",
    password: "",
})
const rules = reactive({
    password: [{ required:true, trigger: 'blur', message:"Please type the password" }],
    username: [{ required:true, trigger: 'blur',  message:"Please type the username"  }],
})
const onSubmit = () => {
    store.dispatch("register/login", formRule)
}
</script>


<style>
.register{
    max-width: 500px;
    margin: 0 auto;
}
.register .el-form-item{
    flex-direction: column;
}
.register .el-form-item__label{
    justify-content: flex-start;
}
.form-wrap{
    display: flex;
    justify-content: space-between;
}

</style>