<template>
  <v-card>
    <v-card-title primary-title> Usuarios </v-card-title>
    <v-card-text> Formulario para crear usuarios </v-card-text>
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
    };
  },
  methods: {
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
  },
};
</script>
