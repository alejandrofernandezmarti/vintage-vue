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
    ...mapState(categoriasStore,{categories: 'categories',brands:'brands'}),
  },
  async mounted(){
    this.productos = await productsAxios.productsByCategoria(this.id);
  },

  methods: {}

}

</script>

<template>

  <div class="row">
    <div class="productos-filtrados col-12">
      <div class="bloque row">
        <ProductItem v-for="product in productos" :key="product.id" :product="product" ></ProductItem>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>