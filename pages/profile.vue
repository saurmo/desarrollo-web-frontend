<template>
  <div>
    <h1>Mi perfil</h1>


    <h4>Seleccionar imagen de perfil</h4>
    <template >


      <v-file-input counter show-size truncate-length="25" accept="image/*" v-model="image"></v-file-input>
      <v-btn color="success" @click="uploadImage" :loading="loading">Subir imagen</v-btn>
    </template>
  </div>
</template>

<script>
import config from "../assets/config";

export default {

  data() {
    return {
      loading: false,
      image: null
    }
  },
  methods: {
    async uploadImage() {
      try {
        const url = `${config.API_URL}/uploads/profile`
        const formData = new FormData()
        formData.append("image", this.image)
        this.loading = true
        const imageResponse = await this.$axios.post(url, formData)
        console.log(imageResponse);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false

      }
    }
  }
}
</script>

<style></style>