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
    async getAllProducts() {
        const products = await apiLogin.get('/api/productos/');
        return products.data.data;
    },
    async getProductById(idProduct) {
        const product = await apiLogin.get(`/api/productos/${idProduct}`);
        return product.data.data;
    },
    async filtrarProductos(filtros) {
        const cycles = await apiLogin.post(`/api/productosFiltrados`,filtros);
        return cycles.data.data;
    },
    async productsByCategoria(id) {
        const cycles = await apiLogin.get(`/api/productos/categoria/${id}`);
        return cycles.data.data;
    },
    async productosRandom() {
        const cycles = await apiLogin.get(`/api/productosRand`);
        return cycles.data.data;
    },
    async createProduct(product) {
        console.log(product)
        await apiLogin.post(`/api/productoCreate`,product);

    }
};
