<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="info">
      <b-navbar-brand to="/">La esquina fresca</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-nav-item to="/login">Login</b-nav-item>

      </b-navbar-nav>
    </b-navbar>
    <b-container fluid>

      <Nuxt />

    </b-container>
  </div>


</template>
<script>
export default {};
</script>