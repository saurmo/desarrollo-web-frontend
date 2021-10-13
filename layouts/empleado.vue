<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      {{ nombre_usuario }}
      <v-btn small @click="cerrarSesion()">Cerrar Sesión</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import config from "../assets/js/config";
import comun from "../assets/js/comun.mixin";
export default {
  mixins: [comun],
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Inicio",
          to: "/home/administrador",
        },
        {
          icon: "mdi-apps",
          title: "Usuarios",
          to: "/usuarios",
        },
        {
          icon: "mdi-apps",
          title: "Reservas",
          to: "/reservas",
        },
        {
          icon: "mdi-apps",
          title: "Destinos",
          to: "/destinos",
        },
      ],
      miniVariant: false,
      right: true,
      title: "Reservas",
      nombre_usuario: "",
    };
  },
  beforeMount() {
    this.cargarPagina();
  },
  methods: {
    async cargarPagina() {
      this.nombre_usuario = localStorage.getItem("nombre_usuario");
      let token = localStorage.getItem("token");
      if (token === "null" || token == null || token == undefined) {
        this.$router.push("/login");
      } else {
        await this.validarToken(token);
      }
    },

    async validarToken(token) {
      try {
        let url = config.URL_API + "/validar-token?token=" + token;
        let { data } = await this.$axios.get(url);
        let rol = data.info.rol;
        if (rol !== 1 && rol !== 2) {
          this.cerrarSesion();
          return;
        }
      } catch (error) {
        console.log(error);
        this.$router.push("/login");
      }
    },
  },
};
</script>
