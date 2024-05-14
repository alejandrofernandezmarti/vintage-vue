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
        agregarBoxCarrito(producto,cantidad, precio) {
            const productoCarrito = {
                id: producto.id,
                nombre: producto.nombre,
                cantidad: cantidad,
                imagenes: producto.imagenes,
                descripcion: producto.descripcion,
                tipo: producto.tipo,
                precio_ud: precio
            };
            this.carrito.push(productoCarrito);

            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            this.calcularPrecioTotal();
        },
        eliminarDelCarrito(index) {
            this.carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            this.calcularPrecioTotal();
        },
        calcularPrecioTotal() {
            const precioTotal = this.carrito.reduce((total, item) => total + (item.precio_ud * item.cantidad), 0);

            this.precioCarrito = precioTotal.toFixed(2);
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
