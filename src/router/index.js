import { createRouter, createWebHistory } from 'vue-router'
import productDetail from "@/views/productDetail.vue";
import productList from "@/views/productList.vue";
import categoriasList from "@/views/categorias.vue";
import productsByCategorie from "@/views/productsByCategoria.vue";
import createProduct from "@/views/createProduct.vue";
import miCuenta from "@/views/miCuenta.vue";
import login from "@/views/LoginView.vue";
import index from "@/views/main.vue"
import orderDetail from "@/views/orderDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: index
    },{
      path: '/product/:id',
      name: 'Detalle producto',
      component: productDetail,
      props: true
    },{
      path: '/productos',
      name: 'Nuestros productos',
      component: productList,
      props: true
    },
    {
      path: '/categorias',
      name: 'Categorias',
      component: categoriasList,
    },
    {
      path: '/productos/:id',
      name: 'Categoria',
      component: productsByCategorie,
      props: true
    },
    {
      path: '/newProduct',
      name: 'New Product',
      component: createProduct,
    },{
      path: '/cuenta',
      name: 'Mi cuenta',
      component: miCuenta,
    },{
      path: '/login',
      name: 'Login',
      component: login,
    },{
      path: '/order/:id',
      name: 'Compra',
      component: orderDetail,
      props: true
    },
  ]
})

export default router
