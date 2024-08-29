<script>
import productsAxios from "@/repositories/productsAxios.js";
import ProductItem from "@/components/ProductItem.vue";
import categoriesAxios from "@/repositories/categoriesAxios.js";
import categorias from "@/views/categorias.vue";

export default {
  computed: {
    categorias() {
      return categorias
    }
  },
  data() {
    return {
      productos: [],
      categorias: [],
      selected: [],
    }
  },
  components: {
    ProductItem
  },
  async mounted(){
    this.productos = await productsAxios.productosRandom();
    this.categorias = await categoriesAxios.getCategoriasMain();
    this.selected = await productsAxios.selectedRandom();
  },
  methods: {
    toUpperCase(text) {
      return text.toUpperCase();
    }
  }
}
</script>

<template>
  <div>
    <div class="row">
      <div class="fondo col-12">
        <div class="overlay"></div>
        <img src="/fondo.jpg" alt="Fondo">
        <div class="text-overlay">VALENCIA VINTAGE WHOLESALE</div>
      </div>
    </div>

    <div class="bloque row g-0">
      <a class="titulos col-12"><strong>PRODUCTOS DESTACADOS</strong></a>
      <ProductItem v-for="product in productos" :key="product.id" :product="product"></ProductItem>
      <div class="col-6 col-md-4 col-xl-3 mb-2">
        <button onclick="window.location.href='/productos'" class="btn-main">VER TODOS</button>
      </div>
    </div>

    <div class="bloque row g-0">
      <a class="titulos col-12"><strong>BOXES</strong></a>
      <ProductItem v-for="product in selected" :key="product.id" :product="product"></ProductItem>
      <div class="col-6 col-md-4 col-xl-3 mb-2">
        <button onclick="window.location.href='/selected'" class="btn-main">VER TODOS</button>
      </div>
    </div>

    <div class="bloque row no-gutters g-0">
      <a class="titulos col-12"><strong>LOTES</strong></a>
      <div v-for="selectItem in categorias" :key="selectItem.id" class="col-6 col-md-4 col-xl-3 mb-2">
        <div class="card-product">
          <img :src="'/categorias/' + selectItem.imagen" class="card-img-top" :alt="selectItem.nombre">
          <div class="card-body row g-0">
            <a :href="`/productos/${selectItem.id}`" class="name-category">{{ toUpperCase(selectItem.nombre) }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.fondo {
  position: relative;
  text-align: center;
  max-height: 500px;
}

.fondo img {
  width: 100%;
  display: block;
  max-height: 500px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Ajusta el color y la opacidad aquí */
  pointer-events: none;
}

.text-overlay {
  position: absolute;
  font-family: 'Courier New', Courier, monospace;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 4vw;
  font-weight: 400;
  width: 100%;
  padding: 0 10%;
  box-sizing: border-box; /* Incluye el padding en el cálculo del ancho */
  pointer-events: none; /* Para permitir hacer clic a través del texto si es necesario */
  white-space: nowrap; /* Evita que el texto se divida en varias líneas */
}

.bloque {
  margin-left: 5px;
  margin-right: 5px;
}

.titulos {
  text-decoration: none;
  font-weight: 300;
  padding: 40px 0px;
  text-align: center;
  font-size: 3vh;
  color: black;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}


.card-product img {
  width: 100%;
  object-fit: cover;
  max-height: 1000px;
}

.card-body {
  min-height: 5px;
  padding: 10px 10px 16px 10px;
}

.name-category {
  text-align: center;
  font-family: Helvetica, serif;
  color: black;
}

.card-img-top {
  aspect-ratio: 16/17;
  object-fit: cover;
}

.btn-main {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3vh; /* Ajusta el tamaño del texto según sea necesario */
  background-color: white;
  border: none;
  text-align: center;
  padding: 0;
  transition: ease-in-out 0.2s;
}
.btn-main:hover{
  background-color: #eaeaea;
}
.btn {
  margin-left: 40%;
  margin-top: 25px;
  margin-bottom: 20px !important;
  color: #efefef;
  background-color: rgb(78, 78, 78);
  border-color: rgb(78, 78, 78);
  width: 20%;
  border-radius: 10px;
}

.btn:hover {
  color: #212121 !important;
  background-color: #eeeeee !important;
}

.filtrosForm legend {
  padding-top: 10%;
}

.filtros div div {
  border-bottom: solid 1px;
}

/*  ------------------------------------------------------ css nav    ------------------------------------------*/
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

body {
  line-height: 1.4;
}

.main-wrapper img {
  display: block;
}

.main-wrapper a {
  color: #000;
  text-decoration: none;
}

.main-wrapper ul li {
  list-style-type: none !important;
}

/*------------------------------------------header -------------------------------------------------------------------------*/
.header h2 {
  margin: 1rem;
  font-size: 3rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: 2px;
}

.header p {
  margin: 1rem auto;
  color: #fff;
  width: 60%;
  opacity: 0.8;
  font-weight: 300;
  font-size: 1.2rem;
  text-align: center;
}

.header button {
  margin: 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  background: #000;
  color: #fff;
  border: none;
  padding: 0.8rem 1.5rem;
  transition: all 0.5s ease;
  cursor: pointer;
}

.header button:hover {
  background: #fff;
  color: #000;
}

/* Media Queries */
@media screen and (max-width: 667px) {
  section {
    display: block;
    margin: 0;
    max-height: 50%;
  }

  .btn {
    width: 50%;
    margin-left: 25%;
  }
}




</style>