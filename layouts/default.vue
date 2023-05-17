<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn color="primary" class="text-none" dark v-bind="attrs" v-on="on">
            Bienvenido {{ fullname }}!
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/profile">
            <v-list-item-title>Mi perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="closeSesion">
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import config from '~/assets/config'

export default {
  name: 'DefaultLayout',
  beforeMount() {
    this.loadAccount()
  },
  data() {
    return {
      fullname: "",
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Inicio',
          to: '/home',
        },
        {
          icon: 'mdi-account',
          title: 'Mi perfil',
          to: '/profile',
        },
        {
          icon: 'mdi-checkbox-marked-circle-plus-outline',
          title: 'Mis tareas',
          to: '/tasks',
        },
        {
          icon: 'mdi-checkbox-marked-circle-plus-outline',
          title: 'Mis materias',
          to: '/subjects',
        },
        {
          icon: 'mdi-account-multiple',
          title: 'Cuentas creadas',
          to: '/accounts',
        },
      ],
      miniVariant: false,

      title: 'Tareas App',
    }
  },
  methods: {
    closeSesion() {
      this.$router.push("/")
    },
    async loadAccount() {
      try {
        const account_str = localStorage.getItem("ACCOUNT")
        

        if (!account_str) throw 'account_str'

        const account = JSON.parse(account_str)
        this.fullname = `${account.firstname} ${account.lastname}`
        const url = `${config.API_URL}/verify`
        const account_token = localStorage.getItem("token")
        const authorization = 'Bearer ' + account_token
        const validTokenRespon = await this.$axios.get(url, { headers: { authorization } })

        if (validTokenRespon.data.success === false) throw 'account_token'

        this.$axios.setToken(account_token)

        if (account.role == 0) {
          this.$router.push("/students/home")
        } else {
          this.$router.push("/home")
        }
      } catch (error) {
        this.$router.push("/")
      }

    }
  }
}
</script>
