<template>
    <div>
        <h1>Cuentas creadas</h1>
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
import config from "../assets/config";
export default {
    data() {
        return {
            accounts: [],
            loading: false
        }
    },
    beforeMount() {
        this.loadAccounts()
    },
    methods: {
        loadAccounts() {
            const url = `${config.API_URL}/users`
            this.loading = true
            this.$axios.get(url).then((response) => {
                const data = response.data
                this.accounts = data.info

            }).catch(error => {
                console.log(error);

            }).finally(() => {
                this.loading = false

            })
        }
    }
}
</script>

<style></style>