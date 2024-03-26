<script>
import productsAxios from "@/repositories/productsAxios.js";
import ProductItem from "@/components/ProductItem.vue";
import categoriesAxios from "@/repositories/categoriesAxios.js";

export default {
  data() {
    return {
      productos: [],
      categorias: [],
    }
  },
  components: {
    ProductItem
  },
  async mounted(){
    this.productos = await productsAxios.productosRandom();
    this.categorias = await categoriesAxios.getCategoriasMain();
  },
  methods: {

  }
}
</script>

<template>
  <div class = "">


  <div class="row">
    <div class="fondo col-12">
      <img src="/FondoGrande.jpg"  >
    </div>
  </div>

  <div class="bloque row  g-0">
    <a class="titulos col-12"><strong>PRODUCTOS DESTACADOS</strong></a>

    <ProductItem v-for="product in productos" :key="product.id" :product="product" ></ProductItem>

    <button onclick="window.location.href='/productos'" class="botonMain btn btn-primary"><a href="/productos" class="btn-text">VER TODOS</a></button>

  </div>

  <div class="row no-gutters">
    <div class="fondo col-6">
      <img src="/fotoModelo.webp" >
    </div>
    <div class="fondo col-6">
      <img src="/categorias.webp" >
    </div>
  </div>


  <div class="bloque row no-gutters g-0">
    <a class="titulos col-12"><strong>CATEGORÍAS</strong></a>

    <div v-for="categoria in categorias" :key="categoria.id" class="col-6 col-md-4 col-xl-3">
      <div class="card-category">
        <img :src="'/categorias/' + categoria.imagen" class="card-img-top" :alt="categoria.nombre">
        <div class="card-body">
          <a :href="`/productos/${categoria.id}`" class="name-category">{{ categoria.nombre }}</a>
        </div>
      </div>
    </div>

    <button onclick="window.location.href='/categorias'" class="botonMain btn btn-primary"><a href="/categorias" class="btn-text">VER TODOS</a></button>
  </div>
  </div>

</template>

<style scoped>
.fondo img{
  width: 100%;
  object-fit: cover;
  max-height: 1000px;
}
.bloque{
  margin-left: 5px;
  margin-right: 5px;
}
.titulos{
  margin: 20px 0px;
  text-align: center;
  font-size: 20px;
  color: black;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

section{
  display: none;
}
.img-carousel {
  aspect-ratio: 16/17;
  object-fit: cover; /* Mantiene la proporción y cubre el área designada */
  width: 100%;

}


.card-product img{
  width: 100%;
  object-fit: cover;
  max-height: 1000px;
}
.card-body{
  min-height: 5px;
  padding:  10px 10px 16px 10px;
}
.card-category{
  border: solid white;
  text-align: center;
}
.nameProduct{
  text-align: left;
  font-family: 'Courier New', Courier, monospace;
  color: black;
}
.namePrice{
  float: right;
  font-family: 'Courier New', Courier, monospace;
  color: black;

}
.name-category{
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  color: black;
}
.card-img-top {
  aspect-ratio: 16/17;
  object-fit: cover; /* Mantiene la proporción y cubre el área designada */

}
.botonMain{
  margin-left: 40%;
  background-color: rgb(78, 78, 78);
  border-color: rgb(78, 78, 78);
  width: 20%;
  border-radius: 10px;
  margin-bottom: 30px;
}
.btn-text{
  text-decoration: none;
  color: #ddd;
}
.btn-text:hover{
  color: #ddd;
}

.fotosDiv{
  padding: 2% 5% 5% 2%;
}


.information{
  padding-top: 7%;
}
.boton{
  margin-left: 25%;
  background-color: rgb(78, 78, 78);
  border-color: rgb(78, 78, 78);
  width: 40%;
  border-radius: 10px;
}


/* ------------------------------------------------- filtros formulario -------------------------------------*/
#toggleFiltersBtn{
  width: 80%;
  height: 40px;
  border-radius: 20px;
}
#ordenarPor{
  float: right;
  height: 40px;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 0.5rem;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
}
.options{
  padding: 1% 4%;
}
.filtrosForm{
  padding: 5% 3% 0 5%;
  border-right: solid;
}
.filtrosForm legend{
  padding-top: 10%;
}
.filtros div div{
  border-bottom: solid 1px;
}

.linea-filtro{
  padding: 5px;
  font-size: 20px;
}
.linea-filtro input{
  float: right;
  margin-top: 4%
}
.btn-filtro{
  margin-top: 10%;
  margin-left: 20%;
  background-color: rgb(212, 212, 212);
  width: 60%;
  border-radius: 10px;
}

/*  ------------------------------------------------------ css nav    ------------------------------------------*/
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}
body{
  line-height: 1.4;
}

.main-wrapper img{

  display: block;
}
.main-wrapper a{
  color: #000;
  text-decoration: none;
}
.main-wrapper ul li{
  list-style-type: none !important;
}


/*------------------------------------------header -------------------------------------------------------------------------*/

.header h2{
  margin: 1rem;
  font-size: 3rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: 2px;
}
.header p{
  margin: 1rem auto;
  color: #fff;
  width: 60%;
  opacity: 0.8;
  font-weight: 300;
  font-size: 1.2rem;
  text-align: center;
}
.header button{
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
.header button:hover{
  background: #fff;
  color: #000;
}

/* Media Queries */
@media screen and (max-width: 667px){
  .options{
    margin-top: 20%;
  }
  .linea-filtro input{
    margin-top: 2%
  }
  section{
    display: block;
    margin: 0;
    max-height: 50%;
  }
  #img-grande{
    display: none;
  }
  .information{
    margin-left: 5%;
  }
}




</style>