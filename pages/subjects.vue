<template>
    <v-row>
        <v-col cols="12">
            <v-dialog persistent :overlay="false" max-width="500px" v-model="dialog">

                <template #activator="{ on }">
                    <v-btn color="success" v-on="on">Crear materia</v-btn>
                </template>
                <v-card>
                    <v-card-title primary-title>
                        <span v-if="!editing"> Crear materia</span>
                        <span v-else> Actualizar materia </span>
                        <v-spacer></v-spacer>
                        <v-icon @click="dialog = false">mdi-close</v-icon>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field label="Nombre" v-model="mySubject.name" counter="20"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field label="Descripción" v-model="mySubject.description"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <span v-if="editing">
                                        <v-btn color="success" @click="updateSubject" :loading="loading">Actualizar
                                            materia</v-btn>
                                    </span>
                                    <span v-else>
                                        <v-btn color="success" @click="saveSubject" :loading="loading">Crear materia</v-btn>
                                    </span>
                                </v-col>
                            </v-row>

                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-col>

        <v-col cols="12">
            <v-data-table :headers="headers" :items="subjects" class="elevation-1" :loading="loading">
                <template #item.actions="{ item }">
                    <v-icon small @click="loadSubjectToUpdate(item)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteSubject(item)">mdi-delete</v-icon>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import config from '~/assets/config'
import { Subject } from '../assets/models/Subject'
export default {
    beforeMount() {
        this.loadSubjects()
    },
    data() {
        return {
            loading: false,
            dialog: false,
            menuDate: false,
            editing: false,
            headers: [
                { text: "Id", value: "id", },
                { text: "Materia", value: "name", },
                { text: "Descripción", value: "description", },
                { text: "Acciones", value: "actions", },
            ],
            mySubject: {
                name:"",
                description:"",
            },
            subjects: []
        }

    },
    methods: {
        loadSubjects() {
            const url = `${config.API_URL}/subjects` 
            this.$axios.get(url).then(response => {
                this.subjects = response.data.info
            }).catch(error => {
                console.log(error);

            })
        },

        clearmySubject() {
            this.mySubject = {
                name: "",
                description: "",
            }
        },
        saveSubject() {
            const url = `${config.API_URL}/subjects`
            this.loading = true
            this.$axios.post(url, this.mySubject).then(response => {
                this.clearmySubject()
                this.$swal.fire({
                    icon: 'success',
                    title: 'materia creada',
                    text: `La materia ${this.mySubject.description} fue creada exitosamente.`
                })
                console.log(response);
                this.dialog = false
                this.loadSubjects()
            }).catch(error => {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'La materia no fue creada'
                })
                console.log(error);

            }).finally(() => {
                this.loading = false
            })
        },

        loadSubjectToUpdate(subject: Subject) {
            this.editing = true;
            this.dialog = true;
            this.mySubject = { ...subject }
        },
        updateSubject() {
            const url = `${config.API_URL}/subjects/${this.mySubject.id}`
            this.loading = true
            this.$axios.put(url, this.mySubject).then(response => {
                this.clearmySubject()
                this.$swal.fire({
                    icon: 'success',
                    title: 'Materia editada',
                    text: 'La materia fue editada exitosamente'
                })
                this.dialog = false
                this.loadSubjects()
            }).catch(error => {
                this.$swal.fire({
                    icon: 'error',
                    title: 'La materia NO fue editada',
                    text: 'Ocurrió un error al editar la materia'
                })
            }).finally(() => {
                this.loading = false
                this.editing = false
            })
        },
        deleteSubject(subject: Subject) {

            this.$swal.fire({
                title: '¿Seguro que quieres eliminar la materia? ',
                text: "Esto no se puede revertir",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar materia'
            }).then((result) => {
                if (result.isConfirmed) {
                    const url = `${config.API_URL}/subjects/${subject.id}`
                    this.loading = true
                    this.$axios.delete(url).then(response => {
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Materia borrada',
                            text: 'La materia fue borrada exitosamente'
                        })
                        this.loadSubjects()
                    }).catch(error => {
                        this.$swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'La materia no fue borrada'
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