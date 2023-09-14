<template>
    <div>
        <v-dialog v-model="openDialog" width="80%">
            <v-card>
                <v-card-item>
                    <v-card-title>Edición de tarea {{ editingTask.name }}</v-card-title>
                </v-card-item>
                <v-card-text>
                    <form action="javascript:void(0)" @submit="saveTask">

                        <v-text-field label="Nombre" v-model="editingTask.name" required placeholder="Ingrese su nombre" />

                        <v-text-field label="Correo" v-model="editingTask.email" type="email"
                            placeholder="Ingrese su correo" />

                        <v-textarea label="Descripción" v-model="editingTask.description" cols="10" rows="3"></v-textarea>

                        <v-checkbox v-model="editingTask.conditions">
                            <template v-slot:label>
                                <a href="http://google.com" target="_blank">Acepta terminos y condiciones</a>
                            </template>
                        </v-checkbox>

                        <label>Tipo de tarea</label>
                        <v-radio-group v-model="editingTask.type">
                            <v-radio label="Actividad" value="typeA"></v-radio>
                            <v-radio label="Tarea" value="typeB"></v-radio>
                        </v-radio-group>

                        <v-select @change="updatePeriod()" label="Semestre" v-model="editingTask.period"
                            :items="['Semestre 1', 'Semestre 2', 'Semestre 3']"></v-select>


                        <v-btn type="submit">Enviar</v-btn>

                    </form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="openDialog = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>

const props = defineProps({
    dialog: {
        type: Boolean,
        required: true
    },
    task: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update'])

onBeforeMount(() => {
    editingTask.value = props.task
    openDialog.value = props.dialog
})


import axios from "axios";
// Variables
const editingTask = ref({})
const openDialog = ref(false)

const saveTask = async () => {
    const url = `http://localhost:3001/tasks/${editingTask.value.id}`
    const result = await axios.put(url, editingTask.value)
    console.log(result);
    openDialog.value = false
    emit('update', true)
}


</script>