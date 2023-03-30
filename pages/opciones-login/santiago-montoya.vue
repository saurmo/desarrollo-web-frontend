<template>
    <v-container fill-height>
      <v-row justify="center">
        <v-col cols="6">
          <v-card>
            <v-card-title>
              <h1>{{ title }}</h1>
            </v-card-title>
            <v-card-subtitle>
              <span v-html="subtitle"></span>
            </v-card-subtitle>
            <v-card-text>
              <v-form v-model="formAccount" ref="formAccount">
                <v-row>
                  <v-col>
                    <v-text-field label="correo" type="email" :rules="[rules.required, ...emailRules]"
                      v-model="cuenta.email" required></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field label="contraseña" v-model="cuenta.pass" :rules="[rules.required, ...passwordRules]"
                      :type="showPassword ? 'text' : 'password'" required
                      :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="changeVisibilityPassword()"></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="4">
                    <v-btn color="primary" class="text-none" @click="login">Iniciar sesión</v-btn>
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
        accounts:[],
        showPassword: false,
        formAccount: null,
        title: 'Inicia sesión',
        subtitle: 'Inicia sesión con tu cuenta',
        cuenta: {
          email: '',
          pass: '',
          polity: false,
        },
        // Reglas generales
        rules: {
          required: (v: String | null) => !!v || 'Este campo es obligatorio.',
        },
        //Reglas especificas
        emailRules: [(v: string) => /.+@.+\..+/.test(v) || 'El correo debe ser valido'],
        passwordRules: [
          (v: string) =>
            /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(v) ||
            'Debe tener may, min, 8-16',
        ],
      }
    },
  
    methods: {
      changeVisibilityPassword() {
        this.showPassword = !this.showPassword;
        console.log(this.showPassword)
      },
      login() {
        // Acceder al formulario por medio del atributo ref
        const refFormAccount: any = this.$refs['formAccount']
        //   Activar la validacion de campos
        if (refFormAccount) {
          const formIsValid = refFormAccount.validate()
          if (formIsValid) {
            console.log('formIsValid', formIsValid)
            const url = "http://localhost:3002/cuentas"
            this.$axios.get(url).then((response) => {
                const datos = response.data
                const encontrar = datos.find(account => account.email == this.cuenta.email && account.pass==this.cuenta.pass)
                encontrar ? window.open('/',"_self") : alert(' Verifique que todo esté correcto por favor');
            }).catch((error) => {
              console.log("Ha ocurrido un error", error)
            }).finally(() => {
              console.log("Sesión iniciada");
            })
          } else {
            alert('Formulario no valido')
          }
        }
        console.log('Hello world', this.cuenta)
      },
    },
  }
  </script>