<script>
import usersAxios from "@/repositories/usersAxios.js";
export default {

  props: ['id'],
  data() {
    return {
      order: {},
      productos: []
    }
  },
  async mounted() {
    this.order = await usersAxios.getCompra(this.id)
    this.productos = await usersAxios.getProductos(this.id)
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    calcularPrecioTotal(compras) {
      let total = 0;
      compras.forEach(compra => {
        total += compra.producto.precio;
      });
      return total.toFixed(2); // Redondeamos el total a 2 decimales
    },

  }
}
</script>

<template>

  <div class="row">
    <div class="col-2"></div>

    <div class="col-10 mt-5">
      <h3>PEDIDO #{{order.id}}</h3>
      <p class="text-muted mt-4">Fecha pedido: {{formatDate(order.fecha)}}</p>
    </div>
  </div>
  <div class="row">
    <div class="col-0 col-md-2"></div>

    <div v-if="productos.length > 0" class="col-9 orders">
      <table class="table">
        <thead>
        <tr>
          <td></td>
          <td>Nombre</td>
          <td>Precio</td>
          <td>Cantidad</td>
          <td>Estado</td>

        </tr>
        </thead>
        <tbody>
        <tr v-for="product in productos" :key="product.id">
          <td class="text-muted fila"><img :src="product.imagen" class="exp-img" alt="Producto 1"></td>
          <td class="text-muted fila align-content-center">{{ product.nombre }}</td>
          <td class="text-muted fila align-content-center">{{ product.precio_ud }} EUR</td>
          <td class="text-muted fila align-content-center">{{ product.cantidad }}</td>
          <td class="text-muted fila align-content-center">{{ product.estado }}</td>
        </tr>
        </tbody>
      </table>
    </div>


    <div class="col-1"></div>

  </div>

  <div class="row mt-3">
    <div class="col-0 col-md-2"></div>

    <div class="col-9 account">
      <table class="table">
        <thead>
        <tr>
          <td>Direccion</td>
          <td>Total</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="fila text-muted">{{ order.direccion }}</td>
          <td class="fila text-muted">{{ order.importe }} EUR</td>
        </tr>
        </tbody>
      </table>
    </div>


    <div class="col-1"></div>

  </div>
</template>

<style scoped>
.exp-img{
  width: 100px;
  height: 100px;
}
.fila{
  padding: 20px 10px 20px 10px;
}
</style>