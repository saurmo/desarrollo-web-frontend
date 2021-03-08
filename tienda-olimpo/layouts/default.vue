<template>
  <v-app>
    <!-- Menú hamburguesa -->
    <v-navigation-drawer v-model="openMenu" fixed app>
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.id"
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

    <!-- Barra de navegación superior -->
    <v-app-bar fixed app>
      <!-- Icono que controla el menú hamburguesa -->
      <v-app-bar-nav-icon @click.stop="openMenu = !openMenu" />
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <v-spacer></v-spacer>
      <div>
        <center>
          <span>&copy; {{ year }}</span>
          <br />
          <small>Tienda el Olimpo</small>
        </center>
      </div>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),

      openMenu: false,

      items: [
        {
          id: "home",
          icon: "mdi-home",
          title: "Inicio",
          to: "/"
        },
        {
          id: "productos",
          icon: "mdi-gift",
          title: "Productos",
          to: "/products"
        },
        {
          icon: "mdi-square",
          title: "Categorías",
          to: "/categories"
        }
      ],

      title: "Vuetify.js"
    };
  }
};
</script>
