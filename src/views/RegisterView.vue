<template>
    <div class="register">
        <el-form
        ref="form"
        :model="formRule"
        status-icon
        :rules="rules"
        >
        <el-form-item label="Ism">
            <el-input v-model="formRule.name" />
        </el-form-item>
        <el-form-item label="Familiya">
            <el-input v-model="formRule.surname" />
        </el-form-item>
        <el-form-item label="Username">
            <el-input v-model="formRule.username" />
        </el-form-item>
        <div class="form-wrap">            
            <el-form-item label="Yosh">
                <el-input-number v-model="formRule.age" :min="12" :max="100"/>
            </el-form-item>
            <el-form-item label="Jinsi">
                <el-radio-group v-model="formRule.sex">
                    <el-radio border label="Erkak" />
                    <el-radio border label="Ayol" />
                </el-radio-group>
            </el-form-item>
        </div>
        <el-form-item label="Password">
            <el-input v-model="formRule.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm Password">
            <el-input
            v-model="formRule.againPassword"
            type="password"
            autocomplete="off"
            />
        </el-form-item>
        <el-form-item class="btn-list">
            <el-button type="primary" @click="onSubmit">Register</el-button>
            <el-button type="primary" @click="$router.push({ name: 'login'})">login</el-button>
        </el-form-item>
    </el-form>
</div>

</template>


<script setup>
import { reactive } from 'vue'
import { useStore } from "vuex"
const store = useStore()
const formRule = reactive({
    name: '',
    age: '',
    sex:'',
    surname: '',
    username: '',
    password: "",
    againPassword: [],
})
const rules = reactive({
    password: [{ required:true, trigger: 'blur', message:"Please type the password" }],
    againPassword: [{ required:true, trigger: 'blur',  message:"Please write same password"  }],
    age: [{ required:true, trigger: 'blur',  message:"Please type the age"  }],
    name: [{ required:true, trigger: 'blur',  message:"Please type the name"  }],
    username: [{ required:true, trigger: 'blur',  message:"Please type the username"  }],
    surname: [{ required:true, trigger: 'blur',  message:"Please type the surname"  }],
})
const onSubmit = () => {
    store.dispatch("register/register", formRule)
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