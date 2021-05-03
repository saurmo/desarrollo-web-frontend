<template>
  <v-container>
    <div>
      <v-row>
        <v-col cols="3" v-for="product in products" :key="product.id">
          <v-card :loading="loading" max-width="374">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="250"
              :src="`${path}${product.id}/${product.images[0]}`"
            ></v-img>

            <v-card-title>{{ product.name }}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">
                  5 (100)
                </div>
              </v-row>

              <div class="my-4 subtitle-1">
                {{ product.price }}
              </div>

              <div>
                {{ product.description }}
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="reserve">
                Agregar al carro
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
const url_api = "http://localhost:3001/public/products";
export default {
  layout: "public",
  data: () => ({
    loading: false,
    selection: 1,
    products: [],
    path: "http://localhost:3001/public/static/products/",
  }),
  beforeMount() {
    this.loadProducts();
  },

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
    async loadProducts() {
      try {
        let url = url_api;
        let { data } = await this.$axios.get(url);
        this.products = data.content;
      } catch (error) {
        this.products = [];
      }
    },
  },
};
</script>

<style></style>
