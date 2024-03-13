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
    async getAllStudents (){    
        const students = await apiLogin.get(`/api/alumnos/`);
        return students.data.data;
    },
    async getAllStudentsByCycle (idCycle) {
        const students = await apiLogin.get(`/api/alumnos/ciclos/${idCycle}`);
        return students.data.data;
    },
    async getAllEmpresas (){    
        const empresas = await apiLogin.get(`/api/empresas/`);
        return empresas.data.data;
    },
    async getAllResponsables () {
        const responsables = await apiLogin.get(`/api/responsables/`)
        return responsables.data.data;
    }
}

