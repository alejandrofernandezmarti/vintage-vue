<script>
import comprasAxios from "@/repositories/comprasAxios.js";
import usersAxios from "@/repositories/usersAxios.js";
import { useUserStore } from '@/stores/userStore.js';
import {mapActions} from "pinia";
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
    ...mapActions(useUserStore, ['logout']),
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    },
    redirectProduct(id) {
      this.$router.push(`/order/${id}`);
    },
    handleLogout() {
      this.logout();
      this.$router.push('/login');
    }

  }
}
</script>

<template>
  <div class="row">
    <div class="col-1 col-md-1"></div>

    <div class="col-11 mt-5">
      <h3>MI CUENTA</h3>
      <p class="text-muted mt-4">Bienvenido de nuevo</p>
    </div>
  </div>
  <div class="row">
    <div class="col-1 col-md-1"></div>

    <div v-if="compras.length > 0" class="col-10 col-md-7 orders">
      <table class="table">
        <thead>
        <tr>
          <td class="text-muted">PEDIDO</td>
          <td class="text-muted">FECHA</td>
          <td class="text-muted">ESTADO</td>
          <td class="text-muted end">TOTAL</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="pedido in compras" :key="pedido.id"  @click="redirectProduct(pedido.id)">
          <td class="text-muted fila">{{ pedido.id }}</td>
          <td class="text-muted fila">{{ formatDate(pedido.fecha) }}</td>
          <td class="text-muted fila">{{ pedido.estado }}</td>
          <td class="text-muted fila end">{{ pedido.importe }} EUR</td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="offset-1 offset-md-0 col-10 col-md-3 account">
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
        <tr class="align-content-end">
          <button @click="handleLogout" class="btn mt-3 text-muted">LOG OUT</button>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="col-1"></div>

  </div>
</template>

<style scoped>
.end{
  text-align: right;
}
.btn{
  margin-left: 60%;
  width: 40%;
  padding: 5px !important;
}
.fila{
  padding: 20px 10px 20px 10px;
}
.account{
}
</style>