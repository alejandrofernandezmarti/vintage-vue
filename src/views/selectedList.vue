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
    <div class="productos-filtrados col-12">
      <div class="bloque row g-0">
        <ProductItem v-for="product in productosSelected" :key="product.id" :product="product" ></ProductItem>
      </div>
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