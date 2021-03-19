<template>
  <div>
    <v-card flat>
      <v-card-actions>
        <h1>Creación de Productos</h1>
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
        <v-btn color="success" @click="saveProduct()">Guardar producto</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    product: {
      id: "",
      name: "",
    },
    categories: ["Deportiva", "Mujer", "Hombre", "Casual"],
    rules: {
      required: [(v) => !!v || "El campo es obligatorio"],
    },
  }),
  beforeMount() {},

  methods: {
    /**
     * Enviar una solicitud (Request) en un método post
     * Para guardar el producto
     */
    async saveProduct() {
      if (this.$refs.formProduct.validate()) {
        console.log("-- Inicio guardar producto --");
        let product = Object.assign({}, this.product);
        let response = await this.$axios.post("http://localhost:3001/products", product);
        this.$swal.fire({
          type: "success",
          title: "Operación exitosa.",
          text: "El item se guardo correctamente.",
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
