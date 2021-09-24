<template>
  <div>
    <v-card>
      <v-form ref="formularioLogin">
        <v-card-title primary-title> Login </v-card-title>
        <v-card-text>
          <v-text-field
            label="Identificación"
            v-model="id"
            :rules="requiredRule"
          ></v-text-field>
          <v-text-field
            type="password"
            label="Contraseña"
            v-model="clave"
            :rules="requiredRule"
          ></v-text-field>
        </v-card-text>
        <v-progress-linear
          :indeterminate="true"
          v-if="loading"
        ></v-progress-linear>
        <v-card-actions>
          <v-btn color="success" @click="login()">Ingresar</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import config from "../assets/js/config";
export default {
  layout: "blank",
  data() {
    return {
      id: null,
      clave: null,
      requiredRule: [(v) => !!v || "El campo es obligatorio"],
      loading: false,
    };
  },
  methods: {
    async login() {
      try {
        if (!this.$refs.formularioLogin.validate()) {
          return;
        }
        let url = config.URL_API + "/login";
        let payload = {};
        payload.id = this.id;
        payload.clave = this.clave;
        this.loading = true;
        let response = await this.$axios.post(url, payload);
        this.loading = false;

        let data = response.data;
        if (data.ok == true) {
          // El usuario existe
          let token = data.info.token
          let nombre_usuario =  data.info.nombre_completo
          localStorage.setItem('token', token)
          localStorage.setItem('nombre_usuario', nombre_usuario)
          this.$router.push('/home/administrador')
        } else {
          this.$swal({
            type: "error",
            icon: "error",
            title: "Oops...",
            text: data.message,
          });
        }
        console.log(response);
      } catch (error) {
        this.$swal({
          type: "error",
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error. No se ha podido conectar a API.",
        });
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>