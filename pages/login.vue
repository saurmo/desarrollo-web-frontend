<template>
  <b-container>
    <center>
      <h1>Iniciar Sesión</h1>
    </center>

    <b-form @submit="login" class="login">
      <b-form-group
        label="Email:"
        label-for="inputEmail"
        description="Ingrese su correo."
      >
        <b-form-input
          id="inputEmail"
          v-model="credenciales.correo"
          type="email"
          placeholder="Ingrese su correo."
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Contraseña" label-for="inputPassword">
        <b-form-input
          id="inputPassword"
          v-model="credenciales.clave"
          placeholder="Ingrese contraseña."
          required
          type="password"
        ></b-form-input>
        <br />
        <b-button type="submit" variant="primary">Iniciar Sesión </b-button>
      </b-form-group>
    </b-form>
  </b-container>
</template>
<script>
export default {
  data() {
    return {
      credenciales: {},
    };
  },

  methods: {
    async login(event) {
      event.preventDefault();
      try {
        const url = "http://localhost:3001/api/v1/login";
        let { data } = await this.$axios.post(url, this.credenciales);
        if (data.ok == true) {
          let token = data.info.token;
          let rol = data.info.rol;
          let nombre = data.info.nombre;
          localStorage.setItem("token", token);
          localStorage.setItem("nombre", nombre);

          //Redireccionar al usuario de acuerdo su rol a una página
          if (rol === "ADMIN") {
            this.$router.push("/admin/dashboard");
          } else {
            this.$router.push("/cliente/dashboard");
          }

          await this.$swal.fire("Bienvenido.", data.message, "success");
        } else {
          await this.$swal.fire("Error.", data.message, "warning");
        }
      } catch (error) {
        console.error(error);
        this.$swal.fire("Error.", "Ha ocurrido un error.", "error");
      }
    },
  },
};
</script>
<style>
.login {
  padding-top: 50px;
}
</style>