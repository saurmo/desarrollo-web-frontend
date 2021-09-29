<template>
  <v-card>
    <v-card-title primary-title> Usuarios </v-card-title>
    <v-card-text>Formulario para crear usuarios </v-card-text>
    <v-card-text>
      <v-form>
        <v-text-field
          name="id"
          label="Nro de Identificación"
          id="id"
          v-model="usuario.id"
        ></v-text-field>
        <v-row>
          <v-col sm="12" md="6">
            <v-text-field
              name="nombre"
              label="Nombre"
              id="nombre"
              v-model="usuario.nombre"
            ></v-text-field>
          </v-col>
          <v-col sm="12" md="6">
            <v-text-field
              name="apellidos"
              label="Apellidos"
              id="apellidos"
              v-model="usuario.apellidos"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              type="password"
              name="clave"
              label="Contraseña"
              id="clave"
              v-model="usuario.clave"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              type="password"
              name="clave"
              label="Repetir Contraseña"
              id="repetir_clave"
              v-model="usuario.repetir_clave"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <br />
        <v-select
          :items="roles"
          v-model="usuario.rol"
          label="Rol"
          item-text="nombre"
          item-value="id"
        ></v-select>

        <br />
        <!-- <v-select :items="roles" label="Rol" item-text="nombre" id="rol" item-value="id"></v-select> -->
        <v-btn color="success" @click="crearUsuario()">Crear usuario</v-btn>
      </v-form>
    </v-card-text>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="5"
        class="elevation-1"
      >
        <template slot="item.actions" slot-scope="{ item }">
          <v-icon small class="mr-2" @click="modificarUsuario(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="eliminarUsuario(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
      <!-- <br />
      <hr />
      <br />
      <table border="1" width="100%">
        <thead>
          <th v-for="header in headers" :key="header.name">
            {{ header.text }}
          </th>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td v-for="header in headers" :key="header.name">
              {{ user[header.value]}}
            </td>
          </tr>
        </tbody>
      </table> -->
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      usuario: {},
      roles: [
        { id: "0", nombre: "Administrador" },
        { id: "1", nombre: "Empleado" },
      ],
      headers: [
        { text: "Identificación", value: "id" },
        { text: "Nombre", value: "nombre" },
        { text: "Apellidos", value: "apellidos" },
        { text: "Rol", value: "rol" },
        { text: "Acciones", value: "actions" },
      ],
      users: [],
    };
  },
  beforeMount() {
    this.cargarPagina();
  },
  methods: {
    async cargarPagina() {
      await this.consultarUsuarios();
    },

    crearUsuario() {
      let url = "http://localhost:3001/usuarios";
      let token = localStorage.getItem("token");
      this.$axios
        .post(url, this.usuario, { headers: { token } })
        .then((response) => {
          console.log("Usuario guardado", response);
        })
        .catch((err) => {
          console.log("Error al guardar", err);
        });
    },

    async consultarUsuarios() {
      try {
        let url = "http://localhost:3001/usuarios";
        let token = localStorage.getItem("token");
        let { data } = await this.$axios.get(url, { headers: { token } });
        this.users = data.info;
      } catch (error) {
        console.log(error);
      }
    },

    async eliminarUsuario(user) {
      try {
        let response_swal = await this.$swal({
          title: "Esta seguro de eliminar el usuario?",
          text: "Esta acción no se puede revertir.",
          type: "warning",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Si, eliminarlo!",
        });
        if (response_swal.value == true) {
          let url = "http://localhost:3001/usuarios/" + user.id;
          let token = localStorage.getItem("token");
          let { data } = await this.$axios.delete(url, { headers: { token } });
          await this.consultarUsuarios();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
