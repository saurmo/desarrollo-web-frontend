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
const url_api = "http://localhost:3001/users/";

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
    async login() {
      if (this.$refs.formLogin.validate()) {
        //llamado a la api
        let response = await this.$axios.get(url_api);
        let users = response.data;
        let findUser = users.find((x) => {
          return x.email === this.user.email && x.password === this.user.password;
        });
        if (findUser) {
          this.$router.push("home");
        } else {
          this.$swal.fire({
            type: "error",
            title: "Oops...",
            text: "El correo o la contraseña son incorrectos.",
            allowEscapeKey: false,
            allowOutsideClick: false,
          });
        }
      } else {
        this.$swal.fire({
          type: "warning",
          title: "Formulario incompleto.",
          text: "Hay campos que deben ser diligenciados.",
        });
      }
    },
  },
};
</script>

<style></style>
