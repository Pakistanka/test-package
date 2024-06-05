import axios from "axios";
import process from "process";

const instance = axios.create({
    baseURL: import.meta.env.VITE_FLUID_API,
});

console.log('import.meta.env.NEXT_PUBLIC_FLUID_API', import.meta.env, import.meta.env.VITE_FLUID_API)

instance.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = localStorage.fluidToken;
        return config;
    },
    (err) => {
        debugger;
        return Promise.reject(err);
    }
);

export default instance;
