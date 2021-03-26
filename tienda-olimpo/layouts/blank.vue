<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  beforeMount() {
    localStorage.clear();
  },
};
</script>

<style></style>
