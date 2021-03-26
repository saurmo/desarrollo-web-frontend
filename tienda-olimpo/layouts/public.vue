<template>
  <v-app>
    <v-app-bar fixed app>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Tienda EL OLIMPO</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-btn icon @click.stop="dialogLogin = true">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
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
      <v-btn text to="/login" small class="text-none">
        <v-icon small class="mr-2">mdi-account-box</v-icon> Empleados
      </v-btn>
    </v-footer>
    <!-- Login -->
    <v-dialog v-model="dialogLogin" max-width="290" persistent>
      <v-card>
        <v-card-text> </v-card-text>
        <login />
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialogLogin = false">
            Cancelar
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import login from "@/components/Login";
export default {
  components: {
    login,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      dialogLogin: false,
    };
  },
};
</script>

<style></style>
