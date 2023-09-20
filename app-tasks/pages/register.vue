<template>
    <div class="login-container">
        <v-img class="mx-auto my-6" max-width="228"
            src="https://udemedellin.edu.co/wp-content/uploads/2021/02/logo_udemedellin2.png"></v-img>

        <v-card class="mx-auto pa-12 pb-8" elevation="2" max-width="448" rounded="lg">

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

            <v-btn block class="mb-8" color="red" size="large" variant="outlined" @click="register">
                Registrarse
            </v-btn>

            <v-card-text class="text-center">
                <a class="text-grey text-decoration-none" href="./" rel="noopener noreferrer" target="_blank">
                    ¡Ya tienes una cuenta? Inicia sesión <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text>

        </v-card>
    </div>
</template>
  
<script>
import axios from 'axios';
import Swal from "sweetalert2";
let nextUserId = 2;  // Contador para el ID secuencial

export default {
    data() {
        return {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            visible: false,
            confirmVisible: false,
            users: []
        };
    },
    methods: {
        async getUsers() {
            try {
                const response = await axios.get('http://localhost:3001/users');
                this.users = response.data;
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        },
        async register() {
            await this.getUsers();

            // Check if the email already exists
            const emailExists = this.users.some(user => user.email === this.email);

            if (emailExists) {
                console.error('El correo electrónico ya está registrado.');
            } else if (this.password !== this.confirmPassword) {
                Swal.fire({
                    title: "Error",
                    text: "Las contraseñas no coinciden",
                    icon: 'error',
                })
            } else {
                // Generate a unique sequential ID for the new user
                const userId = nextUserId;

                // Increment the counter for the next user
                nextUserId++;

                // Register the new user with the generated sequential ID
                const newUser = {
                    id: userId,
                    fullName: this.fullName,
                    email: this.email,
                    password: this.password
                };

                // Add the user to the server
                await this.addUser(newUser);

                Swal.fire(
                    {
                        icon: 'success',
                        title: 'Registro exitoso:'
                    }
                )

                console.log('', newUser);
                // Optionally, you can redirect to a different page after successful registration
                this.$router.push('./');
            }
        },
        async addUser(user) {
            try {
                const response = await axios.post('http://localhost:3001/users', user);
                console.log('Usuario agregado:', response.data);
            } catch (error) {
                console.error('Error al agregar usuario:', error);
            }
        }
    }
};
definePageMeta({
    layout: "blank",
});
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