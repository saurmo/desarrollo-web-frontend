<template>
  <center>
    <b-card
      title="Login"
      img-src="https://picsum.photos/600/300/?image=1080"
      img-alt="Fresas"
      img-top
      tag="article"
      style="max-width: 80%"
      class="mb-2"
    >
      <b-form action="javascript:void(0)" @submit="login()">
        <b-card-text>
          <b-form-group id="email" label="Email" label-for="email">
            <b-form-input
              id="email"
              type="email"
              v-model="user.email"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Ingrese su correo"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="password" label="Contraseña" label-for="password">
            <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input
                id="password"
                type="password"
                v-model="user.password"
                required
                placeholder="Ingrese su contraseña"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-alert show variant="danger" v-show="message">{{
            message
          }}</b-alert>
        </b-card-text>

        <b-form-checkbox class="card-link" v-model="user.recordar">
          Recordar mi cuenta</b-form-checkbox
        >

        <b-button type="submit" variant="primary">Ingresar</b-button>
        <b-button>Registrarme</b-button>
      </b-form>
    </b-card>

    <br />
    <progress v-if="loading"></progress>
  </center>
</template>

<script>
import config from "../config/main.config"
export default {
  layout: "blank",
  data() {
    return {
      user: {},
      loading: false,
      message: "",
    };
  },
  beforeMount() {
    this.closeSession();
  },
  methods: {
    closeSession() {
      localStorage.removeItem("user-logged");
    },

    async login() {
      try {
        const url = config.HOST_API + "/login";
        this.loading = true;
        const { data } = await this.$axios.post(url, this.user);
        if (data.ok) {
          const { role } = data.info;
          localStorage.setItem("user-logged", JSON.stringify(data.info));
          localStorage.setItem("user-token", data.info.token);
          switch (role) {
            case "ADMIN":
              this.$router.push("/panel-admin");
              break;
            case "USER":
              this.$router.push("/panel-user");
              break;
            default:
              this.$router.push("/");
              break;
          }
        }
        this.message = data.message;
      } catch (error) {
        if (error.response) {
          this.message = error.response.data.message;
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>