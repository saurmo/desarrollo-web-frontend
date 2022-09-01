<template>
  <div>
    <center>
      <h1>Gestión de productos</h1>
      <form action="javascript:void(0)" @submit="createProduct()">
        <label class="form-label" for="nombre">Nombre</label>
        <input
          required
          class="form-control"
          placeholder="Ingrese el nombre del producto"
          type="text"
          name="nombre"
          id="nombre"
          v-model="product.name"
        />
        <br />
        <label class="form-label" for="tipo">Tipo</label>
        <select
          class="form-select"
          name="tipo"
          id="tipo"
          v-model="product.type"
        >
          <option value="fruta">Fruta</option>
          <option value="verdura">Verdura</option>
        </select>
        <br />
        <label class="form-label" for="precio">Precio</label>
        <input
          class="form-control"
          type="number"
          name="precio"
          id="precio"
          v-model="product.price"
        />
        <br />
        <label class="form-label" for="fecha_cosecha">Fecha</label>
        <input
          class="form-control"
          type="date"
          name="fecha_cosecha"
          id="fecha_cosecha"
          v-model="product.date"
        />
        <br />
        <label class="form-label" for="descuento"
          >Porcentaje de descuento</label
        >
        <input
          class="form-range"
          type="range"
          name="descuento"
          id="descuento"
          v-model="product.dto"
        />
        <br />
        <label class="form-label" for="fecha_vencimiento"
          >Fecha de vencimiento</label
        >
        <input
          class="form-control"
          type="date"
          name="fecha_vencimiento"
          id="fecha_vencimiento"
          v-model="product.expiration_date"
        />
        <br />
        <label class="form-label" for="descripcion">Descripción</label>
        <br />
        <textarea
          name="descripcion"
          id="descripcion"
          cols="30"
          rows="3"
          v-model="product.descripcion"
        ></textarea>
        <br />
        <br />
        <button type="submit" class="btn btn-primary">Crear Producto</button>
      </form>
    </center>
  </div>
</template>

<script>
export default {};
</script>