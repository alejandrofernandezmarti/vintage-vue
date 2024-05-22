<script>
import ProductItem from '@/components/ProductItem.vue'
import productsAxios from "@/repositories/productsAxios.js";
import {mapState} from "pinia";
import {categoriasStore} from "@/stores/categoriasStore.js";

export default {
  props: ['id'],

  components: {
    ProductItem
  },
  data() {
    return {
      productos: [],
      categoria: {},
    }
  },
  computed: {
    ...mapState(categoriasStore,{categories: 'categories'}),
  },
  async mounted(){
    this.productos = await productsAxios.productsByCategoria(this.id);
  },

  methods: {}

}

</script>

<template>

  <div class="row">
    <div v-if="this.productos.length > 0" class="productos-filtrados col-12">
      <div class="bloque row g-0">
        <ProductItem v-for="product in productos" :key="product.id" :product="product" ></ProductItem>
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

</style>