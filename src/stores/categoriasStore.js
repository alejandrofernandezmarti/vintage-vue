import { defineStore } from 'pinia'
import CategoriesAxios from "@/repositories/categoriesAxios.js";
import productsAxios from "@/repositories/productsAxios.js";

export const categoriasStore = defineStore('categoriasStore', {
    state()  {
        return {
            categories: [],
            carrito: JSON.parse(localStorage.getItem('carrito')) || [] ,
            carritoStorage : JSON.parse(localStorage.getItem('carrito')) || [],
            precioCarrito: 0,
            precioEnvio: 0,
            precioTotal: 0,
            productos: [],
            productosCargados: false,
        }
    },
    actions: {
        async loadCarrito() {
            try {
                const products = JSON.parse(localStorage.getItem('carrito')) || [];

                if (products.length > 0) {
                    const response = await productsAxios.getCarrito(products);
                    this.carrito = response;
                } else {
                    this.carrito = [];
                }
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
                this.calcularPrecioTotal();
                this.calculadoraEnvio();
            } catch (error) {
                console.error('Error al cargar el carrito:', error);
            }
        },
        async loadCategorias() {
            try {
                this.categories = await CategoriesAxios.getAllCategories()
            } catch (error) {
                console.log(error)
            }
        },
        agregarAlCarrito(producto) {
            const productoCarrito = {
                id: producto.id,
                nombre: producto.nombre,
                cantidad: producto.cantidad,
                imagenes: { url_1: producto.imagenes.url_1 },
                descripcion: producto.descripcion,
                tipo: producto.tipo,
                precio_env : producto.precio_env,
                precio_ud: producto.precio_ud
            };
            const prodCartStr = {
                id: producto.id,
                nombre: producto.nombre,
                cantidad: producto.cantidad,
                descripcion: producto.descripcion,
                tipo: producto.tipo,
                precio_env : producto.precio_env,
                precio_ud: producto.precio_ud
            };
            this.carrito.push(productoCarrito);
            this.carritoStorage.push(prodCartStr)
            localStorage.setItem('carrito', JSON.stringify(this.carritoStorage));
            this.calcularPrecioTotal();
            this.calculadoraEnvio();
        },
        agregarBoxCarrito(producto,cantidad, precio) {
            const productoCarrito = {
                id: producto.id,
                nombre: producto.nombre,
                cantidad: cantidad,
                imagenes: { url_1: producto.imagenes.url_1 },
                descripcion: producto.descripcion,
                tipo: producto.tipo,
                precio_env : producto.precio_env,
                precio_ud: precio
            };
            const prodCartStr = {
                id: producto.id,
                nombre: producto.nombre,
                cantidad: cantidad,
                descripcion: producto.descripcion,
                tipo: producto.tipo,
                precio_env : producto.precio_env,
                precio_ud: precio
            };
            this.carrito.push(productoCarrito);
            this.carritoStorage.push(prodCartStr)
            localStorage.setItem('carrito', JSON.stringify(this.carritoStorage));
            this.calcularPrecioTotal();
            this.calculadoraEnvio();
        },
        eliminarDelCarrito(index) {
            this.carrito.splice(index, 1);
            this.carritoStorage.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(this.carritoStorage));
            this.calcularPrecioTotal();
            this.calculadoraEnvio();
        },
        vaciarCarrito(){
            this.carritoStorage = []
            localStorage.setItem('carrito', JSON.stringify(this.carritoStorage));
        },
        calcularPrecioTotal() {
            const precioTotal = this.carrito.reduce((total, item) => total + (item.precio_ud * item.cantidad), 0);

            this.precioCarrito = precioTotal.toFixed(2);
        },
        calculadoraEnvio() {
            this.precioEnvio = 0
            if (this.precioCarrito >= 400){
                this.precioEnvio = 0
            }else {
                this.carrito.forEach(item => {
                    this.precioEnvio += item.precio_env * (item.cantidad / 10)
                })
                this.precioEnvio = parseFloat(this.precioEnvio.toFixed(2));
            }
            this.precioTotal = (parseFloat(this.precioEnvio) + parseFloat(this.precioCarrito)).toFixed(2);
        },
        async cargarProductos() {
            if (!this.productosCargados) {
                const productosGuardados = localStorage.getItem('productos');
                if (productosGuardados) {
                    this.productos = JSON.parse(productosGuardados);
                    this.productosCargados = true;
                } else {
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
    },
})