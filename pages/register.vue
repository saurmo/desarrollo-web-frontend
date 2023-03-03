<template>
    <v-container fill-height>
        <v-row justify="center" style="border:1px solid red;">
            <v-col cols="8">
                <v-card>
                    <v-card-title>
                        <h1>{{ title }}</h1>
                    </v-card-title>
                    <v-card-subtitle>
                        <span v-html="subtitle"></span>
                    </v-card-subtitle>
                    <v-card-text>
                        <v-form>
                            <v-row>
                                <v-col>
                                    <v-text-field label="Nombre" v-model="account.firstname"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field label="Apellido" v-model="account.lastname"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-text-field label="Correo" type="email" v-model="account.email"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field label="Contraseña" v-model="account.pass" type="password"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="start">
                                <v-col cols="6">
                                    <v-checkbox label="Acepta términos y condiciones" 
                                    v-model="account.polity"
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="4">
                                    <v-btn color="primary" class="text-none" @click="createAccount">Crear cuenta</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts">
export default {
    layout: 'blank',
    data() {
        return {
            title:"Crear cuenta",
            subtitle:"Crea tu gratuitamente hasta el 30 de julio de 2023",
            account:{
                firstname: "",
                lastname: "",
                email: "",
                pass: "",
                polity:false
            }
        }
    },

    methods: {

        createAccount() {
            console.log("Hello world", this.account);
        }
    }
}
</script>