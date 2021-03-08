<template>
  <div>
    <h1>Productos</h1>

    Código Nombre Precio Descripción Categoria Marca Talla Colores

    <template>
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
        <v-btn color="success" @click="saveProduct()">Guardar producto</v-btn>
      </v-form>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    product: {
      id: "",
      name: ""
    },
    categories: ["Deportiva", "Mujer", "Hombre", "Casual"],
    rules: {
      required: [v => !!v || "El campo es obligatorio"]
    }
  }),
  beforeMount() {
    this.getProducts();
  },

  methods: {
    async saveProduct() {
      if (this.$refs.formProduct.validate()) {
        console.log("-- Inicio guardar producto --");
        let product = Object.assign({}, this.product);
        // Enviar una solicitud (Request) en un método post
        let response = await this.$axios.post(
          "http://localhost:3001/products",
          product
        );
        console.log(response);
      } else {
        console.log("Formulario incompleto");
      }
    },
    deleteProduct() {
      // Enviar una solicitud (Request) en un método delete
    },
    async getProducts() {
      // Enviar una solicitud (Request) en un método get
      let response = await this.$axios.get("http://localhost:3001/products");
      console.log(response);
    },
    updateProduct() {
      // Enviar una solicitud (Request) en un método update
    }
  }
};
</script>

<style></style>
