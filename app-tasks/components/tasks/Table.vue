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
                        <v-btn icon="mdi-pencil" variant="text">
                        </v-btn>
                        <v-btn icon="mdi-delete-off" variant="text" @click="deleteTask(item)">
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </v-table>

    </div>
</template>
<script setup>
import axios from "axios";

const tasks = ref([])

onBeforeMount(() => {
    loadTasks()
})

const loadTasks = async () => {
    const url = "http://localhost:3001/tasks"
    const { data } = await axios.get(url)
    tasks.value = data
}
const deleteTask =async (item) => {
    const url = `http://localhost:3001/tasks/${item.id}`
    const { data } = await axios.delete(url)
   loadTasks()
}
</script>