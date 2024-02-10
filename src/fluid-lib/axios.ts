import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_FLUID_API,
});

instance.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = localStorage.fluidToken;
        return config;
    },
    (err) => {
        // eslint-disable-next-line no-debugger
        debugger;
        return Promise.reject(err);
    }
);

export default instance;
