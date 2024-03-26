import { defineStore } from 'pinia'
import CategoriesAxios from "@/repositories/categoriesAxios.js";
import productsAxios from "@/repositories/productsAxios.js";

export const categoriasStore = defineStore('categoriasStore', {
    state()  {
        return {
            categories: [],
            brands:[],
            carrito: JSON.parse(localStorage.getItem('carrito')) || [],
            precioCarrito: 0,
            productos: [],
            productosCargados: false,
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
        },
        async cargarProductos() {
            if (!this.productosCargados) {
                const productosGuardados = localStorage.getItem('productos');
                if (productosGuardados) {
                    // Si hay productos guardados en el localStorage, cárgalos en el estado de Vuex
                    this.productos = JSON.parse(productosGuardados);
                    this.productosCargados = true;
                } else {
                    // Si no hay productos guardados, haz la petición para obtenerlos y guárdalos en el localStorage
                    // Supongamos que productsAxios.getAllProducts() devuelve una promesa con los productos
                    productsAxios.getAllProducts().then((productos) => {
                        this.productos = productos;
                        this.productosCargados = true;
                        localStorage.setItem('productos', JSON.stringify(productos));
                    }).catch((error) => {
                        console.error("Error al cargar productos:", error);
                    });
                }
            }
        },

    }
})
