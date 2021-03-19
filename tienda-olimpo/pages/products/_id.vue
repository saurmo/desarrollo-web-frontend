<template>
  <div>
    <v-card flat>
      <v-card-actions>
        <h1>Edición de Producto</h1>
        <v-spacer></v-spacer>
        <v-btn class="text-none" to="/products">Ver lista de productos</v-btn>
      </v-card-actions>

      <v-form ref="formProduct" v-model="valid" lazy-validation>
        <v-text-field
          v-model="product.id"
          label="Código"
          :rules="rules.required"
          required
        ></v-text-field>
        <v-text-field
          v-model="product.name"
          :rules="rules.required"
          label="Nombre"
          required
        ></v-text-field>
        <v-text-field
          v-model="product.price"
          :rules="rules.required"
          label="Precio"
          required
        ></v-text-field>
        <v-text-field
          v-model="product.brand"
          :rules="rules.required"
          label="Marca"
          required
        ></v-text-field>
        <v-text-field
          v-model="product.size"
          :rules="rules.required"
          label="Tallas"
          required
        ></v-text-field>
        <v-text-field
          v-model="product.colors"
          :rules="rules.required"
          label="Colores"
          required
        ></v-text-field>
        <v-textarea
          v-model="product.description"
          :rules="rules.required"
          label="Descripción"
          required
        ></v-textarea>
        <v-select
          v-model="product.category"
          :rules="rules.required"
          :items="categories"
          label="Categoria"
          required
        ></v-select>
        <v-btn color="success" @click="updateProduct()">Modificar producto</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    let id_product = params.id;
    return { id_product };
  },

  data: () => ({
    valid: true,
    product: {},
    categories: ["Deportiva", "Mujer", "Hombre", "Casual"],
    rules: {
      required: [(v) => !!v || "El campo es obligatorio"],
    },
  }),
  beforeMount() {
    this.getProduct();
  },

  methods: {
    /**
     * Enviar una solicitud (Request) en un método get
     * Para obtener un solo producto dado el código
     */
    async getProduct() {
      try {
        //
        let response = await this.$axios.get(
          "http://localhost:3001/products/" + this.id_product
        );
        this.product = response.data;
      } catch (error) {
        this.$swal
          .fire({
            type: "error",
            title: "Oops...",
            text: "El producto no existe o hubo un error cargandolo.",
            allowEscapeKey: false,
            allowOutsideClick: false,
          })
          .then((result) => {
            if (result.value) {
              this.$router.push("/products");
            }
          });
      }
    },

    /**
     * Enviar una solicitud (Request) en un método update
     * Para modificar el producto
     */
    async updateProduct() {
      if (this.$refs.formProduct.validate()) {
        // Crear un nuevo objeto con la info del producto
        let product = Object.assign({}, this.product);
        let response = await this.$axios.put(
          "http://localhost:3001/products/" + this.id_product,
          product
        );
        this.$swal.fire({
          type: "success",
          title: "Operación exitosa.",
          text: "El item se actualizo correctamente.",
        });
      } else {
        this.$swal.fire({
          type: "warning",
          title: "Formulario incompleto.",
          text: "Hay campos que deben ser diligenciados.",
        });
      }
    },
  },
};
</script>

<style></style>
