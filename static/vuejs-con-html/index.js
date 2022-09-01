
var app = new Vue({
    el: '#app',
    // State: Estado de los datos de mi aplicación/componente/página
    // El state (data) se une a los inputs del html por medio del v-model
    data: {
        message: 'Hello Vue!',
        product: {},
        nombre:""
    },
    // Metodos: Metodos a utilizar 
    methods: {
        changeMessage() {
            this.message = "Buenas tardes, dllo web"
        },

        createProduct() {
            console.log(this.product);
        }
    }
})