<template>
    <v-container fill-height>
        <center>Bienvenido al log-in</center>

        <v-row justify="center">
            <div class="home">
                <v-form color="deep-purple accent-4" ref="form" v-model="valid" lazy-validation>

                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

                    <v-text-field v-model="name" :counter="10" label="Password" required type="password"
                        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                        @click:append="changeVisibilityPassword()"></v-text-field>

                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
                        Submit
                    </v-btn>


                </v-form>
            </div>
        </v-row>
    </v-container>
</template>


<script>

export default {
    name: 'Home',
    components: {

    },
    data: () => ({
        valid: true,
        name: '',

        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
    }),

    methods: {
        validate() {

            if (this.$refs.form.validate()) {
                if (this.email == "luissa@gmail.com" && this.name == "12345") {
                    this.$router.push('acccounts')
                } else {
                    alert('No valido')
                }
            }
        }
    }

}

</script>



    