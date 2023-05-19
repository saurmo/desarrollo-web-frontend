<template>
  <div>
    <h1>Mi perfil</h1>


    <h4>Seleccionar imagen de perfil</h4>
    <template>

      <v-btn color="success" @click="showInput = !showInput">Subir imagen</v-btn>

      <v-file-input v-if="showInput" counter show-size truncate-length="25" accept="image/*"
        v-model="image"></v-file-input>
      <v-btn v-show="showInput" color="success" @click="uploadImage" :loading="loading">Subir imagen</v-btn>
    </template>
    <div v-for="item in images" :key="item._id">
      <img :src="item.image" alt="" srcset="" width="200" height="200">
    </div>

  </div>
</template>

<script>
import config from "../assets/config";

export default {
  beforeMount() {
    this.loadImage()
  },
  data() {
    return {
      loading: false,
      showInput: false,
      image: {},
      images: []
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
    },
    async loadImage() {
      try {
        const url = `${config.API_URL}/uploads/profile`

        this.loading = true
        const { data } = await this.$axios.get(url)
        this.images = data.info
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false
      }
    }
  },


}

</script>

<style></style>