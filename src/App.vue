<script >
import NavBar from '@/components/nav.vue'
import {categoriasStore} from "@/stores/categoriasStore.js";
import {mapActions} from "pinia";
export default {
  components: {
    NavBar
  },
  async mounted() {
    try {
      await this.loadCategorias()
      await this.cargarProductos()
    } catch (error) {
      console.log(error)
    }
  },

  methods: {
    ...mapActions(categoriasStore, ['loadCategorias','cargarProductos']),
  }
}
</script>

<template>
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport"  />
    <title>Título de la página</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  </head>
  <body>

  <div class="content">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>

  </body>
  </html>
</template>

<style >

</style>
