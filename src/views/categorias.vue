<script>
import {mapState} from "pinia";
import {categoriasStore} from "@/stores/categoriasStore.js";

export default {

  computed: {
    ...mapState(categoriasStore,{categories: 'categories',brands:'brands'}),
  },
}
</script>

<template>
  <div class="bloque row no-gutters">
    <a class="titulos col-12"><strong>CATEGORÍAS</strong></a>

    <div v-for="categoria in categories" :key="categoria.id" class="col-6 col-md-4 col-xl-3">
      <div class="card-category">
        <img :src="`/categorias/${categoria.imagen}`" class="card-img-top" :alt="categoria.nombre">
        <div class="card-body">
          <a :href="`/productos/${categoria.id}`" class="name-category">{{ categoria.nombre }}</a>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>