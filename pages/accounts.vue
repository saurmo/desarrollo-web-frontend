<template>
    <div>
        <h1>Cuentas creadas</h1>
        <v-btn @click="loadAccounts" :disabled="loading">Cargar cuentas</v-btn>
        <br>
        <span v-if="loading">Cargando...</span>
        <v-progress-linear v-if="loading" indeterminate color="cyan"></v-progress-linear>
        <ul>
            <li v-for="account in accounts" :key="account.id">
                {{ account.firstname }} {{ account.lastname }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            accounts: [],
            loading: false
        }
    },
    methods: {
        loadAccounts() {
            console.log("Cargar cuentas");
            const url = "http://localhost:3001/accounts"
            this.loading = true
            this.$axios.get(url).then((response) => {
                const data = response.data
                this.accounts = data
                console.log(response);

            }).catch(error => {
                alert("Ha ocurrido un error al cargar las cuentas")
                console.log(error);

            }).finally(() => {
                this.loading = false

            })
        }
    }
}
</script>

<style></style>