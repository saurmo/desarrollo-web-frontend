<template>
    <div class="mt-3">

        <h3>Listado de tareas</h3>

        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        Nombre
                    </th>
                    <th class="text-left">
                        Descripción
                    </th>
                    <th class="text-left">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in tasks" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                        <v-btn icon="mdi-pencil" variant="text" @click="editTask(item)">
                        </v-btn>
                        <v-btn icon="mdi-delete-off" variant="text" @click="deleteTask(item)">
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <tasks-edit-dialog v-if="editingTask != null" :dialog="isEdit" :task="editingTask" @update="updateTask" />
    </div>
</template>
<script setup>
import axios from "axios";
import config from '../../config/default.json'
import { getHeaders } from "../../src/auth/jwt";
const tasks = ref([])
const isEdit = ref(false)
const editingTask = ref(null)

onBeforeMount(() => {
    
    loadTasks()
})



const loadTasks = async () => {
    const url = `${config.api_host}/tasks`
    const token = localStorage.getItem("token")
    const headers = getHeaders(token)
    const { data } = await axios.get(url, { headers })
    tasks.value = data.info
}
const deleteTask = async (item) => {
    const url = `${config.api_host}/tasks/${item.id}`
    const { data } = await axios.delete(url)
    loadTasks()
}
const editTask = async (item) => {
    isEdit.value = true
    editingTask.value = { ...item }
}

const updateTask = (isUpdated) => {
    isEdit.value = false
    editingTask.value = null
    loadTasks()
}
</script>           