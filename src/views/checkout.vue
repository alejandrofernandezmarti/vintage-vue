<script>
import {mapState} from "pinia";
import {categoriasStore} from "@/stores/categoriasStore.js";

export default {
  data() {
    return {
      order: {
        email: '',
        name: '',
        surname: '',
        address: '',
        postalCode: '',
        city: '',
        province: '',
        phone: ''
      }
    };
  },
  methods: {
    submitOrder() {
      // Aquí puedes enviar los datos del pedido a través de una solicitud HTTP
      console.log(this.order);
      // Por ejemplo:
      // axios.post('/api/order', this.order)
      //   .then(response => {
      //     console.log(response.data);
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });
    }
  },
  computed: {
    ...mapState(categoriasStore,{carrito: 'carrito',precioCarrito:'precioCarrito'}),
  },
};
</script>

<template>
<div class="row ">
  <div class="col-0 col-lg-2"></div>

  <div class="col-12 col-md-7 col-lg-5 pt-5 mb-5">
    <div class="order-form">

      <form @submit.prevent="submitOrder">
        <h3>Información de contacto</h3>
        <div class="form-group mt-4">
          <label for="email"></label>
          <input type="email" id="email" v-model="order.email" placeholder="Correo Electrónico" required>
        </div>
        <h3 class="mt-5">Dirección de envío</h3>
        <div class="row">
          <div class="form-group mt-3 col-12 col-md-6">
            <label for="name"></label>
            <input type="text" id="name" v-model="order.name" placeholder="Nombre" required>
          </div>
          <div class="form-group mt-3 col-12 col-md-6">
            <label for="name"></label>
            <input type="text" id="name" v-model="order.surname" placeholder="Apellidos" required>
          </div>
        </div>

        <div class="form-group">
          <label for="address"></label>
          <input type="text" id="address" v-model="order.address" placeholder="Dirección" required>
        </div>
        <div class="row">
          <div class="form-group col-12  col-md-4">
            <label for="postal-code"></label>
            <input type="text" id="postal-code" v-model="order.postalCode" placeholder="Código Postal" required>
          </div>
          <div class="form-group col-12 col-md-4">
            <label for="city"></label>
            <input type="text" id="city" v-model="order.city" placeholder="Ciudad" required>
          </div>
          <div class="form-group col-12 col-md-4">
            <label for="province"></label>
            <input type="text" id="province" v-model="order.province" placeholder="Provincia" required>
          </div>
        </div>
        <div class="form-group">
          <label for="phone"></label>
          <input type="tel" id="phone" v-model="order.phone" placeholder="Teléfono" required>
        </div>
        <button type="submit">Realizar Pedido</button>
      </form>
    </div>
  </div>

  <div class="col-12 col-md-5 pt-5 pt-md-5 cart-check">
    <div v-for="(producto, index) in carrito" :key="index" class="checkout-object row">
      <img class="col-4 img-carrito-check" :src="producto.imagenes?.url_1" alt="Producto">
      <div class="col-8">
        <p class="carrito-text">{{ producto.nombre }}</p>
        <p class="carrito-text">{{ producto.precio }} EUR</p>

        <div class="row ">
          <p class="carrito-text col-6">Talla: {{ producto.talla }}</p>
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<style scoped>
.cart-check{
  background-color: #333333;
  height: 100vh;
  padding-left: 5vh;
}
.checkout-object{
  margin-bottom: 4%;
  color: white;
}
.img-carrito-check{
  max-width: 18%;
  aspect-ratio: 19/16;
  object-fit: cover
}
.view{
  padding-left: 10%;
  padding-right: 10%;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  font-weight: bold;
}
input[type="text"],
input[type="email"],
input[type="tel"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}

</style>