<script>
import { mapState} from "pinia";
import {categoriasStore} from "@/stores/categoriasStore.js";
import comprasAxios from "@/repositories/comprasAxios.js";
export default {
  data() {
    return {
      provincias: [
        "Álava",
        "Albacete",
        "Alicante",
        "Almería",
        "Asturias",
        "Ávila",
        "Badajoz",
        "Barcelona",
        "Burgos",
        "Cáceres",
        "Cádiz",
        "Cantabria",
        "Castellón",
        "Ceuta",
        "Ciudad Real",
        "Córdoba",
        "Cuenca",
        "Girona",
        "Las Palmas",
        "Granada",
        "Guadalajara",
        "Guipúzcoa",
        "Huelva",
        "Huesca",
        "Illes Balears",
        "Jaén",
        "A Coruña",
        "La Rioja",
        "León",
        "Lleida",
        "Lugo",
        "Madrid",
        "Málaga",
        "Melilla",
        "Murcia",
        "Navarra",
        "Ourense",
        "Palencia",
        "Pontevedra",
        "Salamanca",
        "Santa Cruz de Tenerife",
        "Segovia",
        "Sevilla",
        "Soria",
        "Tarragona",
        "Teruel",
        "Toledo",
        "Valencia",
        "Valladolid",
        "Vizcaya",
        "Zamora",
        "Zaragoza"
      ],

      order: {
        email: '',
        name: '',
        surname: '',
        address: '',
        postalCode: '',
        city: '',
        province: '',
        phone: '',
      },
      instanceOptions: {
      },
      elementsOptions: {
      },
      cardOptions: {
        // reactive
        // remember about Vue 2 reactivity limitations when dealing with options
        value: {
          postalCode: ''
        }
        // https://stripe.com/docs/stripe.js#element-options
      }
    };
  },
  methods: {
    async processPayment(){
      const stripeElements = this.$refs.stripeElements;
      const { token, error } = await stripeElements.createToken();

      if (error) {
        // Handle error
        console.error(error);
      } else {
        // Use token for payment
        console.log(token);
      }

      console.log(stripeElements)

    },
    submitOrder() {
      console.log(this.order);
      console.log(this.carrito);
      try {
        comprasAxios.newOrder();
      }catch (error){
        alert(error)
      }
    }
  },
  computed: {
    ...mapState(categoriasStore,{carrito: 'carrito',precioCarrito:'precioCarrito'}),
  },
};
</script>

<template>
<div class="row ">
  <div class="col-0 col-lg-0 col-xl-2"></div>

  <div class="col-12 col-md-11 col-lg-6 col-xl-5 pt-5 mb-5 view">
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
          <div class="form-group col-12  col-md-4">
            <label for="province"></label>
            <select id="province" v-model="order.province">
              <option value="" class="text-muted" disabled>Provincia / Estado</option>
              <option v-for="(provincia, index) in provincias" :key="index" :value="provincia">{{ provincia }}</option>
            </select>
          </div>

        </div>
        <div class="form-group">
          <label for="phone"></label>
          <input type="tel" id="phone" v-model="order.phone" placeholder="Teléfono" required>
        </div>
        <button type="submit">Realizar Pedido</button>
      </form>
    </div>
    <div class="checkout-payment">
      <div class="payment-form">
        <div class="payment-group mt--20">
          <div class="form-row">
            <div class="checkout-title mt--10">
              <h2>Datos del pago</h2>
            </div>
            <cart></cart>
            <button @click="processPayment"></button>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div class="col-12 col-lg-6 col-xl-5 pt-5 pt-md-5 cart-check">
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
    <div class="final-price mt-5 ">
      <div class="row">
        <p class="float-left offset-1 col-7">Subtotal</p>
        <p class="float-left col-4">{{ precioCarrito }} EUR</p>
      </div>
      <div class="row">
        <p class="float-left offset-1 col-7">Envío</p>
        <p v-if="precioCarrito >= 65" class="float-left col-4">Gratis</p>
        <p v-if="precioCarrito < 65" class="float-left col-4">3.90 EUR</p>
      </div>
      <div class="borde"></div>
      <div class="row mt-4 mb-5 final">
        <p class="float-left offset-1 col-7 ">TOTAL</p>
        <p class="float-left col-4">123€</p>
      </div>

    </div>
  </div>

</div>
</template>

<style scoped>
.final{
  font-size: 22px;
}
.borde{
  border-bottom: 1px dashed white;
  width: 73%;
  align-items: center;
  margin-left: 7%;
}
.final-price{
  color: white;
}
.cart-check{
  background-color: #333333;
  min-height: 100vh;
  padding-left: 5vh;
}
.checkout-object{
  padding-bottom: 1.5%;
  padding-top: 1.5%;
  color: white;
  border-bottom: 1px solid white;
}
.img-carrito-check{
  max-width: 18%;
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

.form-group {
  margin-bottom: 1rem;
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