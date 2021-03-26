<template>
  <v-card>
    <v-card-text>
      <span :class="color">
        Ingreso a tienda el olimpo
      </span>
      <v-form ref="formLogin" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="user.email"
              :rules="emailRules"
              label="Correo"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="user.password"
              :rules="fieldRules"
              label="Clave"
              type="password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <center>
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
                Ingresar
              </v-btn>
            </center>
          </v-col>
        </v-row>
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
      try {
        if (this.$refs.formLogin.validate()) {
          //llamado a la api
          let response = await this.$axios.get(url_api);
          let users = response.data;
          let findUser = users.find((x) => {
            return x.email === this.user.email && x.password === this.user.password;
          });
          if (findUser) {
            let rol = findUser.rol;
            delete findUser.password;
            localStorage.setItem("user-in", JSON.stringify(findUser));
            if (rol == 3) {
              this.$router.push("home-clientes");
            } else if (rol == 1 || rol == 2) {
              this.$router.push("home");
            } else {
            }
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
            title: "El rol asginado esta en proceso de construcción.",
            text: "",
          });
        }
      } catch (error) {
        console.log(error);
        this.$swal.fire({
          type: "error",
          title: "Error al iniciar sesión.",
          text: "",
        });
      }
    },
  },
};
</script>

<style></style>
