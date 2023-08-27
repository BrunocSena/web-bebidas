import axios from 'axios';

export const api = axios.create({
    baseURL: `https://backend-bebidas-bt8vjxc73-brunocsena.vercel.app/`
});