<template>
  <v-card>
    <v-card-title primary-title> Destinos </v-card-title>
    <v-card-text>Formulario para crear destinos </v-card-text>
    <v-card-text>
      <v-form ref="form_destino">
        <v-text-field
          label="Código"
          v-model="destino.id"
          :disabled="is_updating"
          v-if="is_updating == true"
          :rules="requiredRule"
        ></v-text-field>
        <v-row>
          <v-col sm="12">
            <v-text-field
              label="Nombre del destino"
              v-model="destino.nombre"
              :rules="requiredRule"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12">
            <v-text-field
              label="Precio del destino"
              v-model="destino.precio"
              type="integer"
              :rules="requiredRule"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="12">
            <v-textarea
              solo
              label="Descripción del destino"
              v-model="destino.descripcion"
              :rules="requiredRule"
            ></v-textarea>
          </v-col>
        </v-row>

        <br />
        <!-- <v-select :items="roles" label="Rol" item-text="nombre" id="rol" item-value="id"></v-select> -->
        <v-btn
          :loading="loading"
          color="success"
          @click="crearDestino()"
          v-if="!is_updating"
        >
          Crear destino
        </v-btn>
        <v-btn
          color="info"
          :loading="loading"
          @click="guardarDestinoModificado()"
          v-if="is_updating"
        >
          Guardar destino
        </v-btn>
        <v-btn
          color="error"
          @click="
            is_updating = false;
            destino = {};
          "
          v-if="is_updating"
        >
          Cancelar
        </v-btn>
      </v-form>
    </v-card-text>
    <v-progress-linear :indeterminate="true" v-if="loading"></v-progress-linear>
    <v-card-text v-if="!is_updating">
      <v-data-table
        :headers="headers"
        :items="destinos"
        :items-per-page="5"
        class="elevation-1"
      >
        <template slot="item.actions" slot-scope="{ item }">
          <v-icon small @click="abrirCrudArchivos(item)"
            >mdi-file-multiple
          </v-icon>
          <v-icon small class="mr-2" @click="modificarDestino(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="eliminarDestino(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card-text>

    <v-dialog
      v-model="abrirDialogoCrudArchivos"
      scrollable
      persistent
      max-width="700px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-actions>
          Imagenes {{ destino.nombre }}
          <v-spacer></v-spacer>
          <v-icon @click="abrirDialogoCrudArchivos = false">
            mdi-close-circle
          </v-icon>
        </v-card-actions>
        <v-card-text>
          <v-form>
            <v-file-input
              v-model="archivo"
              chips
              counter
              show-size
              truncate-length="15"
            ></v-file-input>
            <v-btn
              small
              color="success"
              class="text-none"
              @click="subirImagen()"
              >Subir imagen</v-btn
            >
          </v-form>
        </v-card-text>
        <v-card-text>
          <template v-for="(imagen, index) in imagenes">
            <div :key="index">
              <a :href="imagen.url" target="_blank">{{ imagen.nombre }}</a>
              <v-icon small @click="eliminarImagen(imagen)">
                mdi-delete
              </v-icon>
            </div>
          </template>
          <span></span>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import config from "../assets/js/config";
export default {
  layout: "empleado",
  data() {
    return {
      destino: {},
      headers: [
        { text: "Código", value: "id" },
        { text: "Nombre", value: "nombre" },
        { text: "Descripción", value: "descripcion" },
        { text: "Precio", value: "precio" },
        { text: "Acciones", value: "actions" },
      ],
      destinos: [],
      is_updating: false,
      requiredRule: [(v) => !!v || "El campo es obligatorio"],
      repetPassword: [
        (v) => !!v || "El campo es obligatorio",
        (v) => v === this.destino.clave || "Las contraseñas no coinciden",
      ],
      show_password: false,
      show_repeat_password: false,
      loading: false,
      abrirDialogoCrudArchivos: false,
      archivo: null,
      imagenes: [],
    };
  },
  beforeMount() {
    this.cargarPagina();
  },
  methods: {
    async cargarPagina() {
      await this.consultarDestinos();
    },

    crearDestino() {
      if (!this.$refs.form_destino.validate()) {
        return;
      }

      let url = config.URL_API + "/destinos";
      let token = localStorage.getItem("token");
      this.loading = true;
      this.$axios
        .post(url, this.destino, { headers: { token } })
        .then((response) => {
          this.$swal.fire(
            "Creación ejecutada.",
            "destino creado correctamente!",
            "success"
          );
          this.loading = false;
          this.consultarDestinos();
        })
        .catch((err) => {
          this.loading = false;
          this.$swal.fire(
            "Creación NO ejecutada.",
            "El destino no se ha creado!",
            "error"
          );
          console.log("Error al guardar", err);
        });
    },

    async consultarDestinos() {
      try {
        let url = config.URL_API + "/destinos";
        let token = localStorage.getItem("token");
        let { data } = await this.$axios.get(url, { headers: { token } });
        this.destinos = data.info;
      } catch (error) {
        this.$swal.fire(
          "Operación NO ejecutada.",
          "No se consultaron los destinos.",
          "error"
        );
      }
    },

    async eliminarDestino(user) {
      try {
        let response_swal = await this.$swal({
          title: "Esta seguro de eliminar el destino?",
          text: "Esta acción no se puede revertir.",
          type: "warning",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Si, eliminarlo!",
        });
        if (response_swal.value == true) {
          let url = config.URL_API + "/destinos/" + user.id;
          let token = localStorage.getItem("token");
          let { data } = await this.$axios.delete(url, { headers: { token } });
          await this.consultarDestinos();
        }
      } catch (error) {
        this.$swal.fire(
          "Operación NO ejecutada.",
          "No se elimino el destino.",
          "error"
        );
      }
    },

    modificarDestino(user) {
      this.is_updating = true;
      this.destino = user;
    },

    async guardarDestinoModificado() {
      try {
        if (!this.$refs.form_destino.validate()) {
          return;
        }
        let url = config.URL_API + "/destinos";
        let token = localStorage.getItem("token");
        let response = await this.$axios.put(url, this.destino, {
          headers: { token },
        });
        this.$swal.fire(
          "Modificación ejecutada.",
          "destino modificado correctamente!",
          "success"
        );
        this.destino = {};
        this.is_updating = false;
      } catch (err) {
        this.$swal.fire(
          "Operación NO ejecutada.",
          "No se modifico el destino.",
          "error"
        );
        console.log("Error al guardar", err);
      }
    },

    async abrirCrudArchivos(destino) {
      await this.consultarImagenes(destino);
      this.abrirDialogoCrudArchivos = true;
      this.destino = destino;
    },

    async subirImagen() {
      let url = config.URL_API + "/archivos";
      let token = localStorage.getItem("token");
      let form_data = new FormData();
      form_data.append("mi_archivo", this.archivo);
      form_data.append("tipo_padre", "destinos");
      form_data.append("id_padre", this.destino.id);
      let { data } = await this.$axios.post(url, form_data, {
        headers: { token },
      });
      this.archivo = null;
      this.$swal.fire(
        "Imagen cargada.",
        "Imagen cargada correctamente",
        "success"
      );
         await this.consultarImagenes(this.destino);
    },

    async consultarImagenes(destino) {
      try {
        let url = config.URL_API + "/archivos/destinos/" + destino.id;
        let token = localStorage.getItem("token");
        let { data } = await this.$axios.get(url, { headers: { token } });
        this.imagenes = data.info;
      } catch (error) {
        console.error(error);
      }
    },


        async eliminarImagen(imagen) {
      try {
        let response_swal = await this.$swal({
          title: "Esta seguro de eliminar la imagen?",
          text: "Esta acción no se puede revertir.",
          type: "warning",
          showCancelButton: true,
          cancelButtonColor: "#d33",
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Si, eliminarlo!",
        });
        if (response_swal.value == true) {
          let url = config.URL_API + "/archivos/" + imagen.id + '?nombre='+imagen.nombre;
          let token = localStorage.getItem("token");
          let { data } = await this.$axios.delete(url, { headers: { token } });
          await this.consultarImagenes(this.destino);
        }
      } catch (error) {
        this.$swal.fire(
          "Operación NO ejecutada.",
          "No se elimino el destino.",
          "error"
        );
      }
    },

  },
};
</script>
