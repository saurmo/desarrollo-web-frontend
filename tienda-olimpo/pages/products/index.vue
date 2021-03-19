<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card flat>
        <v-card-actions>
          <h1>Listado de productos</h1>
          <v-spacer></v-spacer>
          <v-btn color="success" class="text-none" to="/products/creacion"
            >Crear producto</v-btn
          >
        </v-card-actions>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="products"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  beforeMount() {
    this.getProducts();
  },
  data() {
    return {
      headers: [
        {
          text: "Código",
          align: "start",
          value: "id",
        },
        { text: "Nombre", value: "name" },
        { text: "Precio", value: "price" },
        { text: "Marca", value: "brand" },
        { text: "Talla", value: "size" },
        { text: "Color", value: "colors" },
        { text: "Categoría", value: "category" },
        { text: "Acción", value: "actions" },
      ],
      products: [],
    };
  },
  methods: {
    /**
     * Enviar una solicitud (Request) en un método get
     * Para consultar todos los productos
     */
    async getProducts() {
      try {
        let response = await this.$axios.get("http://localhost:3001/products");
        this.products = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    /**
     * Enviar el producción a edición
     * /products/id
     */
    editItem(item) {
      console.log(item);
    },
    /**
     * Eliminar un producto
     */
    deleteItem(item) {
      console.log(item);
    },
  },
};
</script>
