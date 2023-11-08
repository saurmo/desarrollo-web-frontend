<template>
  <div class="login-container">
    <v-img class="mx-auto my-6" max-width="228"
      src="https://udemedellin.edu.co/wp-content/uploads/2021/02/logo_udemedellin2.png"></v-img>

    <v-card class="mx-auto pa-12 pb-8" elevation="2" max-width="448" rounded="lg">
      <v-form>

        <div class="text-subtitle-1 text-medium-emphasis">Identificación</div>

        <v-text-field v-model="id" density="compact" placeholder="Identificación" prepend-inner-icon="mdi-account-outline"
          variant="underlined"></v-text-field>


        <div class="text-subtitle-1 text-medium-emphasis">Nombre completo</div>

        <v-text-field v-model="fullName" density="compact" placeholder="Nombre completo"
          prepend-inner-icon="mdi-account-outline" variant="underlined"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Correo electrónico</div>

        <v-text-field v-model="email" density="compact" placeholder="Correo electrónico"
          prepend-inner-icon="mdi-email-outline" variant="underlined"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Contraseña</div>

        <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingresa tu contraseña"
          prepend-inner-icon="mdi-lock-outline" variant="underlined"
          @click:append-inner="visible = !visible"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Confirmar Contraseña</div>

        <v-text-field v-model="confirmPassword" :append-inner-icon="confirmVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="confirmVisible ? 'text' : 'password'" density="compact" placeholder="Confirma tu contraseña"
          prepend-inner-icon="mdi-lock-outline" variant="underlined"
          @click:append-inner="confirmVisible = !confirmVisible"></v-text-field>

        <v-file-input label="Imagen de perfil" v-model="image" />

        <v-btn block class="mb-8" color="red" size="large" variant="outlined" @click="register">
          Registrarse
        </v-btn>

        <v-card-text class="text-center">
          <a class="text-grey text-decoration-none" href="/" rel="noopener noreferrer" target="_blank">
            ¡Ya tienes una cuenta? Inicia sesión <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>
  
<script>
import axios from 'axios';
import Swal from "sweetalert2";
let nextUserId = 2;  // Contador para el ID secuencial
import config from "../config/default.json";

definePageMeta({
  layout: "blank",
});

export default {
  data() {
    return {
      id: '',
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      visible: false,
      confirmVisible: false,
      image: null
    };
  },
  methods: {

    async register() {
      try {
        const url = `${config.api_host}/users/register`
        const user = {
          id: this.id,
          name: this.fullName,
          password: this.password,
          email: this.email
        }
        const { data: dataUser } = await axios.post(url, user)
        const { info: infoUser } = dataUser
        const formData = new FormData()
        formData.append("document", this.image[0])
        const { data } = await axios.post(`${url}/${infoUser._id}`, formData)
        Swal.fire(
          {
            icon: 'success',
            title: 'Registro exitoso:'
          }
        )
      } catch (error) {
        console.error(error);
        Swal.fire(
          {
            icon: 'error',
            title: 'Ha ocurrido un error.'
          }
        )
      }
    },
  }
};

</script>
  
<style scoped>
/* Centra el formulario verticalmente y elimina el espacio alrededor */
.login-container {
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container v-card {
  width: 100%;
  /* Ajusta el ancho de la tarjeta al 100% del contenedor */
}
</style>