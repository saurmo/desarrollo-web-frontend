<template>
  <div>
    <b-row class="py-3">
      <b-col>
        <center>
          <h1>Frutas y verduras la esquina fresca.</h1>
          <h3>Siempre orgánico y fresco.</h3>
        </center>
      </b-col>
    </b-row>
    <b-row class="py-3">
      <b-col>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut perspiciatis
          ab cumque enim nihil odit labore? Ipsam, similique ex maiores accusantium
          praesentium dolorum tenetur numquam veniam cupiditate, necessitatibus
          impedit quos.
        </p>
      </b-col>
    </b-row>

    <b-row>
      <b-col v-for="product in products" :key="product._id" cols="3" class="py-2">
        <b-card footer-tag="footer" header-tag="header">
          <template #header>
            <b>{{ product.name ? product.name : 'Producto nuevo' }}</b>
          </template>
          <b-card-img :src="product.image ? product.image : 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png'"
            top alt="test" height="80" width="100" />
          <center>
            <b v-if="product.price">{{ product.price | currency }}</b>
            <b v-else>{{ 0 | currency }}</b>
          </center>
          <template #footer>
            <center>
              <b-button size="sm" pill variant="primary">Agregar</b-button>
            </center>
          </template>
        </b-card>
      </b-col>
    </b-row>


  </div>
</template>

<script>
import config from "@/config/main.config"
export default {
  layout: "blank",
  beforeMount() {
    this.closeSession();
    this.loadProducts()
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    closeSession() {
      localStorage.removeItem("user-logged");
    },
    async loadProducts() {
      const url = config.HOST_API + "/productos";
      const response = await this.$axios.get(url);
      console.log(response);
      this.products = response.data.info;
    },
  }
};
</script>
