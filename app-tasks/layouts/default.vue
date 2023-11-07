<template>
  <v-layout class="rounded rounded-md" v-if="!loading">
    <v-app-bar :title="titleApp">
    </v-app-bar>
    <v-navigation-drawer>
      <v-list>
        <!-- Navegacion -->
        <v-list-item to="/"><v-icon icon="mdi-home" /> Inicio </v-list-item>
        <v-list-item title="Tareas" to="/tareas"></v-list-item>
        <v-list-item title="Ayuda" to="/docs/ayuda"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="align-center justify-center">
      <!-- slot: Carga el contenido de la página (pages/..) -->
      <slot />
    </v-main>
  </v-layout>
</template>
<script setup>
import axios from 'axios'
import config from '../config/default.json'
onBeforeMount(() => {
  const token = localStorage.getItem('token')
  if (token) {
    loading.value = false
    const url = `${config.api_host}/verify`
    axios.post(url, { token }).then(() => {
      loading.value = true
    }).catch(() => {
      useRouter().push('/')

    })
  } else {
    useRouter().push('/')
  }
})

const titleApp = ref("App de Tareas")
let likes = ref(0)
const loading = ref(true)
const incrementLikes = () => {
  // NOTA: Recuerda acceder al valor de la propiedad con .value
  likes.value++
}
</script>



<style>
.links {
  margin: 15px;
}
</style>