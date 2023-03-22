<template>
  <v-row>

    <v-col cols="12">
      <v-dialog persistent :overlay="false" max-width="500px" v-model="dialog">

        <template #activator="{ on }">
          <v-btn color="success" v-on="on">Crear tarea</v-btn>
        </template>
        <v-card>
          <v-card-title primary-title>
            Crear tarea
            <v-spacer></v-spacer>
            <v-icon @click="dialog = false">mdi-close</v-icon>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Nombre" v-model="myTask.subject" counter="20"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Descripción" v-model="myTask.description"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-menu ref="menuDate" v-model="menuDate" :close-on-content-click="false"
                    :return-value.sync="myTask.due_date" offset-y min-width="auto">
                    <template #activator="{ on, attrs }">
                      <v-text-field v-model="myTask.due_date" label="Picker in menu" prepend-icon="mdi-calendar" readonly
                        v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="myTask.due_date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menuDate = false">
                        Cancel
                      </v-btn>
                      <v-btn text color="primary" @click="$refs.menuDate.save(myTask.due_date)">
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-checkbox label="Es pública?" v-model="myTask.is_public"></v-checkbox>
                </v-col>
                <v-col cols="12">
                  <v-btn color="success" @click="saveTask">Guardar tarea</v-btn>

                </v-col>
              </v-row>

            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>

    <v-col cols="12">
      <v-data-table :headers="headers" :items="tasks" class="elevation-1">
        <template #item.actions="{ item }">
          <v-icon small @click="loadTaskToUpdate(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteTask(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>

    </v-col>



  </v-row>
</template>

<script lang="ts">
export default {
  beforeMount() {
    this.loadTasks()
  },
  data() {
    return {
      dialog: false,
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
        {
          id: 1,
          description: "Seguimiento 3",
          due_date: "31-marzo",
          subject: "Dllo Web",
          is_active: true,
          is_public: false
        }
      ]
    }

  },
  methods: {
    loadTasks() {
      const url = "http://localhost:3001/tasks"
      this.$axios.get(url).then(response => {
        this.tasks = response.data
      }).catch(error => {
        console.log(error);

      })
    },
    saveTask() {
      const url = "http://localhost:3001/tasks"
      this.$axios.post(url, this.myTask).then(response => {
        console.log(response);
        this.dialog = false
        this.loadTasks()
      }).catch(error => {
        console.log(error);

      })
    },
    loadTaskToUpdate(task) {
      alert(task.description)
    },
    deleteTask(task) {
      alert(task.description)

    }
  }
}

</script>

<style></style>