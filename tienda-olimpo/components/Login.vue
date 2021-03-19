<template>
  <v-card>
    <v-card-text>
      <span :class="color">
        Ingresar a tienda el olimpo
      </span>
      <v-form ref="formLogin" v-model="valid" lazy-validation>
        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="Correo"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :rules="fieldRules"
          label="Clave"
          type="password"
          required
        ></v-text-field>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
          Ingresar
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "red--text",
    },
  },
  data: () => ({
    valid: true,
    user: {},
    fieldRules: [(v) => !!v || "La clave es obligatoria"],
    emailRules: [
      (v) => !!v || "El correo es obligatorio",
      (v) => /.+@.+\..+/.test(v) || "El correo no es valido",
    ],
  }),

  methods: {
    /**
     * Método post para realizar el login
     */
    login() {
      if (this.$refs.formLogin.validate()) {
        //llamado a la api
        this.$router.push("home");
      } else {
        console.log("Formulario incorrecto");
      }
    },
  },
};
</script>

<style></style>
