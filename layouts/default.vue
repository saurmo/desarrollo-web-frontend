<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>

      <v-toolbar-title v-text="title" />
      <v-spacer />
      {{ nombre_usuario }}
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

export default {
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
        let respuesta = await this.$axios.get(url);
        console.log(respuesta);
      } catch (error) {
        console.log(error);
        //this.$router.push("/login");
      }
    },
  },
};
</script>
