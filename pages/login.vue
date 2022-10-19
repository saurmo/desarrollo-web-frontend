<template>
  <div>
    <b-container>
      <center>
        <b-form>
          <label class="sr-only" for="email">Email</label>
          <b-form-input
            id="email"
            v-model="user.email"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="ejemplo@correo.com"
          ></b-form-input>

          <label class="sr-only" for="password">Contraseña</label>
          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input
              id="password"
              type="password"
              v-model="user.password"
              placeholder="Contraseña"
            ></b-form-input>
          </b-input-group>
          <br />
          <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"
            >Recordarme</b-form-checkbox
          >

          <b-button @click="login" variant="primary">Ingresar</b-button>
        </b-form>
        <br />
        <progress v-if="loading"></progress>
      </center>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: "blank",
  data() {
    return {
      user: {},
      loading: false,
      message:""
    };
  },
  methods: {
    async login() {
      try {
        const url = "http://localhost:3001/login";
        this.loading = true;
        const { data } = await this.$axios.post(url, this.user);
        this.message= data.message
        this.loading = false;
      } catch (error) {
                this.message="Usuario y/o contraseña incorrecta"
          this.loading = false;
      }
    },
  },
};
</script>