import { defineStore } from 'pinia'
import CategoriesAxios from "@/repositories/categoriesAxios.js";

export const categoriasStore = defineStore('categoriasStore', {
    state()  {
        return {
            categories: [],
            brands:[],
            carrito: JSON.parse(localStorage.getItem('carrito')) || [],
            precioCarrito: 0,
        }
    },
    actions: {
        async loadCategorias() {
            try {
                this.categories = await CategoriesAxios.getAllCategories()
                this.brands = await CategoriesAxios.getAllMarcas()
            } catch (error) {
                console.log(error)
            }
        },
        agregarAlCarrito(producto) {
            this.carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            this.calcularPrecioTotal();
        },
        eliminarDelCarrito(index) {
            this.carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            this.calcularPrecioTotal();
        },
        calcularPrecioTotal() {
            this.precioCarrito = this.carrito.reduce((total, item) => total + item.precio, 0);
        }
    }
})
