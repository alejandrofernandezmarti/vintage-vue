<script>
import {mapActions, mapState} from "pinia";
import {categoriasStore} from "@/stores/categoriasStore.js";
import {useUserStore } from "@/stores/userStore.js";
import { computed } from 'vue';
export default {
  data() {
    return {
      showCategoriesPanel: true,
      collapsed: false
    };
  },

  methods: {
    ...mapActions(categoriasStore, ['calcularPrecioTotal']),
    agregarAlCarrito(producto) {
      categoriasStore().agregarAlCarrito(producto);
    },
    eliminarDelCarrito(index) {
      categoriasStore().eliminarDelCarrito(index);
    },
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    redirectToCheckout() {
      this.$router.push('/checkout'); // Ajusta la ruta según sea necesario
    },
  },
  mounted() {
    this.calcularPrecioTotal()
  },


  computed: {
    ...mapState(categoriasStore,{carrito: 'carrito',precioTotal:'precioTotal'}),
    ...mapState(useUserStore,{token: 'token'}),

  },
};
</script>

<template>
  <nav>
    <!-- Contenido para dispositivos xs -->
    <div class="row  d-lg-none xs-nav">
      <div class="col-4 ">
        <span class="fas fa-bars options" data-bs-toggle="offcanvas" href="#offcanvasCat" role="button" aria-controls="offcanvasExample"></span>
      </div>
      <div class="col-4 xs-logo ">
        <a href="/"><img class="logo" src="/logos/logoVV3.png"></a>

        <div class="offcanvas-wrapper">
          <div class="offcanvas offcanvas-start" tabindex="1" id="offcanvasCat" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
              <h6 class="offcanvas-title" id="offcanvasExampleLabel">MENU</h6>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="list-unstyled " >
                <li class="mb-1">
                  <button class="btn-xs d-inline-flex align-items-center rounded" data-bs-toggle="collapse" data-bs-target="#components-collapse" aria-expanded="true" aria-current="true" @click="toggleCollapse">
                  Lotes<span class="material-symbols-outlined arrow-down" v-if="!collapsed">arrow_drop_down</span>
                    <span class="material-symbols-outlined arrow-up" v-else>arrow_drop_up</span>
                  </button>
                  <div class="collapse xs-list" id="components-collapse">
                    <ul class="list-unstyled components">
                      <h6 class="mt-1">Tops</h6>
                      <li><a href = "/productos/1">Sudaderas</a>
                      </li>
                      <li><a href = "/productos/2">Jerseys</a>
                      </li>
                      <li><a href = "/productos/3">Camisetas</a>
                      </li>
                      <li><a href = "/productos/4">Camisas</a>
                      </li>
                      <li><a href = "/productos/5">Chaquetas</a>
                      </li>
                      <li><a href = "/productos/6">Cazadoras</a>
                      </li>
                      <h6 class="mt-3">Bottoms</h6>
                      <li><a href = "/productos/7">Pantalones</a>
                      </li>
                      <li><a href = "/productos/8">Shorts</a>
                      </li>
                      <h6 class="mt-3">Complementos</h6>
                      <li><a href = "/productos/9">Gorras</a></li>
                      <li><a href = "/productos/10">Bolsos</a></li>
                      <a href = "/productos" >Ver todos</a>
                    </ul>
                  </div>
                </li>
                <li class="mb-1">
                  <button class="btn-xs d-inline-flex" >
                    <a href="/selected">Boxes</a>
                  </button>
                </li>
                <li v-if="this.token != null" class="mb-1" >
                  <button class="btn-xs d-inline-flex" >
                    <a href="/cuenta">Cuenta</a>
                  </button>
                </li>
                <li v-else class="mb-1" >
                  <button class="btn-xs d-inline-flex  rounded" >
                    <a href="/login">Cuenta</a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <div class="col-4 xs-bag ">
        <span class="material-symbols-outlined icono" data-bs-toggle="offcanvas" href="#offcanvasExampleXS" role="button" aria-controls="offcanvasExample">shopping_bag</span>
        <em class="roundpoint" data-bs-toggle="offcanvas" href="#offcanvasExampleXS" role="button" aria-controls="offcanvasExample"><p>{{carrito.length}}</p></em>

        <div class="offcanvas-wrapper">
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExampleXS" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
              <h6 class="offcanvas-title" id="offcanvasExampleLabel">CARRITO</h6>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div v-if="carrito.length > 0" class="offcanvas-body">
              <div v-for="(producto, index) in carrito" :key="index" class="cart-object row">
                <img class="col-4 img-carrito" :src="producto.imagenes?.url_1" alt="Producto">
                <div class="col-8">
                  <p class="carrito-text">{{ producto.nombre }}</p>
                  <p class="carrito-text">{{ producto.precio_ud }} EUR</p>

                  <div class="row ">
                    <p class="carrito-text col-6">Cantidad: {{ producto.cantidad }}</p>
                    <a class="underlined col-6 btn-delete" @click="eliminarDelCarrito(index)">Eliminar</a>
                  </div>
                </div>

              </div>
              <div class="row" id="totalPrice">
                <a class="col-3">TOTAL</a>
                <a class="col-9 " id="precio">{{ precioTotal }} EUR</a>
                <button class="checkout-button" data-bs-toggle="offcanvas"  @click="redirectToCheckout">CHECKOUT</button>
              </div>
            </div>
            <div v-else>
              <h4 class="empty-cart-message">Añade productos al carrito</h4>
            </div>
          </div>
        </div>

      </div>
    </div>
  </nav>
  <nav class = "navbar">
    <!-- Contenido para dispositivos sm y mayores -->
    <div class = "navbar-collapse order-2 order-md-1 d-none d-lg-block">
      <ul class = "navbar-nav">
        <div class="nav-left navbar-nav col-4">
          <li>
            <a href = "/productos" class = "menu-link">
              LOTES
              <span class = "drop-icon">
              <i class = "fas fa-chevron-down"></i>
            </span>
            </a>
            <div class = "sub-menu">
              <div class = "sub-menu-item">
                <h4>Ropa</h4>
                <ul class="list-unstyled">
                  <li><a href = "/productos/1">Sudaderas</a></li>
                  <li><a href = "/productos/2">Jerseys</a></li>
                  <li><a href = "/productos/3">Camisetas</a></li>
                  <li><a href = "/productos/4">Camisas</a></li>
                  <li><a href = "/productos/5">Chaquetas</a></li>
                  <li><a href = "/productos/6">Cazadoras</a></li>
                </ul>
              </div>
              <div class = "sub-menu-item">
                <h4>Pantalones</h4>
                <ul class="list-unstyled">
                  <li><a href = "/productos/7">Pantalones</a></li>
                  <li><a href = "/productos/8">Shorts</a></li>
                </ul>
                <h4>Complementos</h4>
                <ul class="list-unstyled">
                  <li><a href = "/productos/9">Gorras</a></li>
                  <li><a href = "/productos/10">Bolsos</a></li>
                </ul>
              </div>

            </div>
          </li>

          <li>
            <a href = "/selected" class = "menu-link">
              BOXES
            </a>
          </li>
          <li>
          <a href = "/servicios" class = "menu-link">
            SERVICIOS
          </a>
          </li>
        </div>

        <div class = "d-none d-sm-block brand-and-icon order-1  order-md-2 col-6">
          <li >
            <a href = "/" class = "navbar-brand xs-logo"><img class="logo" src="/logos/logoVV3.png"></a>
          </li>
        </div>
        <div class="nav-right navbar-nav order-3 justify-content-end col-2">
          <li v-if="this.token != null" class="carrito" >
            <a class="align-self-center" href="/cuenta">CUENTA</a>
          </li>
          <li v-else class="carrito" >
            <a class="align-self-center" href="/login">CUENTA</a>
          </li>
          <li class="order-3 carrito  " >
            <a class="align-self-center" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" ><a>CARRITO</a>
              <em class="roundpoint" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"><p>{{carrito.length}}</p></em>
            </a>
          </li>
          <div class="offcanvas-wrapper">
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              <div class="offcanvas-header">
                <h6 class="offcanvas-title" id="offcanvasExampleLabel">CARRITO</h6>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div v-if="carrito.length > 0" class="offcanvas-body">
                <div v-for="(producto, index) in carrito" :key="index" class="cart-object row">
                  <img class="col-4 img-carrito" :src="producto.imagenes?.url_1" alt="Producto">
                  <div class="col-8">
                    <p class="carrito-text">{{ producto.nombre }}</p>
                    <p class="carrito-text">{{ producto.precio_ud }} EUR</p>

                    <div class="row ">
                      <p class="carrito-text col-6">Cantidad: {{ producto.cantidad }}</p>
                      <a class="underlined col-6 btn-delete" @click="eliminarDelCarrito(index)">Eliminar</a>
                    </div>
                  </div>

                </div>
                <div class="row" id="totalPrice">
                  <a class="col-3">TOTAL</a>
                  <a class="col-9 " id="precio">{{ precioTotal }} EUR</a>
                  <button class="checkout-button" data-bs-toggle="offcanvas"  @click="redirectToCheckout">CHECKOUT</button>
                </div>
              </div>
              <div v-else>
                <h4 class="empty-cart-message">Añade productos al carrito</h4>
              </div>
            </div>
          </div>
        </div>

      </ul>

    </div>

  </nav>
</template>

<style scoped>
.empty-cart-message {
  text-align: center;
  margin-top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: #555;
  font-weight: 400;
}
.logo{
  width: 70%;
}
.btn-xs{
  border: none;
  font-size: 17px;
  background-color: white;
  margin-bottom: 8px;
  padding-left: 10px;
}
.components{
  font-size: 16px;
  margin-left: 30px;
  font-weight: 100;
  letter-spacing: 0px;
  margin-bottom: 10px;
}
.xs-list ul li{
  opacity: 0.8;
  transition: all 0.5s ease;
  cursor: pointer;
  padding-left: 20px;
}
.xs-list ul li:hover{
  padding-left: 35px;
  opacity: 0.9;
}
.components li{
  margin-bottom: 5px;
}
.mb-1{
  text-align: left;
  border-bottom: solid 1px #b9b9b9;
}
a{
  text-decoration: none !important;
  color: #111111 !important;
}
.roundpoint{
  position: absolute;
  top: 25px;
  right: 20px;
  width: 25px;
  height: 25px;
  background-color: #2f2f2f;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  font-size: 12px;
  text-align: center;
  font-style: normal;
  line-height: 16px;
  color: #fff;
}
.roundpoint p{
  margin-top: 4px;
}
.xs-nav{
  flex-direction: row;
}
.options{
  font-size: 30px;
  margin-top: 20px;
  padding-left: 20px;
}
.icono{
  font-size: 30px;
}
.navbar{
  padding: 0 !important;
}
.xs-logo{
  text-align: center;
  margin-top: 13px;
  font-size: 1.8rem;
  letter-spacing: 3px;
  font-weight: 700;
}
.xs-bag{
  margin-top: 20px;
  font-size: 30px;
  text-align: right;
  padding-right: 57px;
}
.carrito a{
  padding-right: 20px;
}
.nav-left{
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: row !important;
  width: 40%;
}
.nav-left > li > a{
  border-bottom: none;
  padding: 1.7rem 1.8rem 1.7rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 500;
}
.nav-right{
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: row !important;
  width: 40%;
}

.nav-right > li > a{
  border-bottom: none;
  padding: 1.7rem 1.8rem 1.7rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 500;
}
.nav-left > li:hover .sub-menu{
  display: grid!important;
  grid-template-columns: repeat(4, 1fr);
  padding: 0 5rem;
}
.nav-left > li{
  border-bottom: 2px solid transparent;
  transition: border-bottom 0.4s ease;
}
.nav-left > li:hover{
  border-bottom-color: #000;
}
.nav-left > li > a{
  font-size: 0.8rem;
  display: block;
  border-radius: 1px;
  transition: all 0.4s ease;
}
.brand-and-icon{
  width: 20%;
  padding-right: 8%;
}
.sub-menu-item ul{
  margin-left: 20px;
}


/*   ------------- relative canvas ----------  */
.offcanvas-wrapper {
  position: relative;
}
#precio{
  text-align: right;
}
#offcanvasExample .offcanvas-body {
  position: relative;
  overflow-y: auto;
}
#totalPrice {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 410px;
  background-color: white;
  z-index: 1;
  padding: 1%;
  border-top: solid black 1px;
}
.checkout-button {
  display: block;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #2f2f2f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: calc(100% - 2 * 20px);
  margin-left: 20px;
}
.checkout-button:hover {
  background-color: #525252;
}
.offcanvas-body {
  position: relative;
  padding-bottom: 100px;
}
.offcanvas-end{
  width: 570px;
}
.cart-object{
  margin-bottom: 4%;
}
.img-carrito{
  max-width: 30%;
  aspect-ratio: 19/16;
  object-fit: cover
}
.carrito-text{
  font-weight: 300;
  font-family:Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin-bottom: 10px;
}
.btn-delete{
  font-size: 12px;
}
.underlined{
  text-decoration: underline !important;
}
.underlined:hover{
  text-decoration: none !important;
}
@media screen and (max-width: 991px){

  #offcanvasExampleXS .offcanvas-body {
    position: relative;
    overflow-y: auto;
    text-align: left;
  }
  #totalPrice {
    font-size: 15px;
    padding: 10px;
    margin-left: 0;
  }
  .checkout-button {
    display: block;
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #2f2f2f;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: calc(100% - 2 * 20px);
    margin-left: 20px;
  }
  .total{
    text-align: left;
  }
  .btn-close{
    font-size: 18px;
  }
}
</style>
