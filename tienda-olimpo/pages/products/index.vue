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
const url = "http://localhost:3001/products";
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
        let response = await this.$axios.get(url);
        this.products = response.data.content;
      } catch (error) {
        this.products = [];
        console.error(error);
      }
    },
    /**
     * Enviar el producción a edición
     * /products/id
     */
    editItem(item) {
      let url = `/products/${item.id}`;
      this.$router.push(url);
    },
    /**
     * Eliminar un producto
     */
    deleteItem(item) {
      this.$swal
        .fire({
          type: "warning",
          title: "¿Está seguro de eliminar el item?",
          text: "Al borrar el item no se prodrá recuperar.",
          allowEscapeKey: false,
          allowOutsideClick: false,
          showCancelButton: true,
        })
        .then(async (result) => {
          if (result.value) {
            try {
              let url = "http://localhost:3001/products/" + item.id;
              await this.$axios.delete(url);
              this.$swal.fire({
                type: "success",
                title: "Operación exitosa.",
                text: "El item se eliminó correctamente.",
              });
              this.getProducts();
            } catch (error) {
              this.$swal.fire({
                type: "error",
                title: "Ha ocurrido un problema al eliminar",
                text: error.toString(),
              });
            }
          }
        });
    },
  },
};
</script>
