import axios from 'axios'

const apirequest = axios.create({
    baseURL:"http://localhost:8800/api",
    withCredentials:true
});

export default apirequest;