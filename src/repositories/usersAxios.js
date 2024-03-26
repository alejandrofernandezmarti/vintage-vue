import axios from 'axios'
const SERVER = import.meta.env.VITE_URL_API
const DEBUG = true

const apiUsers = axios.create({
    baseURL: SERVER,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

apiUsers.interceptors.request.use(
    (config) => {
        const token = localStorage.token
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        console.error('Interceptor error:', error)
        return Promise.reject(error)
    }
)

apiUsers.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response.status === 401) {
            console.log(error)
        }
        return Promise.reject(error)
    }
)

export default{
    async getUserInfo(){
        try {
            const response = await apiUsers.get(`/api/user/getInfo`);
            return response.data.data;
        } catch (error) {
            return false
        }
    },
    async getCompra(id){
        try {
            const response = await apiUsers.get(`/api/compras/${id}`);
            return response.data.data;
        } catch (error) {
            return false
        }
    },
    async getProductos(idOrder){
        try {
            const response = await apiUsers.get(`/api/compras/${idOrder}/productos`);
            return response.data.data;
        } catch (error) {
            return false
        }
    },
}

