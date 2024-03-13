<script>
import ProductItem from '@/components/ProductItem.vue'
import productsAxios from "@/repositories/productsAxios.js";
import {mapState} from "pinia";
import {categoriasStore} from "@/stores/categoriasStore.js";

export default {
  components: {
    ProductItem
  },
  data() {
    return {
      productos: [],
      offcanvasVisible: false,
    }
  },
  computed: {
    ...mapState(categoriasStore,{categories: 'categories',brands:'brands'}),

  },
  async mounted(){
    this.productos = await productsAxios.getAllProducts();
  },

  methods: {
    ocultarOffcanvas() {
      const closeButton = document.getElementById('closeBtn')
      if (closeButton) {
        closeButton.click()
      }
    },
    async aplicarFiltros() {
      const categorias = {};
      const marcas = {};

      this.categories.forEach(category => {
        const checkbox = document.querySelector(`input[name='categoria-${category.id}']`);
        if (checkbox.checked) {
          categorias[category.id] = true;
        }
      });

      this.brands.forEach(brand => {
        const checkbox = document.querySelector(`input[name='marca-${brand.id}']`);
        if (checkbox.checked) {
          marcas[brand.id] = true;
        }
      });
      this.ocultarOffcanvas();

      this.productos = await productsAxios.filtrarProductos({ categorias: categorias, marcas: marcas });

    }
  },

}

</script>

<template>
  <div class="options row">
    <div class="col-6 col-md-3">
      <button id="toggleFiltersBtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFiltros" aria-controls="offcanvasFiltros">Mostrar Filtros</button>

    </div>
    <div class="col-6 col-md-3 offset-md-6">
      <select id="ordenarPor">
        <option value="precioAscendente">Precio - Ascendente</option>
        <option value="precioDescendente">Precio - Descendente</option>
        <option value="fechaAscendente">Fecha - Ascendente</option>
        <option value="fechaDescendente">Fecha - Descendente</option>
      </select>
    </div>
  </div>
  <div class="row">
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasFiltros" aria-labelledby="offcanvasFiltrosLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasFiltrosLabel">Filtros</h5>
        <button type="button" id="closeBtn" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <!-- Contenido de los filtros -->
        <form class="filtros" @submit.prevent="aplicarFiltros">
          <!-- Categorías -->
          <div class="categorias">
            <legend><strong>Categorías</strong></legend>
            <div class="linea-filtro" v-for="category in categories" :key="category.id">
            <a>{{ category.nombre }}</a>
            <input type="checkbox" :name="'categoria-' + category.id" :value="category.id"><br>
          </div>
          </div>
          <!-- Marcas -->
          <br>
          <div class="marcas">
            <legend><strong>Marcas</strong></legend>
            <div class="linea-filtro" v-for="brand in brands" :key="brand.id">
              <a>{{ brand.nombre }}</a>
              <input type="checkbox" :name="'marca-' + brand.id" :value="brand.id"><br>
            </div>
          </div>
          <button class="btn-filtro" type="submit">Aplicar Filtros</button>
        </form>
      </div>
    </div>



    <div class="productos-filtrados col-12">
      <div class="bloque row">
        <ProductItem v-for="product in productos" :key="product.id" :product="product" ></ProductItem>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.submit{
  margin-top: 10px;

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

</style>