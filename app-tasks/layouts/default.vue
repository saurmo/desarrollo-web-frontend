<template>
  <div>
    <h1>{{ titleApp }}</h1>
    <NuxtLink class="links" to="/">Inicio</NuxtLink>
    <NuxtLink class="links" to="/tareas">Tareas</NuxtLink>
    <NuxtLink class="links" to="/docs/ayuda">Ayuda</NuxtLink>
    <span>Likes:{{ likes }}</span>
    <button @click="incrementLikes">Me gusta</button>
    <!-- slot: Carga el contenido de la página (pages/..) -->
    <slot />

  </div>
</template>
<script setup>
const titleApp = ref("App de Tareas")
let likes = ref(0)

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