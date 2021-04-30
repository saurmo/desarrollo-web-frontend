<template>
  <v-dialog v-model="openDialog">
    <v-card>
      <v-card-title class="headline">
        Subir Archivos
      </v-card-title>

      <v-card-text>
        <v-file-input
          counter
          show-size
          truncate-length="50"
          v-model="files"
        ></v-file-input>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text @click="closeDialog()">
          Cancelar
        </v-btn>

        <v-btn color="green darken-1" text @click="sendFiles()">
          Subir archivos
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    openDialog: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  data() {
    return {
      files: null,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    async sendFiles() {
      try {
        let url = "http://localhost:3001/products/ID_PRODUCTO/archivos";

        // Crear el form data con el nombre del archivo y la información binaria de ese archivo
        let formData = new FormData();
        formData.append("imagen", this.files);

        let { data } = await this.$axios.post(url, formData);
        if (data.ok == true) {
          this.$swal.fire({
            type: "success",
            title: "Operación exitosa.",
            text: "Los archivos se guardaron",
          });
        } else {
          this.$swal.fire({
            type: "error",
            title: "Error al subir los archivos",
            text: data.message,
          });
        }
      } catch (error) {
        this.$swal.fire({
          type: "error",
          title: "Error al subir los archivos",
          text: error.toString(),
        });
      }
    },
  },
};
</script>

<style></style>
