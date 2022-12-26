<template>
  <div class="single-questions">
    <el-empty v-if="questions?.length === 0" description="Bu mavzuga oid savollar yo'q ekan. Marhamat, boshqa savolni ishlang...">
    </el-empty>
    <el-card class="box-card" v-for="(question, id) in questions" :key="id">
      <h3>{{ question?.title }}</h3>
      <div class="questions-wrapper">
        <div class="el-radio-group" >
          <el-checkbox @change="handleRadioChange({ option: option, question: question})" v-for="(option, id) in question?.options" :value="option" :key="id">{{ option.name  }}</el-checkbox>
        </div>
        
        <div class="question-wrapper__variants">
          <p class="question-variant" v-for="(option, id) in question?.options" :key="id"> {{   option.variant  }}</p>
        </div>
      </div>
    </el-card> 
    <div>
      <el-button type="primary" @click="sendAnswers">
        Confirm
      </el-button>
    </div>
    <el-pagination v-if="questions?.length !== 0" background layout="prev, pager, next" :total="totalPage" @current-change="handleCurrentChange"/>
    
  </div>
</template>

<script>
import store from '@/store'
export default {
  name:"PageQuestions",
  data(){
    return{
      radio:[],
      total:null
    }
  },
  created(){
    const id = this.$route.params.id
    store.dispatch("questions/getSingleQuestions", id)
  },
  computed:{
    questions(){
      const  question  = store.state.questions?.questions?.questions
      return question ?? null 
    },
    totalPage(){
      const  pages  = store.state.questions?.questions?.allPage
      return pages ?? 3
    }
  },
  
  methods:{
    handleCurrentChange(val){
      const route = this.$route.params.id
      store.dispatch("questions/getPaginateQuestions", { data: { route: route, val:val}})
    },
    handleRadioChange(data){
      var isEqual = false
      const user_id = JSON.parse(localStorage.getItem("user"))
      const form = {
        _id: data.question._id,
        variant: data.option.variant,
        name: data.option.name,
        type_id: data.question.type_id,
        answer: [data.option.variant],
        user_id:user_id._id
      }
      
      this.radio.forEach(item => {
        if(item._id === form._id){
          item.answer.push(form.variant)
          isEqual = true
        }
      })
      this.radio.forEach((item) => {
        if(item._id === form._id && item.variant === form.variant){
          const indexData = this.radio.indexOf(item)
          this.radio.splice(indexData, 1)
          isEqual = true
        }
      })
      if(isEqual === false){
        this.radio.push(form)
      }
    },
    sendAnswers(){
      store.dispatch("check/sendAnswers", this.radio)
    }
  }
}
</script>

<style>
.single-questions{
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
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
.single-questions .el-checkbox .el-checkbox--large .el-checkbox__inner{
  width: 30px !important;
  height: 30px !important;
  border-radius: 50% !important;
}
.single-questions .el-checkbox__inner{
  border-radius: 12px;
  width: 28px;
  height: 28px;
}
.single-questions .el-checkbox__inner:hover{
  border-color: none !important;
}
.single-questions .el-checkbox__input.is-checked+.el-checkbox__label{
  color: green !important;
}
.single-questions .el-checkbox__input.is-checked+.question-variant{
  color: green !important;
}
.single-questions .el-checkbox__input.is-checked .el-checkbox__inner{
  background-color: #fff !important;
  border-color: green !important;
}
.single-questions .el-checkbox__input.is-checked .el-checkbox__inner:before {
  content: "✔";
  font-family: 'lucida grande';
  font-size: 24px;
  line-height: 28px;
  color: green;
  text-align: center;
}
.single-questions .checkbox__input.is-checked .checkbox__inner::after{
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