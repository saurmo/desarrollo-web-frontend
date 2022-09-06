<template>
  <div>
    <b-container>
      <h1>Gestión de productos</h1>
      <b-form action="javascript:void(0)" @submit="createProduct()">
        <!-- Nombre -->
        <b-form-group id="name_group" label="Nombre:" label-for="name">
          <b-form-input
            required
            placeholder="Ingrese el nombre del producto"
            type="text"
            id="name"
            v-model="product.name"
          ></b-form-input>
        </b-form-group>

        <!-- Tipo de fruta -->
        <b-form-group id="type_group" label="Tipo:" label-for="type">
          <b-form-select
            id="tipo"
            v-model="product.type"
            :options="product_types"
            required
          ></b-form-select>
        </b-form-group>

        <!-- Precio -->
        <b-form-group id="name_group" label="Precio:" label-for="price">
          <b-form-input
            required
            placeholder="Ingrese el precio del producto"
            type="number"
            id="price"
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
      message: "Hello Vue!",
      product: {},
      nombre: "",
      product_types: ["Verdura", "Fruta"],
    };
  },
  // Metodos: Metodos a utilizar
  methods: {
    changeMessage() {
      this.message = "Buenas tardes, dllo web";
    },

    createProduct() {
      console.log(this.product);
    },
  },
};
</script>