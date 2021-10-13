
const comun = {

    methods: {
        cerrarSesion() {
            localStorage.removeItem('token')
            localStorage.removeItem('nombre_usuario')
            this.$router.push("/login");
        }
    }
}

export default comun