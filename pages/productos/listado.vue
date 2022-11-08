<template>
  <div>
    <center>
      <h1>Listado de productos</h1>
    </center>
    <!-- Fila -->
    <b-row>
      <b-col>
        <b-table striped hover :items="products" :fields="fields">
          <template #cell(actions)="row">
            <b-button size="sm" @click="loadItem(row)" class="mr-2">
              Modificar
            </b-button>
            <b-button size="sm" @click="deleteItem(row)" class="mr-2">
              Eliminar
            </b-button>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import config from "@/config/main.config"

export default {
  data() {
    return {
      fields: [
        { key: 'codigo', name: 'Código', },
        { key: 'name', name: 'Nombre', },
        { key: 'price', name: 'Precio', },
        { key: 'type', name: 'Tipo', },
        { key: 'actions', name: 'Acciones', },
      ],

      products: [],
    };
  },
  // Metodo de vue que se ejecuta antes de que cargue la página
  beforeMount() {
    this.loadProducts();
  },
  methods: {
    async loadProducts() {
      const url = config.HOST_API + "/productos";
      const response = await this.$axios.get(url);

      this.products = response.data.info
    },
    async deleteItem({ item }) {
      this.$swal
        .fire({
          title: "¿Esta seguro de eliminar?",
          text: "No se puede recuperar despúes de la eliminación.",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, eliminar!",
          cancelButtonText: "Cancelar",
        })
        .then(async (result) => {
          if (result.value == true) {
            let token = localStorage.getItem("user-token");
            let opcionesAxios = { headers: { token } };

            const url = config.HOST_API + `/productos/${item._id}`;
            let { data } = await this.$axios.delete(url, opcionesAxios);
            await this.loadProducts();
            this.$swal.fire("Eliminado!", data.message, "success");
          }
        });
    },
  },
};
</script>
