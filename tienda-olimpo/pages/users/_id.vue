<template>
  <div>
    <v-card flat>
      <v-card-actions>
        <h1>Edición de usuario</h1>
        <v-spacer></v-spacer>
        <v-btn class="text-none" to="/users">Ver lista de usuarios</v-btn>
      </v-card-actions>

      <v-form ref="formUser" v-model="valid" lazy-validation>
        <v-text-field
          v-model="user.id"
          label="Identificación"
          :rules="rules.required"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.name"
          :rules="rules.required"
          label="Nombre"
          required
        ></v-text-field>
        <v-text-field
          v-model="user.email"
          :rules="emailRules"
          label="Correo"
          required
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          :rules="rules.required"
          label="Contraseña"
          type="password"
          required
        ></v-text-field>

        <v-btn color="success" @click="updateUser()">Modificar usuario</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
const url_api = "http://localhost:3001/users/";
export default {
  async asyncData({ params }) {
    let id_user = params.id;
    return { id_user };
  },

  data: () => ({
    valid: true,
    user: {},
    emailRules: [
      (v) => !!v || "El correo es obligatorio",
      (v) => /.+@.+\..+/.test(v) || "El correo no es valido",
    ],
    rules: {
      required: [(v) => !!v || "El campo es obligatorio"],
    },
  }),
  beforeMount() {
    this.getUser();
  },

  methods: {
    /**
     * Enviar una solicitud (Request) en un método get
     * Para obtener un solo usuario dado el código
     */
    async getUser() {
      try {
        //
        let response = await this.$axios.get(url_api + this.id_user);
        this.user = response.data;
      } catch (error) {
        this.$swal
          .fire({
            type: "error",
            title: "Oops...",
            text: "El usuario no existe o hubo un error cargandolo.",
            allowEscapeKey: false,
            allowOutsideClick: false,
          })
          .then((result) => {
            if (result.value) {
              this.$router.push("/users");
            }
          });
      }
    },

    /**
     * Enviar una solicitud (Request) en un método update
     * Para modificar el usuario
     */
    async updateUser() {
      if (this.$refs.formUser.validate()) {
        // Crear un nuevo objeto con la info del usuario
        let user = Object.assign({}, this.user);
        let response = await this.$axios.put(url_api + this.id_user, user);
        this.$swal.fire({
          type: "success",
          title: "Operación exitosa.",
          text: "El item se actualizo correctamente.",
        });
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
