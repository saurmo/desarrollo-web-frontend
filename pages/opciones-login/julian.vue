<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card>
                    <v-card-title class="text-center">Iniciar sesión</v-card-title>
                    <v-card-text>
                        <v-form v-model="formAccount" ref="formAccount">
                            <v-text-field 
                                v-model="account.email"
                                label="Correo electrónico"
                                required
                                type="email"
                                :rules="[rules.required, ...emailRules]"
                            ></v-text-field>
                            
                            <v-text-field
                                v-model="account.password"
                                label="Contraseña"
                                required
                                :rules="[rules.required]"
                                :type="showPassword ? 'text' : 'password'"
                                :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="changeVisibilityPassword()"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="login">Iniciar sesión</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script lang="ts">
export default {
    data() {
        return {
            account: {
                email: '',
                password: '',
            },
            showPassword: false,
            loading: false,
            accounts: [],
            formAccount: null,
            rules: {
                required: (v: String | null) => !!v || 'Este campo es obligatorio.',
            },
            emailRules: [(v: string) => /.+@.+\..+/.test(v) || 'El correo debe ser valido'],
        }
    },
    methods: {
        changeVisibilityPassword(){
            this.showPassword = !this.showPassword;
        },
        login() {
            this.loadAccounts()
            const refFormAccount: any = this.$refs['formAccount']
            let confirm = false
            this.accounts.forEach(account => {
                if (account.email == this.account.email && account.pass == this.account.password) {
                    confirm = true
                }
            });
            if (confirm) {
                alert('Sesión iniciada')
            } else {
                alert('email o contraseña incorrectas')
            }
        },
        loadAccounts() {
            console.log("Cargar cuentas");
            const url = "http://localhost:3001/accounts"
            this.loading = true
            this.$axios.get(url).then((response) => {
                const data = response.data
                this.accounts = data
                console.log(data);

            }).catch(error => {
                alert("Ha ocurrido un error al cargar las cuentas")
                console.log(error);

            }).finally(() => {
                this.loading = false

            })
        }
    },
}
</script>
  