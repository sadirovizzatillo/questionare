<template>
  <div class="single-questions">
    <el-card class="box-card" v-for="question in questions" :key="question">
      <h3 v-html="question.text" @change="getAnswers($event)"></h3>
    </el-card> 
  </div>
</template>

<script>
import store from '@/store'
export default {
  name:"PageTextQuestions",
  data(){
    return{
      radio:[],
      all:null
    }
  },
  methods:{
    getAnswers(e){
      console.log(e.target.value)
    }
  },
  computed:{
    questions(){
      const  question  = store.state.questions.textQuestion
      const realQuestion = []
      var newQuestion = question?.map(item => {
        item.answer.forEach(index => {
          if(realQuestion.length > 0){
            realQuestion[0] = realQuestion[0].replace(index, `<input type="text" />`);
            return
          }
          realQuestion.push(item.text.replace(index, `<input type="text" />`));
        })
        return {
          date:item.date,
          type_id:item.type_id,
          _id:item._id,
          text: realQuestion
        } 
      })
      return newQuestion ?? null
    }
  }
}
</script>

<style scoped>
.single-questions .el-card{
  border-radius: 24px;
  max-width: 800px;
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