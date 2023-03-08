<template>
  <v-container fill-height>
    <v-row justify="center" style="border: 1px solid red">
      <v-col cols="8">
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
                  <v-text-field
                    label="Nombre"
                    v-model="account.firstname"
                    :rules="[rules.required, ...nameRules]"
                    required
                    counter="20"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Apellido"
                    v-model="account.lastname"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Correo"
                    type="email"
                    :rules="[rules.required, ...emailRules]"
                    v-model="account.email"
                    required
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Contraseña"
                    v-model="account.pass"
                    :rules="[rules.required, ...passwordRules]"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="start">
                <v-col cols="6">
                  <v-checkbox
                    label="Acepta términos y condiciones"
                    v-model="account.polity"
                    required
                    :rules="[rules.required]"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="4">
                  <v-btn
                    color="primary"
                    class="text-none"
                    @click="createAccount"
                    >Crear cuenta</v-btn
                  >
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
      formAccount: null,
      title: 'Crear cuenta',
      subtitle: 'Crea tu gratuitamente hasta el 30 de julio de 2023',
      account: {
        firstname: '',
        lastname: '',
        email: '',
        pass: '',
        polity: false,
      },
      // Reglas generales
      rules: {
        required: (v) => !!v || 'Este campo es obligatorio.',
      },
      //Reglas especificas
      nameRules: [
        (v) =>
          (v && v.length <= 20) ||
          'El nombre debe contener máximo 20 caracteres ',
      ],
      emailRules: [(v) => /.+@.+\..+/.test(v) || 'El correo debe ser valido'],
      passwordRules: [
        (v) =>
          /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(v) ||
          'Debe tener may, min, 8-16',
      ],
    }
  },

  methods: {
    createAccount() {
      // Acceder al formulario por medio del atributo ref
      const refFormAccount: any = this.$refs['formAccount']
      //   Activar la validacion de campos
      if (refFormAccount) {
        const formIsValid = refFormAccount.validate()
        if (formIsValid) {
          console.log('formIsValid', formIsValid)
        } else {
          alert('Formulario no valido')
        }
      }

      console.log('Hello world', this.account)
    },
  },
}
</script>