import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8080"
});

instance.interceptors.request.use(
    (config) => {
        config.startTime = new Date().getTime();
        console.log('Request:', config);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        const endTime = new Date().getTime();
        console.log(`Request duration: ${endTime - response.config.startTime}`);
        console.log('Response:', response);
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;