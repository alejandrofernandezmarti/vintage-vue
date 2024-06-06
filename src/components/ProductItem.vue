<script >
export default {
  props: {
    product: {}
  },
  methods: {
    formatPrice(value) {
      return value.toFixed(2);
    },
    redirectProduct() {
      this.$router.push(`/product/${this.product.id}`);
    }
  }

}

</script>

<template>
  <div class="col-6 col-md-4 col-xl-3" @click="redirectProduct">
    <div class="card-product">
      <img :src="product.imagenes?.url_1" class="card-img-top  normal-image" alt="Producto 1">
      <img :src="product.imagenes?.url_2" class="card-img-top  hover-image" alt="Producto 1">
      <div class="card-body row g-0">
        <a :href="`/product/${product.id}`" class="nameProduct text-uppercase col-8">{{ product.nombre }}</a>
        <div class="col-4">
          <a :href="`/product/${product.id}`" class="namePrice mr-2">{{ formatPrice(product.precio_ud) }} EUR</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.namePrice{
  justify-content: left;
}
</style>