<template>
  <div>
    <h1>Gestión de tareas</h1>
    <p>Formulario para la gestión de tareas de los estudiantes.</p>

    <form action="javascript:void(0)" @submit="saveUser">

      <v-text-field label="Nombre" v-model="user.name" required placeholder="Ingrese su nombre" />

      <v-text-field label="Correo" v-model="user.email" type="email" placeholder="Ingrese su correo" />

      <v-textarea label="Descripción" v-model="user.description" cols="10" rows="3"></v-textarea>

      <v-checkbox v-model="user.conditions">
        <template v-slot:label>
          <a href="http://google.com" target="_blank">Acepta terminos y condiciones</a>
        </template>
      </v-checkbox>

      <label>Tipo de tarea</label>
      <v-radio-group v-model="user.type">
        <v-radio label="Actividad" value="typeA"></v-radio>
        <v-radio label="Tarea" value="typeB"></v-radio>
      </v-radio-group>

      <v-select @change="updatePeriod()" label="Semestre" v-model="user.period" :items="['Semestre 1', 'Semestre 2', 'Semestre 3']"></v-select>


      <v-btn type="submit" >Enviar</v-btn>

    </form>
  </div>
</template>
<script setup>
const user = ref({ conditions: true, period: '1' })
const saveUser = () => {
  console.log(user.value);
}
const updatePeriod = () => {
  console.log(user.value);
}

</script>