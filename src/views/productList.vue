<script>
import ProductItem from '@/components/ProductItem.vue';
import productsAxios from "@/repositories/productsAxios.js";
import { mapState } from "pinia";
import { categoriasStore } from "@/stores/categoriasStore.js";

export default {
  components: {
    ProductItem
  },
  data() {
    return {
      productos: [],
      nextUrl: '',
      offcanvasVisible: false,
    };
  },
  computed: {
    ...mapState(categoriasStore, { categories: 'categories' }),
  },
  async mounted() {
    await this.loadProducts();
  },
  methods: {
    async loadProducts() {
      const productsBase = await productsAxios.getLotes();
      this.nextUrl = productsBase.links?.next;
      console.log(this.nextUrl);
      this.productos = productsBase.data;
    },
    async loadMoreProducts() {
      if (this.nextUrl) {
        const productsInfo = await productsAxios.getProducts(this.nextUrl);
        this.nextUrl = productsInfo.links?.next;
        console.log(productsInfo.data);
        this.productos = this.productos.concat(productsInfo.data);
      }
    },
  },
}
</script>

<template>
  <div class="row">
    <div class="productos-filtrados col-12">
      <div class="bloque row g-0">
        <ProductItem v-for="product in productos" :key="product.id" :product="product"></ProductItem>
      </div>
      <div v-if="nextUrl" class="ver-mas mb-5">
        <button @click="loadMoreProducts" class="btn-ver-mas">Ver más productos</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ver-mas {
  text-align: center;
  margin-top: 20px;
}
.btn-ver-mas {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #fffefe;
  border: 2px solid black;
  color: black;
  border-radius: 5px;
}
.btn-ver-mas:hover {
  background-color: #444444;
  color: white;
}
.linea-filtro a {
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
  color: #333;
  text-decoration: none;
}
</style>
