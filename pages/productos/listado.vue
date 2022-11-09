<template>
  <div>
    <center>
      <h1>Listado de productos</h1>
    </center>
    <!-- Fila -->

    <b-row>
      <b-col>
        <b-form-input
          v-model="search"
          type="text"
          placeholder="Buscar productos"
          @keyup.enter="searchProducto"
        ></b-form-input>
      </b-col>
    </b-row>
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
    <b-modal ref="my-modal" hide-footer title="Modificar producto">
      <b-form
        action="javascript:void(0)"
        @submit="updateProduct()"
        v-if="product != null"
      >
        <!-- ID -->
        <b-form-group id="id_group" label="Código:" label-for="id">
          <b-form-input
            placeholder="Ingrese el código del producto"
            type="text"
            id="id"
            v-model="product.codigo"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Nombre -->
        <b-form-group id="name_group" label="Nombre:" label-for="name">
          <b-form-input
            placeholder="Ingrese el nombre del producto"
            type="text"
            id="name"
            required
            v-model="product.name"
          ></b-form-input>
        </b-form-group>

        <!-- Tipo de fruta -->
        <b-form-group id="type_group" label="Tipo:" label-for="type">
          <b-form-select
            id="tipo"
            required
            v-model="product.type"
            :options="product_types"
          ></b-form-select>
        </b-form-group>

        <!-- Precio -->
        <b-form-group id="name_group" label="Precio:" label-for="price">
          <b-form-input
            placeholder="Ingrese el precio del producto"
            type="number"
            id="price"
            required
            v-model="product.price"
          ></b-form-input>
        </b-form-group>

        <!-- Fecha de cosecha -->
        <label class="form-label" for="fecha_cosecha">Fecha de cosecha</label>
        <b-form-datepicker
          id="fecha_cosecha"
          v-model="product.date"
        ></b-form-datepicker>
        <br />
        <!-- Dto -->
        <label class="form-label" for="dto">Porcentaje de descuento</label>
        <b-form-input
          id="dto"
          v-model="product.dto"
          type="range"
          min="0"
          max="100"
        ></b-form-input>

        <!-- Fecha de vencimiento -->
        <label class="form-label" for="expiration_date"
          >Fecha de vencimiento</label
        >
        <b-form-datepicker
          id="expiration_date"
          v-model="product.expiration_date"
        ></b-form-datepicker>

        <!-- Descripción -->
        <br />
        <label class="form-label" for="description">Descripción</label>
        <b-form-textarea
          id="description"
          v-model="product.description"
          placeholder="Ingrese la descripción del producto..."
          rows="3"
          max-rows="6"
        ></b-form-textarea>
        <br />
        <b-button type="submit">Modificar Producto</b-button>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import config from "@/config/main.config";

export default {
  data() {
    return {
      fields: [
        { key: "codigo", label: "Código" },
        { key: "name", label: "Nombre" },
        { key: "price", label: "Precio" },
        { key: "type", label: "Tipo" },
        { key: "actions", label: "Acciones" },
      ],
      product: null,
      product_types: ["Verdura", "Fruta"],
      products: [],
      search: "",
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
      this.products = response.data.info;
    },

    loadItem({ item }) {
      this.product = Object.assign({}, item);
      this.$refs["my-modal"].show();
    },
    updateProduct() {
      const url = config.HOST_API + "/productos/" + this.product._id;
      // this.$axios (Lib de axios instalada como complemento)
      const token = localStorage.getItem("user-token");
      const headers = { authorization: `Bearer ${token}` };
      // Creación del httpRequest con el method post
      this.$axios
        .put(url, this.product, { headers })
        .then((response) => {
          this.$swal(
            "Actualización correcta",
            response.data.message,
            "success"
          );
          this.$refs["my-modal"].hide();
          this.loadProducts();
        })
        .catch((error) => {
          this.$swal(
            "Actualización incorrecta",
            "No se pudo realizar la acción",
            "error"
          );
        });
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
            const headers = { authorization: `Bearer ${token}` };
            let opcionesAxios = { headers };
            const url = config.HOST_API + `/productos/${item._id}`;
            let { data } = await this.$axios.delete(url, opcionesAxios);
            await this.loadProducts();
            this.$swal.fire("Eliminado!", data.message, "success");
          }
        });
    },
   async searchProducto() {
      try {
        if (this.search != "") {
          const url = config.HOST_API + "/productos?search=" + this.search;
          const response = await this.$axios.get(url);
          this.products = response.data.info;
        }else {
          this.loadProducts()
        }
      } catch (error) {}
    },
  },
};
</script>

