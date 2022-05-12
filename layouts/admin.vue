<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/admin/dashboard">Inicio</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/admin/usuarios">Usuarios</b-nav-item>
          <b-nav-item to="/admin/pedidos">Pedidos</b-nav-item>
          <b-nav-item to="/admin/platos">Platos</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Hola {{ nombre }}</em>
            </template>
            <b-dropdown-item href="#">Mi Perfil</b-dropdown-item>
            <b-dropdown-item @click="signout">Salir</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <br />
    <Nuxt />
  </div>
</template>
<script>
export default {
  beforeMount() {
    this.loadUser();
  },
  data() {
    return {
      nombre: "",
    };
  },
  methods: {
    async loadUser() {
      try {
        this.nombre = localStorage.getItem("nombre");
        let url = "http://localhost:3001/api/v1/validate";
        let token = localStorage.getItem("token");
        let opcionesAxios = { headers: { token } };

        let { data } = await this.$axios.get(url, opcionesAxios);

        // Token correcto
        if (data.ok === false) {
          this.$router.push("/");
        }
        if (data.info.rol != "ADMIN") {
          await this.$swal.fire("Error.", "No esta autorizado.", "error");

          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
        this.$router.push("/");
      }
    },
    signout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>