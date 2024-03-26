<script>
import productsAxios from "@/repositories/productsAxios.js";
import {categoriasStore} from "@/stores/categoriasStore.js";
import {mapState} from "pinia";
export default {
  props: ['id'],

  data(){
    return{
      product: {},

    }
  },

  async mounted(){
    await this.loadProduct()

  },
  computed: {
    ...mapState(categoriasStore,{carrito: 'carrito'}),
    enCarrito() {
      return this.carrito.some(item => item.id === this.product.id);
    }
  },
  methods:{
    agregarAlCarrito() {
      categoriasStore().agregarAlCarrito(this.product);
    },
    async loadProduct() {
      try {
        this.product = await productsAxios.getProductById(this.id)
      } catch (error) {
         this.addMessage(error.message)
      }
    },

  }
}
</script>

<template>
  <div class="row g-0">
    <section id="sec-carousel" class="col-12">
      <div id="carousel" class="carousel carousel-dark slide mx-auto border">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="4" aria-label="Slide 5"></button>
          <button type="button" data-bs-target="#carousel" data-bs-slide-to="5" aria-label="Slide 6"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img :src="product.imagenes?.url_1" class="img-carousel d-block" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="product.imagenes?.url_2" class="img-carousel d-block" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="product.imagenes?.url_3" class="img-carousel d-block" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="product.imagenes?.url_4" class="img-carousel d-block" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="product.imagenes?.url_5" class="img-carousel d-block" alt="...">
          </div>
          <div class="carousel-item">
            <img :src="product.imagenes?.url_6" class="img-carousel d-block" alt="...">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </section>

    <div class="col-12 col-md-8" id="img-grande">
      <div class="fotosDiv row g-0">
        <div  class="col-12 col-md-6" ><img :src="product.imagenes?.url_1" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="product.imagenes?.url_2" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="product.imagenes?.url_3" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="product.imagenes?.url_4" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="product.imagenes?.url_5" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="product.imagenes?.url_6" class="card-img-top" alt="Detalle del Producto"></div>
      </div>
    </div>

    <div class="information col-12 col-md-4">
      <h2 class="productName" >{{product.nombre}}</h2><br>
      <p class="text-muted">TALLA: {{product.talla}}</p>
      <p class="text-muted">Marca: {{product.marca}}</p>
      <p  v-if="product.descuento !== null" class="text-muted">Precio anterior: <s>{{product.descuento}} €</s></p>
      <p class="text-muted">Precio: {{product.precio}} €</p>
      <br>
      <h5 class="productName">Medidas: </h5>
      <p class="text-muted">Alto: {{product.medidas?.alto}} cm</p>
      <p class="text-muted">Ancho: {{product.medidas?.ancho}} cm</p>
      <p class="text-muted">Mangas: {{product.medidas?.manga}} cm</p><br>

      <h5 class="productName">Estado producto</h5>
        <p>{{product.estado}}</p>
        <br>
        <button v-if="!enCarrito" @click="agregarAlCarrito" class="boton btn btn-primary">AÑADIR AL CARRITO</button>
        <button v-if="enCarrito" class="boton btn btn-primary">AÑADIDO CORRECTAMENTE</button>
    </div>

  </div>

</template>

<style scoped>

</style>