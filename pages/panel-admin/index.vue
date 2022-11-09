<template>
    <div>
        <b-row class="mt-2">
            <b-col>
                <center>
                    <h1>Administración</h1>
                </center>

            </b-col>
        </b-row>
        <b-row class="mt-2">
            <b-col cols="4">
                <b-card footer-tag="footer" header-tag="header" width="100">
                    <template #header>
                        <b>Gestión de Productos</b>
                    </template>
                    <b-button to="/productos/listado" block variant="primary">Listado</b-button>
                    <b-button to="/productos/" block variant="success">Nuevo producto</b-button>
                    <template #footer>
                        <b>Total de productos:</b>#
                    </template>
                </b-card>
            </b-col>
            <b-col cols="4">
                <b-card footer-tag="footer" header-tag="header" width="100">
                    <template #header>
                        <b>Gestión de Usuarios</b>
                    </template>
                    <b-button to="/usuarios/listado" block variant="primary">Listado</b-button>
                    <b-button to="/usuarios/crear" block variant="success">Nuevo usuario</b-button>
                    <template #footer>
                        <b>Total de usuarios:</b>#
                    </template>
                </b-card>
            </b-col>
            <b-col cols="4">
                <b-card footer-tag="footer" header-tag="header" width="100">
                    <template #header>
                        <b>Gestión de Compras</b>
                    </template>
                    <b-button to="/compras/listado" block variant="primary">Listado</b-button>
                    <b-button to="/compras/pendientes" block variant="outline-danger">Pendientes</b-button>
                    <template #footer>
                        <b>Total de compras:</b>#
                    </template>
                </b-card>
            </b-col>

        </b-row>
    </div>

</template>
<script>
export default {

}
</script>