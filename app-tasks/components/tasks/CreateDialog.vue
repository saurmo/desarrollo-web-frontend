<template>
    <div>
        <v-btn color="primary" @click="dialog = true">
            Crear tarea
        </v-btn>

        <v-dialog v-model="dialog" width="80%">
            <v-card>
                <v-card-item>
                    <v-card-title>Gestión de tareas</v-card-title>
                    <v-card-subtitle>Formulario para la gestión de tareas de los estudiantes.</v-card-subtitle>
                </v-card-item>
                <v-card-text>
                    <form action="javascript:void(0)" @submit="saveTask">

                        <v-text-field label="Nombre" v-model="task.name" required placeholder="Ingrese su nombre" />

                        <v-text-field label="Correo" v-model="task.email" type="email" placeholder="Ingrese su correo" />

                        <v-textarea label="Descripción" v-model="task.description" cols="10" rows="3"></v-textarea>

                        <v-checkbox v-model="task.conditions">
                            <template v-slot:label>
                                <a href="http://google.com" target="_blank">Acepta terminos y condiciones</a>
                            </template>
                        </v-checkbox>

                        <label>Tipo de tarea</label>
                        <v-radio-group v-model="task.type">
                            <v-radio label="Actividad" value="typeA"></v-radio>
                            <v-radio label="Tarea" value="typeB"></v-radio>
                        </v-radio-group>

                        <v-select @change="updatePeriod()" label="Semestre" v-model="task.period"
                            :items="['Semestre 1', 'Semestre 2', 'Semestre 3']"></v-select>


                        <v-btn type="submit">Enviar</v-btn>

                    </form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import axios from "axios";
// Variables
const task = ref({ conditions: true, period: '1' })
const dialog = ref(false)

const saveTask = async () => {
  const result = await axios.post("http://localhost:3001/tasks", task.value)
  console.log(result);
}


</script>