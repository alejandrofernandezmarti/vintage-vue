<script >
export default {
  props: {
    product: {}
  },
  methods: {
    obtenerPrimeraPalabra(nombre) {
      return nombre.split(' ')[0];
    },
    mostrarPrecioSinDecimales(precio) {
      return parseInt(precio);
    },
    redirectProduct() {
      // Redirecciona al usuario al producto
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
      <div class="card-body">
        <a :href="`/product/${product.id}`" class="nameProduct">{{ product.nombre }}</a>
        <a :href="`/product/${product.id}`" class="namePrice">{{ mostrarPrecioSinDecimales(product.precio) }} EUR</a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>