<template>
  <b-container>
    <h1>Pedidos</h1>

    <!-- Creacion del formulario -->
    <!-- <b-form @submit="createUser" @reset="resetForm">
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="user.correo"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="user.nombre"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="University:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="user.universidad"
          :options="universidades"
          required
        ></b-form-select>
      </b-form-group>
      <br />
     
      <b-button type="submit" variant="primary" v-if="!editing"
        >Crear usuario</b-button
      >
      <b-button variant="success" v-else @click="updateUser"
        >Guardar usuario</b-button
      >
      <b-button type="reset" variant="danger">Limpiar formulario</b-button>
    </b-form> -->
<!-- 
    <b-table striped hover :items="users" :fields="headers">
      <template #cell(show_details)="row">
        <b-button size="sm" @click="loadUser(row)" class="mr-2">
          Modificar usuario
        </b-button>
        <b-button size="sm" @click="deleteUser(row)" class="mr-2">
          Eliminar usuario
        </b-button>
      </template>
    </b-table> -->

    <alerts :message="message" />
  </b-container>
</template>
<script>
import alerts from "~/components/alerts.vue";
export default {
  layout:"admin",
  components: { alerts },

  // Información a utilizar
  data() {
    return {
      headers: ["correo", "nombre", "universidad", "show_details"],
      users: [],
      user: {},
      editing: false,
      universidades: ["Universidad de Medellin", "Universidad de Antioquia"],
      message: "",
      opcionesAxios: null,
    };
  },

  // Método antes de que cargue la página
  beforeMount() {
     this.loadHeader();
    this.loadUsers();
   
  },

  // Métodos
  methods: {
    loadHeader() {
      let token = localStorage.getItem("token");
      this.opcionesAxios = { headers: { token } };
    },
    async loadUsers() {
      
      // Cargar los usuarios de la base de datos
      const url = "http://localhost:3001/api/v1/usuarios";
      let { data } = await this.$axios.get(url, this.opcionesAxios);
      console.log(data);
      if (data.ok === true) {
        this.users = data.info;
      } else {
        alert("No se cargaron los usuarios");
      }
    },

    async createUser(event) {
      event.preventDefault();
      const url = "http://localhost:3001/api/v1/usuarios";
      let { data } = await this.$axios.post(url, this.user, this.opcionesAxios);
      this.message = data.message;
      this.loadUsers();
    },

    async updateUser(event) {
      event.preventDefault();
      const url = `http://localhost:3001/api/v1/usuarios/${this.user._id}`;
      let { data } = await this.$axios.put(url, this.user, this.opcionesAxios);
      console.log(data);
      this.$swal.fire("Actualizado.", data.message, "success");
      this.resetForm();
      this.loadUsers();
    },

    loadUser(user) {
      this.editing = true;
      this.user = Object.assign({}, user.item);
    },

    resetForm() {
      this.editing = false;
      this.user = {};
    },

    async deleteUser({ item }) {
      this.$swal
        .fire({
          title: "¿Esta seguro de eliminar?",
          text: "No se puede recuperar despúes de la eliminación.",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
          cancelButtonText: "Cancelar",
        })
        .then(async (result) => {
          if (result.value == true) {
            const url = `http://localhost:3001/api/v1/usuarios/${item._id}`;
            let { data } = await this.$axios.delete(url, this.opcionesAxios);
            this.loadUsers();
            this.$swal.fire("Eliminado!", data.message, "success");
          }
        });
    },
  },
};
</script>

