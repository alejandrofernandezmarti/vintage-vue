<script>
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
  <nav class = "navbar  ">

    <div class = "navbar-collapse order-2 order-md-1 ">
      <ul class = "navbar-nav">
        <div class="nav-left navbar-nav col-4">
          <li>
            <a href = "" class = "menu-link">
              CATEGORIAS
              <span class = "drop-icon">
              <i class = "fas fa-chevron-down"></i>
            </span>
            </a>
            <div class = "sub-menu">
              <div class = "sub-menu-item">
                <h4>Ropa</h4>
                <ul>
                  <li><a href = "#">Sudaderas</a></li>
                  <li><a href = "#">Jerseys</a></li>
                  <li><a href = "#">Camisetas</a></li>
                  <li><a href = "#">Pantalones</a></li>
                  <li><a href = "#">Cazadoras</a></li>
                </ul>
              </div>
              <div class = "sub-menu-item">
                <h4>Complementos</h4>
                <ul>
                  <li><a href = "#">Gorras</a></li>
                  <li><a href = "#">Bolsos</a></li>
                </ul>
              </div>
            </div>
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
        </div>

        <div class = "d-none d-md-block brand-and-icon order-1  order-md-2 col-6">
          <li >
            <a href = "index.html" class = "navbar-brand">3ETERN</a>
          </li>
        </div>
        <div class="nav-right navbar-nav order-3 justify-content-end col-2">
          <li class="carrito  " >
            <a class="align-self-center" href = "#">CUENTA</a>
          </li>
          <li class="order-3 carrito  " >
            <a class="align-self-center" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" >CARRITO</a>
          </li>
        </div>

      </ul>
    </div>
    <div class = "col-2 brand-and-icon order-1  order-md-2 d-sm-block d-md-none">
      <button type = "button" class = "navbar-toggler">
        <i class = "fas fa-bars"></i>
      </button>
      <a href = "index.html" class = "navbar-brand">3ETERN</a>
    </div>
  </nav>
</template>

<style scoped>
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
  font-size: 0.9rem;
  display: block;
  margin: 0.2rem 0;
  border-radius: 1px;
  transition: all 0.4s ease;
}
.brand-and-icon{
  width: 20%;
  padding-right: 8%;
}
</style>
