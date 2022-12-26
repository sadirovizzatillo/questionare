<template>
  <div class="add-questions">
    <el-form>
      <el-form-item label="Question Title">
        <el-input type="text" v-model="qTitle"></el-input>
      </el-form-item>
      <el-form-item label="First Option">
        <el-input type="text" v-model="qOption1"></el-input>
      </el-form-item>
      <el-form-item label="Second Option">
        <el-input type="text" v-model="qOption2"></el-input>
      </el-form-item>
      <el-form-item label="Third Option">
        <el-input type="text" v-model="qOption3"></el-input>
      </el-form-item>
      <el-form-item label="Question Answers">
        <el-checkbox-group v-model="checkboxGroup1" size="large">
          <el-checkbox-button v-for="city in cities" :key="city" :label="city">
            {{ city }}
          </el-checkbox-button>
        </el-checkbox-group>
        
      </el-form-item>
    </el-form>
    <div class="add-question__btns">
      <el-button type="primary" @click="addQuestion">Add</el-button>
      <el-button @click="beforeRoute">Back</el-button>
    </div>
  </div>
</template>

<script setup>
import router from "@/router"
import store from "@/store"
import { reactive, ref } from "vue"
const cities =  reactive(['a', 'b', 'c'])
// const answer = ref([])
const checkboxGroup1 = ref(['a'])
const qTitle = ref(null)
const qOption1 = ref(null)
const qOption2 = ref(null)
const qOption3 = ref(null)

const beforeRoute = () => {
  router.go(-1)
}

const addQuestion = () => {
  const id = store.state.questions.routeId
  store.dispatch("questions/addQuestion", {
    title: qTitle.value,
    options: [
      {
        variant:'a',
        name: qOption1.value
      },
      {
        variant:'b',
        name: qOption2.value
      },
      {
        variant:'c',
        name: qOption3.value
      }
    ],
    answer:['b'],
    type_id: id
  })

  router.go(-1)
}
</script>

<style>
.add-questions .el-form{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.add-questions .el-form .el-form-item{
  display: flex;
  flex-direction: column;
}
.add-questions .el-form .el-form-item .el-form-item__label{
  justify-content: flex-start;
}
.add-questions .el-checkbox-button{
  margin-right: 24px;
}
.add-questions .el-checkbox-button span{
  border-left: var(--el-border);
  border-top-left-radius: var(--el-border-radius-base);
  border-bottom-left-radius: var(--el-border-radius-base);
  box-shadow: none!important;
}
.add-question__btns{
  display: flex;
  max-width: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>