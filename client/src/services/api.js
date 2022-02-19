import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost/DR-React-PHP/api/",
})

export default api;