<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">

      <v-card>
        <v-card-title class="headline">
          <v-spacer />

          Bienvenidos a Tareas App
          <v-spacer />

        </v-card-title>
        <v-card-text>

        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/home"> Iniciar Sesión </v-btn>
          <v-btn color="secondary" nuxt to="/register"> Crear una cuenta </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'blank',
  name: 'IndexPage',
}
</script>
