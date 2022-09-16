<template>
  <div>
    <center>
      <h1>Listado de productos</h1>
    </center>
    <b-card
      title="Card Title"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mb-2"
    >
      <b-card-text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </b-card-text>

      <b-button href="#" variant="primary">Go somewhere</b-button>
    </b-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  // Metodo de vue que se ejecuta antes de que cargue la página
  beforeMount() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      const url = "http://localhost:3001/productos";
      const response = await this.$axios.get(url);
      console.log(response);
    },
  },
};
</script>
