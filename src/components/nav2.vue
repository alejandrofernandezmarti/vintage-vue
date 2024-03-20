<script>
import {mapActions, mapState} from "pinia";
import {categoriasStore} from "@/stores/categoriasStore.js";

export default {
  data() {
    return {
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
  },
  mounted() {
    this.calcularPrecioTotal()
    window.addEventListener('resize', this.handleResize);
  },


  computed: {
    ...mapState(categoriasStore,{carrito: 'carrito',precioCarrito:'precioCarrito'}),
  },
};
</script>

<template>

  <div class = "row main-wrapper">
    <nav class = "navbar  ">

      <div class = "col-5 navbar-collapse order-2 order-md-1">
        <ul class = "navbar-nav">
          <li>
            <a href = "categorias.html" class = "menu-link">
              CATEGORIAS
              <span class = "drop-icon">
                <i class = "fas fa-chevron-down"></i>
              </span>
            </a>

          </li>

          <li>
            <a class = "menu-link">
              ESTILOS
              <span class = "drop-icon">
                <i class = "fas fa-chevron-down"></i>
              </span>
            </a>
            <div class = "sub-menu">

              <div class = "sub-menu-item">
                <h4>Nuestros estilos</h4>
                <ul>
                  <li><a href = "#">Old Money Style</a></li>
                  <li><a href = "#">Basics</a></li>
                  <li><a href = "#">Dailies</a></li>
                  <li><a href = "#">For the weekend</a></li>
                  <li><a href = "#">The craziest one's</a></li>
                </ul>
              </div>

              <div class = "sub-menu-item">

              </div>

              <div class = "sub-menu-item">
                <h2>Vintage clothing</h2>
              </div>
            </div>
          </li>

          <li>
            <a href = "#" class = "menu-link">
              OFERTAS
            </a>
          </li>

          <li>
            <a href = "#" class = "menu-link">
              NOSOTROS
            </a>
          </li>
        </ul>
      </div>

      <div class = "col-2 brand-and-icon order-1  order-md-2">

        <button type = "button" class = "navbar-toggler">
          <i class = "fas fa-bars"></i>
        </button>
        <a href = "/" class = "navbar-brand">3ETERN</a>
      </div>

      <!-------------------------------------------------------------------------------------------------00-->
      <div class = "col-5 navbar-collapse order-3">
        <ul class = "navbar-nav justify-content-end">
          <li>
            <a href = "#">CUENTA</a>
          </li>
          <li>
            <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" >CARRITO ({{carrito.length}})</a>
          </li>
          <div class="offcanvas-wrapper">
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              <div class="offcanvas-header">
                <h6 class="offcanvas-title" id="offcanvasExampleLabel">CARRITO</h6>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <div v-for="(producto, index) in carrito" :key="index" class="cart-object row">
                  <img class="col-3 img-carrito" :src="producto.imagenes?.url_1" alt="Producto">
                  <div class="col-6">
                    <p class="carrito-text">{{ producto.nombre }}</p>
                    <p class="carrito-text">{{ producto.precio }} EUR</p>
                    <p class="carrito-text">Talla: {{ producto.talla }}</p>
                  </div>
                  <div class="col-3 btn-delete">
                    <a class="underlined" @click="eliminarDelCarrito(index)">Eliminar</a>
                  </div>
                </div>
                <div class="row" id="totalPrice">
                  <a class="col-3">TOTAL</a>
                  <a class="col-9 " id="precio">{{ precioCarrito }} EUR</a>
                  <button class="checkout-button">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </nav>

  </div>
/* <script>
  import {mapActions, mapState} from "pinia";
  import {categoriasStore} from "@/stores/categoriasStore.js";

  export default {
    data() {
      return {
        showCategoriesPanel: true
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
    },
    mounted() {
      this.calcularPrecioTotal()
    },


    computed: {
      ...mapState(categoriasStore,{carrito: 'carrito',precioCarrito:'precioCarrito'}),
    },
  };
</script>

  <template>
    <div class="row nav-content">
      <nav class="nav col-12 col-md-5">
        <div class="col-5 info-left">
          <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
             data-bs-auto-close="outside">CATEGORIAS  <i class = "fas fa-chevron-down"></i> </a>
          <div class="dropdown-menu shadow">
            <div class="mega-content px-md-4">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-3 col-sm-6 py-4 px-xl-5 px-4">
                    <h5>Service</h5>
                    <div class="list-group">
                      <a class="list-group-item" href="#">Accomodations</a>
                      <a class="list-group-item" href="#">Terms & Conditions</a>
                      <a class="list-group-item" href="#">Privacy</a>
                      <a class="list-group-item" href="#">Lorum</a>
                      <a class="list-group-item" href="#">Lorum</a>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6 py-4 px-xl-5 px-4">
                    <h5>Service</h5>
                    <div class="list-group">
                      <a class="list-group-item" href="#">Accomodations</a>
                      <a class="list-group-item" href="#">Terms & Conditions</a>
                      <a class="list-group-item" href="#">Privacy</a>
                      <a class="list-group-item" href="#">Lorum</a>
                      <a class="list-group-item" href="#">Lorum</a>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6 py-4 px-xl-5 px-4">
                    <h5>Service</h5>
                    <div class="list-group">
                      <a class="list-group-item" href="#">Accomodations</a>
                      <a class="list-group-item" href="#">Terms & Conditions</a>
                      <a class="list-group-item" href="#">Privacy</a>
                      <a class="list-group-item" href="#">Lorum</a>
                      <a class="list-group-item" href="#">Lorum</a>
                    </div>
                  </div>
                  <div class="col-lg-3 col-sm-6 py-4 px-xl-5 px-4">
                    <h5>Service</h5>
                    <div class="list-group">
                      <a class="list-group-item" href="#">Accomodations</a>
                      <a class="list-group-item" href="#">Terms & Conditions</a>
                      <a class="list-group-item" href="#">Privacy</a>
                      <a class="list-group-item" href="#">Lorum</a>
                      <a class="list-group-item" href="#">Lorum</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a>ESTILOS</a>
          <a>OFERTAS</a>
          <a>NOSOTROS</a>
        </div>
        <div class="col-2 logo">
          <a>3ETERN</a>
        </div>
        <div class="col-5 info-right justify-content-end">
          <a>CUENTA</a>
          <a>CARRITO</a>
        </div>
      </nav>
      <div class="categories-panel" v-if="showCategoriesPanel">
        <!-- Contenido de tu panel de categorías -->
      </div>
    </div>
  </template>

  <style scoped>

  </style>
*/
</template>

<style scoped>

/*  el relative del navbar */

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
  width: 470px;
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
  width: 470px;
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
}
.btn-delete{
  text-align: center;
  margin-top: 14%;
  font-size: 12px;
}
.underlined{
  text-decoration: underline !important;
}
.underlined:hover{
  text-decoration: none !important;
}
.checkout {

  bottom: 0;
  margin-bottom: 0 !important;
  background-color: #fff;
}
/*

 */
</style>
