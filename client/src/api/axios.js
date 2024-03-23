import axios from 'axios';

export default axios.create({
    baseURL: "http://192.168.1.5:5000"
});

export const axiosPrivate = axios.create({
    baseURL: "http://192.168.1.5:5000",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});