<template>
  <div class="login-container">
    <v-img class="mx-auto my-6" max-width="228"
      src="https://udemedellin.edu.co/wp-content/uploads/2021/02/logo_udemedellin2.png"></v-img>


    <v-card class="mx-auto pa-12 pb-8" elevation="2" max-width="448" rounded="lg">
      <v-form fast-fail @submit.prevent @submit="login">
        <div class="text-subtitle-1 text-medium-emphasis">Correo electrónico</div>

        <v-text-field v-model="email" density="compact" :rules="emailRules" placeholder="Correo electrónico"
          prepend-inner-icon="mdi-email-outline" variant="underlined"></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Contraseña

          <a class="text-body-2 font-weight-regular text-grey" href="#" rel="noopener noreferrer" target="_blank">
            Olvidaste tu contraseña?</a>
        </div>

        <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'" density="compact" placeholder="Ingresa tu contraseña"
          prepend-inner-icon="mdi-lock-outline" variant="underlined"
          @click:append-inner="visible = !visible"></v-text-field>

        <v-btn block class="mb-8" color="red" size="large" variant="outlined" type="submit">
          Iniciar sesión
        </v-btn>

        <v-card-text class="text-center">
          <NuxtLink class="text-grey text-decoration-none" to="/register" rel="noopener noreferrer">
            ¡Registrate ahora! <v-icon icon="mdi-chevron-right"></v-icon>
          </NuxtLink>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>

import Swal from "sweetalert2";
import axios from 'axios';
import config from '../config/default.json';

definePageMeta({ layout: "blank" });

// Definir las variables del estado:
const email = ref('saurrego@udem.edu.co')
const password = ref('admin123')
const visible = ref(false)
const emailRules = ref([
  value => {
    if (value) return true
    return 'El campo es obligatorio.'
  },
  value => {
    if (/[^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(value)) return true
    return 'Correo no valido.'
  }
])

const login = async () => {
  try {
    console.log(config.api_host);

    const url = `${config.api_host}/login`
    const { data } = await axios.post(url, { email: email.value, password: password.value })
    if (data?.ok == true) {
      // Redireccionar al home, guardar el token
      console.log(data?.info);
      const token = data?.info?.token
      localStorage.setItem('token', token)
      useRouter().push('/tareas')
      // useRoute(')
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: data?.message,
        icon: 'error'
      })
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      title: 'Error!',
      text: 'Ha ocurrido un error al conectarse.',
      icon: 'error'
    })
  }
}



// export default {
//   data() {
//     return {

//     };
//   },
//   methods: {
//     async getUsers() {
//       try {
//         const response = await axios.get('http://localhost:3001/users');
//         this.users = response.data;
//       } catch (error) {
//         console.error('Error al obtener usuarios:', error);
//       }
//     },
//     async login() {
//       await this.getUsers();

//       const foundUser = this.users.find(
//         user =>
//           user.email === this.email && user.password === this.password
//       );

//       if (foundUser) {
//         console.log('Inicio de sesión exitoso para el usuario:', foundUser);
//         this.$router.push('/tareas');
//       } else {
//         console.error('Credenciales incorrectas. Inicio de sesión fallido.');
//       }
//     },
//   },
// };

</script>

<style scoped>
.login-container {

  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-container v-card {
  width: 100%;
}
</style>