<script>
import comprasAxios from "@/repositories/comprasAxios.js";
import usersAxios from "@/repositories/usersAxios.js";
export default {

  data() {
    return {
      compras: [],
      user: {}
    }
  },
  async mounted() {
     this.compras = await comprasAxios.getCompras()
     this.user = await usersAxios.getUserInfo()
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    redirectProduct(id) {
      // Redirecciona al usuario al producto
      this.$router.push(`/order/${id}`);
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-2"></div>

    <div class="col-10 mt-5">
      <h3>MI CUENTA</h3>
      <p class="text-muted mt-4">Bienvenido de nuevo</p>
    </div>
  </div>
  <div class="row">
    <div class="col-2"></div>

    <div v-if="compras.length > 0" class="col-6 orders">
      <table class="table">
        <thead>
        <tr>
          <td>ID</td>
          <td>Fecha</td>
          <td>Método de Pago</td>
          <td>Estado</td>
          <td>ID Usuario</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="pedido in compras" :key="pedido.id"  @click="redirectProduct(pedido.id)">
          <td class="text-muted fila">{{ pedido.id }}</td>
          <td class="text-muted fila">{{ formatDate(pedido.fecha) }}</td>
          <td class="text-muted fila">{{ pedido.metodo_pago }}</td>
          <td class="text-muted fila">{{ pedido.estado }}</td>
          <td class="text-muted fila">{{ pedido.id_user }}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="col-3 account">
      <table class="table">
        <thead>
        <tr>
          <td>DATOS</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td class="fila text-muted">{{ user.name}}</td>
        </tr>
        <tr>
          <td class="fila text-muted">{{ user.email}}</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="col-1"></div>

  </div>
</template>

<style scoped>
.fila{
  padding: 20px 10px 20px 10px;
}
.account{
}
</style>