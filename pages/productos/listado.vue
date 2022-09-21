<template>
  <div>
    <center>
      <h1>Listado de productos</h1>
    </center>
    <!-- Fila -->
    <b-row>
      <!-- Columna -->
      <b-col v-for="product in products" :key="product.id" cols="3">
        <center>
          <b-card
            img-height="100"
            :title="product.name"
            :img-src="product.image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 200px"
            class="mb-2"
          >
            <b-card-text>
              {{ product.description }}
            </b-card-text>
            <b-button href="#" variant="primary">Agregar al carro</b-button>
          </b-card>
        </center>
      </b-col>
    </b-row>
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
      this.products = response.data.info;
    },
  },
};
</script>
