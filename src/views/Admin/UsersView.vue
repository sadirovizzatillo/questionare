<template>
    <header class="question-single__type">
        <h3>All Users</h3>
        <el-button type="primary" @click="AddQuestion($route.params.id)">Add Question</el-button>
    </header>
    
    <el-table :data="allUsers" style="width: 100%">
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
                <div>{{ scope.row.name }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Age">
            <template #default="scope">
                <div>{{ scope.row.age }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Username">
            <template #default="scope">
                <div>{{ scope.row.username }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Level">
            <template #default="scope">
                <div>{{ scope.row.isAdmin === true ? 'admin' : 'oddiy' }}</div>
            </template>
        </el-table-column>
        <el-table-column label="Correct Answer">
            <template #default="scope">
                <div class="corrects">
                    <p v-for="(answer, id) in scope.row?.answer" :key="id">{{ answer ?? 'javob' }}</p>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Operations" >
            <template #default="scope">
                <el-button size="small" @click="userModal({name:'edit', val:scope.row})"
                >Edit</el-button
                >
                <el-button
                size="small"
                type="danger"
                @click="userModal({name:'delete', val:scope.row})"
                >Delete</el-button
                >
            </template>
        </el-table-column>
    </el-table>
    
    <el-dialog
    v-model="editModal"
    title="Edit User"
    width="40%"
    >
    <span v-if="isEdit">
        <el-form>
            <el-form-item label="Edit Title">
                <el-input type="text" placeholder="Name" v-model="editName"></el-input>
            </el-form-item>
            <el-form-item label="Edit Username">
                <el-input type="text" placeholder="Options" v-model="editUsername"></el-input>
            </el-form-item>
            <el-form-item label="Edit Level">
                <el-select v-model="adminValue" placeholder="Select">
                    <el-option
                    v-for="item in adminOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
                </el-select>
            </el-form-item>
        </el-form>
        
    </span>
    <span v-if="isDelete">Do you really want to delete this user?</span>
    <template #footer>
        <span class="dialog-footer" v-if="isEdit">
            <el-button @click="userModal">Cancel</el-button>
            <el-button type="primary" @click="editUser">
                Edit
            </el-button>
        </span>

        <span class="dialog-footer" v-if="isDelete">
            <el-button @click="userModal">Cancel</el-button>
            <el-button type="primary" @click="deleteUser">
                Delete
            </el-button>
        </span>
    </template>
</el-dialog>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore()
const isEdit = ref(false)
const editModal = ref(false)
const editUsername = ref(null)
const adminValue = ref(Boolean)
const editName = ref(null)
const isDelete = ref(false)
const userId = ref(null)
onMounted(() => {
    store.dispatch("users/getAllUsers")
})
const adminOptions = [
  {
    value: true,
    label: 'Admin',
  },
  {
    value: false,
    label: 'Oddiy',
  }
]

const allUsers = computed(() => {
    return store.state.users?.users
})

const userModal = (data) => {
    editModal.value = !editModal.value
    if(data.name === 'edit'){
        isDelete.value = false
        isEdit.value = true
        editUsername.value = data.val.username
        editName.value = data.val.name
        adminValue.value = data.val.isAdmin
        userId.value = data.val._id
    }

    if(data.name === 'delete'){
        isEdit.value = false
        isDelete.value = true
        userId.value = data.val._id
    }
}

const deleteUser = () => {
    editModal.value = !editModal.value
    const id = userId.value
    store.dispatch("users/deleteUser", id)
}
const editUser = () => {
    editModal.value = !editModal.value
    const form = {
        username: editUsername.value,
        name:editName.value,
        isAdmin: adminValue.value,
        id: userId.value
    }
    store.dispatch("users/editUser", form)
}
</script>


<style scoped>
.el-form-item{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.el-form{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.question-single__type{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>