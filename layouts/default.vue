<template>
  <div v-if="userLogged != null">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/panel-admin">Tienda</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Administración" right>
            <b-dropdown-item to="/productos">Productos</b-dropdown-item>
            <b-dropdown-item to="/compras">Compras</b-dropdown-item>
            <b-dropdown-item to="/usuarios">Usuarios</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{ userLogged.name }}</em>
            </template>
            <b-dropdown-item href="#">Mi perfil</b-dropdown-item>
            <b-dropdown-item @click="closeSession"
              >Cerrar Sesión</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container fluid>
      <!-- Content here -->
      <Nuxt />
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userLogged: {},
    };
  },
  beforeMount() {
    this.loadPage();
  },
  methods: {
    loadPage() {
      const userLoggedStr = localStorage.getItem("user-logged");
      if (userLoggedStr) {
        this.userLogged = JSON.parse(localStorage.getItem("user-logged"));
          if (this.userLogged.role!=="ADMIN") {
          this.$router.push("/login")
        }
      } else {
        this.userLogged = {};
        this.$router.push("/login");
      }
    },
    closeSession() {
      localStorage.removeItem("user-logged");
      this.$router.push("/login");
    },
  },
};
</script>