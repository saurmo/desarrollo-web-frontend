<template>
  <div>
    <h1>LAYOUT CLIENTE -    <div>Nombre: {{ nombre }}</div></h1>
    <div>
      <Nuxt />
    </div>
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
    loadUser() {
      this.nombre = localStorage.getItem("nombre");
    },
  },
};
</script>