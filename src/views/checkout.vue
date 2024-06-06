<script>
import {mapActions, mapState} from "pinia";
import {categoriasStore} from "@/stores/categoriasStore.js";
import productsAxios from "@/repositories/productsAxios.js";
import { useUserStore } from '@/stores/userStore.js';
import usersAxios from "@/repositories/usersAxios.js";

export default {
  data() {
    return {
      productosJSON: '',
      user: {},
    };
  },

  async mounted() {
    this.loadCarrito()
    this.user = await usersAxios.getUserInfo()
  },
  computed: {
    ...mapState(categoriasStore,{carrito: 'carrito',precioCarrito:'precioCarrito',precioEnvio:'precioEnvio',total:'precioTotal'}),
    ...mapState(useUserStore,{token: 'token'}),
    if(){

    }
  },
  methods:{
    ...mapActions(categoriasStore, ['loadCarrito','vaciarCarrito']),
    vaciarCart(){
      this.vaciarCarrito()
    }
  }
};
</script>

<template>
  <div v-if="carrito.length > 0" class="row ">
    <div  class="col-0 col-lg-0 col-xl-2"></div>

    <div class="col-12 col-md-11 col-lg-6 col-xl-5 pt-5 mb-5 view">
      <h5 class="offset-1 freeShip">ENVÍO GRATUITO DESDE 400 EUR</h5>
      <div class="order-form">
        <div class="final-price mt-5">
          <div class="row">
            <p class="float-left offset-1 col-7">Subtotal</p>
            <p class="float-left col-4">{{ precioCarrito }} EUR</p>
          </div>
          <div class="row">
            <p class="float-left offset-1 col-7">Envío</p>
            <p v-if="precioCarrito === '0'" class="float-left col-4">Gratis</p>
            <p v-if="precioCarrito !== '0'" class="float-left col-4">{{ precioEnvio }} EUR</p>
          </div>
          <div class="borde"></div>
          <div class="row mt-4 mb-5 final">
            <span class="float-left offset-1 col-md-7 col-5 ">TOTAL</span>
            <span class="totalPrice  col-md-4 col-6">{{ total }} EUR</span>
          </div>
        </div>
      </div>

      <form ref="form" action="http://127.0.0.1:8000/checkout" method="POST">
        <input type="hidden" name="productos[]" v-for="(producto, index) in carrito" :key="index" :value="JSON.stringify(producto)">
        <input type="hidden" name="email" :value="this.user.email">
        <input type="hidden" name="id" :value="this.user.id">
        <button type="submit" @click="this.vaciarCart()" class="align-content-center payBtn">CONTINUAR CON PAGO Y ENVÍO</button>
      </form>
    </div>

    <div class="col-12 col-lg-6 col-xl-5 pt-5 pt-md-5 cart-check">
      <div v-for="(producto, index) in carrito" :key="index" class="checkout-object row">
        <img class="col-4 img-carrito-check" :src="producto.imagenes?.url_1" alt="Producto">
        <div class="col-8">
          <p class="carrito-text">{{ producto.nombre }}</p>
          <p class="carrito-text">{{ producto.precio_ud }} EUR</p>

          <div class="row ">
            <p class="carrito-text col-6">Cantidad: {{ producto.cantidad }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="empty-cart-message text-center">
    <h3 class="text-muted">Todavía no hay productos en tu carrito</h3>
  </div>
</template>

<style scoped>
.empty-cart-message {
  padding: 200px 20px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
}

.empty-cart-message h3 {
  font-weight: bold;
  color: #6c757d;
}
.payBtn{
  margin-right: 10%;
  width: 83%;
}
.totalPrice{
  text-align: right !important;
}
.final{
  font-size: 20px;
  width: 90%;
}
@media screen and (max-width: 667px){
  .freeShip{
    font-size: 16px;
  }
  .final{
    width: 100%;
  }
  .payBtn{
    margin-right: 8%;
  }
}
.freeShip{
  color: #9a9a9a;
  padding-left: 5%;
  border-bottom: 1px solid;
  text-align: center;
  width: 80%;
  margin-bottom: 100px !important;
}
.float-left{
  color: black;
}

.borde{
  border-bottom: 1px dashed #000000;
  width: 83%;
  align-items: center;
  margin-left: 7%;
}
.final-price{
  color: #000000;
}
.cart-check{
  background-color: #f1f1f1;
  min-height: 100vh;
  padding-left: 5vh;
}
.checkout-object{
  padding-bottom: 1.5%;
  padding-top: 1.5%;
  color: #2f2f2f;
  border-bottom: 1px solid #4b4b4b;
}
.img-carrito-check{
  max-width: 23%;
  aspect-ratio: 19/16;
  object-fit: cover
}
@media screen and (max-width: 667px){
  .view{
    padding-left: 10%;
    padding-right: 10%;
  }
  .img-carrito-check{
    max-width: 30%;
  }
}
@media screen and (max-width: 992px){
  .img-carrito-check{
    max-width: 30%;
  }
  .view{
    padding-left: 10%;
  }
}

label {
  display: block;
  font-weight: bold;
}
input[type="text"],
input[type="email"],
select,
input[type="tel"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.5rem 1rem;
  background-color: #2f2f2f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
  width: 100%;
}
button:hover {
  background-color: #565656;
}

</style>