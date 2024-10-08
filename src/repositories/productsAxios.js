import axios from 'axios';
const SERVER = import.meta.env.VITE_URL_API;
const DEBUG = true

const apiLogin = axios.create({
    baseURL: SERVER,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

axios.interceptors.response.use(response => {
    if (DEBUG) {
        console.info('Response: ', response);
    }
    return response;
}, error => {
    if (error.response && error.response.status !== 400) {
        alert('Response error ' + error.response.status + '(' + error.response.statusText + ')');
    }
    if (DEBUG) {
        console.info('Response error: ', error);
    }
    return Promise.reject(error);
});

export default {
    async getProducts(url) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los productos paginadas:', error)
            throw error
        }

    },
    async getAllProducts() {
        const products = await apiLogin.get('/api/productos/');
        return products.data;
    },
    async getLotes() {
        const products = await apiLogin.get('/api/productosLotes/');
        return products.data;
    },
    async getAllSelected() {
        const products = await apiLogin.get('/api/productosSelected/');
        return products.data;
    },
    async getProductById(idProduct) {
        const product = await apiLogin.get(`/api/productos/${idProduct}`);
        return product.data.data;
    },
    async getCarrito(productos) {
        try {
            const response = await apiLogin.post('/api/getCarrito', { products: productos });
            return response.data.carrito;
        } catch (error) {
            console.error('Error al obtener el carrito del backend:', error);
            throw error;
        }
    },
    async productsByCategoria(id) {
        const cycles = await apiLogin.get(`/api/productos/categoria/${id}`);
        return cycles.data.data;
    },
    async productosRandom() {
        const cycles = await apiLogin.get(`/api/productosRand`);
        return cycles.data.data;
    },
    async selectedRandom() {
        const cycles = await apiLogin.get(`/api/selectedRand`);
        return cycles.data.data;
    },
    async createProduct(product) {
        await apiLogin.post(`/api/productoCreate`,product);
    },
    async newOrder(products){
        await apiLogin.post(`/checkout`,products);
    },
};
