<script>
import productsAxios from "@/repositories/productsAxios.js";
import {categoriasStore} from "@/stores/categoriasStore.js";
import {mapState} from "pinia";
export default {
  props: ['id'],

  data(){
    return{
      product: {},
      quantities: [10, 20, 30, 50, 70, 100],
      selectedQuantity: 0,
      discountPrice: this.product?.precio_ud,
    }
  },

  async mounted(){
    await this.loadProduct()

  },
  computed: {
    ...mapState(categoriasStore,{carrito: 'carrito'}),
    enCarrito() {
      return this.carrito.some(item => item.id === this.product.id && this.product.tipo === 'Selected');
    }
  },
  methods:{
    agregarAlCarrito() {
      if (this.product.tipo === 'Selected'){
        categoriasStore().agregarAlCarrito(this.product);
      }else {
        categoriasStore().agregarBoxCarrito(this.product,this.selectedQuantity,this.discountPrice);
      }

    },
    async loadProduct() {
      try {
        this.product = await productsAxios.getProductById(this.id)
      } catch (error) {
         this.addMessage(error.message)
      }
    },

    selectQuantity(event,quantity) {
      const cantidades = document.querySelectorAll('.option');

      cantidades.forEach(cantidad => {
        cantidad.classList.remove('selected');
      });

      event.target.classList.add('selected');
      this.selectedQuantity = quantity;

      let descuento = 0;

      if (this.selectedQuantity === 20) {
        descuento = 0.04;
      } else if (this.selectedQuantity === 30) {
        descuento = 0.08;
      } else if (this.selectedQuantity === 50) {
        descuento = 0.12;
      } else if (this.selectedQuantity === 70) {
        descuento = 0.16;
      } else if (this.selectedQuantity === 100) {
        descuento = 0.20;
      }

      this.discountPrice = (this.product?.precio_ud * (1 - descuento)).toFixed(2);
    }
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

    <div class="col-12 col-md-7" id="img-grande">
      <div class="fotosDiv row g-0">
        <div  class="col-12 col-md-6" ><img :src="product.imagenes?.url_1" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="product.imagenes?.url_2" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="product.imagenes?.url_3" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="product.imagenes?.url_4" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="product.imagenes?.url_5" class="card-img-top" alt="Detalle del Producto"></div>
        <div  class="col-12 col-md-6" ><img :src="product.imagenes?.url_6" class="card-img-top" alt="Detalle del Producto"></div>
      </div>
    </div>

    <div class="information col-12 col-md-5">
      <h2 class="productName" >{{product.nombre}}</h2><br>

      <div v-if="product.tipo === 'Box' " class="cantidades row">
        <h4 class="mb-4">Cantidad:</h4>
        <div class="custom-select justify-content-center">
          <div v-for="quantity in quantities" :key="quantity"  >
            <div  class="col-2"><span class="option numberBorder" @click="selectQuantity($event,quantity)">{{ quantity }}</span></div>
          </div>
        </div>
      </div>
      <div v-if="product.tipo === 'Selected' " class="cantidades ">
        <h4 class="col-6">Cantidad: {{product.cantidad}}</h4>
      </div>

      <p class="text-muted"> {{product.descripcion}}</p>
      <p class="text-muted">Precio Ud. <s v-if="this.selectedQuantity >= 20"> {{product.precio_ud}} € </s><span v-if="this.selectedQuantity <= 10"> {{product.precio_ud}} € </span></p>
      <p  v-if="this.selectedQuantity >= 20" class="text-muted">Precio oferta: {{discountPrice}} €</p>
      <br>
      <h5 class="productName">Estado producto</h5>
        <p>{{product.estado}}</p>
        <br>
        <span v-if="product.tipo === 'Box'">
          <button v-if="this.selectedQuantity === 0" class="boton btn ">SELECCIONA UNA CANTIDAD</button>
          <button v-if="this.selectedQuantity !== 0" @click="agregarAlCarrito" class="boton btn ">AÑADIR AL CARRITO</button>
        </span>
        <span v-if="product.tipo === 'Selected'">
          <button v-if="enCarrito" class="boton btn ">AÑADIDO CORRECTAMENTE</button>
          <button v-if="!enCarrito" @click="agregarAlCarrito" class="boton btn ">AÑADIR AL CARRITO</button>
        </span>
      <div v-if="product.tipo === 'Selected'" class="question">
        <p style="font-weight: bold">¿Qué es un BOX?</p>
        <p>Son packs únicos en los cuales sabes de antemano los productos que vas a recibir , es decir, los productos que ves en las imágenes son los que recibirás.</p>
      </div>
      <div v-if="product.tipo === 'Box'" class="question">
        <p style="font-weight: bold">¿Qué es un lote?</p>
        <p>Son sacos clásicos en los que encontrarás productos similares a los de las imágenes con sus mismas características, hay un mínimo margen de error del 10% .</p>
      </div>

    </div>

  </div>

</template>

<style>
.question{
  padding-right: 10% ;
}
.btn{
  border: 1px solid #000000 !important;
  margin-bottom: 100px !important;
  align-items: center !important;
}
.btn:hover{
  background-color: #424242 !important;
  color: #eaeaea !important;
}
.cantidades{
  display: flex;
  padding-right: 10%;
  margin-bottom: 30px;
}
.custom-select {
  display: flex;
  padding-right: 10%;

}

.option {
  cursor: pointer;
  padding: 8px 10px;
  font-size: 15px;
  margin: 0 10px;
}

.option:hover {
  background-color: #f0f0f0;
}

.selected {
  background-color: #b7b7b7;
  border-bottom: solid 1px;
  color: #ffffff;
}

.selected:hover {
  background-color: #838383;
}
.cantidad{
  text-align: center;
}
.numberBorder{
  border-bottom: solid 1px;
  padding: 8px 10px;
  font-size: 20px;
}
</style>