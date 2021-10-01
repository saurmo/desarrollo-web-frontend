<template>
  <v-card>
    <v-card-title primary-title> Usuarios </v-card-title>
    <v-card-text>Formulario para crear usuarios </v-card-text>
    <v-card-text>
      <v-form ref="form_users">
        <v-text-field
          name="id"
          label="Nro de Identificación"
          id="id"
          v-model="usuario.id"
          :disabled="is_updating"
          :rules="requiredRule"
        ></v-text-field>
        <v-row>
          <v-col sm="12" md="6">
            <v-text-field
              name="nombre"
              label="Nombre"
              id="nombre"
              v-model="usuario.nombre"
              :rules="requiredRule"
            ></v-text-field>
          </v-col>
          <v-col sm="12" md="6">
            <v-text-field
              name="apellidos"
              label="Apellidos"
              id="apellidos"
              v-model="usuario.apellidos"
              :rules="requiredRule"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-if="!is_updating">
          <v-col cols="6">
            <v-text-field
              :type="show_password ? 'text' : 'password'"
              name="clave"
              label="Contraseña"
              id="clave"
              v-model="usuario.clave"
              :rules="requiredRule"
              :append-icon="show_password ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="show_password = !show_password"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :type="show_repeat_password ? 'text' : 'password'"
              name="clave"
              label="Repetir Contraseña"
              id="repetir_clave"
              v-model="usuario.repetir_clave"
              :rules="repetPassword"
              :append-icon="show_repeat_password ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="show_repeat_password = !show_repeat_password"
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
          :rules="requiredRule"
        ></v-select>

        <br />
        <!-- <v-select :items="roles" label="Rol" item-text="nombre" id="rol" item-value="id"></v-select> -->
        <v-btn
          :loading="loading"
          color="success"
          @click="crearUsuario()"
          v-if="!is_updating"
        >
          Crear usuario
        </v-btn>
        <v-btn
          color="info"
          :loading="loading"
          @click="guardarUsuarioModificado()"
          v-if="is_updating"
        >
          Guardar usuario
        </v-btn>
        <v-btn
          color="error"
          @click="
            is_updating = false;
            usuario = {};
          "
          v-if="is_updating"
        >
          Cancelar
        </v-btn>
      </v-form>
    </v-card-text>
    <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
    <v-card-text v-if="!is_updating">
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
import config from "../assets/js/config";
export default {
  data() {
    return {
      usuario: {},
      roles: [
        { id: 2, nombre: "Administrador" },
        { id: 1, nombre: "Empleado" },
      ],
      headers: [
        { text: "Identificación", value: "id" },
        { text: "Nombre", value: "nombre" },
        { text: "Apellidos", value: "apellidos" },
        { text: "Rol", value: "rol" },
        { text: "Acciones", value: "actions" },
      ],
      users: [],
      is_updating: false,
      requiredRule: [(v) => !!v || "El campo es obligatorio"],
      repetPassword: [
        (v) => !!v || "El campo es obligatorio",
        (v) => v === this.usuario.clave || "Las contraseñas no coinciden",
      ],
      show_password: false,
      show_repeat_password: false,
      loading: false,
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
      if (!this.$refs.form_users.validate()) {
        return;
      }

      let url =  config.URL_API + "/usuarios";
      let token = localStorage.getItem("token");
      this.loading = true;
      this.$axios
        .post(url, this.usuario, { headers: { token } })
        .then((response) => {
          this.$swal.fire(
            "Creación ejecutada.",
            "Usuario creado correctamente!",
            "success"
          );
          this.loading = false;
          this.consultarUsuarios();
        })
        .catch((err) => {
          this.loading = false;
          this.$swal.fire(
            "Creación NO ejecutada.",
            "El usuario no se ha creado!",
            "error"
          );
          console.log("Error al guardar", err);
        });
    },

    async consultarUsuarios() {
      try {
        let url =  config.URL_API + "/usuarios";
        let token = localStorage.getItem("token");
        let { data } = await this.$axios.get(url, { headers: { token } });
        this.users = data.info;
      } catch (error) {
        this.$swal.fire(
          "Operación NO ejecutada.",
          "No se consultaron los usuarios.",
          "error"
        );
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
          let url =  config.URL_API + "/usuarios/" + user.id;
          let token = localStorage.getItem("token");
          let { data } = await this.$axios.delete(url, { headers: { token } });
          await this.consultarUsuarios();
        }
      } catch (error) {
        this.$swal.fire(
          "Operación NO ejecutada.",
          "No se elimino el usuario.",
          "error"
        );
      }
    },

    modificarUsuario(user) {
      this.is_updating = true;
      this.usuario = user;
    },

    async guardarUsuarioModificado() {
      try {
        if (!this.$refs.form_users.validate()) {
          return;
        }
        let url =  config.URL_API + "/usuarios";
        let token = localStorage.getItem("token");
        let response = await this.$axios.put(url, this.usuario, {
          headers: { token },
        });
        this.$swal.fire(
          "Modificación ejecutada.",
          "Usuario modificado correctamente!",
          "success"
        );
        this.usuario = {};
        this.is_updating = false;
      } catch (err) {
        this.$swal.fire(
          "Operación NO ejecutada.",
          "No se modifico el usuario.",
          "error"
        );
        console.log("Error al guardar", err);
      }
    },
  },
};
</script>
