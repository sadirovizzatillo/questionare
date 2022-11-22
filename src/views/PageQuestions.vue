<template>
  <div class="single-questions">
    <el-card class="box-card" v-for="(question, id) in questions" :key="id">
      <h3>{{ question.title }}</h3>
      <el-radio-group v-model="radio1">
        <el-radio  label="Option1" size="large">Option1</el-radio>
        <el-radio  label="sa" size="large">Option1</el-radio>
        <el-radio  label="dasd" size="large">Option1</el-radio>
      </el-radio-group>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name:"PageQuestions",
  data(){
    return{
      radio1:''
    }
  },
  computed:{
    questions(){
      const  question  = store.state.questions.questions
      return question ?? null
    }
  }
}
</script>

<style>
.single-questions .el-card{
  border-radius: 24px;
  max-width: 400px;
}
.single-questions .el-card h3{
  margin: 0;
  margin-bottom: 16px;
  text-align: left;
}
.single-questions .el-radio-group{
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}
.single-questions .el-radio.el-radio--large .el-radio__inner{
  width: 30px !important;
  height: 30px !important;
  border-radius: 50% !important;
}
.single-questions .el-radio__inner:hover{
  border-color: none !important;
}
.single-questions .el-radio__input.is-checked+.el-radio__label{
  color: green !important;
}
.single-questions .el-radio__input.is-checked .el-radio__inner{
  background-color: #fff !important;
  border-color: green !important;
}
.single-questions .el-radio__input.is-checked .el-radio__inner:before {
  content: "✔";
  font-family: 'lucida grande';
  font-size: 24px;
  line-height: 28px;
  color: green;
  text-align: center;
}
.single-questions .el-radio__input.is-checked .el-radio__inner::after{
  display: none !important;
}
</style>