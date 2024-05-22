import { defineStore } from 'pinia'
import CategoriesAxios from "@/repositories/categoriesAxios.js";
import productsAxios from "@/repositories/productsAxios.js";

export const categoriasStore = defineStore('categoriasStore', {
    state()  {
        return {
            categories: [],
            carrito: JSON.parse(localStorage.getItem('carrito')) || [],
            precioCarrito: 0,
            precioEnvio: 0,
            precioTotal: 0,
            productos: [],
            productosCargados: false,
        }
    },
    actions: {
        async loadCategorias() {
            try {
                this.categories = await CategoriesAxios.getAllCategories()
            } catch (error) {
                console.log(error)
            }
        },
        agregarAlCarrito(producto) {
            this.carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            this.calcularPrecioTotal();
            this.calculadoraEnvio();
        },
        agregarBoxCarrito(producto,cantidad, precio) {
            const productoCarrito = {
                id: producto.id,
                nombre: producto.nombre,
                cantidad: cantidad,
                imagenes: producto.imagenes,
                descripcion: producto.descripcion,
                tipo: producto.tipo,
                precio_env : producto.precio_env,
                precio_ud: precio
            };
            this.carrito.push(productoCarrito);

            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            this.calcularPrecioTotal();
            this.calculadoraEnvio();
        },
        eliminarDelCarrito(index) {
            this.carrito.splice(index, 1);
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
            this.calcularPrecioTotal();
            this.calculadoraEnvio();
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

    }
})
