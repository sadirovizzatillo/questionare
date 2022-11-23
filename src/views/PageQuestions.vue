<template>
  <div class="single-questions">
    <el-card class="box-card" v-for="(question, id) in questions" :key="id">
      <h3>{{ question.title }}</h3>
      <div class="questions-wrapper">
        <el-radio-group v-model="question[radio]">
          <el-radio  :label="option" size="large" v-for="(option, id) in question.options" :key="id">{{ option.name  }}</el-radio>
        </el-radio-group>
        <div class="question-wrapper__variants">
          <p class="question-variant" v-for="(option, id) in question.options" :key="id"> {{   option.variant  }}</p>
        </div>
      </div>
    </el-card> 
  </div>
</template>

<script>
import store from '@/store'
export default {
  name:"PageQuestions",
  data(){
    return{
      radio:[]
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
.single-questions .el-radio__input.is-checked+.question-variant{
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
.single-questions .questions-wrapper{
  display: flex;
  justify-content: space-between;
}
.single-questions .question-wrapper__variants{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
}
.single-questions .questions-wrapper p{
  margin: 0;
  font-size: 22px;
}
</style>