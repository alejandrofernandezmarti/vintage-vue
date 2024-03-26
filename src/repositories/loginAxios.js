import axios from 'axios'
const SERVER = import.meta.env.VITE_URL_API
const DEBUG = true

const apiLogin = axios.create({
  baseURL: SERVER,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
    }
})

axios.interceptors.response.use((response) => {
    if (DEBUG) {
        console.info('Response: ', response)
    }
    return response
}, (error) => {
    if (error.response && error.response.status !== 400) {
        alert('Response error ' + error.response.status + '(' + error.response.statusText + ')')
    }
    if (DEBUG) {
        console.info('Response error: ', error)
    }
    return Promise.reject(error)
})

export default{
    async getToken (email,password){    
        const token = await apiLogin.post(`/api/login/?email=${email}&password=${password}`);
        return token.data;
    },
    async login(user) {
        console.log(user)
        // eslint-disable-next-line no-useless-catch
        try {
            const token = await apiLogin.post(`/api/login/?email=${user.email}&password=${user.password}`)
            return token.data
        } catch (error) {
            throw error
        }
    }
}

