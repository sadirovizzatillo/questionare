<template>
  <header class="question-single__type">
    <h3>{{ singleType?.name }}</h3>
    <el-button type="primary" @click="AddQuestion($route.params.id)">Add Question</el-button>
  </header>
  
  <el-table :data="questions" style="width: 100%">
    <el-table-column label="Date">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">
            {{ new Date().getFullYear(scope.row.date)  }} -
            {{ new Date().getMonth(scope.row.date)  }} -
            {{ new Date().getDate(scope.row.date)  }}
          </span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Title">
      <template #default="scope">
        <div>{{ scope.row.title }}</div>
      </template>
    </el-table-column>
    <el-table-column label="Correct Answer">
      <template #default="scope">
        <div class="corrects">
          <p v-for="(answer, id) in scope.row.answer" :key="id">{{ answer ?? 'javob' }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Operations" >
      <template #default="scope">
        <el-button size="small" @click="questionModal({name:'edit', val:scope.row})"
        >Edit</el-button
        >
        <el-button
        size="small"
        type="danger"
        @click="questionModal({name:'delete', val:scope.row})"
        >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  
  <el-dialog
  v-model="editModal"
  :title="singleType?.name"
  width="40%"
  >
  <span v-if="isEdit">
    <el-form>
      <el-form-item label="Edit Title">
        <el-input type="text" placeholder="Title" v-model="editTitle"></el-input>
      </el-form-item>
      <el-form-item :label="opt.variant" v-for="(opt, id) in editOptions" :key="id">
        <el-input type="text" placeholder="Options" v-model="opt.name"></el-input>
      </el-form-item>
    </el-form>
    
  </span>
  <span v-if="isDelete">Do you really want to delete this question?</span>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="questionModal">Cancel</el-button>
      <el-button type="primary" @click="editQuestion">
        Confirm
      </el-button>
    </span>
  </template>
</el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
import router from '@/router';
const store = useStore()
const isDelete = ref(false)
const isEdit = ref(false)
const editTitle = ref(null)
const editOptions = ref(null)
const editId = ref(null)
const editModal = ref(false)
const editTypeId = ref(null)

const questions = computed(() => {
  const  question  = store.state.questions?.questions?.questions
  return question ?? null
})

const singleType = computed(() => {
  const  type  = store.state.questions.singleType
  return type ?? null
})

const questionModal = (data) => {
  editModal.value = !editModal.value
  if(data.name === "delete"){
    isDelete.value = true
    isEdit.value = false
    
    if(data.val){
      editId.value = data.val._id
    }
  }
  if(data.name === "edit"){
    isEdit.value = true
    isDelete.value = false
    
    if(data.val){
      editTitle.value = data.val.title
      editOptions.value = data.val.options
      editId.value = data.val._id
      editTypeId.value = data.val.type_id
    }
  }
}

const editQuestion = () => {
  const id = editId.value
  if(isDelete.value === true){
    store.dispatch("questions/deleteQuestion", id);
    isDelete.value = false
    isEdit.value = false
  }
  if(isEdit.value === true)
  store.dispatch("questions/editQuestions", { 
    options:editOptions.value, 
    title:editTitle.value,
    _id:id,
    type_id:editTypeId.value
  })
  isEdit.value = false
  isDelete.value = false
}

const AddQuestion = (id) => {
  store.dispatch("questions/setQuestionId", id)
  router.push({ name: "addQuestion" })
}

</script>

<style scoped>
.corrects{
  display: flex;
}

.corrects p:first-child::after{
  content: ",";
  margin-right: 8px;
}

.question-single__type{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-form{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.el-form-item{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.el-dialog__header{
  display: flex;
  justify-content: space-between;
}

</style>
