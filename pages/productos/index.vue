<template>
  <div>
    <b-container>
      <h1>Gestión de productos</h1>
      <b-form action="javascript:void(0)" @submit="createProduct()">
        <!-- ID -->
        <b-form-group id="id_group" label="Código:" label-for="id">
          <b-form-input
            placeholder="Ingrese el código del producto"
            type="text"
            id="id"
            v-model="product.id"
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
        <b-button type="submit">Crear Producto</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  // State: Estado de los datos de mi aplicación/componente/página
  // El state (data) se une a los inputs del html por medio del v-model
  data() {
    return {
      product: {},
      product_types: ["Verdura", "Fruta"],
    };
  },
  // Metodos: Metodos a utilizar
  methods: {
 
    createProduct() {
  
      const url = "http://localhost:3001/productos";
      // this.$axios (Lib de axios instalada como complemento)

      // Creación del httpRequest con el method post
      this.$axios
        .post(url, this.product)
        .then((response) => {
          // THEN solución de la promesa cuando resuelve (resolve)
          alert(response.data.message);
        })
        .catch((error) => {
          // CATCH solución de la promeda cuando rechaza (reject)
          console.error(error);
          alert("Ha ocurrido un error");
        });
    },
  },
};
</script>