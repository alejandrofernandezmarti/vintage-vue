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
      productosSelected: [],
    }
  },
  computed: {
    ...mapState(categoriasStore,{categories: 'categories',productos:'productos'}),

  },
  async mounted(){
    await this.loadProducts();
  },

  methods: {
    async loadProducts() {
      this.productosSelected = await productsAxios.getAllSelected();
    },
  },

}

</script>

<template>
  <div class="row">
    <div v-if="this.productosSelected.length > 0" class="productos-filtrados col-12">
      <div class="bloque row g-0">
        <ProductItem v-for="product in productosSelected" :key="product.id" :product="product" ></ProductItem>
      </div>
    </div>
    <div v-else class="no-products col-12 text-center mt-5">
      <i class="fas fa-box-open no-products-icon"></i>
      <h3>¡Lo sentimos!</h3>
      <p class="no-products-message">Los productos de esta categoría están agotados. Vuelve pronto para ver las novedades.</p>
    </div>
  </div>
</template>

<style scoped>

.linea-filtro a {
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
  color: #333;
  text-decoration: none;
}

.filtrosForm legend{
  padding-top: 10%;
}
.filtros div div{
  border-bottom: solid 1px;
}

.linea-filtro input{
  float: right;
  margin-top: 4%
}


</style>