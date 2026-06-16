import axios from 'axios';

const BACKEND_URL = axios.create({
    baseURL: 'https://genienotes.onrender.com/api/v1/notes',
})

export default BACKEND_URL;

