<template>
  <v-row>

    <v-col cols="12">
      <v-dialog persistent :overlay="false" max-width="500px" v-model="dialog">

        <template #activator="{ on }">
          <v-btn color="success" v-on="on" class="text-none">Crear tarea</v-btn>
        </template>

        <v-card>
          <v-card-title primary-title>
            <span v-if="editing == false">
              Crear tarea
            </span>
            <span v-else>
              Actualizar tarea
            </span>
            <v-spacer></v-spacer>
            <v-icon @click="dialog = false">mdi-close</v-icon>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <v-combobox v-model="myTask.subject" :items="subjects" label="Materia" item-text="name"
                    item-value="id"></v-combobox>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Descripción" v-model="myTask.description"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-menu ref="menuDate" v-model="menuDate" :close-on-content-click="false"
                    :return-value.sync="myTask.due_date" offset-y min-width="auto">
                    <template #activator="{ on, attrs }">
                      <v-text-field v-model="myTask.due_date" label="Fecha de vencimiento" prepend-icon="mdi-calendar"
                        readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="myTask.due_date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" class="text-none" @click="menuDate = false">
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" class="text-none" @click="$refs.menuDate.save(myTask.due_date)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-checkbox label="Es pública?" v-model="myTask.is_public"></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <span v-if="editing">
                    <v-btn color="success" class="text-none" @click="updateTask" :loading="loading">Actualizar
                      tarea</v-btn>
                  </span>
                  <span v-else>
                    <v-btn color="success" class="text-none" @click="saveTask" :loading="loading">Guardar tarea</v-btn>
                  </span>


                </v-col>
              </v-row>

            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>

    <v-col cols="12">
      <v-data-table :headers="headers" :items="tasks" class="elevation-1" :loading="loading">
        <template #item.subject="{ item }">
        {{ item.subject.name }}
        </template>
        <template #item.actions="{ item }">
          <v-icon small @click="loadTaskToUpdate(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteTask(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

    </v-col>



  </v-row>
</template>
myTask
<script lang="ts">
import { Task } from '../assets/models/Task'
import { Subject } from '../assets/models/Subject';
export default {
  layout: "default-student",
  beforeMount() {
    this.loadTasks()
    this.loadSubjects()
  },
  data() {
    return {
      loading: false,
      dialog: false,
      editing: false,
      menuDate: false,
      headers: [
        { text: "Id", value: "id", },
        { text: "Materia", value: "subject", },
        { text: "Descripción", value: "description", },
        { text: "Fecha", value: "due_date", },
        { text: "Activa", value: "is_active", },
        { text: "Pública", value: "is_public", },
        { text: "Acciones", value: "actions", },
      ],
      myTask: {
        description: "",
        due_date: "",
        subject: "",
        is_active: true,
        is_public: false
      },
      tasks: [
      ],
      subjects: []
    }

  },
  methods: {
    loadTasks() {
      const url = "http://localhost:3001/tasks"
      this.loading = true
      this.$axios.get(url).then(response => {
        this.tasks = response.data
      }).catch(error => {
        this.$swal.fire({
          title: 'Error!',
          text: 'Ha ocurrido un error.',
          icon: 'error',
        })
      }).finally(() => {
        this.loading = false
      })
    },

    loadSubjects() {
      const url = "http://localhost:3001/subjects"
      this.$axios.get(url).then(response => {
        this.subjects = response.data
      }).catch(error => {
        console.log(error);

      })
    },
    clearMyTask() {
      this.myTask = {
        description: "",
        due_date: "",
        subject: "",
        is_active: true,
        is_public: false
      }
    },
    saveTask() {
      const url = "http://localhost:3001/tasks"
      this.loading = true
      this.$axios.post(url, this.myTask).then(response => {
        this.clearMyTask()
        this.$swal.fire({
          icon: 'success',
          title: 'Tarea creada',
          text: `La tarea ${this.myTask.description} fue creada exitosamente.`
        })
        this.dialog = false
        this.loadTasks()
      }).catch(error => {
        this.$swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          text: 'La tarea no fue creada'
        })
        console.log(error);

      }).finally(() => {
        this.loading = false
      })
    },

    loadTaskToUpdate(task: Task) {
      this.editing = true;
      this.dialog = true;
      this.myTask = { ...task } // Crear una nueva instancia del objeto

    },
    updateTask() {
      const url = `http://localhost:3001/tasks/${this.myTask.id}`
      this.loading = true
      this.$axios.put(url, this.myTask).then(response => {
        this.clearMyTask()
        this.$swal.fire({
          icon: 'success',
          title: 'Tarea actualiza',
          text: 'La tarea fue actualizada exitosamente'
        })
        this.loadTasks()
        this.dialog = false
      }).catch(error => {
        this.$swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          text: 'La tarea no fue borrada'
        })
      }).finally(() => {
        this.loading = false
      })
    },
    deleteTask(task: Task) {
      this.$swal.fire({
        title: `¿Seguro de eliminar la tarea ${task.description}?`,
        text: "La tarea se eliminará y no se puede recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
      }).then((result:any) => {
        if (result.isConfirmed) {
          const url = `http://localhost:3001/tasks/${task.id}`
          this.loading = true
          this.$axios.delete(url).then(response => {
            this.$swal.fire({
              icon: 'success',
              title: 'Tarea eliminada',
              text: `La tarea ${task.description} se ha eliminado.`,
            })
            this.loadTasks()
          }).catch(error => {
            this.$swal.fire({
              title: 'Error!',
              text: 'Ha ocurrido un error.',
              icon: 'error',
            })
          }).finally(() => {
            this.loading = false
          })
        }
      })

    }
  }
}

</script>

<style></style>