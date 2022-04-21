<template>
  <b-container>
    <h1>Usuarios</h1>

    <!-- Creacion del formulario -->
    <b-form @submit="onSubmit" @reset="onReset">
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

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

    <b-table striped hover :items="users"></b-table>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      users: [],
      user: {},
      universidades: ["Universidad de Medellin", "Universidad de Antioquia"],
    };
  },
  beforeMount() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      // Cargar los usuarios de la base de datos
      const url = "http://localhost:3001/api/v1/usuarios";
      let { data } = await this.$axios.get(url);
      console.log(data);
      if (data.ok === true) {
        this.users = data.info;
      } else {
        alert("No se cargaron los usuarios");
      }
    },
    async onSubmit(event) {
      event.preventDefault();

      const url = "http://localhost:3001/api/v1/usuarios";
      let { data } = await this.$axios.post(url, this.user);
      console.log(data);
      this.loadUsers();
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

