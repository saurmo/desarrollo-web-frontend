<template>
  <div>
    <v-card flat>
      <v-card-actions>
        <h1>Creación de usuario</h1>
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

        <v-select
          v-model="user.rol"
          :items="roles"
          label="Rol"
          item-value="id"
          item-text="name"
        ></v-select>

        <v-btn color="success" @click="saveUser()">Crear usuario</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
const url_api = "http://localhost:3001/users/";
const url_api_roles = "http://localhost:3001/roles/";
export default {
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
    roles: [
      { id: 1, nombre: "Administrador" },
      { id: 2, nombre: "Empleado" },
      { id: 3, nombre: "Cliente" },
      { id: 4, nombre: "Invitado" },
    ],
  }),
  beforeMount() {
    this.getRoles();
  },

  methods: {
    async getRoles() {
      try {
        let response = await this.$axios.get(url_api_roles);
        this.roles = response.data.content;
      } catch (error) {
        this.roles = [];
        console.error(error);
      }
    },

    /**
     * Enviar una solicitud (Request) en un método update
     * Para modificar el usuario
     */
    async saveUser() {
      if (this.$refs.formUser.validate()) {
        // Crear un nuevo objeto con la info del usuario
        let user = Object.assign({}, this.user);
        let response = await this.$axios.post(url_api, user);
        this.$swal.fire({
          type: "success",
          title: "Operación exitosa.",
          text: "El item se guardo correctamente.",
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
